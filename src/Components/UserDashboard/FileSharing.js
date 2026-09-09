import React, { useState } from 'react';
import { Form, Spinner, Alert } from 'react-bootstrap';
import { fileService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';

const FileSharing = ({ onFileUploaded }) => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedFile || !selectedTask) {
      setError('Please specify the task and choose a file to upload.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('task', selectedTask);
      formData.append('recipient', 'Admin');
      formData.append('uploadedby', user?.name || 'Team Member');

      await fileService.upload(formData);
      setSuccess(`Deliverable "${selectedFile.name}" successfully uploaded for review!`);
      setSelectedFile(null);
      setSelectedTask('');

      if (onFileUploaded) onFileUploaded();
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file deliverable.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass-card p-4 mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <FaCloudUploadAlt className="text-primary" size={24} />
        <div>
          <h5 className="text-white fw-bold mb-0">Submit Work Deliverable</h5>
          <p className="text-secondary small mb-0">Upload documents or code archives to project leads</p>
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
          <Form.Label>Task Title Reference</Form.Label>
          <Form.Control
            type="text"
            className="modern-input"
            placeholder="e.g. Frontend Refactor Sprint"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Choose File Document</Form.Label>
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
              <Spinner size="sm" animation="border" /> Uploading Deliverable...
            </>
          ) : (
            <>
              <FaCloudUploadAlt /> Submit File to Workspace
            </>
          )}
        </button>
      </Form>
    </div>
  );
};

export default FileSharing;
