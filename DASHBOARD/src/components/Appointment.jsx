import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../main';
import { AlertCircle, MessageCircle, Trash2, Loader2, CheckCircle2, XCircle, Clock, Calendar, Mail, Phone, User, Filter, RefreshCw } from 'lucide-react';

function Appointment() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, [isAuthenticated, navigate]);

  const fetchAppointments = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/appointment/getall`, {
        withCredentials: true,
      });
      if (response.data.success && Array.isArray(response.data.appointments)) {
        setAppointments(response.data.appointments);
      } else {
        throw new Error('Invalid data structure in response');
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(`Failed to fetch appointments: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/appointment/update/${id}`, 
        { status: newStatus }, 
        { withCredentials: true }
      );
      if (response.data.success) {
        setAppointments(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment._id === id ? { ...appointment, status: newStatus } : appointment
          )
        );
        setError(null);
      } else {
        throw new Error(response.data.message || 'Update failed without error message');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setError(`Failed to update appointment status: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/appointment/delete/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setAppointments(prevAppointments => 
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
        setError(null);
      } else {
        throw new Error(response.data.message || 'Delete failed without error message');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setError(`Failed to delete appointment: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleTimeChange = async (id, time) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/appointment/update/${id}`, 
        { appointment_time: time }, 
        { withCredentials: true }
      );
      if (response.data.success) {
        setAppointments(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment._id === id ? { ...appointment, appointment_time: time } : appointment
          )
        );
        setError(null);
      } else {
        throw new Error(response.data.message || 'Update failed without error message');
      }
    } catch (error) {
      console.error('Error updating appointment time:', error);
      setError(`Failed to update appointment time: ${error.response?.data?.message || error.message}`);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status.toLowerCase() === filter;
  });

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Approved: { icon: CheckCircle2, className: 'text-green-500' },
      Pending: { icon: Clock, className: 'text-yellow-500' },
      Rejected: { icon: XCircle, className: 'text-red-500' }
    };
    const { icon: Icon, className } = statusConfig[status] || statusConfig.Pending;
    return (
      <div className={`flex items-center ${className}`}>
        <Icon className="w-4 h-4 mr-1" />
        <span className="text-sm font-medium">{status}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Appointment Dashboard</h1>
        <button 
          onClick={fetchAppointments}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-md shadow" role="alert">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-3 text-red-400" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      <div className="mb-8 bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
        <div className="flex space-x-2">
          {['all', 'pending', 'approved', 'rejected'].map((filterOption) => (
            <button 
              key={filterOption}
              onClick={() => setFilter(filterOption)} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                filter === filterOption 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center text-gray-600">
          <Filter className="w-4 h-4 mr-2" />
          <p className="text-sm font-medium">{filteredAppointments.length} appointments</p>
        </div>
      </div>

      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 truncate">{appointment.name}</h2>
                  </div>
                  <StatusBadge status={appointment.status} />
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Mail, value: appointment.email },
                    { icon: Phone, value: appointment.phone },
                    { icon: Calendar, value: appointment.date },
                  ].map(({ icon: Icon, value }, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <Icon className="w-4 h-4 mr-3 text-gray-400" />
                      <p className="text-sm truncate">{value}</p>
                    </div>
                  ))}
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-3 text-gray-400" />
                    <input
                      type="text"
                      value={appointment.appointment_time || ''}
                      onChange={(e) => handleTimeChange(appointment._id, e.target.value)}
                      className="text-sm bg-gray-50 border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter time"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <select
                    value={appointment.status}
                    onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Pending">🕒 Pending</option>
                    <option value="Approved">✅ Approved</option>
                    <option value="Rejected">❌ Rejected</option>
                  </select>
                  <button
                    onClick={() => handleDelete(appointment._id)}
                    className="w-full flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new appointment.</p>
        </div>
      )}
    </div>
  </div>

  );
}

export default Appointment;