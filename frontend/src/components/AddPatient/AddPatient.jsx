import React, { useState } from 'react';
import './AddPatient.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AddPatient = () => {
  const initialPatientState = {
    fname: '',
    lname: '',
    age: '',
    gender: '',
    contact: '',
    medicalHistory: '',
    address: ''
  };

  const [patient, setPatient] = useState(initialPatientState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/create', patient);

      if (response.data.message) {
        toast.success(response.data.message, { position: 'top-right' });
      }

      console.log('Saved patient data:', response.data.data);
      navigate('/');
      setPatient(initialPatientState);

    } catch (error) {
      toast.error('Error occurred while saving data', { position: 'top-right' });
      console.error('Error while saving data:', error.message || error.response.data);
    }
  };

  return (
    <div className='addPatient'>
      <Toaster />
      <Link to={'/'}>Back</Link>
      <h3>Add New Patient</h3>
      <form className='addPatientForm' onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id='fname'
            name='fname'
            autoComplete='off'
            placeholder='First Name'
            onChange={inputHandler}
            value={patient.fname}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id='lname'
            name='lname'
            autoComplete='off'
            placeholder='Last Name'
            onChange={inputHandler}
            value={patient.lname}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id='age'
            name='age'
            autoComplete='off'
            placeholder='Enter Age'
            onChange={inputHandler}
            value={patient.age}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="gender">Gender</label>
          <select
            id='gender'
            name='gender'
            onChange={inputHandler}
            value={patient.gender}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="contact">Contact No.</label>
          <input
            type="text"
            id='contact'
            name='contact'
            autoComplete='off'
            placeholder='Enter Contact No.'
            onChange={inputHandler}
            value={patient.contact}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="medicalHistory">Medical History</label>
          <textarea
            id='medicalHistory'
            name='medicalHistory'
            rows="3"
            placeholder='Enter Medical History'
            onChange={inputHandler}
            value={patient.medicalHistory}
          ></textarea>
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id='address'
            name='address'
            autoComplete='off'
            placeholder='Enter Address'
            onChange={inputHandler}
            value={patient.address}
          />
        </div>
        <div className="inputGroup">
          <button type='submit'>Add Patient</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
