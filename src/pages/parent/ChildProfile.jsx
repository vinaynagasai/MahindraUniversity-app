import { Header } from '../../components/layout';
import { Card, Avatar, Badge } from '../../components/common';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import styles from './ChildProfile.module.css';

const childInfo = {
  name: 'John Doe',
  rollNo: 'CS2021001',
  email: 'john.doe@student.mu.edu',
  phone: '+1 234 567 8901',
  department: 'Computer Science',
  semester: 5,
  dob: '2002-05-15',
  address: '123 University Street, Campus Area',
  parentName: 'Michael Doe',
  bloodGroup: 'O+',
  cgpa: 8.5
};

export const ParentChildProfile = () => {
  return (
    <div className={styles.page}>
      <Header title="Child Profile" />

      <div className={styles.content}>
        <Card className={styles.profileCard}>
          <div className={styles.coverPhoto} />
          <div className={styles.profileHeader}>
            <Avatar name={childInfo.name} size="xlarge" />
            <div className={styles.headerInfo}>
              <h2>{childInfo.name}</h2>
              <p>{childInfo.rollNo}</p>
              <div className={styles.badges}>
                <Badge variant="primary">{childInfo.department}</Badge>
                <Badge variant="default">Semester {childInfo.semester}</Badge>
              </div>
            </div>
          </div>
        </Card>

        <div className={styles.grid}>
          <Card className={styles.infoCard}>
            <h3>Personal Information</h3>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>Date of Birth</label>
                <span>{childInfo.dob}</span>
              </div>
              <div className={styles.field}>
                <label>Blood Group</label>
                <Badge variant="error">{childInfo.bloodGroup}</Badge>
              </div>
              <div className={styles.field}>
                <label>Address</label>
                <span>{childInfo.address}</span>
              </div>
            </div>
          </Card>

          <Card className={styles.infoCard}>
            <h3>Contact Information</h3>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label><Phone size={14} /> Phone</label>
                <span>{childInfo.phone}</span>
              </div>
              <div className={styles.field}>
                <label><Mail size={14} /> Email</label>
                <span>{childInfo.email}</span>
              </div>
            </div>
          </Card>

          <Card className={styles.infoCard}>
            <h3>Academic Performance</h3>
            <div className={styles.academicStats}>
              <div className={styles.academicItem}>
                <span className={styles.academicValue}>{childInfo.cgpa}</span>
                <span className={styles.academicLabel}>Current CGPA</span>
              </div>
              <div className={styles.academicItem}>
                <span className={styles.academicValue}>85%</span>
                <span className={styles.academicLabel}>Attendance</span>
              </div>
              <div className={styles.academicItem}>
                <span className={styles.academicValue}>A</span>
                <span className={styles.academicLabel}>Grade</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
