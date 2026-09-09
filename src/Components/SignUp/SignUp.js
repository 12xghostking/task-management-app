import React, { useState } from 'react';
import { Container, Form, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaUserShield, FaUserCheck, FaUserPlus, FaTasks } from 'react-icons/fa';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const { role: assignedRole } = await register({
        name,
        email,
        password,
        role,
      });

      if (assignedRole === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/user', { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
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
        <Container style={{ maxWidth: '480px' }}>
          <div className="glass-card p-4 p-sm-5 animate-fade-in">
            <div className="text-center mb-4">
              <div className="brand-icon mx-auto mb-3" style={{ width: 44, height: 44 }}>
                <FaTasks size={20} color="#fff" />
              </div>
              <h2 className="fw-bold mb-1 text-white">Create Workspace Account</h2>
              <p className="text-secondary small">Join Task-Orchestrator to start collaborating</p>
            </div>

            {error && (
              <Alert
                variant="danger"
                className="py-2 small border-0 text-white"
                style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}
              >
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="signUpName">
                <Form.Label className="d-flex align-items-center gap-2">
                  <FaUser size={13} className="text-primary" /> Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  className="modern-input"
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="signUpEmail">
                <Form.Label className="d-flex align-items-center gap-2">
                  <FaEnvelope size={13} className="text-primary" /> Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  className="modern-input"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  required
                />
              </Form.Group>

              {/* Role Selection */}
              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center gap-2">Role Type</Form.Label>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`btn flex-fill d-flex align-items-center justify-content-center gap-2 py-2 ${
                      role === 'user' ? 'btn-modern-primary' : 'btn-modern-secondary'
                    }`}
                    style={{ fontSize: '0.9rem' }}
                  >
                    <FaUserCheck /> Team Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`btn flex-fill d-flex align-items-center justify-content-center gap-2 py-2 ${
                      role === 'admin' ? 'btn-modern-primary' : 'btn-modern-secondary'
                    }`}
                    style={{ fontSize: '0.9rem' }}
                  >
                    <FaUserShield /> Admin
                  </button>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="signUpPassword">
                <Form.Label className="d-flex align-items-center gap-2">
                  <FaLock size={13} className="text-primary" /> Password (min. 6 characters)
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

              <Form.Group className="mb-4" controlId="signUpConfirmPassword">
                <Form.Label className="d-flex align-items-center gap-2">
                  <FaLock size={13} className="text-primary" /> Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  className="modern-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
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
                    <Spinner size="sm" animation="border" /> Creating Account...
                  </>
                ) : (
                  <>
                    <FaUserPlus /> Complete Registration
                  </>
                )}
              </button>

              <div className="text-center text-secondary small">
                Already have an account?{' '}
                <Link to="/login" className="text-primary text-decoration-none fw-semibold">
                  Sign in
                </Link>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
