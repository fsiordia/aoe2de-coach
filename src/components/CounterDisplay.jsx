function CounterDisplay({ enemyUnit, counters }) {
    return (
        <div className="bg-slate-900 border border-slate-700 rounded p-4 mb-2 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-2 md:mb-0">
                    <span className="text-red-400 font-bold block text-lg">
                        Vs {enemyUnit.name}
                    </span>
                    <span className="text-slate-500 text-xs uppercase tracking-wider">
                        {enemyUnit.type}
                    </span>
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
