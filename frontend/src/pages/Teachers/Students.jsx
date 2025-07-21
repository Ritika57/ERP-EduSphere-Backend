// StudentSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  TeacherDashboardContainer,
  Content,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  QuickActions,
  ActionButton,
  SectionTitle,
  OverviewPanel,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatNumber,
  StatLabel,
  StatTrend,
} from '../../styles/DashboardStyles';
import { 
  FaUserGraduate, 
  FaPlus, 
  FaArrowUp,
  FaSchool,
  FaUserFriends,
  FaChartLine,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';
import { useTheme } from '../../App';

const StudentSection = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    
    // Check for class filter from URL params
    const urlParams = new URLSearchParams(location.search);
    const classFilter = urlParams.get('class');
    if (classFilter) {
      setSelectedClass(classFilter);
    }
  }, [location.search]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      if (response.data && Array.isArray(response.data.students)) {
        setStudents(response.data.students);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/v1/students/delete/${studentId}`);
        if (response.data.success) {
          setMessage({ text: 'Student deleted successfully!', type: 'success' });
          fetchStudents();
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        setMessage({ text: 'Failed to delete student. Please try again.', type: 'error' });
      }
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Filter students based on search term and selected class
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || student.grade === selectedClass;
    return matchesSearch && matchesClass;
  });

  const theme = useTheme()?.theme || {};

  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content isOpen={true}>
        {/* Welcome Section */}
        <WelcomeSection>
          <div>
            <WelcomeTitle>{getCurrentTime()}, Teacher!</WelcomeTitle>
            <WelcomeSubtitle>Manage and view your students' information</WelcomeSubtitle>
          </div>
          <QuickActions>
            <ActionButton onClick={() => navigate('/teacher/classes')}>
              <FaSchool size={16} />
              View Classes
            </ActionButton>
            <ActionButton onClick={() => navigate('/teacher/assignments')}>
              <FaPlus size={16} />
              Assignments
            </ActionButton>
            <ActionButton onClick={() => navigate('/teacher/performance')}>
              <FaChartLine size={16} />
              Performance
            </ActionButton>
          </QuickActions>
        </WelcomeSection>

        {/* Message Display */}
        {message.text && (
          <div style={{
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '20px',
            color: message.type === 'success' ? '#155724' : '#721c24',
            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            {message.text}
          </div>
        )}

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaUserGraduate size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{students.length}</StatNumber>
              <StatLabel>Total Students</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Enrolled students
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaSchool size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{classes.length}</StatNumber>
              <StatLabel>Classes</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Active classes
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaUserFriends size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{filteredStudents.length}</StatNumber>
              <StatLabel>Filtered Students</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Current view
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaChartLine size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>85%</StatNumber>
              <StatLabel>Average Attendance</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                This month
              </StatTrend>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        {/* Search and Filter Section */}
        <OverviewPanel style={{ 
          marginBottom: '20px', 
          padding: '24px 32px', 
          minHeight: 'auto' 
        }}>
          <SectionTitle>Search & Filter Students</SectionTitle>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
              <FaSearch style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#6b7280' 
              }} />
              <input
                type="text"
                placeholder="Search by name or registration number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff'
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaFilter size={16} color="#6b7280" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff',
                  minWidth: '150px'
                }}
              >
                <option value="">All Classes</option>
                {classes.map((classItem) => (
                  <option key={classItem._id} value={classItem.grade}>
                    {classItem.grade}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </OverviewPanel>

        {/* Students List */}
        <OverviewPanel>
          <SectionTitle>My Students</SectionTitle>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Loading students...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>
              {error}
            </div>
          ) : filteredStudents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <FaUserGraduate size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>
                {searchTerm || selectedClass 
                  ? 'No students found matching your search criteria.' 
                  : 'No students found. Add students to get started!'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {filteredStudents.map((student, index) => (
                <div
                  key={student._id || index}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                  onClick={() => navigate(`/teacher/performance?student=${student._id}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: '600'
                      }}>
                        {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div>
                        <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                          {student.name || 'Unknown Student'}
                        </h3>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                          ID: {student.registrationNumber || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStudent(student._id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#fef2f2'}
                      onMouseOut={(e) => e.target.style.background = 'none'}
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaSchool size={16} color="#6b7280" />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {student.grade || 'No Class'}
                      </span>
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      background: '#f0f9ff',
                      color: '#0369a1',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Active
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </OverviewPanel>
      </Content>
    </TeacherDashboardContainer>
  );
};

export default StudentSection;
