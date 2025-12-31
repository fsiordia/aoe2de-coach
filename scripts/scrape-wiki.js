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
            // console.log(`[Response] Status: ${res.statusCode}`);
            let data = '';
            // Follow redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                console.log(`[Redirect] To: ${res.headers.location}`);
                resolve(fetchUrl(res.headers.location.startsWith('http') ? res.headers.location : `https://ageofempires.fandom.com${res.headers.location}`));
                return;
            }
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (err) => {
            console.error(`[Error] Request failed: ${err.message}`);
            reject(err);
        });

        req.setTimeout(8000, () => {
            req.destroy();
            reject(new Error("Request timeout"));
        });
    });
}

// Helper to download image
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(filepath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                reject(new Error(`Status ${res.statusCode}`));
            }
        });

        req.on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });

        req.setTimeout(8000, () => {
            req.destroy();
            fs.unlink(filepath, () => { });
            reject(new Error("Image download timeout"));
        });
    });
}

function extractImage(html) {
    const imgRegex = /<figure[^>]*class="[^"]*pi-item[^"]*pi-image[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i;
    const match = html.match(imgRegex);
    if (match) {
        return match[1];
    }
    return null;
}

function extractCounterLinks(html, label) {
    const labelRegex = new RegExp(`<td[^>]*>\\s*<b>${label}</b>[\\s\\S]*?</td>\\s*<td>([\\s\\S]*?)</td>`, 'i');
    const match = html.match(labelRegex);
    if (!match) return [];

    const content = match[1];
    const linkRegex = /<a[^>]*title="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    const counters = [];
    let linkMatch;

    while ((linkMatch = linkRegex.exec(content)) !== null) {
        counters.push({
            title: linkMatch[1].trim(),
            text: linkMatch[2].trim()
        });
    }

    return counters;
}

const unitMapping = {};

async function main() {
    console.log("Loading units.json...");
    const unitsPath = path.join(__dirname, '../src/data/units.json');
    const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

    const imagesDir = path.join(__dirname, '../public/images/units');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    units.forEach(u => {
        const name = u.name.toLowerCase();
        unitMapping[name] = u.id;
        if (!name.includes('elite')) {
            unitMapping[`elite ${name}`] = u.id;
        }
        if (!name.endsWith('s')) {
            unitMapping[name + 's'] = u.id;
        }
    });

    const unitsToUpdate = units;
    console.log(`Found ${unitsToUpdate.length} units to check.`);

    let updatedCount = 0;
    let globalChanges = 0;

    for (const unit of unitsToUpdate) {
        const wikiName = unit.name.replace(/ /g, '_');
        const urlsToTry = [
            `https://ageofempires.fandom.com/wiki/${wikiName}_(Age_of_Empires_II)`,
            `https://ageofempires.fandom.com/wiki/${wikiName}`
        ];

        const imagePath = path.join(imagesDir, `${unit.id}.png`);
        const hasImage = fs.existsSync(imagePath);

        if (unit.wikiUrl && hasImage && unit.counteredBy && unit.counteredBy.length > 0) {
            if (!unit.imageUrl) {
                unit.imageUrl = `/images/units/${unit.id}.png`;
                updatedCount++;
                globalChanges++;
            }
            continue;
        }

        let html = null;
        let validUrl = null;

        for (const url of urlsToTry) {
            try {
                await new Promise(r => setTimeout(r, 600));
                html = await fetchUrl(url);
                validUrl = url;
                break;
            } catch (e) {
                // Ignore
            }
        }

        if (validUrl && html) {
            console.log(`[Success] Found ${unit.name}`);
            let unitChanged = false;

            if (!unit.wikiUrl) {
                unit.wikiUrl = validUrl;
                unitChanged = true;
            }

            const imgUrl = extractImage(html);
            if (imgUrl && !hasImage) {
                try {
                    await downloadImage(imgUrl, imagePath);
                    console.log(`   + Downloaded image`);
                    unit.imageUrl = `/images/units/${unit.id}.png`;
                    unitChanged = true;
                } catch (e) {
                    console.error(`   ! Failed to download image: ${e.message}`);
                }
            } else if (hasImage && !unit.imageUrl) {
                unit.imageUrl = `/images/units/${unit.id}.png`;
                unitChanged = true;
            }

            const weakVs = extractCounterLinks(html, "Weak vs.");

            const mapToId = (item) => {
                let lowerTitle = item.title.toLowerCase().replace(/ \(age of empires ii\)/g, '');
                let id = unitMapping[lowerTitle];
                if (id) return id;
                let lowerText = item.text.toLowerCase();
                id = unitMapping[lowerText];
                if (id) return id;
                if (lowerText.endsWith('s') && unitMapping[lowerText.slice(0, -1)]) return unitMapping[lowerText.slice(0, -1)];
                if (lowerText.endsWith('es') && unitMapping[lowerText.slice(0, -2)]) return unitMapping[lowerText.slice(0, -2)];
                return null;
            };

            const originalCounters = new Set(unit.counteredBy || []);
            let beforeCount = originalCounters.size;

            weakVs.forEach(item => {
                const id = mapToId(item);
                if (id && id !== unit.id) {
                    originalCounters.add(id);
                }
            });

            if (originalCounters.size > beforeCount) {
                unit.counteredBy = Array.from(originalCounters);
                unitChanged = true;
                console.log(`   + Updated counters (${originalCounters.size - beforeCount} new)`);
            }

            if (unitChanged) {
                updatedCount++;
                globalChanges++;
                // Incremental save
                if (globalChanges % 3 === 0) {
                    console.log("[Checkpoint] Saving units.json...");
                    fs.writeFileSync(unitsPath, JSON.stringify(units, null, 4));
                }
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
