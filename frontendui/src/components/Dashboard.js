import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent
} from "../api";

const Dashboard = () => {
  const [details, setDetails] = useState({
    id: "",
    firstname: "",
    surname: "",
    address: "",
    gender: "Male",
    mobile: ""
  });

  const [subjects, setSubjects] = useState({
    telugu: "",
    hindi: "",
    english: "",
    maths: "",
    science: "",
    social: ""
  });

  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDetailChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (e) => {
    setSubjects({ ...subjects, [e.target.name]: e.target.value });
  };

  const handleEdit = (student) => {
    setDetails({
      id: student.id,
      firstname: student.firstname,
      surname: student.surname,
      address: student.address,
      gender: student.gender,
      mobile: student.mobile
    });

    setSubjects({
      telugu: student.telugu,
      hindi: student.hindi,
      english: student.english,
      maths: student.maths,
      science: student.science,
      social: student.social
    });

    setCurrentId(student.id);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const updatedStudent = { ...details, ...subjects };
    try {
      await updateStudent(currentId, updatedStudent);
      fetchStudents();
      handleClear();
      setIsEditing(false);
      setCurrentId(null);
      alert("✅ Student details updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("❌ Failed to update student. Please try again.");
    }
  };

  const handleAdd = async () => {
    const requiredFields = [
      details.id, details.firstname, details.surname, details.address, details.mobile,
      subjects.telugu, subjects.hindi, subjects.english, subjects.maths, subjects.science, subjects.social
    ];

    const anyEmpty = requiredFields.some((field) => field.trim() === "");

    if (anyEmpty) {
      alert("Please fill the Student Details and Subjects.");
      return;
    }

    const newStudent = { ...details, ...subjects };

    try {
      await addStudent(newStudent);
      fetchStudents();
      handleClear();
      alert("✅ Student details and marks added successfully!");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("❌ Failed to add student. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      fetchStudents();
      alert("🗑️ Student data deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("❌ Failed to delete student. Please try again.");
    }
  };

  const handleClear = () => {
    setDetails({
      id: "",
      firstname: "",
      surname: "",
      address: "",
      gender: "Male",
      mobile: ""
    });
    setSubjects({
      telugu: "",
      hindi: "",
      english: "",
      maths: "",
      science: "",
      social: ""
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Student Database Management System</h1>
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("loggedIn");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      <div className="form-sections" style={{ display: "flex", gap: "40px", marginBottom: "20px" }}>
        <div style={{ flex: 1, border: "2px solid green", padding: "20px" }}>
          <h3>Student Details</h3>
          <StudentForm data={details} onChange={handleDetailChange} section="details" />
        </div>

        <div style={{ flex: 1, border: "2px solid green", padding: "20px" }}>
          <h3>Subjects (Enter Marks)</h3>
          <StudentForm data={subjects} onChange={handleSubjectChange} section="subjects" />
        </div>
      </div>

      <div className="action-buttons" style={{ marginBottom: "20px", textAlign: "center" }}>
        {isEditing ? (
          <button className="btn btn-warning" onClick={handleUpdate}>Update Student</button>
        ) : (
          <button className="btn btn-primary" onClick={handleAdd}>Add New</button>
        )}
        <button className="btn btn-secondary mx-2" onClick={fetchStudents}>Reset</button>
        <button className="btn btn-warning mx-2" onClick={handleClear}>Clear</button>
        <button className="btn btn-success mx-2" onClick={() => window.print()}>Print</button>
      </div>

      <div style={{ border: "2px solid green", padding: "10px" }}>
        <StudentTable students={students} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Dashboard;
