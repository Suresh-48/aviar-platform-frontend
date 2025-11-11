import React, { useState, useEffect } from 'react';
import '../CSS/Menu.css';
import Education from './Education.jsx';
import Experience from './Experience';
import OnlineProfile from './OnlineProfile.jsx';
import TeacherApplicationForm from './TeacherApplicationForm.jsx';
import Api from '../../Api.jsx';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [educationData, setEducationData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [onlineProfileData, setOnlineProfileData] = useState(null);

  const steps = [
    { number: 1, topic: 'Education' },
    { number: 2, topic: 'Experience' },
    { number: 3, topic: 'Online Profile' },
    { number: 4, topic: 'Application Form' },
  ];

  const nextStep = () => {
    if (activeItem < steps.length && isFormValid) {
      setActiveItem(activeItem + 1); // Move to the next step
      setIsFormValid(false); // Reset validation for the next form
    }
  };

  const prevStep = () => {
    if (activeItem > 1) {
      setActiveItem(activeItem - 1); // Move to the previous step
      setIsFormValid(false); // Reset validation for the previous form
    }
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    const applicationStatus = "Review";

    // API call to submit application (uncomment and implement as needed)
    Api.post(`api/v1/teacherApplication`, {
      teacherId: teacherId,
      education: value.educationData,
      experience: value.experienceData,
      profile: value.profileData,
      userId: userId,
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Updated Successfully");
          // history.push("/teacher/application/details");

          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          toast.error(error.response.data.message);
        }
        if (error?.response?.status === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const progressWidth = ((activeItem - 1) / (steps.length - 1)) * 100;

  // Debugging: Log isFormValid state
  useEffect(() => {
    console.log('isFormValid:', isFormValid);
  }, [isFormValid]);

  return (
    <div>
      {/* Stepper */}
      <div className="stepper">
        <div
          className="progress-line"
          style={{ width: `${progressWidth}%` }}
        ></div>
        {steps.map((step) => (
          <div
            key={step.number}
            className={`stepper-item ${activeItem === step.number ? 'active' : ''
              } ${activeItem > step.number ? 'completed' : ''}`}
          >
            <div className="stepper-number">{step.number}</div>
            <div className="stepper-topic">{step.topic}</div>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="form-container">
        {activeItem === 1 && (
          <Education
            onFormValidityChange={setIsFormValid}
            onSubmit={nextStep}
            setEducationData={setEducationData}
          />
        )}
        {activeItem === 2 && (
          <Experience
            onFormValidityChange={setIsFormValid}
            onSubmit={nextStep}
            setExperienceData={setExperienceData}
          />
        )}
        {activeItem === 3 && (
          <OnlineProfile
            onFormValidityChange={setIsFormValid}
            onSubmit={nextStep}
            setOnlineProfileData={setOnlineProfileData}
          />
        )}
        {activeItem === 4 && (
          <TeacherApplicationForm
            educationData={educationData}
            experienceData={experienceData}
            onlineProfileData={onlineProfileData}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        {activeItem > 1 && (
          <button onClick={prevStep} className="nav-button previous">
            Previous
          </button>
        )}
        {activeItem < steps.length ? (
          <button
            onClick={nextStep}
            className="nav-button next"
            disabled={!isFormValid}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="nav-button next"
            disabled={!isFormValid}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;