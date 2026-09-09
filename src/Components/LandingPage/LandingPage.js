import React from 'react';
import Header from '../Header/Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import CallToAction from './CallToAction';
import { Container } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <div className="landing-page-wrapper">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Container>
        <CallToAction />
      </Container>
      <footer className="text-center py-4 text-muted small border-top border-secondary border-opacity-10">
        <Container>
          <p className="mb-0">
            © {new Date().getFullYear()} Task-Orchestrator. Built with React, Node.js & MongoDB.
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
