import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import emotionData from "../data/emotionData";


export default function Home() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [quote, setQuote] = useState('');
  const [song, setSong] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleMoodClick = (mood) => {
    const moodData = emotionData[mood];
    const randomQuote = moodData.quotes[Math.floor(Math.random() * moodData.quotes.length)];
    const randomSong = moodData.songs[Math.floor(Math.random() * moodData.songs.length)];

    setSelectedMood(mood);
    setQuote(randomQuote);
    setSong({ title: randomSong });
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4 text-gray-900 dark:text-white transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-purple-800 dark:text-yellow-300">Mood-Music 🎧</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
          >
            {isDarkMode ? '☀' : '🌙'}
          </button>
        </div>

        <p className="text-center text-lg italic mb-10">
          "Who needs therapy when you have Mood-Music"
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center mb-12">
          {Object.keys(emotionData).map((mood) => (
            <motion.button
              key={mood}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodClick(mood)}
              className={`${selectedMood === mood ? "bg-purple-300 dark:bg-purple-600" : "bg-white dark:bg-gray-700"
                } border border-gray-300 text-purple-700 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-purple-100 dark:text-white dark:hover:bg-purple-500 transition`}
            >
              {mood}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood && song && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center max-w-md mx-auto"
            >
              <h2 className="text-xl font-bold text-purple-700 dark:text-yellow-300 mb-2">
                Mood: {selectedMood}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{quote}"</p>
              <p className="text-lg text-gray-800 dark:text-white mb-4 font-medium">{song.title}</p>

              <div className="flex gap-4 justify-center text-sm mt-2">
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
                {[
                  {
                    name: "Facebook",
                    url: `https://www.facebook.com/sharer/sharer.php?u=https://ade-moodmusic.netlify.app&quote=${encodeURIComponent(
                      `🎧 Mood: ${selectedMood}\n"${quote}"\nNow playing: ${song.title}`
                    )}`,
                    icon: "📘",
                  },
                  {
                    name: "WhatsApp",
                    url: `https://wa.me/?text=${encodeURIComponent(
                      ` 🎧 Mood: ${selectedMood}\n"${quote}"\nNow playing: ${song.title}\nTry it on: https://ade-moodmusic.netlify.app&quote`
                    )}`,
                    icon: "🟢",
                  },
                  {
                    name: "Telegram",
                    url: `https://t.me/share/url?url=https://ade-moodmusic.netlify.app&quote=${encodeURIComponent(
                      ` Mood: ${selectedMood}\n"${quote}"\nNow playing: ${song.title}`
                    )}`,
                    icon: "📨",
                  },
                  {
                    name: "LinkedIn",
                    url: ` https://www.linkedin.com/sharing/share-offsite/?url=https://ade-moodmusic.netlify.app&quote`,
                    icon: "💼"
                  },
                  {
                    name: "X",
                    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      ` 🎧 Mood: ${selectedMood}\n"${quote}"\nNow playing: ${song.title}\nTry it 👉 https://ade-moodmusic.netlify.app&quote`
                    )}`,
                    icon: "🐦",
                  },
                ].map(({ name, url, icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`share on ${name}`}
                    className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-700 text-purple-700 dark:text-yellow-300 p-3 rounded-full transition text-lg"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}