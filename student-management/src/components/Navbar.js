import { Link, useNavigate } from "react-router-dom";

function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);   // 🔴 ensures App re-renders
    navigate("/login");
  };

  return (
    <nav style={{ background: "#333", padding: "10px" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
        Home
      </Link>

      <Link to="/add" style={{ color: "#fff", marginRight: "15px" }}>
        Add Student
      </Link>

      <Link to="/attendance" style={{ color: "#fff", marginRight: "15px" }}>
        Attendance
      </Link>

      <Link to="/marks" style={{ color: "#fff", marginRight: "15px" }}>
        Marks
      </Link>
       
       <Link to="/marks-report" style={{ color: "#fff", marginRight: "15px" }}>
       Report Card
       </Link>

      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
