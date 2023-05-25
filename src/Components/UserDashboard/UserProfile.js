import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import UserHeader from './UserHeader';
const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // Assuming you'll be using file upload for profile picture

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    // Handle profile picture upload logic here
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., update user profile data
    console.log('User profile updated');
  };

  return (
    <>
    <UserHeader/>
    <Container>
      <h2>User Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={handleNameChange} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={handleEmailChange} />
        </Form.Group>
        <Form.Group controlId="formProfilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control type="file" onChange={handleProfilePictureChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container></>
  );
};

export default UserProfile;
