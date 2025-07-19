// Attendance.js
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import bgImg from '../../assets/bg.png';
import {
  AttendanceContainer,
  Content,
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
      <div style={{
        display: 'grid',
        gap: '16px',
        maxHeight: '60vh',
        overflowY: 'auto',
        padding: '8px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        {studentList.map((student) => {
          const existingRecord = existingAttendance.find(
            record => {
              const recordStudentId = typeof record.student === 'object' ? record.student._id : record.student;
              return recordStudentId === student._id;
            }
          );
          const hasExistingRecord = !!existingRecord;
          const currentStatus = attendanceData.find(s => s.id === student._id)?.status;
          
          return (
            <div
              key={`${student._id}-${selectedDate}`}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(102, 126, 234, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.15)';
              }}
            >
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)'
                    }}>
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{
                        margin: 0,
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        {student.name}
                      </h3>
                      <p style={{
                        margin: '4px 0 0 0',
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}>
                        ID: {student.registrationNumber}
                      </p>
                    </div>
                  </div>
                  
                  {hasExistingRecord && (
                    <div style={{
                      background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      boxShadow: '0 4px 16px rgba(0, 184, 148, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ fontSize: '1.1rem' }}>✓</span>
                      Marked
                    </div>
                  )}
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  {['Present', 'Absent', 'Absent with apology'].map((status) => {
                    const isSelected = currentStatus === status;
                    const getStatusColors = (status) => {
                      switch(status) {
                        case 'Present':
                          return {
                            bg: isSelected ? 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' : 'rgba(0, 184, 148, 0.1)',
                            color: isSelected ? 'white' : '#00b894',
                            border: isSelected ? 'none' : '2px solid rgba(0, 184, 148, 0.3)'
                          };
                        case 'Absent':
                          return {
                            bg: isSelected ? 'linear-gradient(135deg, #e17055 0%, #d63031 100%)' : 'rgba(225, 112, 85, 0.1)',
                            color: isSelected ? 'white' : '#e17055',
                            border: isSelected ? 'none' : '2px solid rgba(225, 112, 85, 0.3)'
                          };
                        case 'Absent with apology':
                          return {
                            bg: isSelected ? 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)' : 'rgba(253, 203, 110, 0.1)',
                            color: isSelected ? 'white' : '#fdcb6e',
                            border: isSelected ? 'none' : '2px solid rgba(253, 203, 110, 0.3)'
                          };
                        default:
                          return {
                            bg: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: '2px solid rgba(255,255,255,0.3)'
                          };
                      }
                    };
                    
                    const colors = getStatusColors(status);
                    
                    return (
                      <label
                        key={status}
                        style={{
                          background: colors.bg,
                          color: colors.color,
                          border: colors.border,
                          borderRadius: '16px',
                          padding: '12px 16px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '0.95rem',
                          textAlign: 'center',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name={`status-${student._id}-${selectedDate}`}
                          checked={isSelected}
                          onChange={() => handleStatusChange(student._id, status)}
                          disabled={submitting}
                          style={{ display: 'none' }}
                        />
                        {status}
                        {isSelected && (
                          <span style={{
                            fontSize: '1.2rem',
                            animation: 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                          }}>
                            ✓
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <AttendanceContainer>
      <BackgroundImage src={bgImg} alt="background" />
      <Sidebar />
      <Content>
        <div style={{ 
          maxWidth: 1000, 
          margin: '40px auto', 
          padding: '0 20px' 
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
            borderRadius: '32px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              opacity: 0.1,
              filter: 'blur(40px)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '50%',
              opacity: 0.1,
              filter: 'blur(30px)'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '40px'
              }}>
                <h1 style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0 0 8px 0',
                  textShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  Attendance Management
                </h1>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Track and manage student attendance with ease
                </p>
              </div>
              
              {/* Date Selector */}
              <div style={{ 
                marginBottom: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <label style={{ 
                  fontWeight: '700', 
                  color: '#333',
                  fontSize: '1.1rem'
                }}>
                  Select Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  style={{
                    padding: '12px 20px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '16px',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e8ed';
                    e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
                  }}
                />
                {dateLoading && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    <FaSpinner size={14} style={{ animation: 'spin 1s linear infinite' }} />
                    Loading...
                  </div>
                )}
                {!dateLoading && existingAttendance.length > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    <span>✓</span>
                    {existingAttendance.length} records found
                  </div>
                )}
              </div>

              {loading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '60px 20px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #667eea',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                </div>
              ) : (
                <>
                  {message && (
                    <div style={{
                      padding: '16px 24px',
                      background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
                      color: 'white',
                      borderRadius: '16px',
                      marginBottom: '24px',
                      fontWeight: '600',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(0, 184, 148, 0.3)'
                    }} onClick={clearMessages}>
                      {message}
                    </div>
                  )}
                  {error && (
                    <div style={{
                      padding: '16px 24px',
                      background: 'linear-gradient(135deg, #e17055 0%, #d63031 100%)',
                      color: 'white',
                      borderRadius: '16px',
                      marginBottom: '24px',
                      fontWeight: '600',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(225, 112, 85, 0.3)'
                    }} onClick={clearMessages}>
                      {error}
                    </div>
                  )}
                  
                  {/* Status Tabs */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    marginBottom: '32px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    {[
                      { key: 'all', label: 'All Students', color: '#667eea', count: studentsByStatus.all.length },
                      { key: 'present', label: 'Present', color: '#00b894', count: studentsByStatus.present.length },
                      { key: 'absent', label: 'Absent', color: '#e17055', count: studentsByStatus.absent.length },
                      { key: 'absentWithApology', label: 'Absent with Apology', color: '#fdcb6e', count: studentsByStatus.absentWithApology.length },
                      { key: 'unmarked', label: 'Unmarked', color: '#636e72', count: studentsByStatus.unmarked.length }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                          padding: '12px 20px',
                          background: activeTab === tab.key 
                            ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)`
                            : 'rgba(255,255,255,0.8)',
                          color: activeTab === tab.key ? 'white' : tab.color,
                          border: `2px solid ${activeTab === tab.key ? 'transparent' : tab.color + '40'}`,
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontWeight: '700',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: activeTab === tab.key 
                            ? `0 8px 24px ${tab.color}40`
                            : '0 4px 16px rgba(0,0,0,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                          if (activeTab !== tab.key) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 8px 24px ${tab.color}30`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeTab !== tab.key) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
                          }
                        }}
                      >
                        <span>{tab.label}</span>
                        <span style={{
                          background: activeTab === tab.key ? 'rgba(255,255,255,0.2)' : tab.color + '20',
                          color: activeTab === tab.key ? 'white' : tab.color,
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          minWidth: '24px',
                          textAlign: 'center'
                        }}>
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Student List */}
                  {renderStudentList(studentsByStatus[activeTab])}
                  
                  {/* Submit Button */}
                  <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || loading}
                      style={{
                        padding: '16px 40px',
                        background: submitting 
                          ? 'linear-gradient(135deg, #b2bec3 0%, #95a5a6 100%)'
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: submitting 
                          ? '0 4px 16px rgba(0,0,0,0.1)'
                          : '0 8px 32px rgba(102, 126, 234, 0.3)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: '200px',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        if (!submitting) {
                          e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!submitting) {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
                        }
                      }}
                    >
                      {submitting ? (
                        <>
                          <FaSpinner size={18} style={{ animation: 'spin 1s linear infinite' }} />
                          Submitting...
                        </>
                      ) : existingAttendance.length > 0 ? (
                        'Update Attendance'
                      ) : (
                        'Submit Attendance'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Content>
    </AttendanceContainer>
  );
};

export default Attendance;
