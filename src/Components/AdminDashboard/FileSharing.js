import React, { useState, useEffect } from 'react';
import { Form, Spinner, Alert } from 'react-bootstrap';
import { fileService, userService } from '../../services/api';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';

const FileSharing = ({ onFileUploaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('All');
  const [users, setUsers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    userService
      .getUsers()
      .then((res) => {
        if (isMounted) setUsers(res.data || []);
      })
      .catch((err) => console.error('Error fetching users:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedFile || !selectedTask) {
      setError('Please select a file and enter a task name.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('task', selectedTask);
      formData.append('recipient', selectedRecipient || 'All');

      await fileService.upload(formData);
      setSuccess(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null);
      setSelectedTask('');
      setSelectedRecipient('All');

      if (onFileUploaded) onFileUploaded();
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass-card p-4 mb-4 h-100">
      <div className="d-flex align-items-center gap-2 mb-3">
        <FaCloudUploadAlt className="text-primary" size={24} />
        <div>
          <h5 className="text-white fw-bold mb-0">File Vault Dispatch</h5>
          <p className="text-secondary small mb-0">Distribute deliverables and documents securely</p>
        </div>
      </div>

      {success && (
        <Alert variant="success" className="py-2 small border-0 text-white" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="py-2 small border-0 text-white" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleFileUpload}>
        <Form.Group className="mb-3">
          <Form.Label>Associated Task Title</Form.Label>
          <Form.Control
            type="text"
            className="modern-input"
            placeholder="e.g. Design Specification V2"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Recipient</Form.Label>
          <Form.Select
            className="modern-input"
            value={selectedRecipient}
            onChange={(e) => setSelectedRecipient(e.target.value)}
          >
            <option value="All">All Team Members (Public Vault)</option>
            {users.map((user) => (
              <option key={user._id || user.id} value={user.name}>
                {user.name} ({user.email})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Select Document or Asset</Form.Label>
          <Form.Control
            type="file"
            className="modern-input"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            required
          />
          {selectedFile && (
            <div className="text-muted small mt-2 d-flex align-items-center gap-2">
              <FaFileAlt className="text-primary" />
              <span>
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          )}
        </Form.Group>

        <button
          type="submit"
          className="btn-modern-primary w-100 py-2"
          disabled={uploading || !selectedFile || !selectedTask}
        >
          {uploading ? (
            <>
              <Spinner size="sm" animation="border" /> Uploading...
            </>
          ) : (
            <>
              <FaCloudUploadAlt /> Secure Upload
            </>
          )}
        </button>
      </Form>
    </div>
  );
};

export default FileSharing;
