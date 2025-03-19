import React, { useState } from 'react';
import '../CSS/Menu.css'; // Import a CSS file for styling
import Education from './Education.jsx';
import Experience from './Experience';
import OnlineProfile from './OnlineProfile.jsx';
import Applicationform from './Applicationform.jsx';

const Menu = () => {
  // State to track the active menu item
  const [activeItem, setActiveItem] = useState(1);

  // Stepper data
  const steps = [
    { number: 1, topic: 'Education' },
    { number: 2, topic: 'Experience' },
    { number: 3, topic: 'Online Profile' },
    { number: 4, topic: 'Application Form' },
  ];

  // Function to go to the next step
  const nextStep = () => {
    if (activeItem < steps.length) {
      setActiveItem(activeItem + 1);
    }
  };

  // Function to go to the previous step
  const prevStep = () => {
    if (activeItem > 1) {
      setActiveItem(activeItem - 1);
    }
  };

  return (
    <div>
      {/* Stepper */}
      <div className="stepper">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`stepper-item ${activeItem === step.number ? 'active' : ''}`}
          >
            <div className="stepper-number">{step.number}</div>
            <div className="stepper-topic">{step.topic}</div>
          </div>
        ))}
      </div>

      {/* Conditional Rendering of Components */}
      <div className="form-container">
        {activeItem === 1 && <Education />}
        {activeItem === 2 && <Experience />}
        {activeItem === 3 && <OnlineProfile />}
        {activeItem === 4 && <Applicationform />}
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        {activeItem > 1 && (
          <button onClick={prevStep} className="nav-button">
            Previous
          </button>
        )}
        {activeItem < steps.length && (
          <button onClick={nextStep} className="nav-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;