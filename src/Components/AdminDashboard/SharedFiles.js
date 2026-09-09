import React, { useState, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { fileService } from '../../services/api';
import { FaDownload, FaFileAlt, FaSearch } from 'react-icons/fa';

const SharedFiles = ({ refreshTrigger }) => {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchFiles = async () => {
      try {
        const res = await fileService.getAll();
        if (isMounted) setFiles(res.data || []);
      } catch (err) {
        console.error('Error fetching shared files:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFiles();
    return () => {
      isMounted = false;
    };
  }, [refreshTrigger]);

  const filteredFiles = files.filter((file) =>
    (file.task || '').toLowerCase().includes(filter.toLowerCase()) ||
    (file.filename || '').toLowerCase().includes(filter.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const d = new Date(dateString);
    return isNaN(d) ? 'Recent' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="glass-card p-4 mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <div>
          <h5 className="text-white fw-bold mb-0">Repository Files</h5>
          <p className="text-secondary small mb-0">All distributed assets across project milestones</p>
        </div>

        <div className="position-relative" style={{ minWidth: '220px' }}>
          <FaSearch
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <Form.Control
            type="text"
            className="modern-input"
            style={{ paddingLeft: '34px', fontSize: '0.85rem' }}
            placeholder="Filter by Task or File..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner size="sm" animation="border" variant="primary" />
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="text-center py-4 text-secondary small">
          No files uploaded yet in the workspace repository.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Task</th>
                <th>Recipient</th>
                <th>Upload Date</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file._id || file.id || file.filename}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <FaFileAlt className="text-primary" />
                      <span className="text-white fw-medium small text-truncate" style={{ maxWidth: '200px' }}>
                        {file.originalName || file.filename}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="text-secondary small">{file.task}</span>
                  </td>
                  <td>
                    <span className="badge-pill badge-pending" style={{ textTransform: 'none' }}>
                      {file.recipient || 'All'}
                    </span>
                  </td>
                  <td>
                    <span className="text-muted small">{formatDate(file.upload_date)}</span>
                  </td>
                  <td className="text-end">
                    <a
                      href={fileService.downloadUrl(file.filename)}
                      download
                      className="btn btn-sm btn-modern-secondary px-3 py-1"
                      style={{ fontSize: '0.8rem' }}
                    >
                      <FaDownload /> Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SharedFiles;
