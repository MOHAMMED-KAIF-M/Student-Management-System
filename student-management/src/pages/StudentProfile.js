import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const found = students.find(s => s.id === Number(id));
    setStudent(found);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      let students = JSON.parse(localStorage.getItem("students")) || [];
      students = students.filter(s => s.id !== Number(id));
      localStorage.setItem("students", JSON.stringify(students));

      let marks = JSON.parse(localStorage.getItem("marks")) || {};
      delete marks[id];
      localStorage.setItem("marks", JSON.stringify(marks));

      navigate("/add");
    }
  };

  if (!student) return <p>Student not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{student.name}'s Profile</h2>
      
      {student.photo && (
        <img 
          src={student.photo} 
          alt={student.name} 
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", marginBottom: "15px" }}
        />
      )}
      
      <p><b>Roll:</b> {student.roll}</p>
      <p><b>DOB:</b> {student.dob}</p>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Contact:</b> {student.contact}</p>
      <p><b>Address:</b> {student.address}</p>

      <button 
        onClick={handleDelete} 
        style={{ marginTop: "20px", background: "red", color: "white", padding: "8px", border: "none", cursor: "pointer" }}
      >
        Delete Student
      </button>
    </div>
  );
}

export default StudentProfile;
