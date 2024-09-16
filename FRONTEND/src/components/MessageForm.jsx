import React, { useState } from 'react';
import axios from 'axios';
import { Send, User, Mail, Phone, MessageSquare, Loader } from 'lucide-react';

const InputField = ({ icon: Icon, type, placeholder, value, onChange, name }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">{placeholder}</label>
    <div className="relative">
      <Icon className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        required
      />
    </div>
  </div>
);

const MessageForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification({ message: '', type: '' });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/message/send`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setNotification({ message: res.data.message, type: 'success' });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (error) {
      setNotification({ message: error.response?.data?.message || "An error occurred", type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <InputField 
              icon={User} 
              type="text" 
              placeholder="First Name" 
              value={formData.firstName} 
              onChange={handleChange}
              name="firstName"
            />
            <InputField 
              icon={User} 
              type="text" 
              placeholder="Last Name" 
              value={formData.lastName} 
              onChange={handleChange}
              name="lastName"
            />
          </div>
          <InputField 
            icon={Mail} 
            type="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange}
            name="email"
          />
          <InputField 
            icon={Phone} 
            type="tel" 
            placeholder="Phone" 
            value={formData.phone} 
            onChange={handleChange}
            name="phone"
          />
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</label>
            <div className="relative">
              <MessageSquare className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <Loader className="animate-spin mr-2 h-5 w-5" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
        {notification.message && (
          <div
            className={`mt-4 p-4 rounded-md text-white ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageForm;
