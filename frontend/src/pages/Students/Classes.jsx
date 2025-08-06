// StudentClasses.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  StudentDashboardContainer,
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
import styled from 'styled-components';

const Content = styled.div`
  flex: 1;
  padding: 32px 40px;
  margin-left: 250px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
  overflow-y: auto;
  transition: margin-left 0.25s ease;
  
  @media (max-width: 700px) {
    margin-left: 160px;
    padding: 20px 20px;
  }
  
  @media (max-width: 480px) {
    margin-left: 0;
    padding: 16px 16px;
  }
`;

import { 
  FaSchool, 
  FaUserGraduate, 
  FaArrowUp,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';
import { useTheme } from '../../App';

const StudentClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const theme = useTheme()?.theme || {};

  return (
    <StudentDashboardContainer>
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
              My Classes
            </h1>
            <div style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.97)',
              fontWeight: 400,
              marginTop: 6,
              textShadow: '0 1px 4px #17c3b233',
            }}>
              View your enrolled classes and course information
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaSchool size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{classes.length}</StatNumber>
              <StatLabel>Enrolled Classes</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Active enrollment
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaUserGraduate size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>5</StatNumber>
              <StatLabel>Subjects</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                This semester
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaChalkboardTeacher size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>8</StatNumber>
              <StatLabel>Teachers</StatLabel>
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
              <StatNumber>15</StatNumber>
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
          <SectionTitle>My Enrolled Classes</SectionTitle>
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
              <p>No classes found. Contact your administrator to enroll in classes.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
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
                  onClick={() => navigate(`/student/assignments?class=${classItem.grade}`)}
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
                    <div style={{
                      padding: '4px 12px',
                      background: '#f0f9ff',
                      color: '#0369a1',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Enrolled
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaUsers size={16} color="#6b7280" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          ~25 students
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaChalkboardTeacher size={16} color="#6b7280" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          Prof. Smith
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCalendarAlt size={16} color="#6b7280" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          Mon, Wed, Fri
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaClock size={16} color="#6b7280" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          9:00 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </OverviewPanel>
      </Content>
    </StudentDashboardContainer>
  );
};

export default StudentClasses; 