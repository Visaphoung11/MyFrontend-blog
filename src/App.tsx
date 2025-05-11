import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AppComponent from "./components/App";
import About from "./pages/about";
import Register from "./pages/register";
import Login from "./pages/login";
import ArticleDetail from "./components/ArticleDetail";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />{" "}
        {/* Article Detail */}
      </Routes>
    </Router>
  );
}
