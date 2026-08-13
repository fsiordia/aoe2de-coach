import { findCounters, getKeyThreats } from '../utils/gameLogic';
import CounterDisplay from './CounterDisplay';
import { useLang, loc } from '../i18n/context';

function EnemyDashboard({ enemyCiv, userCiv }) {
    const { lang, t } = useLang();
    if (!enemyCiv || !userCiv) return null;

    // Key threats: unique units + representative units per civ archetype
    // (structured data, see getKeyThreatsIn in gameLogic).
    const threats = getKeyThreats(enemyCiv.id);

    return (
        <div className="bg-red-950/20 border-2 border-red-900/50 rounded-lg p-6 shadow-xl mb-6">
            <h2 className="text-2xl font-bold text-red-500 mb-2">{t('enemy')}: {loc(enemyCiv, 'name', lang)}</h2>
            <p className="text-red-300/80 italic mb-4 text-sm">{loc(enemyCiv, 'summary', lang)}</p>

            <div className="space-y-4">
                <h3 className="text-amber-500 font-semibold border-b border-red-900/30 pb-2">
                    {t('keyThreats')}
                </h3>

                {threats.map(unit => (
                    <CounterDisplay
                        key={unit.id}
                        enemyUnit={unit}
                        counters={findCounters(unit.id, userCiv.id)}
                    />
                ))}

                {threats.length === 0 && (
                    <p className="text-slate-500 italic text-sm">{t('noThreats')}</p>
                )}
            </div>
        </div>
    );
}

export default EnemyDashboard;
