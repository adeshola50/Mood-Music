import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Footer from './Footer';


export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-200">
      <nav className="flex justify-between p-4 bg-white shadow-md">
        <Link to="/" className="text-purple-700 font-bold text-xl">Mood-Music 🎧</Link>
        <Link to="/search" className="text-purple-500 hover:underline">Search Mood</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </div>

  );
}