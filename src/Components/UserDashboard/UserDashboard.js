import React from 'react';
import UserHeader from './UserHeader';
import { Container } from 'react-bootstrap';
import Notifications from './Notifications';
import AssignedTasks from './AssignedTasks';
import SharedFiles from './SharedFiles';
const UserDashboard = () => {
  return (
    <div>
      <UserHeader />
      <Container className="mt-4">
        <Notifications />
        <AssignedTasks />
        <SharedFiles />
        {/* Add your user components here */}
      </Container>
    </div>
  );
};

export default UserDashboard;
