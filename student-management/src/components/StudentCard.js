function StudentCard({ student, deleteStudent }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <p>Name: {student.name}</p>
      <p>Roll: {student.roll}</p>
      <button onClick={() => deleteStudent(student.id)}>Delete</button>
    </div>
  );
}

export default StudentCard;
