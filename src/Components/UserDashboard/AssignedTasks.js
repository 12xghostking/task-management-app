import React, { useState, useEffect } from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import axios from 'axios';


const AssignedTasks = () => {
  
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const usernameParam = params.get('name');
  
    axios.get(`http://localhost:4000/tasks/${usernameParam}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);
  

  const handleStatusChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: task.completed === 0 ? 1 : 0 } : task
    );
    setTasks(updatedTasks);

    const updatedStatus = updatedTasks.find((task) => task.id === taskId)?.completed;
    axios
      .put(`http://localhost:4000/tasks/${taskId}/status`, { completed: updatedStatus })
      .then((response) => {
        if (response.status === 200) {
          // Task status updated successfully
        }
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  };

  return (
    <div>
      <h4>Assigned Tasks</h4>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.name}</strong>
              <br />
              <small>Deadline: {task.deadline}</small>
              <br />
              <small>Notes : {task.notes}</small>
            </div>
            <div>
              <Badge variant={task.completed === 0 ? 'warning' : 'success'}>
                {task.completed === 0 ? 'In Progress' : 'Completed'}
              </Badge>
              <p></p>
              {task.completed === 0 ? (
                <Button
                  variant="warning"
                  size="sm"
                  className="ml-auto"
                  onClick={() => handleStatusChange(task.id)}
                >
                  Complete
                </Button>
              ) : (
                <Button
                  variant="success"
                  size="sm"
                  className="ml-auto"
                  onClick={() => handleStatusChange(task.id)}
                >
                  Reopen
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
