import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white shadow-inner mt-10 p-4 flex justify-center gap-6 text-purple-700">
            <p>Created By <b>ADESHOLA OLUWASEUN</b> </p>
            <a
                href="https://github.com/adeshola50"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition"
            >
                <FaGithub size={24} />
            </a>
            <a
                href="https://www.linkedin.com/in/oluwaseun-adeshola-7b5b42372/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition"
            >
                <FaLinkedin size={24} />
            </a>
            <a
                href="mailto:oluwaseunadeshola50@gmail.com"
                className="hover:text-red-600 transition"
            >
                <FaEnvelope size={24} />
            </a>
            <a
                href="https://x.com/Adeshola___"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
            >
                <FaTwitter size={24} />
            </a>
        </footer>
    );
}