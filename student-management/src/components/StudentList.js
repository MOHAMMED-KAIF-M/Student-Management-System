import { Link } from "react-router-dom";

function StudentList({ students }) {
  if (!students.length) return <p>No students found</p>;

  return (
    <div>
      {students.map(student => (
        <div key={student.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "5px 0" }}>
          <b>{student.name}</b> (Roll: {student.roll})
          <br />
          <Link to={`/profile/${student.id}`}>View Profile</Link>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
