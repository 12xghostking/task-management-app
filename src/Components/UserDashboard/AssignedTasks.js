import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Spinner, Form } from 'react-bootstrap';
import { taskService, commentService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  FaCheckCircle,
  FaRegCircle,
  FaCalendarAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaInfoCircle,
  FaPaperPlane,
} from 'react-icons/fa';

const AssignedTasks = ({ onTasksLoaded }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [filter, setFilter] = useState('all');

  // Modal details
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskComment, setTaskComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!user?.name) return;
    try {
      const res = await taskService.getByMember(user.name);
      const data = res.data || [];
      setTasks(data);
      if (onTasksLoaded) onTasksLoaded(data);
    } catch (err) {
      console.error('Error fetching assigned tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.name, onTasksLoaded]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleCompleted = async (task) => {
    const updated = !task.completed;
    try {
      await taskService.toggleCompleted(task._id || task.id, updated);
      setTasks((prev) =>
        prev.map((t) =>
          (t._id || t.id) === (task._id || task.id)
            ? { ...t, completed: updated, status: updated ? 'completed' : 'in-progress' }
            : t
        )
      );
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleSort = () => {
    const nextAsc = !sortAsc;
    setSortAsc(nextAsc);
    const sorted = [...tasks].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nextAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setTasks(sorted);
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setTaskComment('');
    setShowModal(true);
  };

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    if (!taskComment.trim() || !selectedTask) return;

    setSubmittingComment(true);
    try {
      await commentService.create({
        name: `Feedback on: ${selectedTask.name}`,
        commentfrom: user.name,
        comment: taskComment.trim(),
        taskId: selectedTask._id || selectedTask.id,
      });
      alert('Feedback dispatched to project feed!');
      setTaskComment('');
      setShowModal(false);
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const isDone = t.completed || t.status === 'completed';
    if (filter === 'completed') return isDone;
    if (filter === 'pending') return !isDone;
    return true;
  });

  const getPriorityBadge = (priority) => {
    const p = (priority || 'medium').toLowerCase();
    if (p === 'high') return <span className="badge-pill badge-high">High</span>;
    if (p === 'low') return <span className="badge-pill badge-low">Low</span>;
    return <span className="badge-pill badge-medium">Medium</span>;
  };

  return (
    <div className="glass-card p-4 mb-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h4 className="text-white fw-bold mb-1">My Assigned Objectives</h4>
          <p className="text-secondary small mb-0">Tasks delegated to your account</p>
        </div>

        <div className="d-flex gap-2">
          <button onClick={handleSort} className="btn btn-sm btn-modern-secondary d-flex align-items-center gap-1">
            {sortAsc ? <FaSortAmountDown /> : <FaSortAmountUp />} Sort A-Z
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-modern-primary' : 'btn-modern-secondary'}`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`btn btn-sm ${filter === 'pending' ? 'btn-modern-primary' : 'btn-modern-secondary'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`btn btn-sm ${filter === 'completed' ? 'btn-modern-primary' : 'btn-modern-secondary'}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-4 text-secondary small glass-card p-4">
          No tasks currently assigned matching your filter.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {filteredTasks.map((task) => {
            const taskId = task._id || task.id;
            const isDone = task.completed || task.status === 'completed';

            return (
              <div
                key={taskId}
                className="glass-card p-3 d-flex flex-wrap align-items-center justify-content-between gap-3"
                style={{
                  background: isDone ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                  borderLeft: isDone ? '4px solid #10b981' : '4px solid #6366f1',
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <button
                    onClick={() => handleToggleCompleted(task)}
                    className="btn btn-link p-0 text-decoration-none border-0"
                    title={isDone ? 'Mark as In-Progress' : 'Mark as Completed'}
                  >
                    {isDone ? (
                      <FaCheckCircle className="text-success" size={22} />
                    ) : (
                      <FaRegCircle className="text-secondary" size={22} />
                    )}
                  </button>

                  <div>
                    <div className={`fw-semibold ${isDone ? 'text-decoration-line-through text-muted' : 'text-white'}`}>
                      {task.name}
                    </div>
                    <div className="d-flex align-items-center gap-3 text-secondary small mt-1">
                      <span className="d-flex align-items-center gap-1">
                        <FaCalendarAlt className="text-primary" /> Due: {task.deadline}
                      </span>
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(task)}
                    className="btn btn-sm btn-modern-secondary px-3 py-1"
                  >
                    <FaInfoCircle /> Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="modern-modal">
          <Modal.Header closeButton>
            <Modal.Title className="text-white fw-bold">{selectedTask.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <strong className="text-secondary small d-block mb-1">Assigned Members</strong>
              <span className="badge-pill badge-in-progress" style={{ textTransform: 'none' }}>
                {Array.isArray(selectedTask.assignedMembers)
                  ? selectedTask.assignedMembers.join(', ')
                  : selectedTask.assignedMembers}
              </span>
            </div>

            <div className="mb-3">
              <strong className="text-secondary small d-block mb-1">Target Deadline</strong>
              <span className="text-white">{selectedTask.deadline}</span>
            </div>

            <div className="mb-3">
              <strong className="text-secondary small d-block mb-1">Notes & Specifications</strong>
              <div className="glass-card p-3 text-secondary small">
                {selectedTask.notes || 'No notes provided by project manager.'}
              </div>
            </div>

            <hr className="border-secondary border-opacity-25" />

            <Form onSubmit={handleSendFeedback}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white small">Submit Progress Feedback or Question</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  className="modern-input"
                  placeholder="Leave an update on this task..."
                  value={taskComment}
                  onChange={(e) => setTaskComment(e.target.value)}
                />
              </Form.Group>
              <button
                type="submit"
                className="btn-modern-primary btn-sm py-2 px-3"
                disabled={submittingComment || !taskComment.trim()}
              >
                {submittingComment ? <Spinner size="sm" animation="border" /> : <><FaPaperPlane /> Post to Team Feed</>}
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AssignedTasks;
