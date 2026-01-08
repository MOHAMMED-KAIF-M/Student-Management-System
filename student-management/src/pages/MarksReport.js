import { useEffect, useState } from "react";

function MarksReport() {
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(allStudents);

    const marks = JSON.parse(localStorage.getItem("marks")) || {};
    setMarksData(marks);

    // Dynamically get all subjects
    const allSubjects = new Set();
    Object.values(marks).forEach(studentMarks => {
      Object.keys(studentMarks).forEach(subj => allSubjects.add(subj));
    });
    setSubjects([...allSubjects]);
  }, []);

  // Delete marks for a specific student
  const handleDeleteStudentMarks = (studentId) => {
    if (window.confirm("Are you sure you want to delete all marks for this student?")) {
      const updatedMarks = { ...marksData };
      delete updatedMarks[studentId];
      setMarksData(updatedMarks);
      localStorage.setItem("marks", JSON.stringify(updatedMarks));
    }
  };

  // Delete marks for a specific subject for all students
  const handleDeleteSubject = (subject) => {
    if (window.confirm(`Are you sure you want to delete the subject "${subject}" for all students?`)) {
      const updatedMarks = { ...marksData };
      Object.keys(updatedMarks).forEach(studentId => {
        if (updatedMarks[studentId][subject]) {
          delete updatedMarks[studentId][subject];
        }
      });
      setMarksData(updatedMarks);
      localStorage.setItem("marks", JSON.stringify(updatedMarks));
      setSubjects(subjects.filter(s => s !== subject)); // Remove subject from header
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Marks Report / Report Card</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th>Student Name</th>
              <th>Roll</th>
              {subjects.map(subj => (
                <th key={subj}>
                  {subj}{" "}
                  <button
                    onClick={() => handleDeleteSubject(subj)}
                    style={{ background: "red", color: "white", border: "none", cursor: "pointer", fontSize: "10px", marginLeft: "3px" }}
                  >
                    X
                  </button>
                </th>
              ))}
              <th>Total</th>
              <th>Percentage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => {
              const studentMarks = marksData[student.id] || {};
              const totalObtained = subjects.reduce((sum, subj) => sum + (studentMarks[subj]?.obtained || 0), 0);
              const totalMax = subjects.reduce((sum, subj) => sum + (studentMarks[subj]?.total || 0), 0);
              const percentage = totalMax ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;

              return (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  {subjects.map(subj => (
                    <td key={subj}>
                      {studentMarks[subj] ? `${studentMarks[subj].obtained}/${studentMarks[subj].total}` : "-"}
                    </td>
                  ))}
                  <td>{totalObtained}/{totalMax}</td>
                  <td>{percentage}%</td>
                  <td>
                    <button
                      onClick={() => handleDeleteStudentMarks(student.id)}
                      style={{ background: "red", color: "white", border: "none", cursor: "pointer" }}
                    >
                      Delete Marks
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MarksReport;
