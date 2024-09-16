import React from 'react';
import bne from '../assets/images/5.png'; // Replace with an actual hospital image if available
const customFontStyle = {
  fontFamily: "'Neue Montreal Regular', sans-serif",
  fontWeight: 600,
  fontStyle: "normal",
};
const customFontStyle2 = {
  fontFamily: "'Test Founders Grotesk X-Cond Sm', sans-serif",
  fontWeight: 600,
  fontStyle: "normal",
};

const customFontStyle3 = {
  fontFamily: "'Aquire Regular', sans-serif",
  fontWeight: 600,
  fontStyle: "normal",
};

function Biography() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Image and Introduction Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 mb-16">
        {/* Image Section */}
        <div className="banner w-full lg:w-1/2">
          <img
            src={bne}
            alt="Our Hospital"
            className="rounded-2xl  w-full h-124 transform hover:scale-105 transition duration-500 ease-in-out"
          />
        </div>

        {/* Text Section */}
        <div className="banner w-full lg:w-1/2 text-center lg:text-left space-y-6 p-20">
          <p style={customFontStyle} className="text-lg font-semibold text-blue-600 uppercase tracking-widest mb-4">About Us</p>
          <h3 style={customFontStyle} className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">YOUR HEALTH, OUR PRIORITY</h3>
          <p  className="text-xl text-gray-600 leading-relaxed mb-4">
            At Galaxy Hospital, we are dedicated to providing compassionate, high-quality healthcare to our community. With over 50 years of experience, our team of skilled professionals is committed to enhancing the well-being of every patient we serve.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our hospital is equipped with state-of-the-art facilities and advanced medical technologies, ensuring that our patients receive the best possible care. From routine check-ups to complex surgeries, we are here to support you every step of the way.
          </p>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-8 rounded-xl shadow-lg text-center lg:text-left max-w-5xl mx-auto">
        <p style={customFontStyle} className="text-3xl font-bold text-blue-900 mb-6">WHY CHOOSE US?</p>
        <p  className="text-xl  text-gray-700 mb-4">
          At Galaxy Hospital, we offer a comprehensive range of medical services, including emergency care, specialized treatments, and outpatient services. Our multidisciplinary team works collaboratively to provide personalized care tailored to each patient's unique needs.
        </p>
        <p className="text-xl text-gray-700 mb-4">
          We believe in the importance of preventive medicine and patient education, empowering you to make informed decisions about your health. Our patient-centered approach, combined with cutting-edge technology, makes us a trusted healthcare provider in the region.
        </p>
        <p className="text-xl text-gray-700">
          Experience the difference at Galaxy Hospital – where your health is our priority.
        </p>
      </div>
    </div>
  );
}

export default Biography;
