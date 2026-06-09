import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function AddEmployeeComponent() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        if (id) {
            EmployeeService.getEmployeeById(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, [id]);

    const saveEmployee = (e) => {

        e.preventDefault();

        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '') {
            alert("All fields are required");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        const employee = {
            firstName,
            lastName,
            email
        };

        if (id) {

            EmployeeService.updateEmployee(id, employee)
                .then((response) => {
                    console.log(response.data);
                    alert("Employee Updated Successfully");
                    navigate('/employees');
                })
                .catch(error => {
                    console.log(error);
                });

        } else {

            EmployeeService.createEmployee(employee)
                .then((response) => {
                    console.log(response.data);
                    alert("Employee Saved Successfully");
                    navigate('/employees');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="container mt-4">
            <div className="card col-md-6 offset-md-3">

                <h3 className="text-center mt-3">
                    {id ? "Update Employee" : "Add Employee"}
                </h3>

                <div className="card-body">

                    <div className="form-group mb-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Last Name</label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="btn btn-success"
                        onClick={saveEmployee}
                    >
                        {id ? "Update Employee" : "Save Employee"}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default AddEmployeeComponent;