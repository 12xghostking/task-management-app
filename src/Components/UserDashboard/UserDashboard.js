import React, { useState } from 'react';
import Header from '../Header/Header';
import UserHeader from './UserHeader';
import Notifications from './Notifications';
import AssignedTasks from './AssignedTasks';
import SharedFiles from './SharedFiles';
import FileSharing from './FileSharing';
import Ganttchart from './Ganttchart';
import Comments from '../AdminDashboard/Comments';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaTasks, FaFolderOpen, FaBell, FaComments } from 'react-icons/fa';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [fileRefreshKey, setFileRefreshKey] = useState(0);

  const handleTasksLoaded = (loadedTasks) => {
    setTasks(loadedTasks);
  };

  const handleNotificationCount = (count) => {
    setNotificationCount(count);
  };

  const handleFileUploaded = () => {
    setFileRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Container className="py-4 flex-grow-1">
        <UserHeader taskCount={tasks.length} notificationCount={notificationCount} />

        {/* Tab Navigation */}
        <Nav
          variant="pills"
          className="p-1 glass-card mb-4"
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
              <FaTasks size={14} /> My Objectives & Timeline
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'feed'}
              onClick={() => setActiveTab('feed')}
              className={`modern-nav-link d-flex align-items-center gap-2 ${
                activeTab === 'feed' ? 'btn-modern-primary text-white' : ''
              }`}
              style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
            >
              <FaComments size={14} /> Team Collaboration Feed
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'files'}
              onClick={() => setActiveTab('files')}
              className={`modern-nav-link d-flex align-items-center gap-2 ${
                activeTab === 'files' ? 'btn-modern-primary text-white' : ''
              }`}
              style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
            >
              <FaFolderOpen size={14} /> Deliverables & Files
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
              className={`modern-nav-link d-flex align-items-center gap-2 ${
                activeTab === 'notifications' ? 'btn-modern-primary text-white' : ''
              }`}
              style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
            >
              <FaBell size={14} /> Announcements ({notificationCount})
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab 1: Tasks & Schedule */}
        {activeTab === 'tasks' && (
          <div className="animate-fade-in">
            <AssignedTasks onTasksLoaded={handleTasksLoaded} />
            <Ganttchart tasks={tasks} />
          </div>
        )}

        {/* Tab 2: Team Collaboration Feed */}
        {activeTab === 'feed' && (
          <div className="animate-fade-in">
            <Comments />
          </div>
        )}

        {/* Tab 3: Files & Submissions */}
        {activeTab === 'files' && (
          <div className="animate-fade-in">
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

        {/* Tab 4: Announcements & Direct Messages */}
        {activeTab === 'notifications' && (
          <div className="animate-fade-in">
            <Row className="g-4">
              <Col lg={6}>
                <Notifications onCountChange={handleNotificationCount} />
              </Col>
              <Col lg={6}>
                <Comments />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default UserDashboard;
