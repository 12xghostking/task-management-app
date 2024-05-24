import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const SharedFiles = ({ match }) => {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
   
    axios
      .get(`http://localhost:4000/files`)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching shared files:', error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.task.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDownloadFile = (filename) => {
    axios
      .get(`http://localhost:4000/files/download/${filename}`, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-2">
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
            <th>Uploaded By</th>
            <th>Upload Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr key={file.id}>
              <td>{file.filename}</td>
              <td>{file.task}</td>
              <td>{file.uploadedby}</td>
              <td>{formatDate(file.upload_date)}</td>
              <td>
                <Button variant="primary" onClick={() => handleDownloadFile(file.filename)}>
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
