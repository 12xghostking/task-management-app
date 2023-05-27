import React, { useState, useEffect } from 'react';
import { Container, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';
const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');
  const [newNote, setNewNote] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [editDeadlineTaskId, setEditDeadlineTaskId] = useState('');
  const [editDeadline, setEditDeadline] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users')
      .then((response) => {
        setTeamMembers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:4000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [tasks]);
  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setNewDeadline(e.target.value);
  };

  const handleTeamMemberChange = (e) => {
    setNewTeamMember(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
  
    const task = {
      name: newTask,
      deadline: newDeadline,
      assignedMembers: [newTeamMember],
      notes: newNote,
      completed: false,
    };
  
    axios.post('http://localhost:4000/tasks', task)
      .then((response) => {
        if (response.status === 201) {
          const newTaskId = response.data.id;
          setNewTask('');
          setNewDeadline('');
          setNewTeamMember('');
          setNewNote('');
  
          // Fetch the updated list of tasks
          axios.get('http://localhost:4000/tasks')
            .then((response) => {
              setTasks(response.data);
            })
            .catch((error) => {
              console.error('Error fetching tasks:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };
  
  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  
    axios.put(`http://localhost:4000/tasks/${taskId}/completed`, { completed: updatedTasks.find((task) => task.id === taskId)?.completed })
      .then((response) => {
        if (response.status === 200) {
          // Task completion status updated successfully
        }
      })
      .catch((error) => {
        console.error('Error updating task completion status:', error);
      });
  };
  

  const handleEditDeadline = (taskId) => {
    setEditDeadlineTaskId(taskId);
  };

  const handleEditDeadlineSubmit = (taskId) => {
    const updatedTask = {
      deadline: editDeadline,
    };

    axios.put(`http://localhost:4000/tasks/${taskId}/deadline`, updatedTask)

      .then((response) => {
        if (response.status === 200) {
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? { ...task, deadline: editDeadline } : task))
          );
          setEditDeadlineTaskId('');
          setEditDeadline('');
        }
      })
      .catch((error) => {
        console.error('Error updating deadline:', error);
      });
  };


  const handleRemoveTask = (taskId) => {
    axios.delete(`http://localhost:4000/tasks/${taskId}`)
      .then((response) => {
        if (response.status === 200) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }
      })
      .catch((error) => {
        console.error('Error removing task:', error);
      });
  };


  const handleFilterCompleted = () => {
    setFilterCompleted(!filterCompleted);
  };

  const filteredTasks = filterCompleted ? tasks.filter((task) => task.completed) : tasks;

  return (
    <div>
      <h2>Task Management</h2>

      {/* Create New Task Form */}
      <Container fluid>
        <Form onSubmit={handleTaskSubmit}>
          <Form.Group controlId="taskName">
            <Form.Label>Task Name:</Form.Label>
            <Form.Control type="text" value={newTask} onChange={handleTaskChange} required />
          </Form.Group>
          <Form.Group controlId="deadline">
            <Form.Label>Deadline:</Form.Label>
            <Form.Control type="text" value={newDeadline} onChange={handleDeadlineChange} required />
          </Form.Group>
          <Form.Group controlId="teamMember">
            <Form.Label>Assign to Team Member:</Form.Label>
            <Form.Control as="select" value={newTeamMember} onChange={handleTeamMemberChange} required>
              <option value="">Select Team Member</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.name}>
                  {member.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Notes:</Form.Label>
            <Form.Control as="textarea" value={newNote} onChange={handleNoteChange} rows={3} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Task
          </Button>
        </Form>
      </Container>

      {/* Task List */}
      <div className="row mt-4">
        {filteredTasks.map((task) => (
          <div className="col-md-6 mb-4" key={task.id}>
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.name}</h5>
                  <p>
                    <strong>Deadline:</strong> {task.deadline}
                  </p>
                  <p>
                    <strong>Notes:</strong> {task.notes}
                  </p>
                  <p>
                    <strong>Assigned Team Member:</strong> {task.assignedMembers}
                  </p>
                </div>
                <div>
                  <Button variant={task.completed ? 'success' : 'secondary'} onClick={() => handleCompleteTask(task.id)}>
                    {task.completed ? 'Reopen' : 'Complete'}
                  </Button>
                  <Button variant="info" className="ml-2" onClick={() => handleEditDeadline(task.id)}>
                    Change Deadline
                  </Button>
                  <Button variant="danger" className="ml-2" onClick={() => handleRemoveTask(task.id)}>
                    Remove
                  </Button>
                </div>
              </div>
              {editDeadlineTaskId === task.id && (
                <div className="mt-2">
                  <Form onSubmit={() => handleEditDeadlineSubmit(task.id)}>
                    <Form.Group controlId="editDeadline">
                      <Form.Control
                        type="text"
                        value={editDeadline}
                        onChange={(e) => setEditDeadline(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                  </Form>
                </div>
              )}
            </ListGroup.Item>
          </div>
        ))}
      </div>

      {/* Filter Completed Tasks */}
      <div className="mt-4">
        <Form.Check
          type="switch"
          id="filterCompleted"
          label="Filter Completed Tasks"
          checked={filterCompleted}
          onChange={handleFilterCompleted}
        />
      </div>
    </div>
  );
};

export default TaskManagement;
