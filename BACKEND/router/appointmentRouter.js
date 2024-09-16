import express from 'express';
import {getAppointments,updateAppointmentStatus,postAppointment, deleteAppointment , getMyAppointments} from "./../controller/appointmentController.js";

import { isAdminAuthenticated, isPatientAuthenticated } from './../middlewares/auth.js';
   

const router = express.Router();

router.post('/post',isPatientAuthenticated,postAppointment)
router.get('/getall',isAdminAuthenticated,getAppointments)
router.get('/getpatient',isPatientAuthenticated,getMyAppointments)


// Route definition
router.put('/update/:id', isAdminAuthenticated, updateAppointmentStatus);
router.delete('/delete/:id', isAdminAuthenticated, deleteAppointment);


export default router