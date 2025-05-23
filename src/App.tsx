// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import AppComponent from "./components/App";
// import About from "./pages/about";
// import Register from "./pages/register";
// import Login from "./pages/login";
// import { ArticleDetail } from "./components/ArticleDetail";

// function Navbar({ user, onLogout }: { user: any; onLogout: () => void }) {
//   return (
//     <nav className="bg-gray-500 text-white p-4 flex justify-between items-center">
//       <ul className="flex space-x-4">
//         <li>
//           <Link to="/" className="hover:underline font-bold">
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/about" className="hover:underline font-bold">
//             About
//           </Link>
//         </li>
//       </ul>

//       <div>
//         {user ? (
//           <div className="flex items-center space-x-4">
//             <span>Welcome, {user.username || user.email}</span>
//             <button
//               onClick={onLogout}
//               type="button"
//               className="group flex items-center justify-start w-11 h-11 rounded-full bg-white shadow-md relative overflow-hidden transition-all duration-300 hover:bg-black hover:w-32 hover:rounded-3xl active:translate-x-0.5 active:translate-y-0.5"
//             >
//               <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:w-1/3 pl-5">
//                 <svg
//                   viewBox="0 0 512 512"
//                   className="w-4 transition-colors duration-300 group-hover:fill-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="black"
//                 >
//                   <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
//                 </svg>
//               </div>

//               <div className="absolute right-0 opacity-0 w-0 text-white font-semibold text-lg pr-2 transition-all duration-300 group-hover:opacity-100 group-hover:w-2/3">
//                 Logout
//               </div>
//             </button>
//           </div>
//         ) : (
//           <ul className="flex space-x-4">
//             <li>
//               <Link to="/register" className="hover:underline">
//                 Register
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//             </li>
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default function App() {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <Router>
//       <Navbar user={user} onLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={<AppComponent />} />
//         <Route path="/about" element={<About />} />
//         <Route
//           path="/login"
//           element={<Login onLogin={(userData) => setUser(userData)} />}
//         />
//         <Route path="/register" element={<Register />} />
//         <Route path="/articles/:id" element={<ArticleDetail />} />
//       </Routes>
//     </Router>
//   );
// }

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AppComponent from "./components/App";
import About from "./pages/about";
import Register from "./pages/register";
import Login from "./pages/login";
import { ArticleDetail } from "./components/ArticleDetail";

function Navbar({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <nav className="bg-gray-500 text-white p-4 flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline font-bold">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline font-bold">
            About
          </Link>
        </li>
      </ul>

      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.username || user.email}</span>
            <button
              onClick={onLogout}
              type="button"
              className="group flex items-center justify-start w-11 h-11 rounded-full bg-white shadow-md relative overflow-hidden transition-all duration-300 hover:bg-black hover:w-32 hover:rounded-3xl active:translate-x-0.5 active:translate-y-0.5"
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:w-1/3 pl-5">
                <svg
                  viewBox="0 0 512 512"
                  className="w-4 transition-colors duration-300 group-hover:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                >
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
              </div>

              <div className="absolute right-0 opacity-0 w-0 text-white font-semibold text-lg pr-2 transition-all duration-300 group-hover:opacity-100 group-hover:w-2/3">
                Logout
              </div>
            </button>
          </div>
        ) : (
          <ul className="flex space-x-4">
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
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<AppComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={(userData) => setUser(userData)} />} />
        <Route path="/register" element={<Register />} />
        {/* ✅ Use :documentId to match dynamic articles */}
        <Route path="/articles/:documentId" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}
