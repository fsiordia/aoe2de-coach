import { recommendBuildOrders } from '../utils/gameLogic';
import { buildOrders } from '../data/buildOrders';
import { useLang, loc } from '../i18n/context';
import { ARCHETYPE_KEYS } from '../i18n/strings';

const RISK_COLORS = {
    Low: 'text-green-400 border-green-700/50 bg-green-900/20',
    Medium: 'text-yellow-400 border-yellow-700/50 bg-yellow-900/20',
    High: 'text-red-400 border-red-700/50 bg-red-900/20',
};

const RISK_KEYS = { Low: 'riskLow', Medium: 'riskMedium', High: 'riskHigh' };

function BuildRecommendation({ userCiv, enemyCiv, onStart }) {
    const { lang, t } = useLang();
    if (!userCiv) return null;

    const ranked = recommendBuildOrders(userCiv, enemyCiv, buildOrders);
    if (ranked.length === 0) return null;

    const top = ranked.slice(0, 2);

    const reasonText = (reason) => {
        const arch = t(ARCHETYPE_KEYS[reason.archetype] || reason.archetype);
        return t(reason.kind === 'civ' ? 'reasonCiv' : 'reasonEnemy', { arch });
    };

    return (
        <section className="mb-8 border-t border-slate-800 pt-8 animate-slideIn">
            <h3 className="text-amber-500 font-bold mb-1 uppercase tracking-wide text-center">
                {t('recommendedPlan')}
            </h3>
            <p className="text-slate-500 text-xs text-center mb-4">
                {t('basedOn')} {loc(userCiv, 'name', lang)}{enemyCiv ? ` vs ${loc(enemyCiv, 'name', lang)}` : ` ${t('refineHint')}`}
            </p>

            <div className="space-y-3">
                {top.map(({ order, reasons }, idx) => (
                    <div
                        key={order.id}
                        className={`bg-slate-800 border rounded-lg p-4 shadow-lg ${idx === 0 ? 'border-amber-600' : 'border-slate-700'}`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {idx === 0 && <span className="text-amber-500 text-xs font-bold uppercase">{t('bestPick')}</span>}
                                    <h4 className="text-lg font-bold text-slate-100">{loc(order, 'name', lang)}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded border ${RISK_COLORS[order.risk] || 'text-slate-400 border-slate-600'}`}>
                                        {t(RISK_KEYS[order.risk] || order.risk)}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">{loc(order, 'summary', lang)}</p>

                                {reasons.length > 0 && (
                                    <ul className="mt-2 space-y-0.5">
                                        {reasons.slice(0, 3).map((r, i) => (
                                            <li key={i} className="text-xs text-sky-300/80">• {reasonText(r)}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <button
                                onClick={() => onStart(order.id)}
                                className="flex-shrink-0 px-4 py-2 rounded font-bold text-sm bg-amber-700 border-2 border-amber-500 text-amber-100 hover:bg-amber-600 transition-colors"
                            >
                                {t('start')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BuildRecommendation;
