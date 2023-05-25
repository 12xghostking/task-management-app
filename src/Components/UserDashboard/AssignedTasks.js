import React, { useState } from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', deadline: '2023-05-31', status: 'In Progress' },
    { id: 2, title: 'Task 2', deadline: '2023-06-15', status: 'In Progress' },
    { id: 3, title: 'Task 3', deadline: '2023-06-30', status: 'In Progress' },
  ]);

  const handleStatusChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: task.status === 'In Progress' ? 'Completed' : 'In Progress' } : task
      )
    );
  };

  return (
    <div>
      <h4>Assigned Tasks</h4>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            <div>
              <span>{task.title}</span>
              <br />
              <small>Deadline: {task.deadline}</small>
            </div>
            <div>
              <Badge  variant={task.status === 'Completed' ? 'success' : 'warning'}>{task.status}</Badge>
              <p> </p>
              {task.status === 'In Progress' ? (
                <Button variant="success" size="sm" className="ml-auto" onClick={() => handleStatusChange(task.id)}>
                  Complete
                </Button>
              ) : (
                <Button variant="warning" size="sm" className="ml-auto" onClick={() => handleStatusChange(task.id)}>
                  In Progress
                </Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AssignedTasks;
