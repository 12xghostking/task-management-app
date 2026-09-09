import React, { useEffect, useState, useCallback } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { commentService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaComments, FaPaperPlane, FaUserCircle } from 'react-icons/fa';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const fetchComments = useCallback(async () => {
    try {
      const res = await commentService.getAll();
      setComments(res.data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await commentService.create({
        comment: newComment.trim(),
        commentfrom: user?.name || 'Admin',
        name: 'Workspace Discussion',
      });
      setComments((prev) => [res.data, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const d = new Date(dateString);
    return isNaN(d) ? 'Recent' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="glass-card p-4 mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <FaComments className="text-primary" size={22} />
        <div>
          <h5 className="text-white fw-bold mb-0">Team Collaboration Feed</h5>
          <p className="text-secondary small mb-0">Real-time discussion threads across all milestones</p>
        </div>
      </div>

      {/* Post comment input */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            className="modern-input flex-grow-1"
            placeholder="Share an update or feedback with the team..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={submitting}
          />
          <button
            type="submit"
            className="btn-modern-primary px-4 py-2"
            disabled={submitting || !newComment.trim()}
          >
            {submitting ? <Spinner size="sm" animation="border" /> : <FaPaperPlane />}
          </button>
        </div>
      </Form>

      {/* Comments list */}
      {loading ? (
        <div className="text-center py-4">
          <Spinner size="sm" animation="border" variant="primary" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-4 text-secondary small">
          No discussion messages yet. Start the conversation above!
        </div>
      ) : (
        <div className="d-flex flex-column gap-3" style={{ maxHeight: '350px', overflowY: 'auto' }}>
          {comments.map((item) => (
            <div
              key={item._id || item.id || Math.random()}
              className="glass-card p-3"
              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center gap-2">
                  <FaUserCircle className="text-primary" size={18} />
                  <strong className="text-white small">{item.commentfrom || 'Team Member'}</strong>
                  {item.name && <span className="text-muted small">· {item.name}</span>}
                </div>
                <span className="text-muted small">{formatDate(item.createdAt)}</span>
              </div>
              <p className="text-secondary small mb-0 ps-4">{item.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;