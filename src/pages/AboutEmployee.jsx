import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./AboutEmployee.css"

export function AboutEmployee() {
    const params = useParams();
    const employeeID = params.id

    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employees/${employeeID}`, {
        method: "GET",
        headers: {
          "projectId": "66aa2490440310e3620e0b30",
          "environmentId": "66aa2490440310e3620e0b31"
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Received employee data:', data); 
          setEmployee(data);
        })
        .catch(error => {
          console.error('Error fetching employee data:', error);
          setError(error.message);
        });
    }, [employeeID]);
  
    if (error) {
      return <p className="error-message">{error}</p>;
    }
  
    if (!employee) {
      return <p>Loading...</p>;
    }

  return (
    <div className='employee-page'>
    <div className="employee-detail-card-container">
        <div className="employee-detail-card">
            <h1>{employee.name}</h1>
            <p>Employee ID: {employee._id}</p>
            <p>Address: {employee.address}</p>
            <p>City: {employee.city}</p>
            <p>Country: {employee.country}</p>
            <p>ZIP Code: {employee.zip_code}</p>
            <p>Contact Method: {employee.contact_method}</p>
            {employee.contact_method === 'phone' && (
            <p>Phone Number: {employee.phone_number}</p>
            )}
            {employee.contact_method === 'email' && (
            <p>Email: {employee.email}</p>
            )}
        </div>
        <div className="buttons-container">
            <Link to="/employee"><button className="btn">Show List</button></Link>
            <Link to="/"><button className="btn">Add Employee</button></Link>
        </div>
    </div>
    </div>
  )
}

