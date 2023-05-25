import React, { useState } from 'react';
import { Container,Button, Form, ListGroup } from 'react-bootstrap';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [editDeadlineTaskId, setEditDeadlineTaskId] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  const teamMembers = ['John Doe', 'Jane Smith', 'Mike Johnson']; // Dummy team member names

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setNewDeadline(e.target.value);
  };

  const handleTeamMemberChange = (e) => {
    setNewTeamMember(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      name: newTask,
      deadline: newDeadline,
      assignedMembers: [newTeamMember],
      description: newDescription,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setNewDeadline('');
    setNewTeamMember('');
    setNewDescription('');
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleEditDeadline = (taskId) => {
    setEditDeadlineTaskId(taskId);
  };

  const handleEditDeadlineSubmit = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, deadline: editDeadline } : task))
    );
    setEditDeadlineTaskId('');
    setEditDeadline('');
  };

  const handleRemoveTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
      <Form.Label>Assigned Team Member:</Form.Label>
      <Form.Control as="select" value={newTeamMember} onChange={handleTeamMemberChange} required>
        <option value="">Select Team Member</option>
        {teamMembers.map((member) => (
          <option key={member} value={member}>
            {member}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="description">
      <Form.Label>Description:</Form.Label>
      <Form.Control as="textarea" value={newDescription} onChange={handleDescriptionChange} rows={3} />
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
                    <strong>Description:</strong> {task.description}
                  </p>
                  <p>
                    <strong>Assigned Team Member:</strong> {task.assignedMembers[0]}
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
