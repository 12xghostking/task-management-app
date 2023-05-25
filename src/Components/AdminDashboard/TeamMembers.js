import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

const TeamMembers = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', task: 'Task 1' },
    { id: 2, name: 'Jane Smith', task: '' },
    { id: 3, name: 'Bob Johnson', task: 'Task 3' },
  ]);

  const [filter, setFilter] = useState('all');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredMembers = filter === 'all' ? members : members.filter((member) => (filter === 'free' ? member.task === '' : member.task !== ''));

  return (
    <div>
      <h2>Team Members</h2>

      {/* Filter */}
      <Form.Group controlId="taskFilter">
        <Form.Label>Filter:</Form.Label>
        <Form.Control as="select" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="assigned">Assigned</option>
        </Form.Control>
      </Form.Group>

      {/* Team Members */}
      {filteredMembers.map((member) => (
        <Card key={member.id} className="mb-3">
          <Card.Body>
            <Card.Title>{member.name}</Card.Title>
            <Card.Text>
              <strong>Task:</strong> {member.task ? member.task : 'N/A'}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TeamMembers;
