import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const ToggleButton = ({ darkMode, toggleTheme }) => {
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        if (spinning) {
            // Remove the spin class after the animation duration (0.3s)
            const timeout = setTimeout(() => setSpinning(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [spinning]);

    const handleClick = () => {
        setSpinning(true); // Trigger the spin animation
        toggleTheme(); // Switch the theme
    };

    return (
        <div 
            className={`theme-toggle-button ${darkMode ? 'dark' : 'light'} `}
            onClick={handleClick}
            style={{
                justifyContent: darkMode ? 'flex-end' : 'flex-start' // Set justify-content based on the theme
            }}
        >
            <div className="toggle-indicator">
                {/* Add icon based on dark mode */}
                <FontAwesomeIcon 
                    icon={darkMode ? faMoon : faSun} 
                    className={spinning ? 'spin' : ''} // Add 'spin' class when spinning is true
                    style={{ color: darkMode ? 'black' : 'black' }} // Change icon color based on the theme
                />
            </div>
        </div>
    );
}

export default ToggleButton;
