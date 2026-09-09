import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { userService } from '../../services/api';
import { FaUserCircle, FaTasks } from 'react-icons/fa';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchMembers = async () => {
      try {
        const res = await userService.getTeamMembers();
        if (isMounted) {
          setMembers(res.data || []);
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMembers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="glass-card p-4 mb-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-white fw-bold mb-1">Team Directory</h5>
          <p className="text-secondary small mb-0">Active members registered in the organization</p>
        </div>
        <span className="badge-pill badge-in-progress">{members.length} Members</span>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner size="sm" animation="border" variant="primary" />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-4 text-secondary small">No registered team members found.</div>
      ) : (
        <Row className="g-3">
          {members.map((member) => (
            <Col sm={6} key={member.id || member._id || member.name}>
              <div
                className="glass-card p-3 d-flex align-items-center justify-content-between"
                style={{ background: 'rgba(255, 255, 255, 0.03)' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'var(--primary-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1.2rem',
                    }}
                  >
                    {member.name ? member.name.charAt(0).toUpperCase() : <FaUserCircle />}
                  </div>
                  <div>
                    <strong className="text-white d-block" style={{ fontSize: '0.95rem' }}>
                      {member.name}
                    </strong>
                    <span className="text-muted small">{member.email || 'Team Member'}</span>
                  </div>
                </div>

                <div className="text-end">
                  <span className="badge-pill badge-pending d-flex align-items-center gap-1">
                    <FaTasks size={10} /> {member.totalTasks || 0} tasks
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TeamMembers;
