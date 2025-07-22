// ClassSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
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
  FaSchool, 
  FaUserGraduate, 
  FaPlus, 
  FaArrowUp,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
} from 'react-icons/fa';
import { useTheme } from '../../App';

const ClassSection = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newClass, setNewClass] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        setClasses([]);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
      setError('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!newClass.trim()) {
      setMessage({ text: 'Please enter a class name', type: 'error' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/class/create', {
        grade: newClass.trim()
      });
      
      if (response.data.success) {
        setMessage({ text: 'Class added successfully!', type: 'success' });
        setNewClass('');
        setShowAddForm(false);
        fetchClasses(); // Refresh the list
      }
    } catch (error) {
      console.error('Error adding class:', error);
      setMessage({ text: 'Failed to add class. Please try again.', type: 'error' });
    }
  };

  const handleDeleteClass = async (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/v1/class/delete/${classId}`);
        if (response.data.success) {
          setMessage({ text: 'Class deleted successfully!', type: 'success' });
          fetchClasses(); // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        setMessage({ text: 'Failed to delete class. Please try again.', type: 'error' });
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

  const theme = useTheme()?.theme || {};

  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content isOpen={true}>
        {/* Assignment-style Gradient Header for Classes (Compact) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            background: 'linear-gradient(90deg, #2563eb 0%, #1fa2ff 50%, #17c3b2 100%)',
            borderRadius: 36,
            boxShadow: '0 6px 32px rgba(37,99,235,0.10)',
            padding: '22px 36px 20px 28px',
            marginBottom: 28,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 80,
          }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px #17c3b233',
            marginRight: 14,
            flexShrink: 0,
          }}>
            <FaSchool size={32} color="#fff" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.1rem',
              fontWeight: 900,
              color: '#fff',
              margin: 0,
              letterSpacing: '-1.2px',
              textShadow: '0 2px 12px #2563eb55',
              lineHeight: 1.08,
            }}>
              Classes
            </h1>
            <div style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.97)',
              fontWeight: 400,
              marginTop: 6,
              textShadow: '0 1px 4px #17c3b233',
            }}>
              Manage your classes and view student information
            </div>
          </div>
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

        {/* Add Class Form */}
        {showAddForm && (
          <OverviewPanel style={{ marginBottom: '32px' }}>
            <SectionTitle>Add New Class</SectionTitle>
            <form onSubmit={handleAddClass} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                placeholder="Enter class name (e.g., Grade 10A)"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.background = '#2563eb'}
              >
                Add Class
              </button>
            </form>
          </OverviewPanel>
        )}

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaSchool size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{classes.length}</StatNumber>
              <StatLabel>Total Classes</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Active classes
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaUserGraduate size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{classes.length * 25}</StatNumber>
              <StatLabel>Total Students</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Across all classes
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaChalkboardTeacher size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>5</StatNumber>
              <StatLabel>Subjects Taught</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                This semester
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaBook size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>12</StatNumber>
              <StatLabel>Active Assignments</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                This week
              </StatTrend>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        {/* Classes List */}
        <OverviewPanel>
          <SectionTitle>My Classes</SectionTitle>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Loading classes...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>
              {error}
            </div>
          ) : classes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <FaSchool size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>No classes found. Add your first class to get started!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {classes.map((classItem, index) => (
                <div
                  key={classItem._id || index}
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
                  onClick={() => navigate(`/teacher/students?class=${classItem.grade}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FaSchool size={20} color="white" />
                      </div>
                      <div>
                        <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                          {classItem.grade}
                        </h3>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                          Class {index + 1}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClass(classItem._id);
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
                      <FaUsers size={16} color="#6b7280" />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        ~25 students
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

export default ClassSection;
