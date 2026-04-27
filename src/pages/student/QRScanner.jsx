import { useState, useRef, useEffect } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Modal } from '../../components/common';
import { QrCode, Camera, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import styles from './QRScanner.module.css';

export const QRScanner = () => {
  const { addToast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [recentScans, setRecentScans] = useState([
    { id: 1, location: 'Main Gate', time: '08:30 AM', date: 'Today', status: 'in' },
    { id: 2, location: 'Library', time: '10:00 AM', date: 'Today', status: 'in' },
    { id: 3, location: 'Main Gate', time: '05:00 PM', date: 'Yesterday', status: 'out' }
  ]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setCameraError(null);
      }
    } catch {
      setCameraError('Unable to access camera. Please grant camera permissions.');
      addToast('Camera access denied', 'error');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const simulateScan = () => {
    const locations = ['Main Gate', 'Library', 'Cafeteria', 'Lab Block', 'Sports Complex'];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const isIn = Math.random() > 0.5;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const result = {
      success: true,
      location: randomLocation,
      time,
      date: 'Today',
      status: isIn ? 'in' : 'out',
      studentId: 'CS2021001',
      studentName: 'John Doe'
    };

    setScanResult(result);
    setShowResult(true);
    stopCamera();

    setRecentScans(prev => [{
      id: Date.now(),
      location: randomLocation,
      time,
      date: 'Today',
      status: isIn ? 'in' : 'out'
    }, ...prev.slice(0, 4)]);
  };

  const handleScanComplete = () => {
    setShowResult(false);
    setScanResult(null);
    addToast(`Attendance marked successfully! ${scanResult?.status === 'in' ? 'Checked In' : 'Checked Out'} at ${scanResult?.location}`, 'success');
  };

  return (
    <div className={styles.page}>
      <Header title="Scan QR Code" />

      <div className={styles.content}>
        <Card className={styles.scannerCard}>
          <div className={styles.scannerHeader}>
            <div className={styles.iconWrapper}>
              <QrCode size={32} />
            </div>
            <h3>Scan QR Code to Mark Attendance</h3>
            <p>Point your camera at the QR code displayed at your location</p>
          </div>

          <div className={styles.scannerArea}>
            {!isScanning ? (
              <div className={styles.placeholder}>
                <Camera size={64} />
                <p>Camera preview will appear here</p>
                {cameraError && (
                  <span className={styles.error}>{cameraError}</span>
                )}
              </div>
            ) : (
              <div className={styles.videoWrapper}>
                <video ref={videoRef} autoPlay playsInline className={styles.video} />
                <div className={styles.scanOverlay}>
                  <div className={styles.scanFrame}>
                    <div className={styles.corner} />
                    <div className={`${styles.corner} ${styles.topRight}`} />
                    <div className={`${styles.corner} ${styles.bottomLeft}`} />
                    <div className={`${styles.corner} ${styles.bottomRight}`} />
                  </div>
                  <p className={styles.scanText}>Scanning...</p>
                </div>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className={styles.canvas} />

          <div className={styles.actions}>
            {!isScanning ? (
              <Button icon={Camera} onClick={startCamera} fullWidth size="large">
                Start Scanning
              </Button>
            ) : (
              <Button icon={QrCode} onClick={simulateScan} fullWidth size="large">
                Simulate Scan (Demo)
              </Button>
            )}
          </div>
        </Card>

        <Card className={styles.infoCard}>
          <h3>How it works</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Find the QR Code</h4>
                <p>Look for QR codes at campus entry points</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Scan the Code</h4>
                <p>Point your camera at the QR code to scan</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Get Confirmation</h4>
                <p>Receive instant confirmation of your attendance</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className={styles.historyCard}>
          <h3>Recent Scans</h3>
          <div className={styles.historyList}>
            {recentScans.map((scan) => (
              <div key={scan.id} className={styles.historyItem}>
                <div className={`${styles.historyIcon} ${styles[scan.status]}`}>
                  {scan.status === 'in' ? (
                    <CheckCircle size={20} />
                  ) : (
                    <XCircle size={20} />
                  )}
                </div>
                <div className={styles.historyContent}>
                  <span className={styles.historyLocation}>
                    <MapPin size={14} />
                    {scan.location}
                  </span>
                  <span className={styles.historyMeta}>
                    <Clock size={12} />
                    {scan.time} • {scan.date}
                  </span>
                </div>
                <span className={`${styles.historyStatus} ${styles[scan.status]}`}>
                  {scan.status === 'in' ? 'In' : 'Out'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        title="Scan Result"
        footer={
          <Button onClick={handleScanComplete} fullWidth>
            Confirm & Continue
          </Button>
        }
      >
        {scanResult && (
          <div className={styles.resultContent}>
            <div className={`${styles.resultIcon} ${styles[scanResult.status]}`}>
              {scanResult.status === 'in' ? (
                <CheckCircle size={48} />
              ) : (
                <XCircle size={48} />
              )}
            </div>
            <h2>{scanResult.status === 'in' ? 'Checked In!' : 'Checked Out!'}</h2>
            <div className={styles.resultDetails}>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Location</span>
                <span className={styles.resultValue}>{scanResult.location}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Time</span>
                <span className={styles.resultValue}>{scanResult.time}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Student</span>
                <span className={styles.resultValue}>{scanResult.studentName}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
