import React from "react";

const StudentForm = ({ data, onChange, section }) => {
  if (section === "details") {
    return (
      <>
        <input
          name="id"
          value={data.id}
          onChange={onChange}
          placeholder="Student ID"
          className="form-control mb-2"
        />
        <input
          name="firstname"
          value={data.firstname}
          onChange={onChange}
          placeholder="Firstname"
          className="form-control mb-2"
        />
        <input
          name="surname"
          value={data.surname}
          onChange={onChange}
          placeholder="Surname"
          className="form-control mb-2"
        />
        <input
          name="address"
          value={data.address}
          onChange={onChange}
          placeholder="Address"
          className="form-control mb-2"
        />
        <select
          name="gender"
          value={data.gender}
          onChange={onChange}
          className="form-control mb-2"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          name="mobile"
          value={data.mobile}
          onChange={onChange}
          placeholder="Mobile"
          className="form-control mb-2"
        />
      </>
    );
  }

  if (section === "subjects") {
    const subjectFields = ["telugu", "hindi", "english", "maths", "science", "social"];
    return (
      <>
        {subjectFields.map((subject) => (
          <input
            key={subject}
            name={subject}
            value={data[subject]}
            onChange={onChange}
            placeholder={`${subject.charAt(0).toUpperCase() + subject.slice(1)} Marks`}
            className="form-control mb-2"
            type="number"
            min="0"
            max="100"
          />
        ))}
      </>
    );
  }

  return null;
};

export default StudentForm;
