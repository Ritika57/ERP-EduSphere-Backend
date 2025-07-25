// CheckAttendanceSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
  OverviewPanel,
  Content as DashboardContent
} from '../../styles/DashboardStyles';
import {
  AttendanceContainer,
  AttendanceList,
  AttendanceItem,
  StudentName,
  SubmitButton,
  StatusGroup,
  StatusRadio,
  StatusLabel
} from '../../styles/AttendanceStyles';
import { FaUserCheck, FaUserTimes, FaUserClock, FaCheckCircle, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const AnimatedBg = styled.div`
  position: absolute;
  top: -60px;
  left: -60px;
  width: 340px;
  height: 340px;
  z-index: 0;
  filter: blur(60px);
  opacity: 0.7;
  background: radial-gradient(circle at 60% 40%, ${({ theme }) => theme.primary}99 0%, ${({ theme }) => theme.accent}66 60%, transparent 100%);
  animation: floatBg 7s ease-in-out infinite alternate;
  @keyframes floatBg {
    0% { transform: scale(1) translateY(0) translateX(0); }
    100% { transform: scale(1.1) translateY(30px) translateX(40px); }
  }
`;

const GlassPanel = styled(OverviewPanel)`
  background: rgba(255,255,255,0.18) !important;
  box-shadow: 0 8px 40px 0 rgba(37,99,235,0.18), 0 1.5px 8px rgba(0,0,0,0.04) !important;
  backdrop-filter: blur(16px) saturate(1.2);
  border: 2.5px solid rgba(255,255,255,0.22) !important;
  overflow: hidden;
  position: relative;
`;

const AnimatedIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const GlowingButton = styled(SubmitButton)`
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 0 16px 2px ${({ theme }) => theme.primary}55, 0 2px 16px 0 ${({ theme }) => theme.accent}33;
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: box-shadow 0.22s, border 0.22s, background 0.22s;
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    border-radius: 16px;
    background: linear-gradient(120deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.accent} 100%);
    filter: blur(8px);
    opacity: 0.7;
    transition: opacity 0.22s;
    animation: glowBtn 2.5s linear infinite alternate;
  }
  @keyframes glowBtn {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  &:hover::before {
    opacity: 1;
  }
`;

const SuccessPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255,255,255,0.98);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.18);
  padding: 38px 48px 32px 48px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInUp 0.4s cubic-bezier(.4,2,.6,1);
`;
const PopupClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #888;
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.18s;
  &:hover { color: #ef4444; }
`;

const CheckAttendanceSection = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
      initializeAttendanceData(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const initializeAttendanceData = (students) => {
    const initialAttendanceData = students.map((student) => ({
      id: student._id,
      name: student.name,
      status: 'Present', // Default to 'Present'
    }));
    setAttendanceData(initialAttendanceData);
  };

  const handleStatusChange = (id, status) => {
    const updatedData = attendanceData.map((student) => {
      if (student.id === id) {
        return { ...student, status };
      }
      return student;
    });
    setAttendanceData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setSuccess(false);
      const today = new Date();
      // Send attendance data to the database
      const formattedData = attendanceData.map(({ id, status }) => {
        const studentObj = students.find(s => s._id === id);
        if (studentObj && studentObj.email) {
          return {
            student: id,
            status,
            email: studentObj.email,
            date: today
          };
        }
        return null;
      }).filter(Boolean); // Remove any nulls
      const response = await axios.post('http://localhost:4000/api/v1/attendance', { attendanceData: formattedData });
      setSuccess(true);
      setShowPopup(true);
      setTimeout(() => {
        setSuccess(false);
        setShowPopup(false);
      }, 2000);
      console.log('Attendance data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting attendance data:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AttendanceContainer>
      <Sidebar />
      {showPopup && (
        <SuccessPopup>
          <PopupClose onClick={() => setShowPopup(false)}><FaTimes /></PopupClose>
          <FaCheckCircle size={48} color="#10b981" style={{ marginBottom: 18 }} />
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981', marginBottom: 8 }}>Attendance Submitted!</div>
          <div style={{ color: '#444', fontSize: '1.05rem', textAlign: 'center' }}>All attendance records have been saved successfully.</div>
        </SuccessPopup>
      )}
      <DashboardContent>
        <AnimatedBg />
        <WelcomeSection>
          <div>
            <WelcomeTitle>Welcome, Teacher!</WelcomeTitle>
            <WelcomeSubtitle>Mark and manage student attendance below.</WelcomeSubtitle>
          </div>
        </WelcomeSection>
        <GlassPanel style={{ maxWidth: 700, margin: '0 auto' }}>
          <SectionTitle>Mark Attendance</SectionTitle>
          <AttendanceList>
            {students.map((student, index) => (
              <AttendanceItem key={student._id} style={{ marginBottom: 24, borderRadius: 16, boxShadow: '0 4px 18px rgba(37,99,235,0.10)', background: 'rgba(255,255,255,0.82)', padding: 22, transition: 'box-shadow 0.22s, transform 0.18s', position: 'relative' }}>
                <AnimatedIcon>
                  {attendanceData[index]?.status === 'Present' && <FaUserCheck color="#10b981" size={22} />}
                  {attendanceData[index]?.status === 'Absent' && <FaUserTimes color="#ef4444" size={22} />}
                  {attendanceData[index]?.status === 'Absent with apology' && <FaUserClock color="#f59e42" size={22} />}
                </AnimatedIcon>
                <StudentName style={{ fontSize: '1.18rem', fontWeight: 700, marginLeft: 12 }}>{student.name}</StudentName>
                <StatusGroup>
                  <StatusLabel status="Present" aria-checked={attendanceData[index]?.status === 'Present'}>
                    <StatusRadio
                      checked={attendanceData[index]?.status === 'Present'}
                      onChange={() => handleStatusChange(student._id, 'Present')}
                    />
                    Present
                  </StatusLabel>
                  <StatusLabel status="Absent" aria-checked={attendanceData[index]?.status === 'Absent'}>
                    <StatusRadio
                      checked={attendanceData[index]?.status === 'Absent'}
                      onChange={() => handleStatusChange(student._id, 'Absent')}
                    />
                    Absent
                  </StatusLabel>
                  <StatusLabel status="Absent with apology" aria-checked={attendanceData[index]?.status === 'Absent with apology'}>
                    <StatusRadio
                      checked={attendanceData[index]?.status === 'Absent with apology'}
                      onChange={() => handleStatusChange(student._id, 'Absent with apology')}
                    />
                    Apology
                  </StatusLabel>
                </StatusGroup>
              </AttendanceItem>
            ))}
          </AttendanceList>
          <GlowingButton
            style={{ marginTop: 32, fontSize: '1.15rem', padding: '14px 38px' }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <span className="spinner" style={{ marginRight: 8, width: 18, height: 18, border: '3px solid #eee', borderTop: '3px solid #2563eb', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
            ) : success ? (
              <FaCheckCircle size={20} style={{ marginRight: 8, color: '#10b981', transform: 'none' }} />
            ) : null}
            {submitting ? 'Submitting...' : success ? 'Submitted!' : 'Submit'}
          </GlowingButton>
        </GlassPanel>
      </DashboardContent>
    </AttendanceContainer>
  );
};

export default CheckAttendanceSection;
