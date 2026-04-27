import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card } from '../../components/common';
import { DAYS } from '../../utils/constants';
import styles from './Timetable.module.css';

const generateTimetable = () => {
  const subjects = ['Machine Learning', 'Web Development', 'Compiler Design', 'Artificial Intelligence', 'Cryptography'];
  const rooms = ['A-101', 'A-102', 'B-201', 'B-202', 'C-301'];
  const faculty = ['Dr. Sarah Smith', 'Prof. John Doe', 'Dr. Emily Brown', 'Prof. Michael Lee', 'Dr. Lisa Chen'];
  
  const timetable = {};
  DAYS.forEach((day, dayIndex) => {
    if (dayIndex === 0) return;
    timetable[dayIndex] = [];
    for (let hour = 8; hour <= 16; hour++) {
      if (Math.random() > 0.3) {
        const subjectIndex = Math.floor(Math.random() * subjects.length);
        timetable[dayIndex].push({
          hour,
          subject: subjects[subjectIndex],
          room: rooms[Math.floor(Math.random() * rooms.length)],
          faculty: faculty[subjectIndex]
        });
      }
    }
  });
  return timetable;
};

const formatHour = (hour) => {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${suffix}`;
};

export const StudentTimetable = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() || 1);
  const timetable = generateTimetable();

  const days = DAYS.slice(1).map((day, index) => ({ day, index: index + 1 }));
  const currentDayIndex = new Date().getDay() || 1;

  return (
    <div className={styles.page}>
      <Header title="Timetable" />

      <div className={styles.content}>
        <div className={styles.daySelector}>
          {days.map(({ day, index }) => (
            <button
              key={day}
              className={`${styles.dayButton} ${selectedDay === index ? styles.active : ''} ${currentDayIndex === index ? styles.today : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              <span className={styles.dayName}>{day.slice(0, 3)}</span>
              {currentDayIndex === index && <span className={styles.todayDot} />}
            </button>
          ))}
        </div>

        <Card className={styles.timetableCard}>
          <div className={styles.cardHeader}>
            <h3>{DAYS[selectedDay]}</h3>
            <span className={styles.classCount}>
              {timetable[selectedDay]?.length || 0} classes today
            </span>
          </div>

          <div className={styles.timeline}>
            {timetable[selectedDay]?.length > 0 ? (
              timetable[selectedDay].map((slot, index) => (
                <div key={index} className={styles.timeSlot}>
                  <div className={styles.timeColumn}>
                    <span className={styles.time}>{formatHour(slot.hour)}</span>
                  </div>
                  <div className={styles.slotCard}>
                    <div className={styles.slotContent}>
                      <h4>{slot.subject}</h4>
                      <div className={styles.slotMeta}>
                        <span className={styles.room}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {slot.room}
                        </span>
                        <span className={styles.faculty}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                          {slot.faculty}
                        </span>
                      </div>
                    </div>
                    <div className={styles.slotDuration}>
                      <span>1 hr</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <h4>No Classes Scheduled</h4>
                <p>You have a free day! Enjoy your time.</p>
              </div>
            )}
          </div>
        </Card>

        <Card className={styles.legendCard}>
          <h4>Quick Legend</h4>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: 'var(--primary)' }} />
              <span>Core Subjects</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: 'var(--secondary)' }} />
              <span>Lab Sessions</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: 'var(--warning)' }} />
              <span>Electives</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
