// Attendance.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import bgImg from '../../assets/bg.png';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceList,
  AttendanceItem,
  StudentName,
  CheckboxLabel,
  Divider,
  SubmitButton,
  StatusGroup,
  StatusRadio,
  StatusLabel,
  Card,
  LoadingSpinner,
  MessageBox,
  AnimatedCheck,
  AnimatedCard,
  BackgroundImage,
  AttendanceDate
} from '../../styles/AttendanceStyles';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
      initializeAttendanceData(response.data.students);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students. Please try again.');
      setLoading(false);
    }
  };

  const initializeAttendanceData = (students) => {
    const initialAttendanceData = students.map((student) => ({
      id: student._id,
      name: student.name,
      status: 'Present',
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
    if (submitting) return; // Prevent multiple submissions
    
    setSubmitting(true);
    setMessage(null);
    setError(null);
    
    try {
      // Validate that we have students and attendance data
      if (!students.length || !attendanceData.length) {
        throw new Error('No students or attendance data available');
      }

      // Validate that all students have a status
      const hasAllStatuses = attendanceData.every(student => student.status);
      if (!hasAllStatuses) {
        throw new Error('Please mark attendance for all students');
      }

      const formattedData = attendanceData.map(({ id, status }) => {
        const studentObj = students.find(s => s._id === id);
        if (!studentObj) {
          throw new Error(`Student not found: ${id}`);
        }
        
        // Use email if available, otherwise use a placeholder or skip email
        const email = studentObj.email || `${studentObj.name.toLowerCase().replace(/\s+/g, '.')}@school.com`;
        
        return {
          student: id,
          status,
          email: email,
          date: selectedDate
        };
      });

      console.log('Submitting attendance data:', formattedData);

      const response = await axios.post('http://localhost:4000/api/v1/attendance', { 
        attendanceData: formattedData 
      });

      console.log('Attendance submission response:', response.data);

      if (response.data.success) {
        setMessage('Attendance submitted successfully!');
        // Reset form after successful submission
        setTimeout(() => {
          setMessage(null);
          initializeAttendanceData(students);
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Failed to submit attendance');
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setError(error.response?.data?.message || error.message || 'Error submitting attendance data. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const clearMessages = () => {
    setMessage(null);
    setError(null);
  };

  return (
    <AttendanceContainer>
      <BackgroundImage src={bgImg} alt="background" />
      <Sidebar />
      <Content>
        <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 12px' }}>
          <Card style={{ padding: '38px 36px 32px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}>
            <AttendanceContent>
              <AttendanceHeader>Attendance</AttendanceHeader>
              
              {/* Date Selector */}
              <div style={{ 
                marginBottom: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px' 
              }}>
                <label style={{ 
                  fontWeight: '600', 
                  color: '#2d3748',
                  fontSize: '0.95rem'
                }}>
                  Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    backgroundColor: '#fff'
                  }}
                />
              </div>

              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {message && (
                    <MessageBox success onClick={clearMessages} style={{ cursor: 'pointer' }}>
                      {message}
                    </MessageBox>
                  )}
                  {error && (
                    <MessageBox onClick={clearMessages} style={{ cursor: 'pointer' }}>
                      {error}
                    </MessageBox>
                  )}
                  
                  <AttendanceList>
                    {students.map((student, index) => (
                      <React.Fragment key={student._id}>
                        <AttendanceItem>
                          <StudentName>{student.name}</StudentName>
                          <StatusGroup>
                            {['Present', 'Absent', 'Absent with apology'].map((status) => (
                              <StatusLabel
                                key={status}
                                status={status}
                              >
                                <StatusRadio
                                  type="radio"
                                  name={`status-${student._id}`}
                                  checked={attendanceData.find(s => s.id === student._id)?.status === status}
                                  onChange={() => handleStatusChange(student._id, status)}
                                  disabled={submitting}
                                />
                                {status}
                                {attendanceData.find(s => s.id === student._id)?.status === status && (
                                  <AnimatedCheck>
                                    <FaCheckCircle color="#28a745" size={20} />
                                  </AnimatedCheck>
                                )}
                              </StatusLabel>
                            ))}
                          </StatusGroup>
                        </AttendanceItem>
                        {index !== students.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </AttendanceList>
                  
                  <SubmitButton 
                    onClick={handleSubmit}
                    disabled={submitting || loading}
                    style={{
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {submitting ? (
                      <>
                        <FaSpinner size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        Submitting...
                      </>
                    ) : (
                      'Submit Attendance'
                    )}
                  </SubmitButton>
                </>
              )}
            </AttendanceContent>
          </Card>
        </div>
      </Content>
    </AttendanceContainer>
  );
};

export default Attendance;
