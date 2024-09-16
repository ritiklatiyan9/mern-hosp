import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddNewDoctor from './components/AddNewDoctor';
import AddNewAdmin from './components/addNewAdmin';
import Doctors from './components/Doctors';
import Messages from './components/Messages';
import Appointment from './components/Appointment';
import Sidebar from './components/Sidebar';
import { Context } from './main';

function App() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/admin/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className={`flex-1 ${isAuthenticated ? 'ml-64' : ''} p-4`}>
          <Routes>
            <Route path='/login' element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            } />
            <Route path='/' element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path='/addnewadmin' element={
              <ProtectedRoute>
                <AddNewAdmin />
              </ProtectedRoute>
            } />
            <Route path='/addnewdoctor' element={
              <ProtectedRoute>
                <AddNewDoctor />
              </ProtectedRoute>
            } />
            <Route path='/doctors' element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            } />
            <Route path='/appointmentall' element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            } />
            <Route path='/messages' element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </Router>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default App;