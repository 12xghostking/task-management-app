import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import axios from 'axios';

const AssignedTasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = () => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(direction);
    const sortedTasks = [...tasks].sort((a, b) => {
      if (direction === 'asc') {
        return a.priority - b.priority;
      } else {
        return b.priority - a.priority;
      }
    });
    setTasks(sortedTasks);
  };
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
  const handleOpenModal = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSave =  () => {
    const comment = document.getElementById('comment').value;
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? { ...task, comment: comment } : task
    );
    setTasks(updatedTasks);
    axios
      .put(`http://localhost:4000/tasks/${currentTask.id}/comment`, { comment })
      .then((response) => {
        if (response.status === 200) {
          // Comment added successfully
          alert('Comment added successfully');
        }
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
    setShowModal(false);
  
  };

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
      <Button className="mb-2" variant="primary" onClick={handleSort}>
        Sort by Priority ({sortDirection === 'asc' ? '⬆️' : '⬇️'})
      </Button>
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
              )} <Button variant="primary" size="sm" onClick={() => handleOpenModal(task)}>
              Add Comments
            </Button>
            </div>
           
          </ListGroup.Item>
        ))}
      </ListGroup>
      
<Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Add Comment to {currentTask?.name}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default AssignedTasks;
