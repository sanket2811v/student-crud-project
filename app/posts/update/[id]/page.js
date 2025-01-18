"use client"; // Ensure this component is client-side only
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../../app/createstyle.css";

const Update = () => {
  const [name, setName] = useState("");
  const [standard, setStandard] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
  const [fees, setFees] = useState("");
  const [id, setId] = useState(""); // Store the dynamic ID
  const [message, setMessage] = useState(""); // For user feedback

  useEffect(() => {
    // Check if we are on the client-side (browser)
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split('/');
      const dynamicId = pathParts[pathParts.length - 1]; // Get the last part of the URL
      setId(dynamicId.split('=')[1]); // Set the ID from the URL
    }
  }, []); // Run only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !standard || !age || !status || !fees) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      // Send data to the backend
      const response = await axios.post("http://localhost:3000/api/update-user", {
        id : parseInt(id),
        name,
        standard: parseInt(standard), // Convert to number
        age: parseInt(age), // Convert to number
        status,
        fees: parseInt(fees), // Convert to number
      });

      setMessage("Update successful!"); // Show success message
      console.log("Update successful:", response.data);
    } catch (error) {
      setMessage("Update failed. Please try again."); // Show error message
      console.error("Update failed:", error);
    }
  };
    
  return (
    <div>
      <h1>Update the Post</h1>
      {message && <p>{message}</p>} {/* Display feedback */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the Standard"
          value={standard}
          onChange={(e) => setStandard(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the Fees"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default Update;
