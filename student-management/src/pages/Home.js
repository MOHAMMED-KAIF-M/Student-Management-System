import { useEffect, useState } from "react";
import StudentList from "../components/StudentList";

function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  const deleteStudent = (id) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student List</h2>
      <StudentList students={students} deleteStudent={deleteStudent} />
    </div>
  );
}

export default Home;
