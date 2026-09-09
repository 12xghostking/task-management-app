import React, { useState } from 'react';
import { Container, Form, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaEnvelope, FaSignInAlt, FaTasks } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      const { role } = await login(email, password);
      // Redirect to the original intended route or the role dashboard
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/user', { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials or server unavailable.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 16px',
        }}
      >
        <Container style={{ maxWidth: '440px' }}>
          <div className="glass-card p-4 p-sm-5 animate-fade-in">
            <div className="text-center mb-4">
              <div className="brand-icon mx-auto mb-3" style={{ width: 44, height: 44 }}>
                <FaTasks size={20} color="#fff" />
              </div>
              <h2 className="fw-bold mb-1 text-white">Welcome Back</h2>
              <p className="text-secondary small">Enter your credentials to access your workspace</p>
            </div>

            {error && (
              <Alert variant="danger" className="py-2 small border-0 text-white" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label className="d-flex align-items-center gap-2">
                  <FaEnvelope size={13} className="text-primary" /> Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  className="modern-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label className="d-flex align-items-center gap-2">
                  <FaLock size={13} className="text-primary" /> Password
                </Form.Label>
                <Form.Control
                  type="password"
                  className="modern-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  required
                />
              </Form.Group>

              <button
                type="submit"
                className="btn-modern-primary w-100 py-3 mb-3"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner size="sm" animation="border" /> Authenticating...
                  </>
                ) : (
                  <>
                    <FaSignInAlt /> Sign In
                  </>
                )}
              </button>

              <div className="text-center text-secondary small">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary text-decoration-none fw-semibold">
                  Create an account
                </Link>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LoginForm;
