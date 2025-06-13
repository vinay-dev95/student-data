import React, { useState, useEffect } from "react";
import { getStudents, deleteStudent } from "../api";
import AddStudent from "./AddStudent";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const data = await getStudents();
        setStudents(data);
    };

    const handleDelete = async (roll_no) => {
        await deleteStudent(roll_no);
        fetchStudents(); // Refresh list after deletion
    };

    return (
        <div className="container mt-4">
            <h2>Student List</h2>
            <AddStudent onStudentAdded={fetchStudents} />
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name} (Roll No: {student.roll_no})
                        <button onClick={() => handleDelete(student.roll_no)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
