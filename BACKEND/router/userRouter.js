import express from 'express'
import { addNewAdmin, getAllDoctors, getUserDetails, pateintRegister , logoutAdmin , logoutPatient, addNewDoctor, doctorLogin , deleteDoctor } from './../controller/userContoller.js';
import {login} from './../controller/userContoller.js'
const router = express.Router();
import {isAdminAuthenticated,isPatientAuthenticated} from './../middlewares/auth.js'




router.post("/patient/register",pateintRegister)
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated ,addNewAdmin);
router.get("/admin/me", isAdminAuthenticated ,getUserDetails);
router.get("/patient/me", isPatientAuthenticated ,getUserDetails);
router.get("/doctors", getAllDoctors);
router.get("/admin/logout", isAdminAuthenticated , logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated ,logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated ,addNewDoctor);
router.delete("/doctor/delete/:id", isAdminAuthenticated ,deleteDoctor);     
router.post("/doctor/login", isAdminAuthenticated ,doctorLogin);

export default router;