import express from 'express'
import { create, deleteData, getData, getone, update } from '../controller/patientController.js';


const route=express.Router();

route.post('/create',create)
route.get('/patients',getData)
route.get('/patient/:id',getone)
route.put('/update/:id',update)
route.delete('/delete/:id',deleteData)
export default route;


