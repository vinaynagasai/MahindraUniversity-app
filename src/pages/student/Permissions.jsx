import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Badge, Modal, Input, Textarea } from '../../components/common';
import { Plus, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Permissions.module.css';

export const StudentPermissions = () => {
  const { user } = useAuth();
  const { getStudentPermissions, addPermission } = useAppData();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newPermission, setNewPermission] = useState({
    type: 'leave',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);

  const studentId = user?.id || 'CS2021001';
  const studentName = user?.name || 'John Doe';
  const permissions = getStudentPermissions(studentId);

  const filteredPermissions = permissions.filter(perm => {
    if (selectedFilter === 'all') return true;
    return perm.status === selectedFilter;
  });

  const handleApply = async () => {
    if (!newPermission.startDate || !newPermission.reason) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addPermission({
      studentId,
      studentName,
      type: newPermission.type,
      startDate: newPermission.startDate,
      endDate: newPermission.endDate || newPermission.startDate,
      reason: newPermission.reason
    });
    
    setShowApplyModal(false);
    setNewPermission({ type: 'leave', startDate: '', endDate: '', reason: '' });
    setLoading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} style={{ color: 'var(--success)' }} />;
      case 'rejected':
        return <XCircle size={16} style={{ color: 'var(--error)' }} />;
      default:
        return <Calendar size={16} style={{ color: 'var(--warning)' }} />;
    }
  };

  return (
    <div className={styles.page}>
      <Header title="My Permissions & Leave" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={`${styles.statValue} ${styles.success}`}>
                {permissions.filter(p => p.status === 'approved').length}
              </span>
              <span className={styles.statLabel}>Approved</span>
            </div>
            <div className={styles.statItem}>
              <span className={`${styles.statValue} ${styles.warning}`}>
                {permissions.filter(p => p.status === 'pending').length}
              </span>
              <span className={styles.statLabel}>Pending</span>
            </div>
            <div className={styles.statItem}>
              <span className={`${styles.statValue} ${styles.danger}`}>
                {permissions.filter(p => p.status === 'rejected').length}
              </span>
              <span className={styles.statLabel}>Rejected</span>
            </div>
          </div>
          <Button icon={Plus} onClick={() => setShowApplyModal(true)}>
            Apply Now
          </Button>
        </div>

        <div className={styles.filters}>
          {['all', 'pending', 'approved', 'rejected'].map(filter => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${selectedFilter === filter ? styles.active : ''}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.permissionsList}>
          {filteredPermissions.map(permission => (
            <Card key={permission.id} className={styles.permissionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.typeAndDates}>
                  <Badge variant={permission.type === 'leave' ? 'primary' : 'info'}>
                    {permission.type}
                  </Badge>
                  <span className={styles.dateRange}>
                    {permission.startDate}
                    {permission.endDate !== permission.startDate && ` - ${permission.endDate}`}
                  </span>
                </div>
                <div className={styles.status}>
                  {getStatusIcon(permission.status)}
                  <span className={`${styles.statusText} ${styles[permission.status]}`}>
                    {permission.status}
                  </span>
                </div>
              </div>
              <p className={styles.reason}>{permission.reason}</p>
              <span className={styles.appliedOn}>Applied on {permission.appliedOn}</span>
            </Card>
          ))}

          {filteredPermissions.length === 0 && (
            <Card className={styles.emptyCard}>
              <Calendar size={48} />
              <h3>No Permissions Found</h3>
              <p>You haven't applied for any permissions yet.</p>
            </Card>
          )}
        </div>
      </div>

      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply for Permission/Leave"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowApplyModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} loading={loading}>
              Submit Application
            </Button>
          </>
        }
      >
        <div className={styles.form}>
          <div className={styles.typeSelector}>
            <button
              className={`${styles.typeBtn} ${newPermission.type === 'leave' ? styles.active : ''}`}
              onClick={() => setNewPermission(prev => ({ ...prev, type: 'leave' }))}
            >
              Leave
            </button>
            <button
              className={`${styles.typeBtn} ${newPermission.type === 'permission' ? styles.active : ''}`}
              onClick={() => setNewPermission(prev => ({ ...prev, type: 'permission' }))}
            >
              Permission
            </button>
          </div>
          <div className={styles.dateRow}>
            <Input
              type="date"
              label="Start Date"
              value={newPermission.startDate}
              onChange={(e) => setNewPermission(prev => ({ ...prev, startDate: e.target.value }))}
            />
            <Input
              type="date"
              label="End Date"
              value={newPermission.endDate}
              onChange={(e) => setNewPermission(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
          <Textarea
            label="Reason"
            placeholder="Enter the reason for your leave/permission..."
            value={newPermission.reason}
            onChange={(e) => setNewPermission(prev => ({ ...prev, reason: e.target.value }))}
            rows={3}
          />
        </div>
      </Modal>
    </div>
  );
};
