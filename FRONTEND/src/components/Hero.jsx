import React from "react";
import heroImg from "../assets/images/4.png";

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

function Hero() {
  return (
    <div className="hero mt-10 container mx-auto px-4 py-12 border-b-2 border-zinc-950">
      <div className="flex flex-col md:flex-row">
        <div className="boxone flex flex-col justify-center items-center md:w-1/2 mb-8 md:mb-0 md:ml-20">
          <h1
            style={customFontStyle2}
            className="text-4xl md:text-7xl p-4 text-center md:text-left"
          >
            Galaxy <span className="text-green-700">Hospital</span>
          </h1>
          <p
            style={customFontStyle}
            className="leading-tight text-xl md:text-2xl text-green-800 pb-4 md:pb-8 text-center md:text-left"
          >
            We Care , We Treat , We Cure .
          </p>
          <span
            style={customFontStyle2}
            className="text-2xl md:text-4xl text-center md:text-left"
          >
            Your Health is Our Responsbility.
          </span>
          <button className="border shadow-xl border-green-800 p-3 md:p-4 mt-6 md:mt-8 rounded hover:bg-black hover:text-white hover:border-white text-sm md:text-base">
            Checkout For Services
          </button>
        </div>
        <div className="boxtwo w-full md:w-1/2 flex justify-center md:justify-end">
          <img className="w-64 md:w-96 md:mr-60" src={heroImg} alt="Hero" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
