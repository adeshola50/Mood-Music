import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
  FaTwitter,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import emotionData from "../data/emotionData";

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
    } else {
      setSelectedMood(null);
      setQuote("");
      setSong(null);
    }
  };

  const shareText = `🎧 Mood: ${selectedMood}\n"${quote}"\nNow playing: ${song?.title}\nTry it on Mood-Music: https://your-mood-music-app-link.com`;

  const platforms = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: `https://www.facebook.com/sharer/sharer.php?u=https://ade-moodmusic.netlify.app&quote=${encodeURIComponent(
        shareText
      )}`,
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/", // placeholder
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      url: `https://wa.me/ade-moodmusic.netlify.app&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane />,
      url: `https://t.me/share/url?url=https://ade-moodmusic.netlify.app&quote=${encodeURIComponent(
        shareText
      )}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=https://ade-moodmusic.netlify.app&quote`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/ade-moodmusic.netlify.app&quote=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-yellow-50 text-gray-900"} min-h-screen transition-all`}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-yellow-300">Search Your Mood 🔍</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl p-2 rounded-full hover:scale-110 transition"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-purple-800" />}
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
        <input
          type="text"
          placeholder="Enter your mood (e.g. Good, Evil...)"
          className="px-4 py-2 rounded-lg shadow w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-purple-400"
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

      {/* Suggestions */}
      <div className="text-center mt-4 text-sm text-gray-500">
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
            <p className="font-semibold text-gray-800 dark:text-white mb-2">{song.title}</p>

            <div className="flex justify-center gap-3 mt-4">
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                ▶ Preview on YouTube
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

            <div className="flex justify-center flex-wrap gap-3 mt-6">
              {platforms.map(({ name, icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${name}`}
                  className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-700 dark:hover:bg-purple-600 text-purple-700 dark:text-white p-3 rounded-full text-xl transition"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>
        ) : searchTerm.trim() && (
          <motion.div
            key="no-result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 text-center"
          >
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">😕 Mood not found</p>
            <p className="text-sm text-gray-500 mt-2">Try another mood like: Great, Good, Adventurous...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}