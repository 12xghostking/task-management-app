import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { FaTasks, FaSignOutAlt, FaUserShield, FaUserCheck } from 'react-icons/fa';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/user';

  return (
    <Navbar expand="lg" className="modern-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="modern-brand">
          <div className="brand-icon">
            <FaTasks size={18} color="#fff" />
          </div>
          <span>
            Task<span className="gradient-text">Orchestrator</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" className="btn-modern-secondary border-0" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link
              as={Link}
              to="/"
              className={`modern-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/features"
              className={`modern-nav-link ${location.pathname === '/features' ? 'active' : ''}`}
            >
              Features
            </Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link
                  as={Link}
                  to={dashboardPath}
                  className="modern-nav-link d-flex align-items-center gap-2"
                >
                  {user?.role === 'admin' ? (
                    <FaUserShield className="text-warning" />
                  ) : (
                    <FaUserCheck className="text-info" />
                  )}
                  <span>Dashboard</span>
                  <span className="badge-pill badge-in-progress" style={{ textTransform: 'none' }}>
                    {user?.name || user?.role}
                  </span>
                </Nav.Link>

                <button
                  onClick={handleSignOut}
                  className="btn-modern-secondary py-1 px-3"
                  style={{ fontSize: '0.85rem' }}
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="modern-nav-link">
                  Sign In
                </Nav.Link>
                <Link to="/signup" className="btn-modern-primary py-1 px-3 text-white">
                  Get Started
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
