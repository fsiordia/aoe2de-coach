import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to fetch URL content
function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        console.log(`[Request] Fetching: ${url}`);
        const req = https.get(url, (res) => {
            console.log(`[Response] Status: ${res.statusCode}`);
            let data = '';
            // Follow redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                console.log(`[Redirect] To: ${res.headers.location}`);
                resolve(fetchUrl(res.headers.location.startsWith('http') ? res.headers.location : `https://ageofempires.fandom.com${res.headers.location}`));
                return;
            }
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                console.log(`[Response] Completed. Size: ${data.length} bytes`);
                resolve(data);
            });
        });

        req.on('error', (err) => {
            console.error(`[Error] Request failed: ${err.message}`);
            reject(err);
        });

        req.setTimeout(10000, () => {
            console.error(`[Timeout] Request aborted after 10000ms`);
            req.destroy();
            reject(new Error("Request timeout"));
        });
    });
}

// Helper to extract links from "Weak vs" or "Strong vs" section
function extractCounterLinks(html, label) {
    // Find the label column
    // The structure is roughly:
    // <tr>
    //   <td ...><b>Weak vs.</b></td>
    //   <td> ... links ... </td>
    // </tr>

    const labelRegex = new RegExp(`<td[^>]*>\\s*<b>${label}</b>[\\s\\S]*?</td>\\s*<td>([\\s\\S]*?)</td>`, 'i');
    const match = html.match(labelRegex);

    if (!match) return [];

    const content = match[1];
    const linkRegex = /<a[^>]*title="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    const counters = [];
    let linkMatch;

    while ((linkMatch = linkRegex.exec(content)) !== null) {
        // Capture both title (likely singular/canonical) and text (visible)
        counters.push({
            title: linkMatch[1].trim(),
            text: linkMatch[2].trim()
        });
    }

    return counters;
}

// Logic to map Wiki Name -> Unit ID
// This needs to be fuzzy or explicitly mapped.
const unitMapping = {}; // Will load from units.json structure

async function main() {
    console.log("Loading units.json...");
    const unitsPath = path.join(__dirname, '../src/data/units.json');
    const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

    // Build mapping: Name -> ID
    units.forEach(u => {
        const name = u.name.toLowerCase();
        unitMapping[name] = u.id;
        // Also map "Elite X" -> X ID roughly, though counters usually list base unit
        if (!name.includes('elite')) {
            unitMapping[`elite ${name}`] = u.id;
        }

        // Add pluralized map for simple "s" cases
        if (!name.endsWith('s')) {
            unitMapping[name + 's'] = u.id;
        }
    });

    // Logic to update all units
    const unitsToUpdate = units.filter(u => u.unique); // Start with Unique Units only as requested, or all? User said "map each unit". Let's do all valid units.

    console.log(`Found ${unitsToUpdate.length} units to check.`);

    let updatedCount = 0;

    for (const unit of unitsToUpdate) {
        // Skip if not a real unit (abstract categories sometimes exist, but our json seems clean enough)

        const wikiName = unit.name.replace(/ /g, '_');
        const urlsToTry = [
            `https://ageofempires.fandom.com/wiki/${wikiName}_(Age_of_Empires_II)`,
            `https://ageofempires.fandom.com/wiki/${wikiName}`
        ];

        let html = null;
        let validUrl = null;

        for (const url of urlsToTry) {
            try {
                // simple wait to be nice
                await new Promise(r => setTimeout(r, 1000));
                html = await fetchUrl(url);
                validUrl = url;
                break; // Found it
            } catch (e) {
                // Continue to next URL try
            }
        }

        if (validUrl && html) {
            console.log(`[Success] Found ${unit.name} at ${validUrl}`);
            unit.wikiUrl = validUrl;

            const weakVs = extractCounterLinks(html, "Weak vs.");

            // Map and update counters
            const mapToId = (item) => {
                // Try mapping by Title first (most consistent)
                let lowerTitle = item.title.toLowerCase().replace(/ \(age of empires ii\)/g, ''); // Remove common suffix
                let id = unitMapping[lowerTitle];
                if (id) return id;

                // Try mapping by Text
                let lowerText = item.text.toLowerCase();
                id = unitMapping[lowerText];
                if (id) return id;

                // Simple singularization on Text
                if (lowerText.endsWith('s') && unitMapping[lowerText.slice(0, -1)]) return unitMapping[lowerText.slice(0, -1)];
                if (lowerText.endsWith('es') && unitMapping[lowerText.slice(0, -2)]) return unitMapping[lowerText.slice(0, -2)];

                return null;
            };

            const originalCounters = new Set(unit.counteredBy || []);
            let addedForUnit = 0;

            weakVs.forEach(item => {
                const id = mapToId(item);
                if (id && id !== unit.id && !originalCounters.has(id)) { // Don't counter self
                    originalCounters.add(id);
                    addedForUnit++;
                    console.log(`   + Added counter: ${item.text} (title: ${item.title}) -> ${id}`);
                }
            });

            if (addedForUnit > 0) {
                unit.counteredBy = Array.from(originalCounters);
                updatedCount++;
            }
        } else {
            console.warn(`[Warn] Could not find wiki page for ${unit.name}`);
        }
    }

    console.log(`Updated ${updatedCount} units.`);
    fs.writeFileSync(unitsPath, JSON.stringify(units, null, 4));
    console.log("Saved units.json");
}

main();

