import { useState, useMemo } from 'react';
import { getAllUnits, findCounters } from '../utils/gameLogic';
import CounterDisplay from './CounterDisplay';
import { useLang } from '../i18n/context';

function UnitSearch({ userCiv }) {
    const [query, setQuery] = useState("");
    const units = getAllUnits();
    const { t } = useLang();

    // Filter units (matches both English and Spanish names)
    const matches = useMemo(() => {
        if (!query || query.length < 2) return [];
        const q = query.toLowerCase();
        return units.filter(u =>
            u.name.toLowerCase().includes(q) ||
            (u.nameEs || '').toLowerCase().includes(q)
        );
    }, [query, units]);

    return (
        <div className="mt-8 pt-6 border-t border-slate-800">
            <h3 className="text-amber-500 font-bold mb-3 uppercase tracking-wide text-center">{t('unitSearch')}</h3>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('unitSearchPlaceholder')}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 focus:outline-none placeholder-slate-600"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                {matches.map(unit => (
                    <CounterDisplay
                        key={unit.id}
                        enemyUnit={unit}
                        counters={userCiv ? findCounters(unit.id, userCiv.id) : []}
                    />
                ))}
            </div>

            {!userCiv && matches.length > 0 && (
                <p className="text-yellow-600/50 text-xs text-center mt-2">{t('selectCivHint')}</p>
            )}
        </div>
    );
}

export default UnitSearch;
