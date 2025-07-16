import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa"; // ✅ Icons

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all">

            {/* Header */}
            <header className="bg-purple-600 text-white p-4 flex justify-between items-center shadow-md">
                {/* ✅ Logo links to Home */}
                <Link to="/" className="text-xl font-bold hover:underline">
                    Mood-Music 🎵
                </Link>

                {/* ✅ Only Search link */}
                <nav className="space-x-4">
                    <Link to="/search" className="hover:underline">Search</Link>
                </nav>
            </header>

            {/* Main Page Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer with Icons */}
            <footer className="text-center text-xs py-6 text-gray-500 dark:text-gray-400">
                <div className="flex justify-center gap-6 mb-2 text-lg">
                    <a
                        href="https://github.com/adeshola50"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-500"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/oluwaseun-adeshola-7b5b42372/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="mailto:oluwaseunadeshola50@gmail.com"
                        className="hover:text-red-500"
                        aria-label="Email"
                    >
                        <FaEnvelope />
                    </a>
                    <a
                        href="https://x.com/adeshola___"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black dark:hover:text-white"
                        aria-label="X"
                    >
                        <FaTwitter />
                    </a>
                </div>
                &copy; {new Date().getFullYear()} Mood-Music. All rights reserved.
            </footer>
        </div>
    );
}