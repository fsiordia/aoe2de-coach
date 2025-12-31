import { useState, useEffect } from 'react';
import { fastCastle, baidotFastCastle } from '../data/buildOrders';

function InteractiveGuide({ onExit }) {
    const [selectedStrategy, setSelectedStrategy] = useState('standard');
    const [stepIndex, setStepIndex] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [finished, setFinished] = useState(false);

    // Get current steps based on selection
    const steps = selectedStrategy === 'baidot' ? baidotFastCastle : fastCastle;

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setStepIndex(0);
        setFinished(false);
    };

    const handleNextStep = () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            setFinished(true);
            setIsRunning(false);
        }
    };

    const currentStep = steps[stepIndex];
    const progress = ((stepIndex + (finished ? 1 : 0)) / steps.length) * 100;

    // Spacebar listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!isRunning && time === 0) {
                    handleStartAndAdvance();
                } else if (isRunning && !finished) {
                    handleNextStep();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isRunning, finished, time, stepIndex, steps]);

    const handleStartAndAdvance = () => {
        setIsRunning(true);
        if (stepIndex === 0) {
            setStepIndex(1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start p-4 h-full w-full max-w-6xl mx-auto md:justify-center transition-all">

            {/* Strategy Selector (Only visible at start) */}
            {!isRunning && time === 0 && stepIndex === 0 && (
                <div className="mb-8 flex gap-4 bg-slate-800/50 p-2 rounded-lg border border-slate-700">
                    <button
                        onClick={() => setSelectedStrategy('standard')}
                        className={`px-4 py-2 rounded-md transition-colors ${selectedStrategy === 'standard' ? 'bg-yellow-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Standard Fast Castle
                    </button>
                    <button
                        onClick={() => setSelectedStrategy('baidot')}
                        className={`px-4 py-2 rounded-md transition-colors ${selectedStrategy === 'baidot' ? 'bg-yellow-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Baidot Fast Castle
                    </button>
                </div>
            )}

            <div className="flex flex-col landscape:flex-row lg:landscape:!flex-col w-full gap-8 md:items-center landscape:items-center lg:items-center justify-center">

                {/* Left/Top Panel: Timer & Controls */}
                <div className="flex flex-row flex-shrink-0 landscape:flex-col lg:landscape:!flex-row items-center justify-between landscape:justify-center gap-6 w-full landscape:w-auto lg:landscape:!w-full landscape:h-full lg:landscape:!h-auto md:pt-4">
                    {/* Timer Display */}
                    <div className="flex flex-col items-center w-full">
                        <div className="text-5xl md:text-8xl font-mono font-bold text-yellow-500 drop-shadow-lg tracking-tighter whitespace-nowrap">
                            {formatTime(time)}
                        </div>

                        {/* Controls */}
                        <div className="flex gap-3 mt-4 justify-center">
                            {(time > 0 || isRunning) && !finished && (
                                <button
                                    onClick={isRunning ? handlePause : handleStart}
                                    className={`px-6 py-2 rounded-lg border-2 ${isRunning ? 'bg-slate-800 border-slate-600 hover:bg-slate-700' : 'bg-green-700 border-green-500 hover:bg-green-600'} text-white font-bold uppercase tracking-wider shadow-md transition-all`}
                                >
                                    {isRunning ? 'Pause' : 'Resume'}
                                </button>
                            )}

                            {(time > 0 || stepIndex > 0) && (
                                <button
                                    onClick={handleReset}
                                    className="px-6 py-2 rounded-lg border-2 border-red-900/50 text-red-400 hover:bg-red-900/20 font-bold uppercase tracking-wider shadow-md transition-all"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        <div className="hidden md:block mt-8 text-slate-600 text-sm font-mono text-center">
                            <span className="border border-slate-700 px-2 py-1 rounded mx-1">SPACE</span> to complete task
                        </div>
                    </div>
                </div>

                {/* Right/Bottom Panel: Active Task */}
                <div className="flex-grow w-full landscape:w-2/3 lg:landscape:!w-full">

                    {/* Main Task Area */}
                    <div
                        className={`
                            relative w-full bg-slate-800 border-2 ${finished ? 'border-green-500' : isRunning ? 'border-yellow-600' : 'border-slate-500'} 
                            rounded-2xl p-6 md:p-12 shadow-2xl cursor-pointer transition-all active:scale-[0.98]
                            group hover:shadow-yellow-900/20
                        `}
                        onClick={() => {
                            if (!isRunning && time === 0) handleStartAndAdvance();
                            else if (isRunning && !finished) handleNextStep();
                        }}
                    >
                        {!finished ? (
                            <>
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-slate-400 text-sm uppercase tracking-widest font-bold">
                                        Task {stepIndex + 1}/{steps.length}
                                    </h2>
                                    {!isRunning && time === 0 && (
                                        <span className="animate-pulse text-green-400 text-xs font-bold uppercase border border-green-400 px-3 py-1 rounded-full">
                                            Tap / Space to Start
                                        </span>
                                    )}
                                </div>

                                <div className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight min-h-[5rem] flex items-center">
                                    {currentStep.text}
                                </div>

                                {currentStep.note && (
                                    <div className="text-yellow-400/90 text-sm md:text-xl italic bg-slate-900/60 px-4 py-2 rounded-lg inline-block border-l-4 border-yellow-500">
                                        💡 {currentStep.note}
                                    </div>
                                )}

                                <div className="mt-8 text-sm text-slate-500 flex items-center justify-center h-6 font-medium">
                                    {isRunning && <span className="group-hover:text-slate-300 transition-colors">Tap or press Space to Complete</span>}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-6">🎉</div>
                                <h2 className="text-4xl font-bold text-green-400 mb-4">Build Complete!</h2>
                                <p className="text-slate-300 text-xl">Final Time: <span className="font-mono text-white">{formatTime(time)}</span></p>
                            </div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 h-2 rounded-full mt-8 mb-6 overflow-hidden">
                        <div
                            className="bg-yellow-500 h-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    {/* Up Next & Villagers Container */}
                    {!finished && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Up Next - Takes less space on wide screens */}
                            {stepIndex < steps.length - 1 && (
                                <div className="lg:col-span-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-col justify-center">
                                    <span className="text-slate-500 text-[10px] uppercase font-bold mb-2 tracking-wider">Up Next</span>
                                    <p className="text-slate-300 text-sm md:text-base font-medium truncate">{steps[stepIndex + 1].text}</p>
                                </div>
                            )}

                            {/* Villager Stats - Takes more space */}
                            {currentStep.distribution && (
                                <div className={`${stepIndex < steps.length - 1 ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
                                    <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 backdrop-blur-sm">
                                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 text-center tracking-widest">Villager Distribution</div>
                                        <div className="grid grid-cols-5 gap-2 text-center font-mono">
                                            {/* Food */}
                                            <div className="bg-red-900/20 rounded-lg p-2 border border-red-900/10">
                                                <div className="text-[10px] text-red-400 font-bold mb-1">FOOD</div>
                                                <div className="text-lg md:text-xl font-bold text-white">{currentStep.distribution.food}</div>
                                            </div>
                                            {/* Wood */}
                                            <div className="bg-amber-900/20 rounded-lg p-2 border border-amber-900/10">
                                                <div className="text-[10px] text-amber-400 font-bold mb-1">WOOD</div>
                                                <div className="text-lg md:text-xl font-bold text-white">{currentStep.distribution.wood}</div>
                                            </div>
                                            {/* Gold */}
                                            <div className="bg-yellow-900/20 rounded-lg p-2 border border-yellow-900/10">
                                                <div className="text-[10px] text-yellow-400 font-bold mb-1">GOLD</div>
                                                <div className="text-lg md:text-xl font-bold text-white">{currentStep.distribution.gold}</div>
                                            </div>
                                            {/* Stone */}
                                            <div className="bg-stone-800/50 rounded-lg p-2 border border-stone-700/30">
                                                <div className="text-[10px] text-stone-400 font-bold mb-1">STONE</div>
                                                <div className="text-lg md:text-xl font-bold text-white">{currentStep.distribution.stone}</div>
                                            </div>
                                            {/* Total */}
                                            <div className="bg-indigo-900/20 rounded-lg p-2 border-l-2 border-indigo-500/50">
                                                <div className="text-[10px] text-indigo-300 font-bold mb-1">TOTAL</div>
                                                <div className="text-lg md:text-xl font-bold text-white">{currentStep.distribution.total}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default InteractiveGuide;
