import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';

const Overview = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <Card>
      <Card.Header>Overview</Card.Header>
      <Card.Body>
        <Card.Title>Task Summary</Card.Title>
        <ListGroup>
          {tasks.map((task) => (
            <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.name}</strong>
                <br />
                <small>Assigned to: {task.assignedMembers}</small>
              </div>
              <Badge
                variant={task.completed ? 'success' : 'warning'}
                className="d-flex align-items-center"
                style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
              >
                {task.completed ? 'Completed' : 'In Progress'}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Overview;
