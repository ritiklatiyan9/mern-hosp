import { Message } from "../models/messageSchema.js";
import {catchAsyncErrors} from '../middlewares/catchAsynErrors.js'
import ErrorHandler from '../middlewares/error.js'


export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill full form",400));
    
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Sent",
  });
})

export const getMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,    
    messages
  });
})

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,    
    message
  });
})
