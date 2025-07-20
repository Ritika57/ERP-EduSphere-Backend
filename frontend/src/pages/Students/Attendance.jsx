// AttendanceSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { AttendanceContainer, SidebarContainer, Content, AttendanceHeader, AttendanceList, AttendanceItem, AttendanceDate, AttendanceStatus } from '../../styles/AttendanceStyles'; 
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaPercent, FaCalendarCheck, FaUserCheck, FaChartBar } from 'react-icons/fa';

const getStats = (attendance) => {
  if (!attendance.length) return { total: 0, present: 0, absent: 0, percentage: 0 };
  const total = attendance.length;
  const present = attendance.filter(record => record.status === 'Present').length;
  const absent = total - present;
  const percentage = Math.round((present / total) * 100);
  return { total, present, absent, percentage };
};

const StatCard = ({ icon, label, value, color, bg }) => (
  <div style={{
    flex: 1,
    minWidth: 140,
    background: bg,
    color: color,
    borderRadius: 16,
    padding: '24px 20px',
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
    fontWeight: 700,
    fontSize: '1rem',
    justifyContent: 'center',
  }}>
    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{label}</div>
  </div>
);

const AttendanceSection = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        if (!studentInfo || !studentInfo.id) {
          setAttendance([]);
          setLoading(false);
          return;
        }
        const response = await axios.get('/api/v1/attendance/getall');
        const allRecords = response.data.attendanceRecords || [];
        const studentRecords = allRecords.filter(
          record => record.email && record.email.trim().toLowerCase() === studentInfo.email.trim().toLowerCase()
        );
        setAttendance(studentRecords);
      } catch (err) {
        setError('Failed to fetch attendance data.');
        setAttendance([]);
      }
      setLoading(false);
    };
    fetchAttendance();
  }, []);

  const stats = getStats(attendance);

  // Group attendance by month
  const groupByMonth = (records) => {
    const grouped = {};
    records.forEach(record => {
      const date = new Date(record.date);
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(record);
    });
    return grouped;
  };

  const groupedAttendance = groupByMonth(attendance);

  return (
    <AttendanceContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        {/* Main Card - Compact Design */}
        <div style={{
          background: 'white',
          borderRadius: 24,
          boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
          padding: '24px',
          margin: '0 auto',
          maxWidth: 1600,
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#6d5ac3', marginBottom: 6, letterSpacing: -0.5 }}>Attendance</h1>
            <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>
              Track your daily attendance and attendance statistics
            </div>
          </div>

          {/* Stat Cards - Compact */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <StatCard icon={<FaCalendarAlt />} label="Total Days" value={stats.total} color="#fff" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
            <StatCard icon={<FaCheckCircle />} label="Present Days" value={stats.present} color="#fff" bg="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" />
            <StatCard icon={<FaTimesCircle />} label="Absent Days" value={stats.absent} color="#fff" bg="linear-gradient(135deg, #f857a6 0%, #ff5858 100%)" />
            <StatCard icon={<FaPercent />} label="Attendance Rate" value={stats.percentage + '%'} color="#fff" bg="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)" />
          </div>

          {/* Content Sections */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {/* Left Section - Attendance Overview */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '20px',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}>
                    <FaCalendarCheck size={18} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#374151', margin: 0 }}>Attendance Overview</h3>
                </div>
                
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                    <div style={{ fontSize: 20, marginBottom: 12 }}>📅</div>
                    <div>Loading attendance data...</div>
                  </div>
                ) : error ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '30px 16px', 
                    color: '#dc2626',
                    background: '#fef2f2',
                    borderRadius: 12,
                    border: '1px solid #fecaca'
                  }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#dc2626' }}>
                      Error Loading Data
                    </div>
                    <div style={{ fontSize: 12, color: '#ef4444' }}>
                      {error}
                    </div>
                  </div>
                ) : attendance.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '30px 16px', 
                    color: '#666',
                    background: '#fff',
                    borderRadius: 12,
                    border: '2px dashed #e2e8f0'
                  }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#374151' }}>
                      No Attendance Records Found
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Your attendance records will appear here once available.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {Object.entries(groupedAttendance).map(([month, records]) => (
                      <div key={month} style={{
                        background: '#fff',
                        borderRadius: 12,
                        padding: '16px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{ 
                          fontSize: 14, 
                          fontWeight: 600, 
                          color: '#374151', 
                          marginBottom: 12,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}>
                          <FaCalendarAlt size={14} color="#6b7280" />
                          {month}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {records.map((record, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              padding: '4px 8px',
                              borderRadius: 8,
                              background: record.status === 'Present' ? '#dcfce7' : '#fef2f2',
                              border: `1px solid ${record.status === 'Present' ? '#bbf7d0' : '#fecaca'}`
                            }}>
                              {record.status === 'Present' ? (
                                <FaCheckCircle size={12} color="#16a34a" />
                              ) : (
                                <FaTimesCircle size={12} color="#dc2626" />
                              )}
                              <span style={{ 
                                fontSize: 12, 
                                fontWeight: 500,
                                color: record.status === 'Present' ? '#16a34a' : '#dc2626'
                              }}>
                                {new Date(record.date).getDate()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Attendance Chart */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '20px',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}>
                    <FaChartBar size={18} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#374151', margin: 0 }}>Attendance Statistics</h3>
                </div>
                
                {attendance.length > 0 ? (
                  <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        width: 120, 
                        height: 120, 
                        borderRadius: '50%', 
                        background: `conic-gradient(#10b981 ${stats.percentage * 3.6}deg, #e5e7eb 0deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px auto'
                      }}>
                        <div style={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 20,
                          fontWeight: 700,
                          color: '#374151'
                        }}>
                          {stats.percentage}%
                        </div>
                      </div>
                      <div style={{ fontSize: 14, color: '#6b7280', fontWeight: 500 }}>
                        Overall Attendance Rate
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 16px', 
                    color: '#666',
                    background: '#fff',
                    borderRadius: 12
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Statistics will appear when attendance data is available</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </AttendanceContainer>
  );
};

export default AttendanceSection;
