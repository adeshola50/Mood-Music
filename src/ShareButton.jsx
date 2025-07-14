import React from 'react';

export default function ShareButton({ mood, quote, song }) {
    const text = `🎧 Mood: ${mood}\n"${quote}"\nNow playing: ${song}\nTry it on Mood-Music! https://mood-music-app.netlify.app`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

    return (
        <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
            🔗 Share on Twitter
        </a>
    );
}