import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from '../main';
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa"; // Import FaCalendarCheck

const menuItems = [
  { id: 'home', label: 'Home', icon: TiHome, path: '/' },
  { id: 'doctors', label: 'Doctors', icon: FaUserDoctor, path: '/doctors' },
  { id: 'addDoctor', label: 'Add Doctor', icon: IoPersonAddSharp, path: '/addnewdoctor' },
  { id: 'addAdmin', label: 'Add Admin', icon: MdAddModerator, path: '/addnewadmin' },
  { id: 'messages', label: 'Messages', icon: AiFillMessage, path: '/messages' },
  { id: 'appointment', label: 'Appointment', icon: FaCalendarCheck, path: '/appointmentall' }, // Use FaCalendarCheck
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/admin/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success(response.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ width: isOpen ? 250 : 80 }}
        className="fixed top-0 left-0 h-full bg-white shadow-lg z-20 transition-width duration-300"
      >
        <div className="p-4 flex flex-col h-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="self-end mb-8"
          >
            <GiHamburgerMenu className="w-6 h-6 text-gray-600" />
          </motion.button>
          <ul className="flex-grow">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isOpen={isOpen}
                isActive={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
              />
            ))}
          </ul>
          <SidebarItem
            icon={RiLogoutBoxFill}
            label="Logout"
            isOpen={isOpen}
            onClick={handleLogout}
            className="text-red-500 hover:bg-red-50"
          />
        </div>
      </motion.nav>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function SidebarItem({ icon: Icon, label, isOpen, isActive, onClick, className = "" }) {
  const iconColor = isActive ? 'text-blue-600' : 'text-gray-600';

  return (
    <li className={`mb-2 ${isActive ? 'bg-gray-100' : ''} rounded-lg overflow-hidden ${className}`}>
      <motion.button
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center w-full p-3 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
        onClick={onClick}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 whitespace-nowrap overflow-hidden"
          >
            {label}
          </motion.span>
        )}
      </motion.button>
    </li>
  );
}

export default Sidebar;