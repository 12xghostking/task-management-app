import React, { useState } from 'react';
import Header from '../Header/Header';
import Overview from './Overview';
import TaskManagement from './TaskManagement';
import TeamMembers from './TeamMembers';
import FileSharing from './FileSharing';
import SharedFiles from './SharedFiles';
import Notification from './Notification';
import Comments from './Comments';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { FaTasks, FaUsers, FaComments, FaShieldAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tasks');
  const [fileRefreshKey, setFileRefreshKey] = useState(0);

  const handleFileUploaded = () => {
    setFileRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Container className="py-4 flex-grow-1">
        {/* Dashboard Header Bar */}
        <div className="dashboard-header">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge-pill badge-high d-flex align-items-center gap-1">
                <FaShieldAlt size={11} /> Admin Control Center
              </span>
            </div>
            <h2 className="text-white fw-bold mb-1">
              Welcome back, <span className="gradient-text">{user?.name || 'Administrator'}</span>
            </h2>
            <p className="text-secondary small mb-0">
              Manage organization tasks, allocate resources, and oversee project sprints.
            </p>
          </div>

          {/* Navigation Pill Switcher */}
          <Nav
            variant="pills"
            className="p-1 glass-card"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'tasks'}
                onClick={() => setActiveTab('tasks')}
                className={`modern-nav-link d-flex align-items-center gap-2 ${
                  activeTab === 'tasks' ? 'btn-modern-primary text-white' : ''
                }`}
                style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
              >
                <FaTasks size={14} /> Tasks & Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'team'}
                onClick={() => setActiveTab('team')}
                className={`modern-nav-link d-flex align-items-center gap-2 ${
                  activeTab === 'team' ? 'btn-modern-primary text-white' : ''
                }`}
                style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
              >
                <FaUsers size={14} /> Team & Files
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'comms'}
                onClick={() => setActiveTab('comms')}
                className={`modern-nav-link d-flex align-items-center gap-2 ${
                  activeTab === 'comms' ? 'btn-modern-primary text-white' : ''
                }`}
                style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
              >
                <FaComments size={14} /> Communications
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Tab 1: Tasks & Overview */}
        {activeTab === 'tasks' && (
          <div className="animate-fade-in">
            <Overview />
            <TaskManagement />
          </div>
        )}

        {/* Tab 2: Team Directory & File Repository */}
        {activeTab === 'team' && (
          <div className="animate-fade-in">
            <TeamMembers />
            <Row className="g-4">
              <Col lg={5}>
                <FileSharing onFileUploaded={handleFileUploaded} />
              </Col>
              <Col lg={7}>
                <SharedFiles refreshTrigger={fileRefreshKey} />
              </Col>
            </Row>
          </div>
        )}

        {/* Tab 3: Notifications & Team Feed */}
        {activeTab === 'comms' && (
          <div className="animate-fade-in">
            <Row className="g-4">
              <Col lg={5}>
                <Notification />
              </Col>
              <Col lg={7}>
                <Comments />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
