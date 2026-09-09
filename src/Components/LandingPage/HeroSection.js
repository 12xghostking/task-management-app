import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaBolt, FaShieldAlt } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="hero-wrapper">
      <Container>
        <Row className="align-items-center gy-5">
          <Col lg={6} className="text-start">
            <div className="hero-pill animate-fade-in">
              <FaBolt className="text-warning" /> Next-Gen Productivity Suite 2.0
            </div>

            <h1 className="hero-title">
              Orchestrate tasks with{' '}
              <span className="gradient-text">unmatched clarity</span>
            </h1>

            <p className="hero-subtitle">
              Supercharge your team's workflow. Coordinate tasks, manage secure file exchanges,
              track visual Gantt timelines, and broadcast notifications in real time.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <Link to="/signup" className="btn-modern-primary py-3 px-4">
                Start Free Today <FaArrowRight />
              </Link>
              <Link to="/login" className="btn-modern-secondary py-3 px-4">
                Live Sign In
              </Link>
            </div>

            <div className="d-flex flex-wrap gap-4 text-muted small pt-2">
              <div className="d-flex align-items-center gap-2">
                <FaCheckCircle className="text-success" /> JWT Secured
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaShieldAlt className="text-primary" /> Role-Based Access
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaCheckCircle className="text-success" /> Real-time Gantt Charts
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="hero-preview-card glass-card p-4">
              <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                  <span className="text-muted ms-2 small">Task Overview Board</span>
                </div>
                <span className="badge-pill badge-in-progress">Live Sprint</span>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="glass-card p-3 border-start border-4 border-primary">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong className="text-white">API Security Architecture Upgrade</strong>
                    <span className="badge-pill badge-high">High</span>
                  </div>
                  <p className="text-secondary small mb-2">
                    Implement JWT token auth, rate-limiting, and Helmet security headers.
                  </p>
                  <div className="d-flex justify-content-between text-muted small">
                    <span>Assigned: Anmol Bakshi</span>
                    <span className="text-success">Due Tomorrow</span>
                  </div>
                </div>

                <div className="glass-card p-3 border-start border-4 border-success">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong className="text-white">Modern Glassmorphic UI Redesign</strong>
                    <span className="badge-pill badge-medium">Medium</span>
                  </div>
                  <p className="text-secondary small mb-2">
                    Refactor frontend with Plus Jakarta Sans typography and CSS tokens.
                  </p>
                  <div className="d-flex justify-content-between text-muted small">
                    <span>Assigned: Frontend Team</span>
                    <span className="text-info">In Review</span>
                  </div>
                </div>

                <div className="glass-card p-3 border-start border-4 border-info">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong className="text-white">Cloud File Vault Integration</strong>
                    <span className="badge-pill badge-low">Low</span>
                  </div>
                  <p className="text-secondary small mb-2">
                    Secure multipart uploads with recipient-scoped download links.
                  </p>
                  <div className="d-flex justify-content-between text-muted small">
                    <span>Assigned: DevOps</span>
                    <span className="text-muted">Upcoming</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;