import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function Appointment() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white border border-zinc-950 rounded-xl shadow-lg p-8 max-w-md w-full sm:max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center p-4 text-gray-800 mb-6">
          Appointment Management
        </h1>
        <div className="space-y-6 mt-10">
          {/* Book an Appointment Button */}
          <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate('/appointmentform')}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-white bg-black   rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <CalendarIcon className="h-6 w-6" />
            <span className="font-medium">Book an Appointment</span>
          </motion.button>
          
          {/* My Appointments Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate('/myappointments')}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-white bg-zinc-950 rounded-lg hover:bg-green-600 transition duration-300"
          >
            <ClipboardIcon className="h-6 w-6" />
            <span className="font-medium">My Appointments</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Footer Text */}
      <p className="mt-8 p-4 text-center text-gray-800 text-2xl sm:text-base">
        Manage your appointments with ease. Book a new appointment or view your existing ones.
      </p>
    </div>
  );
}

export default Appointment;
