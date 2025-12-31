function CounterDisplay({ enemyUnit, counters }) {
    return (
        <div className="bg-slate-900 border border-slate-700 rounded p-4 mb-2 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                    {enemyUnit.imageUrl && (
                        <img
                            src={enemyUnit.imageUrl}
                            alt={enemyUnit.name}
                            className="w-12 h-12 mr-3 object-contain rounded border border-slate-700 bg-slate-800"
                        />
                    )}
                    <div>
                        <span className="text-red-400 font-bold block text-lg">
                            Vs {enemyUnit.name}
                        </span>
                        <span className="text-slate-500 text-xs uppercase tracking-wider">
                            {enemyUnit.type}
                        </span>
                        {enemyUnit.wikiUrl && (
                            <a
                                href={enemyUnit.wikiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-[10px] text-amber-500/70 hover:text-amber-400 underline decoration-dotted"
                            >
                                wiki ↗
                            </a>
                        )}
                    </div>
                </div>

                <div className="md:text-right">
                    <span className="text-green-400 text-sm font-semibold mb-1 block">
                        Counter with:
                    </span>
                    <div className="flex flex-wrap gap-2 justify-end">
                        {counters.length > 0 ? (
                            counters.map(c => (
                                <span key={c.id} className="bg-green-900/40 text-green-300 border border-green-700/50 px-2 py-1 rounded text-sm">
                                    {c.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-slate-500 italic text-sm">No specific counter found in your tech tree</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CounterDisplay;
