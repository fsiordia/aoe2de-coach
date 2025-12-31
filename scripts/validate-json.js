import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const unitsPath = path.join(__dirname, '../src/data/units.json');
const civsPath = path.join(__dirname, '../src/data/civs.json');

console.log("Starting Data Validation...");

try {
    const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));
    const civs = JSON.parse(fs.readFileSync(civsPath, 'utf8'));

    const unitIds = new Set(units.map(u => u.id));
    let errors = 0;

    // Validate Units
    units.forEach(unit => {
        if (!unit.id) {
            console.error("Unit found without ID:", unit);
            errors++;
        }
        if (!unit.name) {
            console.error(`Unit ${unit.id} missing name`);
            errors++;
        }
        if (unit.counteredBy) {
            unit.counteredBy.forEach(counterId => {
                if (!unitIds.has(counterId)) {
                    console.error(`Unit ${unit.id} references missing counter: ${counterId}`);
                    errors++;
                }
            });
        }
    });

    // Validate Civs
    civs.forEach(civ => {
        if (!civ.id) {
            console.error("Civ found without ID:", civ);
            errors++;
        }

        // Check Roster
        if (civ.roster) {
            civ.roster.forEach(unitId => {
                if (!unitIds.has(unitId)) {
                    console.error(`Civ ${civ.id} roster references missing unit: ${unitId}`);
                    errors++;
                }
            });
        }

        // Check Unique Units
        if (civ.uniqueUnits) {
            civ.uniqueUnits.forEach(unitId => {
                if (!unitIds.has(unitId)) {
                    console.error(`Civ ${civ.id} uniqueUnits references missing unit: ${unitId}`);
                    errors++;
                }
            });
        }
    });

    if (errors > 0) {
        console.error(`Validation Failed with ${errors} errors.`);
        process.exit(1);
    } else {
        console.log("Validation Successful!");
        process.exit(0);
    }
} catch (error) {
    console.error("Failed to read or parse JSON files:", error);
    process.exit(1);
}
