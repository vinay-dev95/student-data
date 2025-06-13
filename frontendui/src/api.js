import axios from "axios";
const API_URL = "http://95.217.xxx.yyy:8000/students";

export const getStudents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addStudent = async (student) => {
    const response = await axios.post(API_URL, student);
    return response.data;
};

export const deleteStudent = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const updateStudent = async (id, student) => {
    const response = await axios.put(`${API_URL}/${id}`, student);
    return response.data;
};
