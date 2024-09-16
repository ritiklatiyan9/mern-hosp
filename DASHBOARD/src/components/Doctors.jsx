import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import { motion } from "framer-motion";
import { Mail, Phone, Briefcase, Search, Trash2 } from "lucide-react";

const DoctorCard = ({ doctor, onDelete }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="relative h-48">
      <img
        src={doctor.docAvatar.url || "/api/placeholder/400/300"}
        alt={`${doctor.firstName} ${doctor.lastName}`}
        className="w-full h-full object-cover"
        onError={(e) => e.target.src = "/api/placeholder/400/300"}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h2 className="text-xl font-semibold text-white">{`${doctor.firstName} ${doctor.lastName}`}</h2>
        <p className="text-sm text-gray-300">{doctor.doctorDepartment}</p>
      </div>
    </div>
    <div className="p-4 space-y-2">
      <div className="flex items-center text-gray-600">
        <Mail className="w-4 h-4 mr-2" />
        <p className="text-sm truncate">{doctor.email}</p>
      </div>
      <div className="flex items-center text-gray-600">
        <Phone className="w-4 h-4 mr-2" />
        <p className="text-sm">{doctor.phone}</p>
      </div>
      <div className="flex items-center text-gray-600">
        <Briefcase className="w-4 h-4 mr-2" />
        <p className="text-sm">{doctor.doctorDepartment}</p>
      </div>
      <button
        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full"
        onClick={() => onDelete(doctor._id)}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/doctors`, {
          withCredentials: true,
        });
        setDoctors(response.data.doctors);
      } catch (error) {
        toast.error("Failed to fetch doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/doctor/delete/${id}`, {
        withCredentials: true,
      });
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
      toast.success("Doctor deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete doctor: ${error.response?.data?.message || error.message}`);
    }
  };
  const filteredDoctors = doctors.filter(doctor => 
    `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.doctorDepartment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mt-10 mx-auto">
        <motion.h1
          className="text-5xl font-bold text-zinc-950 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Medical Experts
        </motion.h1>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors..."
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <motion.div
          className="grid text-zinc-950 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} onDelete={deleteDoctor} />
          ))}
        </motion.div>

        {filteredDoctors.length === 0 && (
          <motion.p
            className="text-center text-zinc-900 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No doctors found matching your search.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
