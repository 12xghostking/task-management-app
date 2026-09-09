import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTasks, FaBell, FaCloudUploadAlt, FaChartLine, FaShieldAlt, FaComments } from 'react-icons/fa';

const features = [
  {
    icon: <FaTasks />,
    title: 'Intelligent Task Orchestration',
    description:
      'Create, prioritize, assign, and track tasks with status workflows, priority tags, and deadline reminders.',
  },
  {
    icon: <FaChartLine />,
    title: 'Visual Gantt Timelines',
    description:
      'Gain full visibility into team deadlines and workload distribution with an interactive milestone chart.',
  },
  {
    icon: <FaCloudUploadAlt />,
    title: 'Secure File Vault',
    description:
      'Upload, distribute, and download task assets and deliverables with recipient-level access control.',
  },
  {
    icon: <FaBell />,
    title: 'Real-time Notifications',
    description:
      'Keep your team synced with instant administrative announcements and direct task alerts.',
  },
  {
    icon: <FaComments />,
    title: 'Team Collaboration Feed',
    description:
      'Centralized discussion threads directly tied to ongoing initiatives and task deliverables.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Enterprise-Grade Security',
    description:
      'Protected with JSON Web Tokens, bcrypt password hashing, HTTP security headers, and rate limiting.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-5" id="features">
      <Container>
        <div className="text-center mb-5">
          <span className="badge-pill badge-in-progress mb-2">Capabilities</span>
          <h2 className="display-6 fw-bold mb-3">
            Engineered for <span className="gradient-text">high-velocity teams</span>
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '620px' }}>
            Everything you need to eliminate operational bottlenecks and deliver projects on schedule.
          </p>
        </div>

        <Row className="g-4">
          {features.map((feature, idx) => (
            <Col lg={4} md={6} key={idx}>
              <div className="glass-card glass-card-hover feature-card">
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <h4 className="text-white fw-bold mb-2" style={{ fontSize: '1.25rem' }}>
                  {feature.title}
                </h4>
                <p className="text-secondary small mb-0" style={{ lineHeight: '1.7' }}>
                  {feature.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;