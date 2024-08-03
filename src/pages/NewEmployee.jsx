import React from 'react'
import { useState } from 'react'
import "./form.css"
import { Link } from 'react-router-dom';

export function NewEmployee() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        zip_code: '',
        contact_method: 'phone',
        phone_number: '',
        email: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
      
        // Basic validation (optional)
        if (!formData.name || !formData.address || !formData.city || !formData.country || !formData.zip_code) {
          alert("Please fill in all required fields.");
          return;
        }

        if (formData.contact_method === 'phone' && !formData.phone_number) {
            alert("Please provide a phone number.");
            return;
        }
    
        if (formData.contact_method === 'email' && !formData.email) {
        alert("Please provide an email address.");
        return;
        }
      
        // Log the form data (you can replace this with actual submission logic)
        console.log("Form Data:", formData);
      
        // Example of sending data to a server (replace with your API endpoint)
        fetch("https://free-ap-south-1.cosmocloud.io/development/api/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "projectId": "66aa2490440310e3620e0b30",
            "environmentId": "66aa2490440310e3620e0b31"
          },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(data => {
            console.log("Success:", data);
            // Optionally reset the form or handle success state
            setFormData({
              name: '',
              address: '',
              city: '',
              country: '',
              zip_code: '',
              contact_method: 'phone',
              phone_number: '',
              email: ''
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      
    
      return (
        <div className="App">
          <h1>Contact Information Form</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="zip_code">Zip Code:</label>
              <input
                type="text"
                id="zip_code"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div className="form-group">
            <label>Contact Method:</label>
            <div className="contact-method">
            <label>
                <input
                type="radio"
                name="contact_method"
                value="phone"
                checked={formData.contact_method === 'phone'}
                onChange={handleInputChange}
                />
                Phone
            </label>
            <label>
                <input
                type="radio"
                name="contact_method"
                value="email"
                checked={formData.contact_method === 'email'}
                onChange={handleInputChange}
                />
                Email
            </label>
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required={formData.contact_method === 'phone'}
            />
        </div>

        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required={formData.contact_method === 'email'}
            />
        </div>
    
        <button type="submit">Submit</button>
        </form>
        <Link to="/employee"><button className='add-button'>View all Employees</button></Link>
        </div>
      );
}

