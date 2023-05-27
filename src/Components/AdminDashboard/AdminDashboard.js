import React from 'react';
import TaskManagement from './TaskManagement';
import FileSharing from './FileSharing';
import Overview from './Overview';
import TeamMembers from './TeamMembers';
import Notification from './Notification';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate('/');
  };
  return (
    <div>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        <Nav>
          <Nav.Link className="text-danger" onClick={handleSignOut}>
            <FaSignOutAlt />
            Sign Out
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container className="mt-4">
        <Overview />
        <TaskManagement />
        <Row>
          <Col>
            <TeamMembers />
          </Col>
          <Col>
            <FileSharing />
          </Col>
        </Row>
        <Row>
          <Col><Notification /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
