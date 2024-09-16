import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { MessageCircle, Loader, AlertCircle, User, Mail, Phone, Trash } from 'lucide-react';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/message/getall`, {
          withCredentials: true,
        });
        if (response.data.success && Array.isArray(response.data.messages)) {
          setMessages(response.data.messages);
        } else {
          throw new Error('Invalid data structure');
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/message/delete/${id}`, {
        withCredentials: true,
      });
      setMessages(messages.filter((message) => message._id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message. Please try again later.');
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Messages</h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div className="flex">
            <AlertCircle className="w-6 h-6 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      ) : messages.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {messages.map((message) => (
            <div key={message._id} className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <User className="w-6 h-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                   Name : {message.firstName} {message.lastName}
                  </h3>
                </div>
                <div className="mb-2 flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <p>Email : {message.email}</p>
                </div>
                <div className="mb-4 flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <p> Mobile Number :{message.phone}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <MessageCircle className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="text-gray-700">Message :{message.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(message._id)}
                  className="mt-4 text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash className="w-5 h-5 inline-block mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <MessageCircle className="w-16 h-16 mx-auto mb-4" />
          <p className="text-xl">No messages found.</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
