import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { FaCalendarAlt, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const Ganttchart = ({ tasks = [] }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="glass-card p-4 mb-4">
        <h5 className="text-white fw-bold mb-1">Milestone Timeline</h5>
        <p className="text-secondary small mb-3">Visual timeline of assigned delivery dates</p>
        <div className="text-center py-4 text-secondary small">
          No tasks assigned yet to generate a timeline schedule.
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-white fw-bold mb-1">Milestone Timeline & Schedule</h5>
          <p className="text-secondary small mb-0">Delivery checkpoints and progress metrics</p>
        </div>
        <span className="badge-pill badge-in-progress">{tasks.length} Tracked Milestones</span>
      </div>

      <div className="d-flex flex-column gap-3 pt-2">
        {tasks.map((task, idx) => {
          const isDone = task.completed || task.status === 'completed';
          const progress = isDone ? 100 : task.status === 'in-progress' ? 50 : 15;

          const getVariant = () => {
            if (isDone) return 'success';
            if (task.priority === 'high') return 'danger';
            if (task.priority === 'medium') return 'warning';
            return 'primary';
          };

          return (
            <div
              key={task._id || task.id || idx}
              className="glass-card p-3"
              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                  {isDone ? (
                    <FaCheckCircle className="text-success" />
                  ) : (
                    <FaHourglassHalf className="text-warning" />
                  )}
                  <strong className="text-white small">{task.name}</strong>
                </div>

                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <FaCalendarAlt className="text-primary" />
                  <span>Target: {task.deadline}</span>
                  <span className={`badge-pill badge-${task.priority || 'medium'}`}>
                    {task.priority || 'medium'}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="flex-grow-1">
                  <ProgressBar
                    now={progress}
                    variant={getVariant()}
                    style={{ height: '6px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                  />
                </div>
                <span className="text-muted small" style={{ minWidth: '45px', textAlign: 'right' }}>
                  {progress}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ganttchart;