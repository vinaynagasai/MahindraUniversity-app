import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Input, Select, Textarea } from '../../components/common';
import { Send, Bell, Users, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAppData } from '../../context/AppDataContext';
import styles from './SendNotification.module.css';

const semesters = [
  { value: 5, label: 'Semester 5' },
  { value: 6, label: 'Semester 6' }
];

const priorityOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High Priority' }
];

export const FacultyNotifications = () => {
  const { addToast } = useToast();
  const { addNotification, departments, getAllStudents } = useAppData();
  const students = getAllStudents();
  
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    targetType: 'all',
    department: '',
    semester: '',
    priority: 'normal'
  });
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!notification.title || !notification.message) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const forRole = notification.targetType === 'all' ? 'all' : 'student';
    const notificationType = notification.priority === 'urgent' ? 'error' : notification.priority === 'high' ? 'warning' : 'info';
    
    addNotification({
      type: notificationType,
      title: notification.title,
      message: notification.message,
      priority: notification.priority,
      forRole,
      department: notification.department || null,
      semester: notification.semester || null
    });

    setLoading(false);
    addToast('Notification sent successfully to ' + getRecipientCount() + ' recipients!', 'success');
    setNotification({
      title: '',
      message: '',
      targetType: 'all',
      department: '',
      semester: '',
      priority: 'normal'
    });
  };

  const getRecipientCount = () => {
    if (notification.targetType === 'all') return students.length;
    if (notification.targetType === 'department' && notification.department) {
      return students.filter(s => s.department === notification.department).length;
    }
    if (notification.targetType === 'class' && notification.department && notification.semester) {
      return students.filter(s => 
        s.department === notification.department && 
        s.semester === parseInt(notification.semester)
      ).length;
    }
    return 0;
  };

  const targetOptions = [
    { value: 'all', label: 'All Students & Parents' },
    { value: 'department', label: 'Department' },
    { value: 'class', label: 'Specific Class' }
  ];

  return (
    <div className={styles.page}>
      <Header title="Send Notification" />

      <div className={styles.content}>
        <div className={styles.grid}>
          <Card className={styles.formCard}>
            <h3>Compose Notification</h3>
            <div className={styles.form}>
              <Input
                label="Title"
                placeholder="Enter notification title"
                value={notification.title}
                onChange={(e) => setNotification(prev => ({ ...prev, title: e.target.value }))}
              />

              <Textarea
                label="Message"
                placeholder="Type your notification message here..."
                value={notification.message}
                onChange={(e) => setNotification(prev => ({ ...prev, message: e.target.value }))}
                rows={5}
              />

              <Select
                label="Target Audience"
                options={targetOptions}
                value={notification.targetType}
                onChange={(e) => setNotification(prev => ({ ...prev, targetType: e.target.value }))}
              />

              {notification.targetType === 'department' && (
                <Select
                  label="Department"
                  options={departments}
                  value={notification.department}
                  onChange={(e) => setNotification(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Select department"
                />
              )}

              {notification.targetType === 'class' && (
                <div className={styles.row}>
                  <Select
                    label="Department"
                    options={departments}
                    value={notification.department}
                    onChange={(e) => setNotification(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="Select"
                  />
                  <Select
                    label="Semester"
                    options={semesters}
                    value={notification.semester}
                    onChange={(e) => setNotification(prev => ({ ...prev, semester: e.target.value }))}
                    placeholder="Select"
                  />
                </div>
              )}

              <Select
                label="Priority"
                options={priorityOptions}
                value={notification.priority}
                onChange={(e) => setNotification(prev => ({ ...prev, priority: e.target.value }))}
              />

              <Button
                icon={Send}
                onClick={handleSend}
                loading={loading}
                fullWidth
              >
                Send Notification
              </Button>
            </div>
          </Card>

          <div className={styles.previewColumn}>
            <Card className={styles.previewCard}>
              <h3>Preview</h3>
              <div className={styles.preview}>
                <div className={styles.previewIcon} style={{ 
                  backgroundColor: notification.priority === 'urgent' ? 'var(--error)' : 
                    notification.priority === 'high' ? 'var(--warning)' : 'var(--primary)' 
                }}>
                  {notification.priority === 'urgent' ? <AlertCircle size={24} /> : <Bell size={24} />}
                </div>
                <div className={styles.previewContent}>
                  <span className={styles.previewTitle}>
                    {notification.title || 'Notification Title'}
                  </span>
                  <span className={styles.previewMessage}>
                    {notification.message || 'Your notification message will appear here...'}
                  </span>
                  <span className={styles.previewTime}>Just now</span>
                </div>
              </div>
            </Card>

            <Card className={styles.statsCard}>
              <h3>Delivery Stats</h3>
              <div className={styles.statsList}>
                <div className={styles.statItem}>
                  <Users size={20} />
                  <span>{getRecipientCount()} Recipients</span>
                </div>
                <div className={styles.statItem}>
                  <Bell size={20} />
                  <span>Push Notification</span>
                </div>
                <div className={styles.statItem}>
                  {notification.priority === 'urgent' ? (
                    <AlertCircle size={20} style={{ color: 'var(--error)' }} />
                  ) : (
                    <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                  )}
                  <span>Priority: {notification.priority || 'Normal'}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
