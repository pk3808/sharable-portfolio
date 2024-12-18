// src/components/GameSplash.js
import { motion } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import Robos from "/images/robos.gif";

const GameSplash = ({ onDismiss }) => {
  const startSound = useRef(null); // Reference to the start sound

  const handleStartClick = () => {
    if (startSound.current) {
      startSound.current.play(); // Play the sound
    }

    // Dismiss the splash screen after 3 seconds
    setTimeout(() => {
      onDismiss();
    }, 2000);
  };

  useEffect(() => {
    // Cleanup: Pause the sound if the component unmounts
    return () => {
      if (startSound.current) {
        startSound.current.pause();
        startSound.current.currentTime = 0; // Reset to the start
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[#1a1a2e] text-white z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="sci-fi-border text-center p-8 w-[90%] md:w-[60%] py-16 bg-[#1a1a2e] relative text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to Brick Breaker Game!</h2>
        <p className="mb-4 ">
          Dive into an exciting journey through different screens, each revealing a unique part of who I am! 
          Use the <span className="text-yellow-400">⇦ Left</span> and <span className="text-yellow-400">Right ⇨</span> arrow keys on your keyboard, or swipe with your finger on mobile, to move the paddle.
          Break the special bricks, unlock surprises, and learn more about my projects, skills, and more. Get ready to have fun while discovering my world!
        </p>
        <button
          className="mode-button mt-2 px-6 py-2 font-['MyCustomFont'] transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          onClick={handleStartClick}
        >
          Start Game
        </button>
        <audio ref={startSound} src="/sound/start.mp3" preload="auto"></audio>
      </div>
    </motion.div>
  );
};

export default GameSplash;
