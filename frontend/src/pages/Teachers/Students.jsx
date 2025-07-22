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
        {/* Enhanced Page Heading with Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <FaUserGraduate size={38} color="#2563eb" style={{ flexShrink: 0 }} />
          <h1 style={{
            fontSize: '2.7rem',
            fontWeight: 900,
            color: '#2563eb',
            margin: 0,
            letterSpacing: '-1.5px',
            lineHeight: 1.08,
          }}>
            Students
          </h1>
        </div>
        <div style={{
          fontSize: '1.13rem',
          color: '#555',
          fontWeight: 400,
          marginBottom: 24,
        }}>
          Manage and view your students' information
        </div>
        <div style={{
          height: 2,
          background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
          borderRadius: 2,
          marginBottom: 24,
        }} />

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280',
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
                background: '#fff',
              }}
            />
          </div>
        </div>

        {/* Students List in Card Container */}
        <div style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px #2563eb11',
          padding: 32,
          marginBottom: 32,
        }}>
          <SectionTitle style={{ marginBottom: 18 }}>My Students</SectionTitle>
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
                  key={student._id}
                  style={{
                    background: '#f9fafb',
                    borderRadius: 14,
                    boxShadow: '0 2px 8px #2563eb0a',
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    border: '1.5px solid #e5e7eb',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#2563eb' }}>{student.name}</div>
                  <div style={{ color: '#555', fontSize: '1rem' }}>Reg #: {student.registrationNumber}</div>
                  <div style={{ color: '#888', fontSize: '0.98rem' }}>Grade: {student.grade}</div>
                  <div style={{ color: '#888', fontSize: '0.98rem' }}>Email: {student.email}</div>
                  <button
                    onClick={() => handleDeleteStudent(student._id)}
                    style={{
                      marginTop: 8,
                      alignSelf: 'flex-end',
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 18px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.98rem',
                      boxShadow: '0 1px 4px #ef444422',
                      transition: 'background 0.18s',
                    }}
                    onMouseOver={e => e.target.style.background = '#dc2626'}
                    onMouseOut={e => e.target.style.background = '#ef4444'}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

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
      </Content>
    </TeacherDashboardContainer>
  );
};

export default StudentSection;
