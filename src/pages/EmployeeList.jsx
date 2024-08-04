import React, { useEffect, useState } from 'react'
import './EmployeeList.css'
import { Link } from 'react-router-dom';

export function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

useEffect(() => {
    // Fetch employee data from an API (replace with your endpoint)
    fetch('API', {
        method: "GET",
        headers: {
            "projectId": "",
            "environmentId": ""
        }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data); // For debugging
        if (data && Array.isArray(data.data)) {
          setEmployees(data.data);
        } else {
          throw new Error('Data format is incorrect. Expected an array inside the "data" key.');
        }
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
        setError(error.message);
      });
  }, []);

    return (
    <div className="employee-list">
      <h1>Employees</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="cards-container">
          {employees.map((employee) => (
            <div key={employee._id} className="employee-card">
              <h2>{employee.name}</h2>
              <p>Employee ID: {employee._id}</p>
              <p>Country: {employee.country}</p>
              <Link to={`/employee/${employee._id}`} ><button>View</button></Link>
            </div>
          ))}
        </div>
      )}
      <Link to="/"><button className='add-button'>Add Employee</button></Link>
    </div>
    )
}

