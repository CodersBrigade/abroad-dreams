import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from "../../components/AdminSidebar.jsx";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [editStudentId, setEditStudentId] = useState(null);
    const [showForm, setShowForm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            // If search input is empty, fetch all students
            fetchStudents();
        } else {
            // Fetch students based on the search query
            fetchStudentById(searchQuery);
        }
    };

    const handleClose = () => setShowForm('');

    const [studentData, setStudentData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        mobileNumber: "",
        profileStatus: false,
    });

    const [editStudentData, setEditStudentData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        mobileNumber: "",
        profileStatus: false,
    });

    const handleShow = (formType, studentId = null) => {
        setShowForm(formType);
        setEditStudentId(studentId);

        // Reset the form data if you are adding a new student
        if (!studentId) {
            setStudentData({
                username: "",
                password: "",
                name: "",
                email: "",
                mobileNumber: "",
                profileStatus: false,
            });
        }
    };

    const handleSaveStudent = () => {
        axios
            .post('http://localhost:8080/students/save', studentData)
            .then((response) => {
                console.log('Students saved successfully:', response.data);
                handleClose();
                fetchStudents();
            })
            .catch((error) => {
                console.error('Error saving student:', error);
                // Handle the error, show a message, etc.
            });
    };

    // Function to fetch student data
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/students/getAll');
            console.log('Fetched students:', response.data);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            // Handle the error, show a message, etc.
        }
    };

    const fetchStudentById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/students/getById/${id}`);
            console.log('Fetched student by ID:', response.data);
            setStudents([response.data]); // Set the single student in an array for mapping
        } catch (error) {
            console.error('Error fetching student by ID:', error);
            // Handle the error, show a message, etc.
        }
    };

    const handleRemoveStudent = (studentId) => {
        // Check if id is undefined before making the API call
        if (studentId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/students/delete/${studentId}`)
            .then((response) => {
                console.log(`Student with ID ${studentId} removed successfully`);
                // Fetch the updated list of students after removal
                fetchStudents();
            })
            .catch((error) => {
                console.error(`Error removing student with ID ${studentId}:`, error);
                // Handle the error, show a message, etc.
            });
    };

    const handleUpdateStudent = () => {
        axios
            .put(`http://localhost:8080/students/update/${editStudentId}`, editStudentData)
            .then((response) => {
                console.log('Students updated successfully:', response.data);
                handleClose();
                fetchStudents(); // Fetch the updated list of students
            })
            .catch((error) => {
                console.error('Error updating student:', error);
                // Handle the error, show a message, etc.
            });
    };

    const handleEditStudent = (studentId) => {
        // Find the student to edit from the list
        const studentToEdit = students.find((student) => student.studentId === studentId);

        // Set the data for editing
        setEditStudentData({
            username: studentToEdit.username,
            password: studentToEdit.password,
            name: studentToEdit.name,
            email: studentToEdit.email,
            mobileNumber: studentToEdit.mobileNumber,
            profileStatus: studentToEdit.profileStatus,
        });

        // Show the edit student form/modal
        handleShow('editStudent', studentId);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />

            <Container fluid className="flex-grow-1">
                <div className="wrapper">
                    <div className="d-flex align-items-center mb-3">
                        <button className="btn btn-dark mr-2 m-1" onClick={() => { handleShow("addStudent") }}>Add New Student +</button>
                        <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Search by ID"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {Array.isArray(students) && students.map((student) => (
                        <div className="item" key={student.studentId}>
                            {<strong>ID: {student.studentId}</strong>} {student.name}{" -- "}{student.email}
                            <div>
                                <button className="btn btn-danger m-1" onClick={() => handleEditStudent(student.studentId)}>View Details/Edit</button>
                                <button className="btn btn-success m-1" onClick={() => handleRemoveStudent(student.studentId)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <Modal
                        show={Boolean(showForm)}
                        onHide={handleClose}
                        animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >

                        {showForm === 'editStudent' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Edit Student
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for editing student */}
                                        <Form.Group className="mb-3" controlId="formEditUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Username"
                                                value={editStudentData.username}
                                                onChange={(e) => setEditStudentData({ ...editStudentData, username: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter Password"
                                                value={editStudentData.password}
                                                onChange={(e) => setEditStudentData({ ...editStudentData, password: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Name"
                                                value={editStudentData.name}
                                                onChange={(e) => setEditStudentData({ ...editStudentData, name: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Email"
                                                value={editStudentData.email}
                                                onChange={(e) => setEditStudentData({ ...editStudentData, email: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditMobileNumber">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Mobile Number"
                                                value={editStudentData.mobileNumber}
                                                onChange={(e) => setEditStudentData({ ...editStudentData, mobileNumber: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditProfileStatus">
                                            <Form.Check
                                                type="checkbox"
                                                label="Profile Status"
                                                checked={editStudentData.profileStatus}
                                                onChange={(e) => setEditStudentData({ ...editStudentData, profileStatus: e.target.checked })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        {showForm === 'addStudent' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Add Student
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for adding a new student */}
                                        <Form.Group className="mb-3" controlId="formUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Username"
                                                value={studentData.username}
                                                onChange={(e) => setStudentData({ ...studentData, username: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter Password"
                                                value={studentData.password}
                                                onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Name"
                                                value={studentData.name}
                                                onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Email"
                                                value={studentData.email}
                                                onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formMobileNumber">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Mobile Number"
                                                value={studentData.mobileNumber}
                                                onChange={(e) => setStudentData({ ...studentData, mobileNumber: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formProfileStatus">
                                            <Form.Check
                                                type="checkbox"
                                                label="Profile Status"
                                                checked={studentData.profileStatus}
                                                onChange={(e) => setStudentData({ ...studentData, profileStatus: e.target.checked })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </>
                        )}


                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            {showForm === 'addStudent' && <Button variant="primary" onClick={handleSaveStudent}>Add Student</Button>}
                            {showForm === 'editStudent' && <Button variant="primary" onClick={handleUpdateStudent}>Update Student</Button>}
                        </Modal.Footer>
                    </Modal>

                </div>
            </Container>
        </div>
    );
}
