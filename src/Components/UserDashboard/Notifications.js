import React, { useState, useEffect } from 'react';
import { ListGroup, Fade } from 'react-bootstrap';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Simulated data for notifications
  const initialNotifications = [
    { id: 1, message: 'New task assigned: Task 1' },
    { id: 2, message: 'File uploaded: Report.pdf' },
    { id: 3, message: 'Comment received: Great work!' },
  ];

  useEffect(() => {
    // Simulated API call to fetch notifications
    setTimeout(() => {
      setNotifications(initialNotifications);
    }, 2000);
  }, []);

  return (
    <div>
      <h4>Notifications</h4>
      <ListGroup>
        {notifications.map((notification, index) => (
          <Fade in key={notification.id} timeout={500 * (index + 1)}>
            <ListGroup.Item>{notification.message}</ListGroup.Item>
          </Fade>
        ))}
      </ListGroup>
    </div>
  );
};

export default Notifications;
