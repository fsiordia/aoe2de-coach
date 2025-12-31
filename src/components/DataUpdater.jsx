import { useState } from 'react';

function DataUpdater() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [lastUpdated, setLastUpdated] = useState(
        localStorage.getItem("aoe2_data_last_updated") || "Never"
    );

    const updateData = async () => {
        setLoading(true);
        setMessage("Fetching data...");

        try {
            // Fetch both files in parallel
            const [civsRes, unitsRes] = await Promise.all([
                fetch('./data/civs.json?t=' + Date.now()),
                fetch('./data/units.json?t=' + Date.now())
            ]);

            if (!civsRes.ok || !unitsRes.ok) throw new Error("Failed to fetch data files");

            const civsData = await civsRes.json();
            const unitsData = await unitsRes.json();

            // Basic validation
            if (!Array.isArray(civsData) || !Array.isArray(unitsData)) {
                throw new Error("Invalid data format received");
            }

            // Save to localStorage
            localStorage.setItem('aoe2_data_civs', JSON.stringify(civsData));
            localStorage.setItem('aoe2_data_units', JSON.stringify(unitsData));

            const timestamp = new Date().toLocaleString();
            localStorage.setItem('aoe2_data_last_updated', timestamp);
            setLastUpdated(timestamp);

            setMessage("Data updated successfully! Reloading...");

            // Reload to apply changes
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("Update failed:", error);
            setMessage("Update failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <div className="text-xs text-slate-500 mb-2">
                Database Last Updated: {lastUpdated}
            </div>

            {message && (
                <div className={`text-xs mb-2 ${message.includes("failed") ? "text-red-400" : "text-green-400"}`}>
                    {message}
                </div>
            )}

            <button
                onClick={updateData}
                disabled={loading}
                className={`
                    text-xs px-3 py-1 rounded border border-slate-700 
                    ${loading ? 'bg-slate-800 text-slate-500' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                    transition-colors
                `}
            >
                {loading ? "Updating..." : "↻ Check for Data Updates"}
            </button>
        </div>
    );
}

export default DataUpdater;
