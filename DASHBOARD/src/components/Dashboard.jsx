import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, Activity, DollarSign, PieChart, Settings } from 'lucide-react';

const isAuthenticated = true; // Replace with actual authentication logic

const mockData = {
  patientStats: [
    { month: 'Jan', patients: 65 },
    { month: 'Feb', patients: 59 },
    { month: 'Mar', patients: 80 },
    { month: 'Apr', patients: 81 },
    { month: 'May', patients: 56 },
    { month: 'Jun', patients: 55 },
    { month: 'Jul', patients: 40 },
  ],
  quickStats: [
    { title: 'Total Patients', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Appointments', value: '42', icon: Calendar, color: 'bg-green-500' },
    { title: 'Operations', value: '8', icon: Activity, color: 'bg-red-500' },
    { title: 'Revenue', value: '$12,345', icon: DollarSign, color: 'bg-yellow-500' },
  ],
};

const SidebarItem = ({ icon: Icon, text }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white"
  >
    <Icon size={20} />
    <span>{text}</span>
  </motion.div>
);

const QuickStatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4"
  >
    <div className={`${color} rounded-full p-3`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </motion.div>
);

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
     

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Hospital DashBoard</h1>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {mockData.quickStats.map((stat, index) => (
            <QuickStatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patient Stats Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Patient Statistics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.patientStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Medical Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Medical Insights</h2>
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://player.vimeo.com/video/215177677?autoplay=1&loop=1&background=1"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
