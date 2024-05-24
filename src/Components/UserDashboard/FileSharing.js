import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const FileSharing = () => {
  const params = new URLSearchParams(window.location.search);
  const usernameParam = params.get('name');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');
 
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTaskChange = (e) => {
    setSelectedTask(e.target.value);
  };


  const handleFileUpload = () => {
    if (selectedFile && selectedTask ) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('task', selectedTask);
      formData.append('uploadedby', usernameParam);
      

      axios.post('http://localhost:4000/files/upload/user', formData)
        .then((response) => {
          console.log('File Uploaded:', response.data);
          setSelectedFile(null);
          setSelectedTask('');
          document.querySelector('input[type="file"]').value = null;
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

       
        <Form.Group>
          <Form.Label>File:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} required />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleFileUpload}
          disabled={!selectedFile || !selectedTask}
        >
          Upload File
        </Button>
      </Form>
    </div>
  );
};

export default FileSharing;
