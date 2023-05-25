import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const Overview = () => {
  const tasks = [
    { id: 1, title: 'Task 1', assignedTo: 'John Doe', status: 'In Progress' },
    { id: 2, title: 'Task 2', assignedTo: 'Jane Smith', status: 'Completed' },
    { id: 3, title: 'Task 3', assignedTo: 'Alex Johnson', status: 'In Progress' },
  ];

  return (
    <Card>
      <Card.Header>Overview</Card.Header>
      <Card.Body>
        <Card.Title>Task Summary</Card.Title>
        <ListGroup>
          {tasks.map((task) => (
            <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
              <div>
                <span>{task.title}</span>
                <br />
                <small>Assigned to: {task.assignedTo}</small>
              </div>
              <Badge
                variant={task.status === 'Completed' ? 'success' : 'warning'}
                className="d-flex align-items-center"
                style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
              >
                {task.status}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Overview;
