import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

function EmployeeListComponent() {

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        EmployeeService.getEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const addEmployee = () => {
        navigate('/add-employee');
    };

    const updateEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    };

    const deleteEmployee = (id) => {

        if (window.confirm("Are you sure you want to delete this employee?")) {

            EmployeeService.deleteEmployee(id)
                .then((response) => {
                    console.log(response.data);
                    getAllEmployees();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">Employee List</h2>

            <div className="row mb-3 align-items-center">

                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Employee..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body text-center py-2">
                            <h6 className="mb-1">Total Employees</h6>
                            <h4 className="text-primary mb-0">
                                {employees.length}
                            </h4>
                        </div>
                    </div>
                </div>

            </div>

            <button
                className="btn btn-primary mb-3"
                onClick={addEmployee}
            >
                Add Employee
            </button>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employees
                            .filter(employee =>
                                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                employee.email.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((employee, index) =>
                                <tr key={employee.id}>
                                    <td>{index + 1}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td className="text-center">{employee.id}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-info"
                                            onClick={() => updateEmployee(employee.id)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() => deleteEmployee(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>

        </div>
    );
}

export default EmployeeListComponent;