import React, { useState, useEffect } from "react";

const Skills = ({ darkMode, show,hide }) => {
  const [showLogos, setShowLogos] = useState(false);
  console.log("Rendering Home with show:", show);

  useEffect(() => {
    if (show) {
      setShowLogos(true);
    }
  }, [show]); // Only run this effect when `show` changes

  const techLogos = [
    { name: "JavaScript", src: "/images/js.png" },
    { name: "React", src: "/images/reactjs.png" },
    { name: "Next.js", src: "/images/nextjs.png" },
    { name: "Tailwind CSS", src: "/images/tailwind.png" },
    { name: "React Native", src: "/images/reactnative.png" },
    { name: "Java", src: "/images/java.png" },
    { name: "C++", src: "/images/c++.png" },
    { name: "Node.js", src: "/images/node.png" },
    { name: "MongoDB", src: "/images/mongodb.png" },
    { name: "Git", src: "/images/git.png" },
  ];

  return (
    <div className="min-h-screen flex flex-row items-center justify-center">
      {/* Animated Sphere with Click Here */}
      {!showLogos && (
        <div
          className="absolute top-[45%] z-10 bg-gradient-to-r from-blue-500 to-green-400 rounded-full md:h-[80px] md:w-[80px] h-[60px] w-[60px] flex items-center justify-center animate-pop-out cursor-pointer"
          onClick={() => setShowLogos(true)}
        >
          <span className="text-white font-bold md:text-sm text-xs">Click Here</span>
        </div>
      )}

      {/* Boy Floating */}
      <div className="relative flex items-center justify-center w-[100vw] ">
        <img
          src="/images/yoga.png"
          alt="3D Animation"
          className="rounded-lg md:h-[320px] md:w-[320px] h-[280px] w-[280px] floating-effect "
        />

        {/* Rotating Circle with Logos */}
        {showLogos && (
          <div className="absolute h-[500px]  w-[400px] flex items-center justify-center rotate-animation ">
            {techLogos.map((logo, index) => (
              <div
                key={index}
                className="absolute bg-white md:h-[60px] md:w-[60px] h-[35px] w-[35px] rounded-full flex items-center justify-center shadow-lg"
                style={{
                  transform: `rotate(${(index * 360) / techLogos.length}deg) translate(200px)`,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="md:h-[50px] md:w-[50px] w-[30px] h-[30px] object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {hide && (
         <div
         className={`flex-col items-center justify-center hidden md:block  w-7 h-[135px] self-center ${
           darkMode ? "text-white bg-lime-600" : "text-gray-800 bg-orange-400"
         }`}
       >
         <h2
           className={`text-sm font-bold text-center px-1 py-2 ${
             darkMode ? "text-white" : "text-gray-800"
           }`}
           style={{
             writingMode: "vertical-rl",
             textOrientation: "upright",
             transform: "rotate(360deg)",
           }}
         >
           Skills
         </h2>
       </div>
      )}
     
    </div>
  );
};

export default Skills;
