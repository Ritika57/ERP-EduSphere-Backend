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
  Divider,
  SubmitButton,
  StatusGroup,
  StatusRadio,
  StatusLabel,
  Card,
  LoadingSpinner,
  MessageBox,
  AnimatedCheck,
  BackgroundImage
} from '../../styles/AttendanceStyles';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateLoading, setDateLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [existingAttendance, setExistingAttendance] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      fetchAttendanceForDate(selectedDate);
    }
  }, [selectedDate, students.length]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students. Please try again.');
      setLoading(false);
    }
  };

  const fetchAttendanceForDate = async (date) => {
    setDateLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/attendance/date/${date}`);
      const attendanceRecords = response.data.attendanceRecords || [];
      setExistingAttendance(attendanceRecords);
      
      // Initialize attendance data with existing records if available
      const initialAttendanceData = students.map((student) => {
        // Find existing record for this student
        const existingRecord = attendanceRecords.find(record => {
          // Handle both populated and unpopulated student references
          const recordStudentId = typeof record.student === 'object' ? record.student._id : record.student;
          return recordStudentId === student._id;
        });
        
        return {
          id: student._id,
          name: student.name,
          status: existingRecord ? existingRecord.status : 'Present',
        };
      });
      
      setAttendanceData(initialAttendanceData);
    } catch (error) {
      console.error('Error fetching attendance for date:', error);
      // If no attendance found for this date, initialize with default values
      const defaultAttendanceData = students.map((student) => ({
        id: student._id,
        name: student.name,
        status: 'Present',
      }));
      setAttendanceData(defaultAttendanceData);
      setExistingAttendance([]);
    } finally {
      setDateLoading(false);
    }
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

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setMessage(null);
    setError(null);
    // Clear existing attendance data to force refresh
    setAttendanceData([]);
    setExistingAttendance([]);
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

      const response = await axios.post('http://localhost:4000/api/v1/attendance', { 
        attendanceData: formattedData 
      });

      if (response.data.success) {
        setMessage('Attendance submitted successfully!');
        // Refresh attendance data for the current date
        await fetchAttendanceForDate(selectedDate);
        // Reset form after successful submission
        setTimeout(() => {
          setMessage(null);
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

  // Group students by attendance status
  const getStudentsByStatus = () => {
    const grouped = {
      all: students,
      present: students.filter(student => {
        const record = attendanceData.find(s => s.id === student._id);
        return record && record.status === 'Present';
      }),
      absent: students.filter(student => {
        const record = attendanceData.find(s => s.id === student._id);
        return record && record.status === 'Absent';
      }),
      absentWithApology: students.filter(student => {
        const record = attendanceData.find(s => s.id === student._id);
        return record && record.status === 'Absent with apology';
      }),
      unmarked: students.filter(student => {
        const record = attendanceData.find(s => s.id === student._id);
        return !record || !record.status;
      })
    };
    return grouped;
  };

  const studentsByStatus = getStudentsByStatus();

  const renderStudentList = (studentList) => {
    return (
      <AttendanceList key={`attendance-${selectedDate}-${activeTab}`}>
        {studentList.map((student, index) => {
          const existingRecord = existingAttendance.find(
            record => {
              const recordStudentId = typeof record.student === 'object' ? record.student._id : record.student;
              return recordStudentId === student._id;
            }
          );
          const hasExistingRecord = !!existingRecord;
          
          return (
            <React.Fragment key={`${student._id}-${selectedDate}`}>
              <AttendanceItem>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StudentName>{student.name}</StudentName>
                  {hasExistingRecord && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#28a745',
                      fontWeight: '600',
                      padding: '2px 6px',
                      backgroundColor: '#e8f5e9',
                      borderRadius: '4px',
                      border: '1px solid #c8e6c9'
                    }}>
                      ✓ Marked
                    </span>
                  )}
                </div>
                <StatusGroup>
                  {['Present', 'Absent', 'Absent with apology'].map((status) => (
                    <StatusLabel
                      key={status}
                      status={status}
                    >
                      <StatusRadio
                        type="radio"
                        name={`status-${student._id}-${selectedDate}`}
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
              {index !== studentList.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </AttendanceList>
    );
  };

  return (
    <AttendanceContainer>
      <BackgroundImage src={bgImg} alt="background" />
      <Sidebar />
      <Content>
        <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 12px' }}>
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
                  onChange={(e) => handleDateChange(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    backgroundColor: '#fff'
                  }}
                />
                {dateLoading && (
                  <span style={{
                    fontSize: '0.85rem',
                    color: '#007bff',
                    fontWeight: '500',
                    marginLeft: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <FaSpinner size={12} style={{ animation: 'spin 1s linear infinite' }} />
                    Loading...
                  </span>
                )}
                {!dateLoading && existingAttendance.length > 0 && (
                  <span style={{
                    fontSize: '0.85rem',
                    color: '#28a745',
                    fontWeight: '500',
                    marginLeft: '12px'
                  }}>
                    ✓ Attendance already marked for this date ({existingAttendance.length} records)
                  </span>
                )}
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
                  
                  {/* Status Tabs */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '24px',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => setActiveTab('all')}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: activeTab === 'all' ? '#007bff' : '#f8f9fa',
                        color: activeTab === 'all' ? 'white' : '#6c757d',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      All Students ({studentsByStatus.all.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('present')}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: activeTab === 'present' ? '#28a745' : '#f8f9fa',
                        color: activeTab === 'present' ? 'white' : '#28a745',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      Present ({studentsByStatus.present.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('absent')}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: activeTab === 'absent' ? '#dc3545' : '#f8f9fa',
                        color: activeTab === 'absent' ? 'white' : '#dc3545',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      Absent ({studentsByStatus.absent.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('absentWithApology')}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: activeTab === 'absentWithApology' ? '#ffc107' : '#f8f9fa',
                        color: activeTab === 'absentWithApology' ? 'white' : '#856404',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      Absent with Apology ({studentsByStatus.absentWithApology.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('unmarked')}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: activeTab === 'unmarked' ? '#6c757d' : '#f8f9fa',
                        color: activeTab === 'unmarked' ? 'white' : '#6c757d',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      Unmarked ({studentsByStatus.unmarked.length})
                    </button>
                  </div>

                  {/* Student List based on active tab */}
                  {renderStudentList(studentsByStatus[activeTab])}
                  
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
                    ) : existingAttendance.length > 0 ? (
                      'Update Attendance'
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
