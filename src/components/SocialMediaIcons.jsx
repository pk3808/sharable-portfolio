import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import share from "../assets/neural.png";
const SocialMediaIcons = ({ darkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to check if the screen size is mobile
  const checkMobile = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile); // Update on resize

    return () => {
      window.removeEventListener("resize", checkMobile); // Clean up the event listener
    };
  }, []);

  return (
    <>
      {/* Social Icons for Desktop */}
      {isMobile ? null : (
        <div
          className={`social-icons-desktop  ${
            darkMode ? "bg-[#355E3B] text-white" : "bg-[#F3D7CA] text-gray-800"
          }`}
        >
          <a
            href="http://discordapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faDiscord}
              className=" hover:bg-[white] hover:text-[#5865F2]  rounded-md"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className=" hover:bg-[#E1306C] hover:text-white rounded-md"
            />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-[#fff] hover:bg-[#333] hover:text-white rounded-md"
            />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="bg-[#0077B5] hover:bg-white hover:text-[#0077B5] "
            />
          </a>
          <a href="mailto:piyush.kr.bpmce@gmail.com">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="hover:text-orange-500 rounded-md"
            />
          </a>
        </div>
      )}

      {/* Social Icons for Mobile (Dropdown) */}
      {isMobile && (
        <div className="social-icons-mobile">
          <button
            onClick={toggleDropdown}
            className={`social-toggle-btn ${darkMode ? "dark" : "light"}`}
          >
            <img src={share} className="w-8 h-8" />
          </button>

          {isDropdownOpen && (
            <div
              className={`social-dropdown ${
                darkMode
                  ? "bg-[#19616a] text-white"
                  : "bg-orange-200 text-gray-800"
              }`}
            >
              <a
                href="http://discordapp.com/users/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faDiscord}
                  className=" hover:bg-[white] hover:text-[#5865F2] h-[24px] w-[24px] rounded-md"
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://github.com/pk3808"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="mailto:piyush.kr.bpmce@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SocialMediaIcons;
