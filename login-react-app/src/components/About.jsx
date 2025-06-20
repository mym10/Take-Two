import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = ({ currentTheme }) => {
    const navigate = useNavigate();

    const onAction = () => {
        navigate("/home");
    };

    const dynamicStyles = {
        backgroundColor: currentTheme.translucent,
        color: currentTheme.color,
        boxShadow: currentTheme.color === '#fff' // Assuming color indicates theme
            ? '0 4px 10px rgba(0, 0, 0, 0.2)' 
            : '0 4px 10px rgba(200, 200, 200, 0.5)',
    };

    const buttonStyles = {
        backgroundColor: currentTheme.color === '#fff' ? '#333' : 'lightgray',
        color: currentTheme.color === '#fff' ? 'lightgray' : '#333',
        border: currentTheme.color === '#fff' ? '1px solid white' : '1px solid black',
    };

    return (
        <div className="about-page">
            <div className="about-page-content" style={dynamicStyles}>
                <div className="about-header">
                    <h1 style={{ margin: "30px" }}>About Us</h1>
                    <p style={{ color: currentTheme.color }}>
                        Welcome to TakeTwo, your ultimate destination for discovering and enjoying movies! We are a passionate team of movie lovers dedicated to bringing you a seamless and personalized experience.
                    </p>
                </div>
                <div className="about-footer">
                    <p style={{ color: currentTheme.color }}>
                        Join us in celebrating the magic of cinema—one movie at a time!
                    </p>
                    <button
                        className="button"
                        onClick={onAction}
                        style={{ ...buttonStyles, width: "200px", marginTop: "10px" }}
                    >
                        Watch Now!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
