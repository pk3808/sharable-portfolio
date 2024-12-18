import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import "../App.css";
import { useNavigate } from "react-router-dom";
import pro from "../assets/professional.png";
import game from "../assets/game.png";

const SplashScreen = ({ onSelectMode }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowOptions(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-screen flex flex-col items-center justify-center min-h-screen text-center text-white p-4">
      {!showOptions ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md animate-fade-in">
          <p className="mb-12 text-xl font-semibold">
            Choose your experience mode to explore my portfolio!
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-8 items-center justify-center space-y-4 sm:space-y-0">
            <div className="text-center">
              <div className="h-20 w-20 mx-auto animate-swing-bounce">
                <img src={pro} alt="Professional Mode" className="w-full h-full" />
              </div>
              <button
                onClick={() => navigate('/home')}
                className="mode-button mt-2 px-6 py-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Default Mode
              </button>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 mx-auto animate-swing-bounce">
                <img src={game} alt="Game Mode" className="w-full h-full" />
              </div>
              <button
                onClick={() => navigate('/game')}
                className="mode-button mt-2 px-6 py-2 font-['MyCustomFont'] transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Game Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
