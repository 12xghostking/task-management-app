import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Header from '../Header/Header.js';
import axios from 'axios';
import img1 from './image1.png';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setShowError(false);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword || password.length < 5) {
      setShowError(true);
      setErrorMessage('Passwords do not match or should be at least 5 characters long.');
    } else {
      try {
        const response = await axios.post('http://localhost:4000/signup', {
          email,
          password,
          role,
          name, // Include name in the request payload
        });
        console.log('Signup successful');
        navigate('/login');
        // Redirect the user to the desired page (e.g., login page)
      } catch (error) {
        setShowError(true);
        if (error.response && error.response.status === 400) {
          setErrorMessage('Admin already exists');
        } else {
          setErrorMessage('Error signing up');
        }
        console.error('Error signing up:', error);
        // Handle error (e.g., display error message to the user)
      }
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${img1})`, // Replace with your image URL
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            maxWidth: '400px',
            width: '100%',
            position: 'relative', // Set position to enable hover animation
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)')}
        >
          <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit} className="w-100">
              <h2>Sign Up</h2>
              {showError && (
                <Alert variant="danger">
                  {errorMessage}
                </Alert>
              )}
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" value={name} onChange={handleNameChange} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={handlePasswordChange} />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>Role:</Form.Label>
                <Form.Control as="select" value={role} onChange={handleRoleChange}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
