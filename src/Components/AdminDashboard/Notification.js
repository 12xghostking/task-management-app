import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Notification = () => {
  const [notificationText, setNotificationText] = useState('');
  const [recipient, setRecipient] = useState('');
  const [validated, setValidated] = useState(false);

  const handleNotificationTextChange = (event) => {
    setNotificationText(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      // Send notification data to the backend for further processing

      // Reset form fields
      setNotificationText('');
      setRecipient('');
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <div>
      <h3>Send Notification</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="notificationText">
          <Form.Label>Notification Text:</Form.Label>
          <Form.Control
            type="text"
            value={notificationText}
            onChange={handleNotificationTextChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter the notification text.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="recipient">
          <Form.Label>Recipient:</Form.Label>
          <Form.Control
            as="select"
            value={recipient}
            onChange={handleRecipientChange}
            required
          >
            <option value="">Select Recipient</option>
            <option value="John">John</option>
            <option value="Jane">Jane</option>
            <option value="Alex">Alex</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a recipient.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Notification;
