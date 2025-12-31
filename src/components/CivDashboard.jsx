import { useState } from 'react';

function CivDashboard({ civ }) {
    const [showDetails, setShowDetails] = useState(false);

    if (!civ) return null;

    return (
        <div className="bg-slate-800 border-2 border-amber-800 rounded-lg p-6 shadow-xl mb-6 bg-opacity-90">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-3xl font-bold text-amber-500 drop-shadow-md">{civ.name}</h2>
                    <p className="text-amber-200/80 italic">{civ.summary}</p>
                </div>
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-xs text-amber-500 border border-amber-700 hover:bg-amber-900/50 px-2 py-1 rounded transition-colors"
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
            </div>

            {/* Main summary always visible? No, request said summary visible, details hidden. */}
            {/* "First thing to see is summary... also option to see details" */}

            {showDetails && (
                <div className="mt-4 border-t border-amber-800 pt-4 space-y-4 animate-fadeIn">
                    <div>
                        <h3 className="text-amber-400 font-semibold mb-2">Civilization Bonuses</h3>
                        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                            {civ.bonuses.map((bonus, idx) => (
                                <li key={idx}>{bonus}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-amber-400 font-semibold mb-2">Unique Techs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {civ.uniqueTechs.map((tech, idx) => (
                                <div key={idx} className="bg-slate-900/50 p-2 rounded border border-amber-900/30">
                                    <span className="text-amber-200 font-medium">{tech.name}</span>: <span className="text-slate-400 text-sm">{tech.effect}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CivDashboard;
