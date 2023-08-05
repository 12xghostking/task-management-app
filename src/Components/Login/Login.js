import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Header from '../Header/Header.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img1 from './image1.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowError(false); // Hide error when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowError(false); // Hide error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform login logic here using the email and password state values
    if (password.length < 5) {
      setShowError(true);
      setErrorMessage('Password should be at least 5 characters long.');
    } else {
      axios
        .post('http://localhost:4000/login', { email, password })
        .then((response) => {
          const { role, name } = response.data;
          // Redirect to the appropriate dashboard based on the role and pass name as a URL parameter
          if (role === 'admin') {
            // Redirect to admin dashboard with name parameter
            navigate(`/admin?name=${name}`);
          } else {
            // Redirect to user dashboard with name parameter
            navigate(`/user?name=${name}`);
          }
        })
        .catch((error) => {
          setErrorMessage('Invalid email or password.');
          setShowError(true);
          console.log(error);
        });
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column', // Display the elements in a column
          alignItems: 'center',
          justifyContent: 'center',
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
          {showError && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={handleEmailChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={handlePasswordChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
