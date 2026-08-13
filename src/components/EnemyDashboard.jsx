import { findCounters, getKeyThreats } from '../utils/gameLogic';
import CounterDisplay from './CounterDisplay';

function EnemyDashboard({ enemyCiv, userCiv }) {
    if (!enemyCiv || !userCiv) return null;

    // Key threats: unique units + representative units per civ archetype
    // (structured data, see getKeyThreatsIn in gameLogic).
    const threats = getKeyThreats(enemyCiv.id);

    return (
        <div className="bg-red-950/20 border-2 border-red-900/50 rounded-lg p-6 shadow-xl mb-6">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Enemy: {enemyCiv.name}</h2>
            <p className="text-red-300/80 italic mb-4 text-sm">{enemyCiv.summary}</p>

            <div className="space-y-4">
                <h3 className="text-amber-500 font-semibold border-b border-red-900/30 pb-2">
                    Key Threats & Counters
                </h3>

                {threats.map(unit => (
                    <CounterDisplay
                        key={unit.id}
                        enemyUnit={unit}
                        counters={findCounters(unit.id, userCiv.id)}
                    />
                ))}

                {threats.length === 0 && (
                    <p className="text-slate-500 italic text-sm">
                        No key threats identified for this civilization.
                    </p>
                )}
            </div>
        </div>
    );
}

export default EnemyDashboard;
