import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Blogs from '../pages/Blogs';
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Contact from '../pages/Contact';
import SplashScreen from '../pages/SplashScreen';
import Game from '../games/Game';

const AppRoutes = ({ darkMode }) => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Home  darkMode={darkMode}/>} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/projects" element={<Projects darkMode={darkMode} />}  />
      <Route path="/skills" element={<Skills />} />
      <Route path="/contact" element={<Contact  darkMode={darkMode} />} />
      {/* <Route path="/game" element={<BrickBreaker />} /> */}
      <Route path="/game" element={<Game darkMode={darkMode}/>} />
    </Routes>
  );
};

export default AppRoutes;
