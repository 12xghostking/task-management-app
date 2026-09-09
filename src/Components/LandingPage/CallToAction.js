import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaArrowRight } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <div className="glass-card p-5 text-center my-5 position-relative overflow-hidden">
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="position-relative z-1">
        <div className="brand-icon mx-auto mb-3" style={{ width: 48, height: 48 }}>
          <FaRocket size={22} color="#fff" />
        </div>

        <h2 className="display-6 fw-bold mb-3">
          Ready to transform your <span className="gradient-text">team productivity</span>?
        </h2>

        <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '520px' }}>
          Join high-performing teams managing tasks effortlessly. Create your account in seconds
          or sign in to access your dashboard.
        </p>

        <div className="d-flex justify-content-center flex-wrap gap-3">
          <Link to="/signup" className="btn-modern-primary py-3 px-4">
            Get Started Now <FaArrowRight />
          </Link>
          <Link to="/login" className="btn-modern-secondary py-3 px-4">
            Sign In to Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
