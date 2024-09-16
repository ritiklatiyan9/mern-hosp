import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Innovating Healthcare</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At the forefront of medical excellence, we're reshaping the future of health through compassionate care and cutting-edge technology.
          </p>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center mb-32 space-y-12 md:space-y-0 md:space-x-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              To revolutionize patient care through innovative treatments, compassionate service, and a commitment to the well-being of our community. We strive to set new standards in healthcare delivery and medical research.
            </p>
            <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out shadow-lg hover:shadow-xl">
              Discover Our Approach
            </a>
          </div>
          <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Medical Innovation" className="rounded-lg shadow-2xl object-cover h-96 w-full" />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Excellence", description: "Pursuing the highest standards in medical care and research.", icon: "🏆" },
              { title: "Compassion", description: "Treating every patient with empathy, dignity, and respect.", icon: "❤️" },
              { title: "Innovation", description: "Pioneering advancements in healthcare technology and treatments.", icon: "💡" }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Meet Our Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Dr. Emma Thompson", role: "Chief Medical Officer", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Dr. Michael Chen", role: "Head of Research", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" },
              { name: "Dr. Sarah Patel", role: "Director of Patient Care", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;