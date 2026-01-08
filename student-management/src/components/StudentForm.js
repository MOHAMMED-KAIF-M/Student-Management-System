import { useState } from "react";

function StudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);

  // Convert uploaded image to Base64
  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const student = {
      id: Date.now(),
      name,
      roll,
      dob,
      email,
      contact,
      address,
      photo
    };
    onAdd(student);

    // Clear form
    setName(""); setRoll(""); setDob(""); setEmail(""); setContact(""); setAddress(""); setPhoto(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Roll" value={roll} onChange={e => setRoll(e.target.value)} required />
      <input type="date" placeholder="DOB" value={dob} onChange={e => setDob(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Contact" value={contact} onChange={e => setContact(e.target.value)} required />
      <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ marginTop: "5px" }} />
      <button type="submit" style={{ marginTop: "10px" }}>Add Student</button>
    </form>
  );
}

export default StudentForm;
