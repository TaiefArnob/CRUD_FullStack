import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EditPatient = () => {
  const initialPatientState = {
    fname: '',
    lname: '',
    age: '',
    gender: '',
    contact: '',
    medicalHistory: '',
    address: '',
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(initialPatientState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`/api/patient/${id}`)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/update/${id}`, patient);

      if (response.data.message) {
        toast.success(response.data.message, { position: 'top-right' });
      }

      console.log('Updated patient data:', response.data.data);
      navigate('/');
      setPatient(initialPatientState);

    } catch (error) {
      toast.error('Error occurred while updating patient data', { position: 'top-right' });
      console.error('Error while updating patient data:', error.message || error.response.data);
    }
  };

  return (
    <div className='editPatient'>
      <Link to={'/'}>Back</Link>
      <h3>Update Patient Information</h3>
      <form className='editPatientForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id='fname'
            name='fname'
            autoComplete='off'
            placeholder='First Name'
            value={patient.fname}
            onChange={inputChangeHandler}
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
            value={patient.lname}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id='age'
            name='age'
            placeholder='Enter Age'
            value={patient.age}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={patient.gender}
            onChange={inputChangeHandler}
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="text"
            id='contact'
            name='contact'
            placeholder='Enter Contact Number'
            value={patient.contact}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="medicalHistory">Medical History</label>
          <textarea
            name='medicalHistory'
            id='medicalHistory'
            placeholder='Enter Medical History'
            value={patient.medicalHistory}
            onChange={inputChangeHandler}
            rows="4"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address</label>
          <textarea
            name='address'
            id='address'
            placeholder='Enter Address'
            value={patient.address}
            onChange={inputChangeHandler}
            rows="3"
          />
        </div>
        <div className="inputGroup">
          <button type='submit'>Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditPatient;
