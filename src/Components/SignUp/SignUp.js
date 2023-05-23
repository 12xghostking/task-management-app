import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Header from '../Header/Header.js';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setShowError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic here using the email and password state values
    if (password !== confirmPassword || password.length < 5) {
      setShowError(true);
    } else {
      console.log('Signup form submitted');
      console.log('Email:', email);
      console.log('Password:', password);
      // You can call an API or perform any required signup logic
    }
  };

  return (
    <>
    <Header/>
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="w-50">
        <h2>Sign Up</h2>
        {showError && (
          <Alert variant="danger">
            Passwords do not match or should be at least 5 characters long.
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div></>
  );
};

export default Signup;
