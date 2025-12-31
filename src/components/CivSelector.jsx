import { useState, useMemo, useEffect, useRef } from 'react';
import { getAllCivs } from '../utils/gameLogic';

function CivSelector({
    onSelect,
    selectedCivId,
    label = "Select Civilization",
    storageKey = "aoe2_favorite_civs",
    favoriteIcon = "★",
    activeColorClass = "text-yellow-500",
    activeBgClass = "bg-amber-700/50 border-amber-500 text-amber-200"
}) {
    const civs = getAllCivs();
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const [favorites, setFavorites] = useState([]);
    const dropdownRef = useRef(null);

    // Load favorites from local storage on mount
    useEffect(() => {
        const storedFavs = localStorage.getItem(storageKey);
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs));
        }
    }, [storageKey]);

    // Save favorites to local storage whenever they change
    const updateFavorites = (newFavs) => {
        setFavorites(newFavs);
        localStorage.setItem(storageKey, JSON.stringify(newFavs));
    };

    const toggleFavorite = (civId, e) => {
        if (e) e.stopPropagation();
        if (favorites.includes(civId)) {
            updateFavorites(favorites.filter(id => id !== civId));
        } else {
            updateFavorites([...favorites, civId]);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter civs
    const filteredCivs = useMemo(() => {
        if (!filter) return civs;
        return civs.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
    }, [civs, filter]);

    // Find selected name
    const selectedName = civs.find(c => c.id === selectedCivId)?.name || "Choose a civilization...";
    const isSelectedFavorite = favorites.includes(selectedCivId);

    // Get objects for favorite chips
    const favoriteCivData = civs.filter(c => favorites.includes(c.id));

    return (
        <div className="w-full max-w-md mx-auto mb-6 relative" ref={dropdownRef}>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-amber-500 text-sm font-bold uppercase tracking-wide">
                    {label}
                </label>
            </div>

            {/* Quick Access Favorites */}
            {favoriteCivData.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {favoriteCivData.map(civ => (
                        <button
                            key={civ.id}
                            onClick={() => onSelect(civ.id)}
                            className={`
                                text-xs px-2 py-1 rounded border transition-colors flex items-center gap-1
                                ${civ.id === selectedCivId
                                    ? activeBgClass
                                    : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}
                            `}
                            title={`Select ${civ.name}`}
                        >
                            <span className={activeColorClass}>{favoriteIcon}</span> {civ.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="flex gap-2">
                {/* Trigger Button */}
                <button
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    className="flex-grow bg-slate-800 border border-amber-700 text-slate-200 py-3 px-4 rounded flex justify-between items-center shadow-lg hover:bg-slate-700 focus:outline-none focus:border-amber-500 transition-colors"
                >
                    <span>{selectedName}</span>
                    <svg className={`fill-current h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </button>

                {/* Favorite Toggle Button (only if something is selected) */}
                {selectedCivId && (
                    <button
                        onClick={(e) => toggleFavorite(selectedCivId, e)}
                        className={`
                            px-4 rounded border shadow-lg transition-colors flex items-center justify-center text-xl
                            ${isSelectedFavorite
                                ? `bg-opacity-40 bg-slate-800 border-slate-600 ${activeColorClass} hover:bg-opacity-60`
                                : 'bg-slate-800 border-slate-700 text-slate-600 hover:text-slate-400 hover:bg-slate-700'}
                        `}
                        title={isSelectedFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isSelectedFavorite ? favoriteIcon : '☆'}
                    </button>
                )}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-amber-700 rounded shadow-2xl overflow-hidden animate-fadeIn">
                    {/* Search Input */}
                    <div className="p-2 border-b border-slate-700">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Filter civilizations..."
                            className="w-full bg-slate-900 border border-slate-700 text-slate-200 px-3 py-2 rounded focus:outline-none focus:border-amber-500 text-sm"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
                        />
                    </div>

                    {/* List */}
                    <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-slate-900">
                        {filteredCivs.length > 0 ? (
                            filteredCivs.map(civ => {
                                const isFav = favorites.includes(civ.id);
                                return (
                                    <div
                                        key={civ.id}
                                        onClick={() => {
                                            onSelect(civ.id);
                                            setIsOpen(false);
                                            setFilter(""); // Reset filter on select
                                        }}
                                        className={`px-4 py-2 cursor-pointer hover:bg-amber-900/40 hover:text-white transition-colors flex justify-between items-center
                                            ${civ.id === selectedCivId ? 'bg-amber-900/60 text-amber-200' : 'text-slate-300'}
                                        `}
                                    >
                                        <span>{civ.name}</span>
                                        {isFav && <span className={`${activeColorClass} text-xs`}>{favoriteIcon}</span>}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="px-4 py-3 text-slate-500 text-sm text-center">No results found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CivSelector;
