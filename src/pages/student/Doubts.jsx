import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Badge, Modal, Input, Textarea, Select } from '../../components/common';
import { Plus, MessageSquare, Clock } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Doubts.module.css';

const subjectOptions = [
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Database Systems', label: 'Database Systems' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Compiler Design', label: 'Compiler Design' },
  { value: 'Computer Networks', label: 'Computer Networks' },
  { value: 'Operating Systems', label: 'Operating Systems' }
];

export const StudentDoubts = () => {
  const { user } = useAuth();
  const { getStudentDoubts, addDoubt } = useAppData();
  const [showAskModal, setShowAskModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newDoubt, setNewDoubt] = useState({
    subject: '',
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const studentId = user?.id || 'CS2021001';
  const studentName = user?.name || 'John Doe';
  const studentDoubts = getStudentDoubts(studentId);

  const filteredDoubts = studentDoubts.filter(doubt => {
    if (selectedFilter === 'all') return true;
    return doubt.status === selectedFilter;
  });

  const handleAskDoubt = async () => {
    if (!newDoubt.subject || !newDoubt.title || !newDoubt.description) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addDoubt({
      studentId,
      studentName,
      subject: newDoubt.subject,
      title: newDoubt.title,
      description: newDoubt.description
    });
    
    setShowAskModal(false);
    setNewDoubt({ subject: '', title: '', description: '' });
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <Header title="My Doubts" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.filters}>
            {['all', 'pending', 'answered'].map(filter => (
              <button
                key={filter}
                className={`${styles.filterBtn} ${selectedFilter === filter ? styles.active : ''}`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                {filter !== 'all' && (
                  <span className={styles.filterCount}>
                    {studentDoubts.filter(d => d.status === filter).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <Button icon={Plus} onClick={() => setShowAskModal(true)}>
            Ask New Doubt
          </Button>
        </div>

        <div className={styles.doubtsList}>
          {filteredDoubts.map(doubt => (
            <Card key={doubt.id} className={styles.doubtCard}>
              <div className={styles.doubtHeader}>
                <div>
                  <Badge variant="primary">{doubt.subject}</Badge>
                  <h3>{doubt.title}</h3>
                </div>
                <Badge variant={doubt.status === 'answered' ? 'success' : 'warning'}>
                  {doubt.status === 'answered' ? 'Answered' : 'Pending'}
                </Badge>
              </div>

              <p className={styles.doubtDescription}>{doubt.description}</p>

              <div className={styles.doubtMeta}>
                <span className={styles.date}>
                  <Clock size={14} />
                  Asked on {doubt.createdAt}
                </span>
              </div>

              {doubt.response && (
                <div className={styles.responseSection}>
                  <div className={styles.responseHeader}>
                    <MessageSquare size={16} />
                    <span>Faculty Response</span>
                  </div>
                  <p className={styles.responseText}>{doubt.response}</p>
                  <span className={styles.responseDate}>Answered on {doubt.respondedAt}</span>
                </div>
              )}
            </Card>
          ))}

          {filteredDoubts.length === 0 && (
            <Card className={styles.emptyCard}>
              <MessageSquare size={48} />
              <h3>No Doubts Found</h3>
              <p>You haven't raised any doubts yet or none match your filter.</p>
            </Card>
          )}
        </div>
      </div>

      <Modal
        isOpen={showAskModal}
        onClose={() => setShowAskModal(false)}
        title="Ask a New Doubt"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAskModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAskDoubt} loading={loading}>
              Submit
            </Button>
          </>
        }
      >
        <div className={styles.form}>
          <Select
            label="Subject"
            options={subjectOptions}
            value={newDoubt.subject}
            onChange={(e) => setNewDoubt(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="Select subject"
          />
          <Input
            label="Title"
            placeholder="Brief summary of your doubt"
            value={newDoubt.title}
            onChange={(e) => setNewDoubt(prev => ({ ...prev, title: e.target.value }))}
          />
          <Textarea
            label="Description"
            placeholder="Describe your doubt in detail..."
            value={newDoubt.description}
            onChange={(e) => setNewDoubt(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
          />
        </div>
      </Modal>
    </div>
  );
};
