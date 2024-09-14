import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./PatientList.css";


const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/patients");
        setPatients(response.data);
      } catch (error) {
        toast.error("Error fetching patients", { position: "top-right" });
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      setPatients(patients.filter(patient => patient._id !== id));
      toast.success("Patient deleted successfully", { position: "top-right" });
    } catch (error) {
      toast.error("Error deleting patient", { position: "top-right" });
    }
  };

  return (
    <div className="patients-list">
      <h1>Patients Database Managemnet</h1>
      <Link to="/register">
        <button className="register-btn">Register New Patient</button>
      </Link>

      {patients.length === 0 ? (
        <p>No patients available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Medical History</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{`${patient.fname} ${patient.lname}`}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.contact}</td>
                <td>{patient.medicalHistory}</td>
                <td>{patient.address}</td>
                <td>
                  <Link to={`/edit-patient/${patient._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(patient._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsList;
