import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Badge, Progress } from '../../components/common';
import { Download, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './Fees.module.css';

const feeHistory = [
  { id: 1, amount: 450000, date: '2024-01-15', status: 'paid', description: 'Semester 5 Tuition Fee' },
  { id: 2, amount: 50000, date: '2024-02-01', status: 'pending', description: 'Semester 5 Lab Fee' },
  { id: 3, amount: 400000, date: '2023-08-10', status: 'paid', description: 'Semester 4 Tuition Fee' },
  { id: 4, amount: 50000, date: '2023-07-20', status: 'paid', description: 'Semester 4 Exam Fee' }
];

export const StudentFees = () => {
  const [selectedYear] = useState('2024');

  const totalFee = 500000;
  const paidAmount = 450000;
  const pendingAmount = totalFee - paidAmount;
  const dueDate = '2024-03-15';

  return (
    <div className={styles.page}>
      <Header title="Fee Details" />

      <div className={styles.content}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <div>
              <h3>Fee Summary</h3>
              <span className={styles.year}>Academic Year {selectedYear}</span>
            </div>
            <Badge variant={pendingAmount > 0 ? 'warning' : 'success'} size="large">
              {pendingAmount > 0 ? 'Payment Pending' : 'All Clear'}
            </Badge>
          </div>

          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Fee</span>
              <span className={styles.summaryValue}>₹{totalFee.toLocaleString()}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Paid Amount</span>
              <span className={`${styles.summaryValue} ${styles.success}`}>₹{paidAmount.toLocaleString()}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Pending Amount</span>
              <span className={`${styles.summaryValue} ${styles.warning}`}>₹{pendingAmount.toLocaleString()}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Due Date</span>
              <span className={styles.summaryValue}>{dueDate}</span>
            </div>
          </div>

          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span>Payment Progress</span>
              <span>{((paidAmount / totalFee) * 100).toFixed(1)}%</span>
            </div>
            <Progress
              value={paidAmount}
              max={totalFee}
              variant="success"
              size="large"
            />
          </div>

          {pendingAmount > 0 && (
            <div className={styles.alertBanner}>
              <AlertCircle size={20} />
              <div>
                <strong>Payment Alert</strong>
                <p>Please clear your pending fees of ₹{pendingAmount.toLocaleString()} by {dueDate}</p>
              </div>
            </div>
          )}
        </Card>

        <div className={styles.actions}>
          <Button icon={Download} variant="outline">
            Download Receipt
          </Button>
          <Button icon={CreditCard}>
            Pay Now
          </Button>
        </div>

        <Card className={styles.historyCard}>
          <h3>Payment History</h3>
          <div className={styles.historyList}>
            {feeHistory.map((fee) => (
              <div key={fee.id} className={styles.historyItem}>
                <div className={styles.historyIcon}>
                  {fee.status === 'paid' ? (
                    <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                  ) : (
                    <AlertCircle size={20} style={{ color: 'var(--warning)' }} />
                  )}
                </div>
                <div className={styles.historyContent}>
                  <span className={styles.historyDesc}>{fee.description}</span>
                  <span className={styles.historyDate}>{fee.date}</span>
                </div>
                <div className={styles.historyAmount}>
                  <span>₹{fee.amount.toLocaleString()}</span>
                  <Badge variant={fee.status === 'paid' ? 'success' : 'warning'} size="small">
                    {fee.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.feeBreakdown}>
          <h3>Fee Breakdown</h3>
          <div className={styles.breakdownList}>
            <div className={styles.breakdownItem}>
              <span>Tuition Fee</span>
              <span>₹350,000</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Lab Fee</span>
              <span>₹50,000</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Library Fee</span>
              <span>₹25,000</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Sports Fee</span>
              <span>₹20,000</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Exam Fee</span>
              <span>₹30,000</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Hostel Fee</span>
              <span>₹25,000</span>
            </div>
            <div className={`${styles.breakdownItem} ${styles.total}`}>
              <span>Total</span>
              <span>₹500,000</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
