import express from 'express'
import { sendMessage,getMessages,deleteMessage } from './../controller/messageController.js';
import {isAdminAuthenticated} from './../middlewares/auth.js'
const router = express.Router();

router.post('/send',sendMessage);
router.get('/getall',isAdminAuthenticated,getMessages);
router.delete('/delete/:id',isAdminAuthenticated,deleteMessage);

export default router;