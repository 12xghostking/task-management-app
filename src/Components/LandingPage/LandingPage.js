import React from 'react';
import Header from '../Header/Header.js';
import HeroSection from './HeroSection.js';
import FeaturesSection from './FeaturesSection.js';
import { useMatch  } from 'react-router-dom';
import CallToAction from './CallToAction.js';

const LandingPage = () => {
  const match = useMatch('/features');
  const renderSection = () => {
    if (match) {
      return <FeaturesSection />;
    }
    // Add more conditions for other sections if needed
    // Return default section or null if no conditions match
    return <FeaturesSection />;
  };
  return (
    <div>
     <Header/>
      <div className="container my-5">
        <HeroSection />
      </div>
      <div className="container my-5">
        {renderSection()}
      </div>
      <div className="container my-5">
        <CallToAction />
      </div>
    </div>
  );
};

export default LandingPage;
