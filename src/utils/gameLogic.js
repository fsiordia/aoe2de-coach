import defaultCivsData from '../data/civs.json';
import defaultUnitsData from '../data/units.json';

/**
 * Builds the lookup structure used by all game logic functions.
 * Exported so tests (and future tools) can inject fixture data.
 */
export function createGameData(civsData, unitsData) {
    const unitsMap = unitsData.reduce((acc, unit) => {
        acc[unit.id] = unit;
        return acc;
    }, {});

    const civsMap = civsData.reduce((acc, civ) => {
        acc[civ.id] = civ;
        return acc;
    }, {});

    return { civsData, unitsData, unitsMap, civsMap };
}

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
    // localStorage unavailable (e.g. Node/test environment) or corrupted data
    civsData = defaultCivsData;
    unitsData = defaultUnitsData;
}

const gameData = createGameData(civsData, unitsData);

export function getAllCivs() {
    return gameData.civsData;
}

export function getAllUnits() {
    return gameData.unitsData;
}

export function getCivById(id) {
    return gameData.civsMap[id];
}

export function getUnitById(id) {
    return gameData.unitsMap[id];
}

/**
 * Finds the best counters available to myCiv against enemyUnitId,
 * using the provided game data. Pure function — safe to test.
 * @param {object} data Result of createGameData()
 * @param {string} enemyUnitId
 * @param {string} myCivId
 * @returns {Array} List of unit objects that are counters.
 */
export function findCountersIn(data, enemyUnitId, myCivId) {
    const { unitsMap, civsMap } = data;

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

/**
 * Finds the best counters available to myCiv against enemyUnitId
 * using the app's active data (bundled or localStorage-updated).
 */
export function findCounters(enemyUnitId, myCivId) {
    return findCountersIn(gameData, enemyUnitId, myCivId);
}

/**
 * For each archetype, the standard units that represent the threat,
 * in order of preference (highest tier first). The first unit found in the
 * civ's roster wins; if none is in the roster, the first existing unit is
 * used as a fallback (rosters only list signature units).
 */
const ARCHETYPE_THREATS = {
    cavalry: [['paladin', 'cavalier', 'knight']],
    archer: [['arbalester', 'crossbowman', 'archer']],
    cavalry_archer: [['cavalry_archer']],
    infantry: [['champion', 'two_handed_swordsman', 'long_swordsman']],
    camel: [['unique_imperial_camel_rider', 'heavy_camel_rider', 'camel_rider']],
    gunpowder: [['hand_cannoneer'], ['bombard_cannon']],
    monk: [['monk']],
    siege: [['onager', 'mangonel'], ['heavy_scorpion', 'scorpion'], ['siege_ram']],
    elephant: [['battle_elephant']],
    eagle: [['elite_eagle_warrior', 'eagle_warrior']],
    // naval / defensive have no land-unit threat representation in the dataset
};

const MAX_THREATS = 7;

/**
 * Returns the key threat units an enemy civ can field, based on its
 * unique units and structured archetypes. Pure function — safe to test.
 * @param {object} data Result of createGameData()
 * @param {string} enemyCivId
 * @returns {Array} List of unit objects.
 */
export function getKeyThreatsIn(data, enemyCivId) {
    const { unitsMap } = data;
    const civ = data.civsMap[enemyCivId];
    if (!civ) return [];

    const threats = [];
    const seen = new Set();
    const add = (unit) => {
        if (unit && !seen.has(unit.id)) {
            seen.add(unit.id);
            threats.push(unit);
        }
    };

    // 1. Unique units always lead the list
    (civ.uniqueUnits || []).forEach(id => add(unitsMap[id]));

    // 2. Standard units per archetype
    const roster = civ.roster || [];
    for (const archetype of civ.archetypes || []) {
        for (const preferenceChain of ARCHETYPE_THREATS[archetype] || []) {
            const inRoster = preferenceChain.find(id => roster.includes(id));
            const fallback = preferenceChain.find(id => unitsMap[id]);
            add(unitsMap[inRoster] || unitsMap[fallback]);
        }
    }

    return threats.slice(0, MAX_THREATS);
}

/**
 * Key threats of an enemy civ using the app's active data.
 */
export function getKeyThreats(enemyCivId) {
    return getKeyThreatsIn(gameData, enemyCivId);
}

/**
 * Ranks build orders for a matchup based on civ archetypes.
 * Pure function — safe to test. Reasons are structured
 * ({kind: 'civ'|'enemy', archetype}) so the UI can localize them.
 * @param {object} userCiv Civ object with an archetypes array
 * @param {object} enemyCiv Civ object with an archetypes array (optional)
 * @param {Array} orders Build order catalog (see src/data/buildOrders.js)
 * @returns {Array<{order: object, score: number, reasons: Array<{kind: string, archetype: string}>}>} sorted best-first
 */
export function recommendBuildOrders(userCiv, enemyCiv, orders) {
    if (!userCiv || !orders || orders.length === 0) return [];

    const userArch = userCiv.archetypes || [];
    const enemyArch = (enemyCiv && enemyCiv.archetypes) || [];

    const ranked = orders.map(order => {
        const reasons = [];
        let score = 0;

        for (const a of userArch) {
            if ((order.civBias || []).includes(a)) {
                score += 2;
                reasons.push({ kind: 'civ', archetype: a });
            }
        }
        for (const a of enemyArch) {
            if ((order.vsBias || []).includes(a)) {
                score += 1;
                reasons.push({ kind: 'enemy', archetype: a });
            }
        }

        return { order, score, reasons };
    });

    ranked.sort((a, b) => b.score - a.score);
    return ranked;
}
