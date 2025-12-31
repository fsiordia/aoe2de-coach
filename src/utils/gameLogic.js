import defaultCivsData from '../data/civs.json';
import defaultUnitsData from '../data/units.json';

// Initialize data from LocalStorage if available, else fallback to bundled JSON
let civsData = defaultCivsData;
let unitsData = defaultUnitsData;

try {
    const storedCivs = localStorage.getItem('aoe2_data_civs');
    const storedUnits = localStorage.getItem('aoe2_data_units');

    if (storedCivs) civsData = JSON.parse(storedCivs);
    if (storedUnits) unitsData = JSON.parse(storedUnits);
    console.log("Data loaded source:", storedCivs ? "Local Storage (Updated)" : "Bundled Default");
} catch (e) {
    console.error("Failed to load data from storage, using defaults", e);
}

// Map for quick lookup
const unitsMap = unitsData.reduce((acc, unit) => {
    acc[unit.id] = unit;
    return acc;
}, {});

const civsMap = civsData.reduce((acc, civ) => {
    acc[civ.id] = civ;
    return acc;
}, {});

export function getAllCivs() {
    return civsData;
}

export function getAllUnits() {
    return unitsData;
}

export function getCivById(id) {
    return civsMap[id];
}

export function getUnitById(id) {
    return unitsMap[id];
}

/**
 * Finds the best counters available to myCiv against enemyUnitId.
 * @param {string} enemyUnitId 
 * @param {string} myCivId 
 * @returns {Array} List of unit objects that are counters.
 */
export function findCounters(enemyUnitId, myCivId) {
    const enemyUnit = unitsMap[enemyUnitId];
    if (!enemyUnit) return [];

    const myCiv = civsMap[myCivId];
    if (!myCiv) return [];

    const theoreticalCounters = enemyUnit.counteredBy || [];
    const validCounters = [];

    theoreticalCounters.forEach(counterId => {
        let currentId = counterId;
        let bestUnit = null;
        let steps = 0;

        // Traverse the entire upgrade chain to find the highest tier unit available to the civ
        while (currentId && steps < 10) {
            const unit = unitsMap[currentId];
            if (!unit) break;

            // Check if this unit is in our roster or is a unique unit we possess
            // We use 'includes' for both lists to be safe, though uniqueUnits usually has just the IDs
            if (myCiv.roster.includes(currentId) || myCiv.uniqueUnits.includes(currentId)) {
                bestUnit = unit;
            }

            currentId = unit.upgradesTo;
            steps++;
        }

        if (bestUnit) {
            validCounters.push(bestUnit);
        }
    });

    // Heuristic: If we found a valid counter, check if the civ has a Unique Unit of the same type.
    // This prioritizes civilization strengths (e.g. Chu Ko Nu vs generic Arbalesters).
    const counterTypes = new Set(validCounters.map(u => u.type));
    const uniqueSuggestions = [];

    if (myCiv.uniqueUnits) {
        myCiv.uniqueUnits.forEach(uuId => {
            const uu = unitsMap[uuId];
            if (uu && counterTypes.has(uu.type)) {
                uniqueSuggestions.push(uu);
            }
        });
    }

    // Combine unique suggestions first, then standard counters
    const combined = [...uniqueSuggestions, ...validCounters];

    // Deduplicate
    const result = [];
    const seen = new Set();
    for (const unit of combined) {
        if (!seen.has(unit.id)) {
            seen.add(unit.id);
            result.push(unit);
        }
    }

    return result;
}
