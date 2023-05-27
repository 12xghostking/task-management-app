import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Header from '../Header/Header.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowError(false);
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
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit} className="w-50">
          <h2>Login</h2>
          {showError && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}
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
    </>
  );
};

export default LoginForm;
