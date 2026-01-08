import { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

function AddStudent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(stored);
  }, []);

  const addStudent = student => {
    const updated = [...students, student];
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Student</h2>
      <StudentForm onAdd={addStudent} />
      <h3>Student List</h3>
      <StudentList students={students} />
    </div>
  );
}

export default AddStudent;
