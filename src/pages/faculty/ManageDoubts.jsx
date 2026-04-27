import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Badge, Textarea } from '../../components/common';
import { MessageSquare } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import styles from './ManageDoubts.module.css';

export const FacultyManageDoubts = () => {
  const { getAllDoubts, respondToDoubt } = useAppData();
  const { addToast } = useToast();
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const allDoubts = getAllDoubts();
  const pendingDoubts = allDoubts.filter(d => d.status === 'pending');
  const answeredDoubts = allDoubts.filter(d => d.status === 'answered');

  const handleSelectDoubt = (doubt) => {
    setSelectedDoubt(doubt);
    setResponse(doubt.response || '');
  };

  const handleSubmitResponse = async () => {
    if (!response.trim()) {
      addToast('Please enter a response', 'error');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    respondToDoubt(selectedDoubt.id, response);
    addToast('Response submitted successfully!', 'success');
    setSelectedDoubt(null);
    setResponse('');
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <Header title="Manage Student Doubts" />

      <div className={styles.content}>
        <div className={styles.stats}>
          <Card className={styles.statCard}>
            <span className={styles.statValue}>{pendingDoubts.length}</span>
            <span className={styles.statLabel}>Pending Doubts</span>
          </Card>
          <Card className={styles.statCard}>
            <span className={styles.statValue}>{answeredDoubts.length}</span>
            <span className={styles.statLabel}>Answered</span>
          </Card>
        </div>

        <div className={styles.grid}>
          <Card className={styles.doubtsCard}>
            <h3>All Student Doubts</h3>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${!selectedDoubt?.status || selectedDoubt?.status === 'pending' ? styles.active : ''}`}>
                Pending ({pendingDoubts.length})
              </button>
              <button className={`${styles.tab} ${selectedDoubt?.status === 'answered' ? styles.active : ''}`}>
                Answered ({answeredDoubts.length})
              </button>
            </div>
            <div className={styles.doubtsList}>
              {allDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  className={`${styles.doubtItem} ${selectedDoubt?.id === doubt.id ? styles.selected : ''}`}
                  onClick={() => handleSelectDoubt(doubt)}
                >
                  <div className={styles.doubtHeader}>
                    <Badge variant={doubt.status === 'pending' ? 'warning' : 'success'} size="small">
                      {doubt.status}
                    </Badge>
                    <span className={styles.doubtTime}>{doubt.createdAt}</span>
                  </div>
                  <span className={styles.doubtTitle}>{doubt.title}</span>
                  <span className={styles.doubtStudent}>{doubt.studentName} • {doubt.subject}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.responseCard}>
            {selectedDoubt ? (
              <>
                <div className={styles.questionSection}>
                  <h4>Question from {selectedDoubt.studentName}</h4>
                  <Badge variant="primary" size="small">{selectedDoubt.subject}</Badge>
                  <p className={styles.questionText}>{selectedDoubt.description}</p>
                </div>

                <div className={styles.responseSection}>
                  <h4>Your Response</h4>
                  {selectedDoubt.status === 'answered' ? (
                    <div className={styles.previousResponse}>
                      <p>{selectedDoubt.response}</p>
                      <span className={styles.responseDate}>Answered on {selectedDoubt.respondedAt}</span>
                    </div>
                  ) : (
                    <>
                      <Textarea
                        placeholder="Type your response here..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        rows={6}
                      />
                      <div className={styles.responseActions}>
                        <Button
                          onClick={handleSubmitResponse}
                          loading={loading}
                        >
                          Submit Response
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <MessageSquare size={48} />
                <h4>Select a Doubt</h4>
                <p>Click on a doubt from the list to view and respond</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
