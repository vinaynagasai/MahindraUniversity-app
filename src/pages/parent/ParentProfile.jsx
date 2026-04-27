import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Input } from '../../components/common';
import { Camera, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './ParentProfile.module.css';

export const ParentProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Michael Doe',
    email: 'michael.doe@example.com',
    phone: '+1 234 567 8900',
    linkedStudent: 'John Doe',
    studentRollNo: 'CS2021001'
  });

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.page}>
      <Header title="My Profile" />

      <div className={styles.content}>
        <Card className={styles.profileCard}>
          <div className={styles.coverPhoto} />
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>MD</div>
              <button className={styles.uploadButton}>
                <Camera size={16} />
              </button>
            </div>
            <div className={styles.headerInfo}>
              <h2>{profile.name}</h2>
              <p>Parent</p>
            </div>
            <Button
              variant={isEditing ? 'outline' : 'primary'}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              icon={isEditing ? Save : null}
              loading={loading}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </Card>

        <Card className={styles.infoCard}>
          <h3>Personal Information</h3>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Full Name</label>
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              ) : (
                <span>{profile.name}</span>
              )}
            </div>
            <div className={styles.field}>
              <label>Phone Number</label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              ) : (
                <span>{profile.phone}</span>
              )}
            </div>
          </div>
        </Card>

        <Card className={styles.infoCard}>
          <h3>Linked Child</h3>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Student Name</label>
              <span>{profile.linkedStudent}</span>
            </div>
            <div className={styles.field}>
              <label>Roll Number</label>
              <span className={styles.mono}>{profile.studentRollNo}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
