import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import TimeLIne from "../components/TimeLIne";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import { tr } from "framer-motion/client";
const Home = ({ darkMode }) => {
  console.log("Rendering Home with darkMode:", darkMode);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("/images/flyingd.png"); // Default image
  let scrollTimeout = null;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setScrollingUp(false);
        setImageSrc("/images/flyingd.png"); // Normal image when scrolling down
      } else {
        // Scrolling up
        setScrollingUp(true);
        setImageSrc("/images/flyingu.png"); // Different image or rotate the existing one
      }

      setShowFlyingImage(true); // Show the flying image

      lastScrollY = currentScrollY;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Hide the flying image after scrolling stops
      scrollTimeout = setTimeout(() => {
        setShowFlyingImage(false);
      }, 200); // Adjust the delay if needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout); // Clean up timeout on unmount
      }
    };
  }, []);
  return (
    <ParallaxProvider>
      {showFlyingImage && (
        <motion.div
          className="fixed top-[20vh] right-0 transform-gpu md:w-[70px] md:h-[75px] w-[50px] h-[200px] z-50"
          initial={{ x: 0 }}
          animate={{
            x: scrollingUp ? [0, 5, -5, 0] : [0, -5, 5, 0],
            y: window.scrollY > 100 ? [0, 0] : [window.scrollY, window.scrollY], // Adjust vertical movement
          }}
          transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
          style={{
            transformOrigin: "center",
            position: "fixed", // Fix position relative to viewport
            top: "20vh", // You can adjust this for where you want the image to appear
            right: "0",
            transform: scrollingUp ? "rotateY(180deg)" : "rotateY(0deg)", // Rotate when scrolling up
          }}
        >
          <img
            src={imageSrc}
            alt="Flying Image"
            className="w-[40px] md:w-[70px] h-[65px] md:h-[75px] object-contain rounded-lg z-50 absolute"
          />
        </motion.div>
      )}

      <div className="container mx-auto py-16 min-h-screen px-4 md:px-8 lg:px-16 home-background  ">
        <div className="relative group cursor-pointer">
          {/* Image with bounce animation */}
          <img
            src="/images/game.png"
            alt="Game Mode"
            className="w-[45px] md:w-[60px] h-[65px] md:h-[65px] object-contain rounded-lg z-50 absolute md:left-[-4%] animate-pulse transition-transform duration-300 ease-in-out group-hover:scale-110 top-[-6vhvh]"
            onClick={() => {
              window.location.href = "/game"; // Adjust the navigation route if needed
            }}
          />
          {/* Tooltip with animation */}
          <div className="absolute left-[1%]  items-center p-2 bg-gray-800 text-white text-sm rounded shadow-md transform transition-opacity duration-1000 ease-in-out opacity-0 group-hover:opacity-100">
            <span>Tap to check game mode!</span>
          </div>
        </div>

        <Parallax speed={-12}>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-4xl font-bold text-center md:mt-8 mt-20 font-['MyCustomFont']"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome to My Portfolio
          </motion.h1>

          <motion.p
            className="text-center mt-4 text-base md:text-lg lg:text-lg font-['MyCustomFont']"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            Explore my work and get to know me!
          </motion.p>

          <div className="flex md:flex-row flex-col items-center justify-around">
            <div
              className={`fradius ${
                darkMode ? "bg-[#043927]" : "bg-[#FBCEB1]"
              } mt-20 md:mt-5 `}
            >
              <motion.div
                className="flex justify-center  items-center"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.3, ease: "easeOut" }}
              >
                <img
                  src={"/images/avataar.png"}
                  alt="Profile"
                  className=" md:w-[100%] md:max-h-[50vh] w-[350px] h-[350px] rounded-full  transition-shadow duration-300 ease-in-out "
                />
                {/* Scrolling icon animation */}
              </motion.div>
            </div>
            <motion.div
              className="md:hidden mt-[8vh] flex justify-center border border-gray-400  rounded-full p-2 pt-4"
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
            <motion.div
              className="flex justify-center mt-[10vh] md:mt-4 items-center w-[105%] md:w-[40%] "
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
            >
              <div className="mt-4 md:max-w-[100%] md:w-[100%] max-w-[95%] text-white rounded-lg shadow-lg overflow-hidden md:h-[300px]">
                <div
                  className={`flex justify-between items-center p-2 ${
                    darkMode
                      ? "bg-[#1B4D3E] text-white"
                      : "bg-[#FBCEB1] text-gray-800"
                  }`}
                >
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <p className="text-sm font-mono">Download</p>
                </div>
                <div
                  className={`p-4 font-mono text-sm ${
                    darkMode
                      ? "bg-[#023020] text-white"
                      : "bg-[#F2D2BD] text-gray-800"
                  }`}
                >
                  <p className="text-gray-400">// About me</p>
                  <h2 className="text-sm mb-2">
                    Hello, This is{" "}
                    <span
                      className={`${
                        darkMode ? "text-yellow-400" : "text-cyan-600"
                      }`}
                    >
                      Your name
                    </span>
                    , I'm a Professional Software Developer.
                  </h2>
                  <h2 className="text-xl text-cyan-400 mb-2">
                    Download My Resume
                  </h2>
                  <p className="text-gray-400">
                    // Click below to download my resume in PDF format
                  </p>
                  <pre
                    className={`${
                      darkMode
                        ? "bg-[#18453B] text-white"
                        : "bg-[#F89880] text-black"
                    } p-4 rounded-md mt-2 w-full overflow-x-auto`}
                  >
                    <code
                      className={`block whitespace-pre-wrap break-words text-sm ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      &lt;<span className="text-blue-400">button</span>
                      <span className="text-yellow-400 px-2">class</span>= "
                      <span className="text-green-400">download-btn</span>
                      "&gt;Download&lt;/
                      <span className="text-blue-400">button</span>&gt;
                    </code>
                  </pre>

                  <button
                    onClick={() => {
                      window.location.href = "https://drive.google.com";
                    }}
                    className={`mt-4 ${
                      darkMode
                        ? "bg-[#ADFF2F] text-black"
                        : "bg-[#F88379] text-gray-800"
                    } text-black px-4 py-2 rounded hover:bg-cyan-400 transition`}
                    aria-label="Download Resume"
                  >
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </motion.div>
            {/* <div
              className={` flex-col items-center justify-center h-5vh absolute right-[-4vw]   hidden md:block  ${
                darkMode
                  ? "text-white bg-lime-600"
                  : "text-gray-800 bg-orange-400"
              }`}
            >
              <h2
                className={`text-sm font-bold text-center px-1 py-2 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  transform: "rotate(360deg)", // Flip text to make it natural
                }}
              >
                WELCOME
              </h2>
            </div> */}
          </div>
        </Parallax>
      </div>
      <div className="flex md:flex-row flex-col  md:h-screen items-center justify-center ">
        {/* Main Content Section */}
        <motion.div
          className="flex md:flex-row flex-col flex-grow  items-center "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-[300px] md:w-[500px] h-[300px] md:h-[300px] md:ml-[2vw] relative mb-8 image-container  md:mt-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="/images/aboutme.png"
              alt="3D Animation"
              className="rounded-lg  w-[100%] h-[100%]   object-contain"
            />
          </motion.div>

          <div className="md:text-2XL text-[1rem] px-4     text-justify  animated-border ml-[4vw] mr-[8vw] ">
            <p
              className={`leading-relaxed px-2 md:px-4 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et nihil
              qui accusantium. Aliquam minus numquam repudiandae dolore,
              debitis, nam fugit omnis corporis aspernatur excepturi eveniet
              praesentium ipsa? Eaque, vel. Expedita. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Iste reprehenderit voluptatibus
              totam maxime, cumque est magnam. Itaque iusto praesentium ipsum
              ducimus sit assumenda, saepe consequuntur enim beatae voluptatem
              nam dolore.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio consequatur esse voluptatum nostrum vel, deserunt neque maxime numquam perspiciatis rerum repudiandae aliquid quasi, iusto optio similique, enim illum veritatis tenetur.
            </p>
          </div>
        </motion.div>
        {/* Vertical About Me Section */}
        <div
          className={` flex-col items-center justify-center    hidden md:block  ${
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
              transform: "rotate(360deg)", // Flip text to make it natural
            }}
          >
            ABOUT ME
          </h2>
        </div>
      </div>
      <TimeLIne darkMode={darkMode} />
      <Skills darkMode={darkMode} show={true} hide={true} />
      <div className="h-screen">
        <Projects darkMode={darkMode} />{" "}
      </div>
      <div className="md:pl-[8vw]">
        <Contact darkMode={darkMode} hide={true} />
      </div>
      {/* Footer */}
      <footer
        className={`text-center py-4 ${
          darkMode ? "bg-[#004225] text-white" : "bg-orange-300 text-black"
        }`}
      >
        <p>
          &copy; {new Date().getFullYear()} Piyush Kumar. All Rights Reserved.
        </p>
      </footer>
    </ParallaxProvider>
  );
};

export default Home;
