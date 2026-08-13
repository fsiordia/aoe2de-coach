import { useState } from 'react';
import CivSelector from './components/CivSelector';
import CivDashboard from './components/CivDashboard';
import EnemyDashboard from './components/EnemyDashboard';
import UnitSearch from './components/UnitSearch';
import InteractiveGuide from './components/InteractiveGuide';
import DataUpdater from './components/DataUpdater';
import BuildRecommendation from './components/BuildRecommendation';
import { getCivById } from './utils/gameLogic';
import { useLang } from './i18n/context';

function App() {
    const [userCivId, setUserCivId] = useState("");
    const [enemyCivId, setEnemyCivId] = useState("");
    const [viewMode, setViewMode] = useState("coach"); // "coach" | "guide"
    const [guideStrategyId, setGuideStrategyId] = useState("standard");
    const { lang, setLang, t } = useLang();

    const userCiv = userCivId ? getCivById(userCivId) : null;
    const enemyCiv = enemyCivId ? getCivById(enemyCivId) : null;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-serif pb-20">
            {/* Header */}
            <header className="bg-slate-950 border-b-4 border-amber-700 p-4 shadow-lg sticky top-0 z-10">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 drop-shadow-md tracking-wider">
                            AoE2DE Coach
                        </h1>
                        <div className="text-xs text-amber-700 font-mono hidden md:block">v1.3</div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Language Toggle */}
                        <button
                            onClick={() => setLang(lang === "es" ? "en" : "es")}
                            className="px-3 py-2 rounded font-bold text-sm border-2 bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                            title={lang === "es" ? "Switch to English" : "Cambiar a español"}
                        >
                            {lang === "es" ? "🇲🇽 ES" : "🇺🇸 EN"}
                        </button>

                        {/* Mode Toggle Button */}
                        <button
                            onClick={() => setViewMode(viewMode === "coach" ? "guide" : "coach")}
                            className={`
                                px-4 py-2 rounded font-bold text-sm tracking-wide transition-colors border-2
                                ${viewMode === "coach"
                                    ? "bg-amber-700 border-amber-500 text-amber-100 hover:bg-amber-600"
                                    : "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"}
                            `}
                        >
                            {viewMode === "coach" ? t('modeGuide') : t('modeCoach')}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={`flex-grow w-full mx-auto p-4 md:p-6 transition-all duration-300 ${viewMode === "guide" ? "max-w-6xl" : "max-w-lg"}`}>

                {viewMode === "guide" ? (
                    <InteractiveGuide
                        key={guideStrategyId}
                        initialStrategyId={guideStrategyId}
                    />
                ) : (
                    <>
                        {/* User Civ Section */}
                        <section className="mb-8 animate-slideIn">
                            <CivSelector
                                label={t('selectYourCiv')}
                                selectedCivId={userCivId}
                                onSelect={(id) => {
                                    setUserCivId(id);
                                }}
                            />

                            {userCiv && (
                                <div className="animate-fadeIn">
                                    <CivDashboard civ={userCiv} />
                                </div>
                            )}
                        </section>

                        {/* Enemy Civ Section - Only visible if user civ selected */}
                        {userCiv && (
                            <section className="mb-8 border-t border-slate-800 pt-8 animate-slideIn delay-100">
                                <CivSelector
                                    label={t('selectEnemyCiv')}
                                    selectedCivId={enemyCivId}
                                    onSelect={setEnemyCivId}
                                    storageKey="aoe2_favorite_enemies"
                                    favoriteIcon="💀"
                                    activeColorClass="text-red-500"
                                    activeBgClass="bg-red-900/50 border-red-500 text-red-100"
                                />

                                {enemyCiv && (
                                    <div className="animate-fadeIn">
                                        <EnemyDashboard enemyCiv={enemyCiv} userCiv={userCiv} />
                                    </div>
                                )}
                            </section>
                        )}

                        {userCiv && (
                            <BuildRecommendation
                                userCiv={userCiv}
                                enemyCiv={enemyCiv}
                                onStart={(orderId) => {
                                    setGuideStrategyId(orderId);
                                    setViewMode("guide");
                                }}
                            />
                        )}

                        <UnitSearch userCiv={userCiv} />
                    </>
                )}

            </main>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-600 text-center p-4 text-xs">
                <p>Age of Empires II DE © Microsoft Corporation.</p>
                <p>AoE2DE Coach was created under Microsoft&apos;s Game Content Usage Rules.</p>
                <DataUpdater />
            </footer>
        </div>
    );
}

export default App;
