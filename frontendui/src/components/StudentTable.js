import React from "react";

const StudentTable = ({ students, onDelete, onEdit }) => {
  return (
    <div>
      <h5>Student Records</h5>
      <div style={{ overflowX: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Firstname</th><th>Surname</th><th>Address</th><th>Gender</th><th>Mobile</th>
              <th>Telugu</th><th>Hindi</th><th>English</th><th>Maths</th><th>Science</th><th>Social</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan="13" className="text-center">No students found</td></tr>
            ) : (
              students.map((s) => (
                <tr key={s.id}>
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
                    <button className="btn btn-sm btn-info me-1" onClick={() => onEdit(s)}>Update</button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default StudentTable;
