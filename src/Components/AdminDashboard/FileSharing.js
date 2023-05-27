import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const FileSharing = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTaskChange = (e) => {
    setSelectedTask(e.target.value);
  };

  const handleRecipientChange = (e) => {
    setSelectedRecipient(e.target.value);
  };

  const handleFileUpload = () => {
    if (selectedFile && selectedTask && selectedRecipient) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('task', selectedTask);
      formData.append('recipient', selectedRecipient);

      axios.post('http://localhost:4000/files/upload', formData)
        .then((response) => {
          console.log('File Uploaded:', response.data);
          setSelectedFile(null);
          setSelectedTask('');
          setSelectedRecipient('');
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div>
      <h2>File Sharing</h2>

      <Form>
        <Form.Group controlId="taskName">
          <Form.Label>Task:</Form.Label>
          <Form.Control
            type="text"
            value={selectedTask}
            onChange={handleTaskChange}
            placeholder="Enter the name of the task"
            required
          />
        </Form.Group>

        <Form.Group controlId="recipientName">
          <Form.Label>Recipient:</Form.Label>
          <Form.Control
            as="select"
            value={selectedRecipient}
            onChange={handleRecipientChange}
            required
          >
            <option value="">Select Recipient</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>File:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} required />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleFileUpload}
          disabled={!selectedFile || !selectedTask || !selectedRecipient}
        >
          Upload File
        </Button>
      </Form>
    </div>
  );
};

export default FileSharing;
