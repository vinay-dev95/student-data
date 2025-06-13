import React, { useState, useEffect } from "react";
import { addStudent, getStudents, deleteStudent } from "../api";

const AddStudent = () => {
  const [student, setStudent] = useState({
    id: "",
    firstname: "",
    surname: "",
    address: "",
    gender: "Male",
    mobile: "",
    telugu: "",
    hindi: "",
    english: "",
    maths: "",
    science: "",
    social: ""
  });

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(student);
    fetchStudents();
    setStudent({
      id: "",
      firstname: "",
      surname: "",
      address: "",
      gender: "Male",
      mobile: "",
      telugu: "",
      hindi: "",
      english: "",
      maths: "",
      science: "",
      social: ""
    });
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student Database Management System</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "40px" }}>
          {/* Student Details Section */}
          <div style={{ border: "2px solid green", padding: "20px", width: "50%" }}>
            <h4>Student Details</h4>
            <input name="id" value={student.id} onChange={handleChange} placeholder="Student ID" className="form-control mb-2" />
            <input name="firstname" value={student.firstname} onChange={handleChange} placeholder="Firstname" className="form-control mb-2" />
            <input name="surname" value={student.surname} onChange={handleChange} placeholder="Surname" className="form-control mb-2" />
            <input name="address" value={student.address} onChange={handleChange} placeholder="Address" className="form-control mb-2" />
            <select name="gender" value={student.gender} onChange={handleChange} className="form-control mb-2">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input name="mobile" value={student.mobile} onChange={handleChange} placeholder="Mobile" className="form-control mb-2" />
          </div>

          {/* Subject Marks Section */}
          <div style={{ border: "2px solid green", padding: "20px", width: "50%" }}>
            <h4>Subjects (Enter Marks)</h4>
            <input name="telugu" value={student.telugu} onChange={handleChange} placeholder="Telugu Marks" className="form-control mb-2" />
            <input name="hindi" value={student.hindi} onChange={handleChange} placeholder="Hindi Marks" className="form-control mb-2" />
            <input name="english" value={student.english} onChange={handleChange} placeholder="English Marks" className="form-control mb-2" />
            <input name="maths" value={student.maths} onChange={handleChange} placeholder="Maths Marks" className="form-control mb-2" />
            <input name="science" value={student.science} onChange={handleChange} placeholder="Science Marks" className="form-control mb-2" />
            <input name="social" value={student.social} onChange={handleChange} placeholder="Social Marks" className="form-control mb-2" />
          </div>
        </div>

        <div className="mt-3 text-center">
          <button className="btn btn-primary" type="submit">Add New</button>
          <button className="btn btn-secondary mx-2" type="reset">Reset</button>
          <button className="btn btn-danger mx-2" type="button" onClick={() => window.location.reload()}>Clear</button>
          <button className="btn btn-success mx-2" type="button" onClick={() => window.print()}>Print</button>
        </div>
      </form>

      {/* Student Records Table */}
      <div style={{ border: "2px solid green", marginTop: "30px", padding: "10px" }}>
        <h5>Student Records</h5>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Firstname</th>
                <th>Surname</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Telugu</th>
                <th>Hindi</th>
                <th>English</th>
                <th>Maths</th>
                <th>Science</th>
                <th>Social</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.id}</td>
                  <td>{s.firstname}</td>
                  <td>{s.surname}</td>
                  <td>{s.address}</td>
                  <td>{s.gender}</td>
                  <td>{s.mobile}</td>
                  <td>{s.telugu}</td>
                  <td>{s.hindi}</td>
                  <td>{s.english}</td>
                  <td>{s.maths}</td>
                  <td>{s.science}</td>
                  <td>{s.social}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr><td colSpan="13" className="text-center">No students found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
