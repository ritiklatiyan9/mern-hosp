import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(  );
export const dbConnection = () => {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined in the environment variables.");
        return;
    }
    
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Project0"
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch(err => {
        console.error(`Error connecting to the database: ${err.message}`, err);
    });
};
