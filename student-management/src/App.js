import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";           // Marks entry page
import MarksReport from "./pages/MarksReport"; // Report card page
import StudentProfile from "./pages/StudentProfile"; // Student profile page
import Navbar from "./components/Navbar";

function App() {
  // ✅ Persistent login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  // Keep localStorage in sync with login state
  useEffect(() => {
    localStorage.setItem("loggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Home */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />

        {/* Add Student */}
        <Route
          path="/add"
          element={isLoggedIn ? <AddStudent /> : <Navigate to="/login" />}
        />

        {/* Attendance */}
        <Route
          path="/attendance"
          element={isLoggedIn ? <Attendance /> : <Navigate to="/login" />}
        />

        {/* Marks Entry */}
        <Route
          path="/marks"
          element={isLoggedIn ? <Marks /> : <Navigate to="/login" />}
        />

        {/* Marks Report / Report Card */}
        <Route
          path="/marks-report"
          element={isLoggedIn ? <MarksReport /> : <Navigate to="/login" />}
        />

        {/* Student Profile */}
        <Route
          path="/profile/:id"
          element={isLoggedIn ? <StudentProfile /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
