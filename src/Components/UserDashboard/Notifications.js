import React, { useState, useEffect } from 'react';
import { ListGroup, Fade, Button } from 'react-bootstrap';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const username = params.get('name');

  useEffect(() => {
    // Fetch notifications for the user from the backend
    axios
      .get(`http://localhost:4000/notifications/${username}`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.log('Error fetching notifications:', error);
      });
  }, [username]);

  const handleRemoveNotification = (id) => {
    // Remove notification from the screen and the database
    axios
      .delete(`http://localhost:4000/notifications/${id}`)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      })
      .catch((error) => {
        console.log('Error removing notification:', error);
      });
  };

  return (
    <div>
    <h4>Notifications</h4>
    <ListGroup>
      {notifications.map((notification, index) => (
        <Fade in key={notification.id} timeout={500 * (index + 1)}>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {notification.notificationText}
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveNotification(notification.id)}
            >
              X
            </Button>
          </ListGroup.Item>
        </Fade>
      ))}
    </ListGroup>
  </div>
  
  );
};

export default Notifications;
