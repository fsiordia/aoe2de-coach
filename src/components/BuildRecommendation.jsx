import { recommendBuildOrders } from '../utils/gameLogic';
import { buildOrders } from '../data/buildOrders';

const RISK_COLORS = {
    Low: 'text-green-400 border-green-700/50 bg-green-900/20',
    Medium: 'text-yellow-400 border-yellow-700/50 bg-yellow-900/20',
    High: 'text-red-400 border-red-700/50 bg-red-900/20',
};

function BuildRecommendation({ userCiv, enemyCiv, onStart }) {
    if (!userCiv) return null;

    const ranked = recommendBuildOrders(userCiv, enemyCiv, buildOrders);
    if (ranked.length === 0) return null;

    const top = ranked.slice(0, 2);

    return (
        <section className="mb-8 border-t border-slate-800 pt-8 animate-slideIn">
            <h3 className="text-amber-500 font-bold mb-1 uppercase tracking-wide text-center">
                Recommended Game Plan
            </h3>
            <p className="text-slate-500 text-xs text-center mb-4">
                Based on {userCiv.name}{enemyCiv ? ` vs ${enemyCiv.name}` : ' (select an enemy civ to refine)'}
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
                                    {idx === 0 && <span className="text-amber-500 text-xs font-bold uppercase">Best pick</span>}
                                    <h4 className="text-lg font-bold text-slate-100">{order.name}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded border ${RISK_COLORS[order.risk] || 'text-slate-400 border-slate-600'}`}>
                                        {order.risk} risk
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">{order.summary}</p>

                                {reasons.length > 0 && (
                                    <ul className="mt-2 space-y-0.5">
                                        {reasons.slice(0, 3).map((r, i) => (
                                            <li key={i} className="text-xs text-sky-300/80">• {r}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <button
                                onClick={() => onStart(order.id)}
                                className="flex-shrink-0 px-4 py-2 rounded font-bold text-sm bg-amber-700 border-2 border-amber-500 text-amber-100 hover:bg-amber-600 transition-colors"
                            >
                                ▶ Start
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BuildRecommendation;
