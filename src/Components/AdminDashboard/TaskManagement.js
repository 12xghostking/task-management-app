import React, { useState, useEffect, useCallback } from 'react';
import { Form, Modal, Spinner } from 'react-bootstrap';
import { taskService, userService } from '../../services/api';
import {
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaRegCircle,
} from 'react-icons/fa';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Create Task Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newNotes, setNewNotes] = useState('');
  const [creating, setCreating] = useState(false);

  // Edit Deadline Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editDeadlineDate, setEditDeadlineDate] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await taskService.getAll();
      setTasks(res.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await userService.getUsers();
      setTeamMembers(res.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchUsers()]);
      setLoading(false);
    };
    init();
  }, [fetchTasks, fetchUsers]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskName || !newDeadline) return;

    setCreating(true);
    try {
      const payload = {
        name: newTaskName,
        deadline: newDeadline,
        assignedMembers: newAssignee || 'Unassigned',
        priority: newPriority,
        notes: newNotes,
        status: 'pending',
      };
      const res = await taskService.create(payload);
      setTasks((prev) => [res.data, ...prev]);

      // Reset form
      setNewTaskName('');
      setNewDeadline('');
      setNewAssignee('');
      setNewPriority('medium');
      setNewNotes('');
      setShowCreateModal(false);
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleToggleCompleted = async (task) => {
    const updatedStatus = !task.completed;
    try {
      await taskService.toggleCompleted(task._id || task.id, updatedStatus);
      setTasks((prev) =>
        prev.map((t) =>
          (t._id || t.id) === (task._id || task.id)
            ? {
                ...t,
                completed: updatedStatus,
                status: updatedStatus ? 'completed' : 'in-progress',
              }
            : t
        )
      );
    } catch (err) {
      console.error('Error toggling task completion:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.delete(taskId);
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const openEditDeadline = (task) => {
    setEditTaskId(task._id || task.id);
    setEditDeadlineDate(task.deadline || '');
    setShowEditModal(true);
  };

  const handleUpdateDeadline = async (e) => {
    e.preventDefault();
    if (!editDeadlineDate || !editTaskId) return;

    setUpdating(true);
    try {
      await taskService.updateDeadline(editTaskId, editDeadlineDate);
      setTasks((prev) =>
        prev.map((t) =>
          (t._id || t.id) === editTaskId ? { ...t, deadline: editDeadlineDate } : t
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating deadline:', err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.name?.toLowerCase().includes(search.toLowerCase()) ||
      String(task.assignedMembers || '')
        .toLowerCase()
        .includes(search.toLowerCase());

    const isCompleted = task.completed || task.status === 'completed';
    if (statusFilter === 'completed') return matchesSearch && isCompleted;
    if (statusFilter === 'in-progress') return matchesSearch && !isCompleted;
    return matchesSearch;
  });

  const getPriorityBadge = (priority) => {
    const p = (priority || 'medium').toLowerCase();
    if (p === 'high') return <span className="badge-pill badge-high">High</span>;
    if (p === 'low') return <span className="badge-pill badge-low">Low</span>;
    return <span className="badge-pill badge-medium">Medium</span>;
  };

  return (
    <div className="glass-card p-4 mb-4">
      {/* Header Bar */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h4 className="text-white fw-bold mb-1">Task Orchestration Board</h4>
          <p className="text-secondary small mb-0">Create, assign, and track live organizational objectives</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-modern-primary py-2 px-3"
          style={{ fontSize: '0.9rem' }}
        >
          <FaPlus /> Create New Task
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <div className="flex-grow-1 position-relative" style={{ minWidth: '220px' }}>
          <FaSearch
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            className="modern-input w-100"
            style={{ paddingLeft: '38px' }}
            placeholder="Search by task title or assigned member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`btn btn-sm ${
              statusFilter === 'all' ? 'btn-modern-primary' : 'btn-modern-secondary'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setStatusFilter('in-progress')}
            className={`btn btn-sm ${
              statusFilter === 'in-progress' ? 'btn-modern-primary' : 'btn-modern-secondary'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`btn btn-sm ${
              statusFilter === 'completed' ? 'btn-modern-primary' : 'btn-modern-secondary'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      {loading ? (
        <div className="text-center py-5 text-secondary">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 small">Loading active tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-5 text-secondary glass-card p-4">
          <p className="mb-2">No tasks found matching your filter criteria.</p>
          <button onClick={() => setShowCreateModal(true)} className="btn-modern-primary btn-sm mt-2">
            <FaPlus /> Create a Task
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>Status</th>
                <th>Task Title</th>
                <th>Assignee</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => {
                const taskId = task._id || task.id;
                const isDone = task.completed || task.status === 'completed';

                return (
                  <tr key={taskId}>
                    <td>
                      <button
                        onClick={() => handleToggleCompleted(task)}
                        className="btn btn-link p-0 text-decoration-none border-0"
                        title={isDone ? 'Mark In-Progress' : 'Mark Completed'}
                        style={{ cursor: 'pointer' }}
                      >
                        {isDone ? (
                          <FaCheckCircle className="text-success" size={20} />
                        ) : (
                          <FaRegCircle className="text-secondary" size={20} />
                        )}
                      </button>
                    </td>
                    <td>
                      <div className={`fw-semibold ${isDone ? 'text-decoration-line-through text-muted' : 'text-white'}`}>
                        {task.name}
                      </div>
                      {task.notes && (
                        <div className="text-secondary small mt-1" style={{ maxWidth: '300px' }}>
                          {task.notes}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="badge-pill badge-in-progress" style={{ textTransform: 'none' }}>
                        {Array.isArray(task.assignedMembers)
                          ? task.assignedMembers.join(', ')
                          : task.assignedMembers || 'Unassigned'}
                      </span>
                    </td>
                    <td>{getPriorityBadge(task.priority)}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2 text-secondary small">
                        <FaCalendarAlt className="text-primary" />
                        <span>{task.deadline}</span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          onClick={() => openEditDeadline(task)}
                          className="btn btn-sm btn-modern-secondary px-2 py-1"
                          title="Edit Deadline"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(taskId)}
                          className="btn btn-sm btn-modern-danger px-2 py-1"
                          title="Delete Task"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Task Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
        contentClassName="modern-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-white fw-bold">Create New Workspace Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateTask}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                className="modern-input"
                placeholder="e.g. Implement OAuth 2.0 Provider"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assign Team Member</Form.Label>
              <Form.Select
                className="modern-input"
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
              >
                <option value="">Select Assignee (or leave unassigned)</option>
                {teamMembers.map((member) => (
                  <option key={member._id || member.id} value={member.name}>
                    {member.name} ({member.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  className="modern-input"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Select>
              </div>

              <div className="col-sm-6">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  className="modern-input"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Description & Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="modern-input"
                placeholder="Key requirements, specs, or links..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn-modern-secondary py-2 px-3"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-modern-primary py-2 px-4" disabled={creating}>
              {creating ? <Spinner size="sm" animation="border" /> : 'Create Task'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Deadline Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        contentClassName="modern-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-white fw-bold">Update Task Deadline</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateDeadline}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>New Deadline Date</Form.Label>
              <Form.Control
                type="date"
                className="modern-input"
                value={editDeadlineDate}
                onChange={(e) => setEditDeadlineDate(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn-modern-secondary py-2 px-3"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-modern-primary py-2 px-4" disabled={updating}>
              {updating ? <Spinner size="sm" animation="border" /> : 'Save Deadline'}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManagement;
