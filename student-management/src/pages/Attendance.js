import { useEffect, useState } from "react";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]); // List of custom classes
  const [newClass, setNewClass] = useState(""); // Input for new class
  const [selectedClass, setSelectedClass] = useState(""); // Currently selected class
  const [attendance, setAttendance] = useState({}); // { className: { studentId: "Present"/"Absent" } }

  // Load students, classes, and attendance from LocalStorage
  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(allStudents);

    const savedClasses = JSON.parse(localStorage.getItem("classes")) || [];
    setClasses(savedClasses);

    const savedAttendance = JSON.parse(localStorage.getItem("attendance")) || {};
    setAttendance(savedAttendance);
  }, []);

  // Add new class
  const handleAddClass = () => {
    if (!newClass) return;

    if (!classes.includes(newClass)) {
      const updatedClasses = [...classes, newClass];
      setClasses(updatedClasses);
      localStorage.setItem("classes", JSON.stringify(updatedClasses));
    }

    setSelectedClass(newClass); // Auto-select new class
    setNewClass("");
  };

  // Mark attendance for a student
  const handleMark = (studentId, status) => {
    const classAttendance = attendance[selectedClass] || {};
    const updatedClassAttendance = { ...classAttendance, [studentId]: status };
    const updatedAttendance = { ...attendance, [selectedClass]: updatedClassAttendance };
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
  };

  // Delete attendance for a student
  const handleDeleteAttendance = (studentId) => {
    const classAttendance = attendance[selectedClass] || {};
    delete classAttendance[studentId];
    const updatedAttendance = { ...attendance, [selectedClass]: classAttendance };
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance</h2>

      {/* Add Custom Class */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Enter new class name"
          value={newClass}
          onChange={e => setNewClass(e.target.value)}
        />
        <button onClick={handleAddClass} style={{ marginLeft: "5px" }}>Add & Select Class</button>
      </div>

      {/* Select Class */}
      <div style={{ marginBottom: "15px" }}>
        <label>Select Class: </label>
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
          <option value="">--Select Class--</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {/* Show students and mark attendance */}
      {selectedClass && students.length > 0 && (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th>Name</th>
              <th>Roll</th>
              <th>Attendance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>
                  <select
                    value={(attendance[selectedClass] && attendance[selectedClass][student.id]) || ""}
                    onChange={e => handleMark(student.id, e.target.value)}
                  >
                    <option value="">--Mark--</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteAttendance(student.id)}
                    style={{ background: "red", color: "white", border: "none", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedClass && students.length === 0 && <p>No students in the database.</p>}
    </div>
  );
}

export default Attendance;
