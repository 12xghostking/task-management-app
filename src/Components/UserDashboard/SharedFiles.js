import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const SharedFiles = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'File 1', task: 'Task 1', uploadDate: '2023-05-28' },
    { id: 2, name: 'File 2', task: 'Task 2', uploadDate: '2023-06-02' },
    { id: 3, name: 'File 3', task: 'Task 1', uploadDate: '2023-06-05' },
  ]);

  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredFiles = files.filter((file) => file.task.toLowerCase().includes(filter.toLowerCase()));

  const handleDownloadFile = (id) => {
    // Handle file download logic here
    console.log(`Downloading file with id: ${id}`);
  };

  return (
    <div>
      <h4>Shared Files</h4>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Filter by Task"
          value={filter}
          onChange={handleFilterChange}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Task</th>
            <th>Upload Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.task}</td>
              <td>{file.uploadDate}</td>
              <td>
                <Button variant="primary" onClick={() => handleDownloadFile(file.id)}>
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SharedFiles;
