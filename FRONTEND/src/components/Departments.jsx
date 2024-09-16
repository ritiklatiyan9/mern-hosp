import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ArrowRight, Heart, Brain, Bone, Baby, Microscope, ChevronRight } from "lucide-react";

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

const departments = [
  {
    id: 1,
    name: "Cardiology",
    description: "Expert care for heart conditions, from prevention to advanced treatments.",
    imgSrc: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    icon: Heart
  },
  {
    id: 2,
    name: "Neurology",
    description: "Specialized care for brain, spine, and nervous system disorders.",
    imgSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    icon: Brain
  },
  {
    id: 3,
    name: "Orthopedics",
    description: "Comprehensive care for bones, joints, and musculoskeletal issues.",
    imgSrc: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    icon: Bone
  },
  {
    id: 4,
    name: "Pediatrics",
    description: "Specialized healthcare for infants, children, and adolescents.",
    imgSrc: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1491&q=80",
    icon: Baby
  },
  {
    id: 5,
    name: "Oncology",
    description: "Advanced cancer care with personalized treatment plans.",
    imgSrc: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80",
    icon: Microscope
  }
];

function Departments() {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <div style={customFontStyle2} className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-6">
        <h2 style={customFontStyle} className="text-6xl font-bold text-center mb-16 text-gray-800">
          Our Specialized Departments
        </h2>
        <Carousel
          responsive={responsive}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="px-4"
          containerClass="overflow-hidden"
          transitionDuration={500}
          ssr={true}
        >
          {departments.map((department) => (
            <div key={department.id} className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={department.imgSrc} 
                  alt={department.name} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <department.icon className="text-white mr-2 h-8 w-8" />
                    <h3 className="text-3xl font-bold text-white">{department.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6 text-lg">{department.description}</p>
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg flex items-center justify-center group">
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Departments;