import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  medicalHistory: { type: String },
  address: { type: String },
});

export default mongoose.model('Patient',patientSchema)