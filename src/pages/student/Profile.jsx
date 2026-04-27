import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Input, Avatar, Badge } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { Camera, Save, Edit2 } from 'lucide-react';
import styles from './Profile.module.css';

export const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'cs2021001@mu.edu',
    phone: '+1 234 567 8900',
    address: '123 University Street, Campus Area',
    rollNo: user?.id || 'CS2021001',
    department: 'Computer Science',
    semester: 5,
    dob: '2002-05-15',
    bloodGroup: 'O+'
  });

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateUser({ name: profile.name });
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
              <Avatar name={profile.name} size="xlarge" />
              <button className={styles.uploadButton}>
                <Camera size={16} />
              </button>
            </div>
            <div className={styles.headerInfo}>
              <h2>{profile.name}</h2>
              <p>{profile.department} - Semester {profile.semester}</p>
            </div>
            <Button
              variant={isEditing ? 'outline' : 'primary'}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              icon={isEditing ? Save : Edit2}
              loading={loading}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </Card>

        <div className={styles.grid}>
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
                <label>Roll Number</label>
                <span className={styles.mono}>{profile.rollNo}</span>
              </div>
              <div className={styles.field}>
                <label>Date of Birth</label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={profile.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                  />
                ) : (
                  <span>{profile.dob}</span>
                )}
              </div>
              <div className={styles.field}>
                <label>Blood Group</label>
                <Badge variant="error">{profile.bloodGroup}</Badge>
              </div>
            </div>
          </Card>

          <Card className={styles.infoCard}>
            <h3>Contact Information</h3>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>Email Address</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                ) : (
                  <span>{profile.email}</span>
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
              <div className={styles.field}>
                <label>Address</label>
                {isEditing ? (
                  <Input
                    value={profile.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                ) : (
                  <span>{profile.address}</span>
                )}
              </div>
            </div>
          </Card>

          <Card className={styles.infoCard}>
            <h3>Academic Information</h3>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>Department</label>
                <span>{profile.department}</span>
              </div>
              <div className={styles.field}>
                <label>Current Semester</label>
                <Badge variant="primary">Semester {profile.semester}</Badge>
              </div>
              <div className={styles.field}>
                <label>CGPA</label>
                <span className={styles.highlight}>8.5</span>
              </div>
              <div className={styles.field}>
                <label>Attendance</label>
                <Badge variant="success">85%</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
