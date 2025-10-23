import React, { createContext, useState, useContext } from 'react';

// Create a context
const FormContext = createContext();

// Provide the context to the components
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    profile: { name: '', email: '' },
    education: { school: '', degree: '', year: '' },
    experience: { company: '', role: '', duration: '' },
  });

  const updateFormData = (section, data) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: { ...prevState[section], ...data },
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use form context
export const useFormContext = () => {
  return useContext(FormContext);
};
