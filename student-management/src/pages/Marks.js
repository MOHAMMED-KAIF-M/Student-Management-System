import { useState, useEffect } from "react";

function Marks() {
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({}); // { studentId: { subject: { total, obtained } } }
  const [subjectName, setSubjectName] = useState({});
  const [totalMarks, setTotalMarks] = useState({});
  const [marksObtained, setMarksObtained] = useState({});

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(allStudents);

    const savedMarks = JSON.parse(localStorage.getItem("marks")) || {};
    setMarksData(savedMarks);
  }, []);

  const handleAddMarks = (studentId) => {
    const subject = subjectName[studentId];
    const total = totalMarks[studentId];
    const obtained = marksObtained[studentId];

    if (!subject || !total || !obtained) return;

    const studentMarks = marksData[studentId] || {};
    studentMarks[subject] = { total: Number(total), obtained: Number(obtained) };

    const updatedMarks = { ...marksData, [studentId]: studentMarks };
    setMarksData(updatedMarks);
    localStorage.setItem("marks", JSON.stringify(updatedMarks));

    // Clear input for this student
    setSubjectName({ ...subjectName, [studentId]: "" });
    setTotalMarks({ ...totalMarks, [studentId]: "" });
    setMarksObtained({ ...marksObtained, [studentId]: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Marks Entry</h2>

      {students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        students.map(student => {
          const studentMarks = marksData[student.id] || {};
          const subjects = Object.keys(studentMarks);

          return (
            <div key={student.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "15px" }}>
              <h3>{student.name} (Roll: {student.roll})</h3>

              {/* Existing subjects */}
              <p>Subjects Added: {subjects.length > 0 ? subjects.join(", ") : "None"}</p>

              {/* Add new subject */}
              <input
                placeholder="Subject Name"
                value={subjectName[student.id] || ""}
                onChange={e => setSubjectName({ ...subjectName, [student.id]: e.target.value })}
                style={{ marginRight: "5px" }}
              />
              <input
                type="number"
                placeholder="Total Marks"
                value={totalMarks[student.id] || ""}
                onChange={e => setTotalMarks({ ...totalMarks, [student.id]: e.target.value })}
                style={{ marginRight: "5px" }}
              />
              <input
                type="number"
                placeholder="Marks Obtained"
                value={marksObtained[student.id] || ""}
                onChange={e => setMarksObtained({ ...marksObtained, [student.id]: e.target.value })}
                style={{ marginRight: "5px" }}
              />
              <button onClick={() => handleAddMarks(student.id)}>Add Marks</button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Marks;
