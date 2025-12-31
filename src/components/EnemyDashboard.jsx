import { findCounters, getUnitById } from '../utils/gameLogic';
import CounterDisplay from './CounterDisplay';

function EnemyDashboard({ enemyCiv, userCiv }) {
    if (!enemyCiv || !userCiv) return null;

    // Identify units to show counters for.
    // 1. Unique Units
    // 2. Strong units based on "style" (simplification).

    // For this prototype, we'll show counters for Unique Units + a few standard threats based on style.
    // E.g. if Archer civ -> show counters for Arbalester.
    // If Cavalry civ -> show counters for Paladin/Cavalier.

    const threats = [];

    // Add unique units
    enemyCiv.uniqueUnits.forEach(uid => {
        const u = getUnitById(uid);
        if (u) threats.push(u);
    });

    // Add standard threats based on style
    if (enemyCiv.style === "Archer" || enemyCiv.style.includes("Archer")) {
        if (enemyCiv.roster.includes("arbalester")) threats.push(getUnitById("arbalester"));
        else if (enemyCiv.roster.includes("crossbowman")) threats.push(getUnitById("crossbowman"));
    }
    if (enemyCiv.style === "Cavalry" || enemyCiv.style.includes("Cavalry")) {
        // Check if they have Paladin or Cavalier in roster
        if (enemyCiv.roster.includes("paladin")) threats.push(getUnitById("paladin"));
        else if (enemyCiv.roster.includes("cavalier")) threats.push(getUnitById("cavalier"));
        else threats.push(getUnitById("knight"));
    }
    if (enemyCiv.style === "Infantry" || enemyCiv.style.includes("Infantry")) {
        if (enemyCiv.roster.includes("champion")) threats.push(getUnitById("champion"));
        else if (enemyCiv.roster.includes("two_handed_swordsman")) threats.push(getUnitById("two_handed_swordsman"));
    }
    if (enemyCiv.summary.includes("Gunpowder")) {
        if (enemyCiv.roster.includes("hand_cannoneer")) threats.push(getUnitById("hand_cannoneer"));
        else if (enemyCiv.roster.includes("bombard_cannon")) threats.push(getUnitById("bombard_cannon"));
    }

    // Deduplicate by ID
    const uniqueThreats = Array.from(new Set(threats.filter(t => t).map(t => t.id)))
        .map(id => getUnitById(id));

    return (
        <div className="bg-red-950/20 border-2 border-red-900/50 rounded-lg p-6 shadow-xl mb-6">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Enemy: {enemyCiv.name}</h2>
            <p className="text-red-300/80 italic mb-4 text-sm">{enemyCiv.summary}</p>

            <div className="space-y-4">
                <h3 className="text-amber-500 font-semibold border-b border-red-900/30 pb-2">
                    Key Threats & Counters
                </h3>

                {uniqueThreats.map(unit => (
                    <CounterDisplay
                        key={unit.id}
                        enemyUnit={unit}
                        counters={findCounters(unit.id, userCiv.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default EnemyDashboard;
