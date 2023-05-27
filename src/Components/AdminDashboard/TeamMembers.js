import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import axios from 'axios';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:4000/members')
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching members:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredMembers = filter === 'all'
    ? members
    : members.filter((member) => (
        filter === 'free' ? member.totalTasks === 0 : member.totalTasks > 0
      ));

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
              <strong>Total Tasks Assigned:</strong> {member.totalTasks}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TeamMembers;
