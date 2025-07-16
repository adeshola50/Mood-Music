import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emotionData from "../data/emotionData";

// ✅ If using Google Analytics 4
import ReactGA from "react-ga4";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMood, setSelectedMood] = useState(null);
    const [quote, setQuote] = useState("");
    const [song, setSong] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const mood = searchTerm.trim();

        if (emotionData[mood]) {
            const data = emotionData[mood];
            const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
            const randomSong = data.songs[Math.floor(Math.random() * data.songs.length)];

            setSelectedMood(mood);
            setQuote(randomQuote);
            setSong({ title: randomSong });

            // ✅ 1. Google Analytics event
            ReactGA.event({
                category: "Search",
                action: `Searched mood: ${mood}`,
                label: randomSong,
            });

            // ✅ 2. Send to backend (if you set one up)
            fetch("https://your-api.com/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mood,
                    quote: randomQuote,
                    song: randomSong,
                    timestamp: Date.now(),
                }),
            }).catch((err) => console.warn("Tracking failed:", err));

        } else {
            setSelectedMood(null);
            setQuote("");
            setSong(null);
        }
    };

    const shareText = `🎧 Mood: ${selectedMood}\n"${quote}"\nNow playing: ${song?.title}\nTry it on Mood-Music: https://adeshola-mood-music.netlify.app`;

    const platforms = [
        {
            name: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=https://adeshola-mood-music.netlify.app&quote=${encodeURIComponent(shareText)}`,
            icon: "📘",
        },
        {
            name: "WhatsApp",
            url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            icon: "🟢",
        },
        {
            name: "Telegram",
            url: `https://t.me/share/url?url=https://adeshola-mood-music.netlify.app&quote=${encodeURIComponent(shareText)}`,
            icon: "📨",
        },
        {
            name: "LinkedIn",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=https://adeshola-mood-music.netlify.app&quote`,
            icon: "💼",
        },
        {
            name: "X",
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
            icon: "🐦",
        },
    ];

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="min-h-screen bg-yellow-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-all p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-purple-700 dark:text-yellow-300">Search Your Mood 🔍</h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
                    >
                        {darkMode ? "☀" : "🌙"}
                    </button>
                </div>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <input
                        type="text"
                        placeholder="Enter your mood (e.g. Happy, Calm...)"
                        className="px-4 py-2 rounded-lg shadow w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        Search
                    </button>
                </form>

                <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Try: {Object.keys(emotionData).join(", ")}
                </div>

                <AnimatePresence>
                    {song && selectedMood ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
                        >
                            <h2 className="text-xl font-bold text-purple-700 dark:text-yellow-200 mb-2">
                                Mood: {selectedMood}
                            </h2>
                            <p className="italic text-gray-600 dark:text-gray-300 mb-3">"{quote}"</p>
                            <p className="font-semibold text-gray-800 dark:text-white mb-4">{song.title}</p>

                            <div className="flex justify-center gap-3 mt-4">
                                <a
                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    ▶ YouTube
                                </a>
                                <a
                                    href={`https://open.spotify.com/search/${encodeURIComponent(song.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                >
                                    🎶 Spotify
                                </a>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3 mt-6">
                                {platforms.map(({ name, url, icon }) => (
                                    <a
                                        key={name}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Share on ${name}`}
                                        className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-700 text-purple-700 dark:text-yellow-300 p-3 rounded-full transition text-lg"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div >
                        </motion.div >
                    ) : searchTerm.trim() && (
                        <motion.div
                            key="no-result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 text-center"
                        >
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">😕 Mood not found</p>
                            <p className="text-sm text-gray-500 mt-2">Try another mood like: Joyful, Brave, Relaxed...</p>
                        </motion.div>
                    )
                    }
                </AnimatePresence >
            </div >
        </div >
    );
}