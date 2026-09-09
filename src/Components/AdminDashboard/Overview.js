import React, { useEffect, useState } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { taskService, userService } from '../../services/api';
import { FaTasks, FaCheckDouble, FaHourglassHalf, FaUsers } from 'react-icons/fa';

const Overview = () => {
  const [tasks, setTasks] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadOverview = async () => {
      try {
        const [taskRes, memberRes] = await Promise.all([
          taskService.getAll(),
          userService.getTeamMembers(),
        ]);
        if (isMounted) {
          setTasks(taskRes.data || []);
          setMemberCount((memberRes.data || []).length);
        }
      } catch (err) {
        console.error('Error fetching overview data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadOverview();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed || t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => !t.completed && t.status !== 'completed').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="mb-4">
      <Row className="g-3 mb-4">
        <Col lg={3} sm={6}>
          <div className="glass-card stat-card">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <FaTasks />
            </div>
            <div>
              <div className="stat-number text-white">{loading ? '...' : totalTasks}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
          </div>
        </Col>

        <Col lg={3} sm={6}>
          <div className="glass-card stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <FaHourglassHalf />
            </div>
            <div>
              <div className="stat-number text-white">{loading ? '...' : inProgressTasks}</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>
        </Col>

        <Col lg={3} sm={6}>
          <div className="glass-card stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <FaCheckDouble />
            </div>
            <div>
              <div className="stat-number text-white">{loading ? '...' : completedTasks}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </Col>

        <Col lg={3} sm={6}>
          <div className="glass-card stat-card">
            <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <FaUsers />
            </div>
            <div>
              <div className="stat-number text-white">{loading ? '...' : memberCount}</div>
              <div className="stat-label">Team Members</div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Progress Bar */}
      <div className="glass-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h5 className="text-white fw-semibold mb-1">Sprint Completion Progress</h5>
            <p className="text-secondary small mb-0">Aggregate task progression across all assigned team members</p>
          </div>
          <span className="badge-pill badge-in-progress" style={{ fontSize: '0.9rem' }}>
            {completionPercentage}% Done
          </span>
        </div>
        <ProgressBar
          now={completionPercentage}
          variant="primary"
          style={{ height: '10px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '9999px' }}
        />
      </div>
    </div>
  );
};

export default Overview;
