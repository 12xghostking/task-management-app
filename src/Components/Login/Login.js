import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Header from '../Header/Header.js';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

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
    } else {
      console.log('Login form submitted');
      console.log('Email:', email);
      console.log('Password:', password);
      // You can call an API or perform any required authentication logic
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
              Password should be at least 5 characters long.
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
          <Form.Group controlId="role">
            <Form.Label>Role:</Form.Label>
            <Form.Control as="select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
