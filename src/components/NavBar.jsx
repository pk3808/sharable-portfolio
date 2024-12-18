import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faBlog, faHome, faWrench, faEnvelope, faCode, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import collapse from '/images/collapse.png';
const NavBar = ({ darkMode }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState('/'); // Track the active route
  const [visible, setVisible] = useState(true); // Track visibility of the NavBar
  const [scrolling, setScrolling] = useState(false); // Track if scrolling is happening
  let lastScrollY = window.scrollY; // Store last scroll position
  const location = useLocation();
  const isHome = location.pathname === "/home"
  const [navbarVisible, setNavbarVisible] = useState(true);
  console.log(isHome, 'iii');


  const handleNavigation = (path) => {
    setActive(path);
    navigate(path);
    if (isHome) {
      setActive("/home")
    }
  };

  const handleScroll = () => {
    if (!scrolling) {
      setScrolling(true);
    }

    if (window.scrollY > lastScrollY) {
      setVisible(false); // Scrolling down
    } else {
      setVisible(true); // Scrolling up
    }
    lastScrollY = window.scrollY; // Update last scroll position
  };

  useEffect(() => {
    const onScroll = () => {
      handleScroll();
      clearTimeout(window.scrollTimeout);

      window.scrollTimeout = setTimeout(() => {
        setScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);
  useEffect(() => {
    setActive(location.pathname);
  })
  const toggleNavbar = () => {
    setNavbarVisible((prevState) => !prevState);
  };
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* NavBar for screens md and above */}
      {navbarVisible && (
        <nav
          className={`fixed bottom-5 left-10 right-10 z-50 py-4 shadow-lg rounded-[25px] 
             ${darkMode ? 'bg-[#01411C] text-white' : 'bg-[#FFDDCC] text-gray-800'} hidden md:block`}
        >

          <div className="container mx-auto flex justify-evenly ">
            <div className={`flex items-center rounded-full  ${darkMode ? 'bg-lime-300' : 'bg-orange-400  hover:scale-[1.4]'} `}>
              <img src={collapse} alt="collapse" className="w-6 h-6 cursor-pointer  hover:animate-spin mx-2 my-2"  onClick={toggleNavbar} />
            </div>
            <div className="flex row w-[80%] mr-[7%] rounded-[25px] justify-between items-center space-x-4">
            {/* Projects Button */}
            <button
              onClick={() => handleNavigation('/projects')}
              className={`text-lg flex items-center space-x-2 ${active === '/projects'
                ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
            >
              <FontAwesomeIcon icon={faProjectDiagram} />
              <span>Projects</span>
            </button>

            {/* Blogs Button */}
            <button
              onClick={() => handleNavigation('/blogs')}
              className={`text-lg flex items-center space-x-2 ${active === '/blogs'
                ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
            >
              <FontAwesomeIcon icon={faBlog} />
              <span>Blogs</span>
            </button>

            {/* Home Button */}
            <button
              onClick={() => handleNavigation('/home')}
              className={`text-lg flex items-center space-x-2 ${active === '/home' && isHome
                ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </button>

            {/* Skills Button */}
            <button
              onClick={() => handleNavigation('/skills')}
              className={`text-lg flex items-center space-x-2 ${active === '/skills'
                ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
            >
              <FontAwesomeIcon icon={faWrench} />
              <span>Skills</span>
            </button>

            {/* Contact Button */}
            <button
              onClick={() => handleNavigation('/contact')}
              className={`text-lg flex items-center space-x-2 ${active === '/contact'
                ? darkMode ? 'font-bold text-[#7cfc00]' : 'font-bold text-[#FA5F55]'
                : darkMode ? 'hover:text-[#7cfc00] text-white' : 'hover:text-[#f67680] text-[#235347]'
                }`}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Contact</span>
            </button>
            </div>
          </div>
        </nav>
      )}
      {!navbarVisible && (
        <div className="fixed left-5 bottom-10 z-50">
          <div className={`flex items-center rounded-full h-[40] w-[40] ${darkMode ? 'bg-lime-300' : 'bg-orange-400'} `}>
            <img src={collapse}  onClick={toggleNavbar}  alt="collapse" className="w-6 h-6 cursor-pointer hover:animate-spin mx-2 my-2" />
          </div>
        </div>
      )}


      {/* NavBar for screens below md (icons only) */}
      <nav
        className={`fixed bottom-2 left-5 right-5 z-50 py-[15px] rounded-[10px] 
          ${darkMode ? 'bg-[#014421] drop-shadow-2xl text-white' : 'bg-[#FFDDCC] text-gray-800'} md:hidden`}
      >
        <div className="container mx-auto flex justify-evenly">
          <button
            onClick={() => handleNavigation('/projects')}
            className={`${active === '/projects' ? darkMode ? 'text-[#7cfc00]' : 'text-[#FA5F55]' : darkMode ? 'text-white' : 'text-gray-800'} transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faProjectDiagram}
              className={`${active === '/projects' ? 'text-3xl' : 'text-xl'}`}
            />
          </button>

          <button
            onClick={() => handleNavigation('/blogs')}
            className={`${active === '/blogs' ? darkMode ? 'text-[#7cfc00]' : 'text-[#FA5F55]' : darkMode ? 'text-white' : 'text-gray-800'} transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faBlog}
              className={`${active === '/blogs' ? 'text-3xl' : 'text-xl'}`}
            />
          </button>

          <button
            onClick={() => handleNavigation('/home')}
            className={`${active === '/home' ? darkMode ? 'text-[#7cfc00]' : 'text-[#FA5F55]' : darkMode ? 'text-white' : 'text-gray-800'} transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`${active === '/home' ? 'text-3xl' : 'text-xl'}`}
            />
          </button>

          <button
            onClick={() => handleNavigation('/skills')}
            className={`${active === '/skills' ? darkMode ? 'text-[#7cfc00]' : 'text-[#FA5F55]' : darkMode ? 'text-white' : 'text-gray-800'} transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faWrench}
              className={`${active === '/skills' ? 'text-3xl' : 'text-xl'}`}
            />
          </button>

          <button
            onClick={() => handleNavigation('/contact')}
            className={`${active === '/contact' ? darkMode ? 'text-[#7cfc00]' : 'text-[#FA5F55]' : darkMode ? 'text-white' : 'text-gray-800'} transition duration-300`}
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className={`${active === '/contact' ? 'text-3xl' : 'text-xl'}`}
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
