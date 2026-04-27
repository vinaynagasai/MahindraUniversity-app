import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Badge } from '../../components/common';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import styles from './FacultyPermissions.module.css';

export const FacultyPermissions = () => {
  const { getAllPermissions, updatePermissionStatus } = useAppData();
  const { addToast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState('pending');

  const allPermissions = getAllPermissions();
  const filteredPermissions = allPermissions.filter(p => {
    if (selectedFilter === 'all') return true;
    return p.status === selectedFilter;
  });

  const handleUpdateStatus = async (id, status) => {
    updatePermissionStatus(id, status);
    addToast(`Permission ${status} successfully!`, 'success');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} style={{ color: 'var(--success)' }} />;
      case 'rejected':
        return <XCircle size={16} style={{ color: 'var(--error)' }} />;
      default:
        return <Clock size={16} style={{ color: 'var(--warning)' }} />;
    }
  };

  return (
    <div className={styles.page}>
      <Header title="Manage Permissions" />

      <div className={styles.content}>
        <div className={styles.stats}>
          <Card className={styles.statCard}>
            <span className={styles.statValue}>
              {allPermissions.filter(p => p.status === 'pending').length}
            </span>
            <span className={styles.statLabel}>Pending</span>
          </Card>
          <Card className={styles.statCard}>
            <span className={`${styles.statValue} ${styles.success}`}>
              {allPermissions.filter(p => p.status === 'approved').length}
            </span>
            <span className={styles.statLabel}>Approved</span>
          </Card>
          <Card className={styles.statCard}>
            <span className={`${styles.statValue} ${styles.danger}`}>
              {allPermissions.filter(p => p.status === 'rejected').length}
            </span>
            <span className={styles.statLabel}>Rejected</span>
          </Card>
        </div>

        <div className={styles.filters}>
          {['pending', 'approved', 'rejected', 'all'].map(filter => (
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
                <div className={styles.studentInfo}>
                  <span className={styles.studentName}>{permission.studentName}</span>
                  <span className={styles.studentId}>{permission.studentId}</span>
                </div>
                <div className={styles.status}>
                  {getStatusIcon(permission.status)}
                  <span className={`${styles.statusText} ${styles[permission.status]}`}>
                    {permission.status}
                  </span>
                </div>
              </div>

              <div className={styles.permissionDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Type:</span>
                  <Badge variant={permission.type === 'leave' ? 'primary' : 'info'} size="small">
                    {permission.type}
                  </Badge>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Dates:</span>
                  <span className={styles.detailValue}>
                    {permission.startDate}
                    {permission.endDate !== permission.startDate && ` - ${permission.endDate}`}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Reason:</span>
                  <span className={styles.detailValue}>{permission.reason}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Applied:</span>
                  <span className={styles.detailValue}>{permission.appliedOn}</span>
                </div>
              </div>

              {permission.status === 'pending' && (
                <div className={styles.actions}>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => handleUpdateStatus(permission.id, 'rejected')}
                  >
                    <XCircle size={16} /> Reject
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleUpdateStatus(permission.id, 'approved')}
                  >
                    <CheckCircle size={16} /> Approve
                  </Button>
                </div>
              )}
            </Card>
          ))}

          {filteredPermissions.length === 0 && (
            <Card className={styles.emptyCard}>
              <h3>No Permissions Found</h3>
              <p>No permissions match your filter.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
