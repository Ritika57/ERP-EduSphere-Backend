// TeacherSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaChalkboardTeacher, 
  FaPlus, 
  FaArrowUp,
  FaSchool,
  FaUserFriends,
  FaEnvelope,
  FaSearch,
  FaFilter,
  FaBook,
} from 'react-icons/fa';
import { useTheme } from '../../App';

const TeacherSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/teachers/getall');
      if (response.data && Array.isArray(response.data.teachers)) {
        setTeachers(response.data.teachers);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Failed to load teachers');
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

  // Get unique subjects for filter
  const uniqueSubjects = [...new Set(teachers.map(teacher => teacher.subject))];

  // Filter teachers based on search term and selected subject
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const theme = useTheme()?.theme || {};

  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content isOpen={true}>
        {/* Simple Page Heading and Subtitle */}
        <h1 style={{
          fontSize: '2.7rem',
          fontWeight: 900,
          color: '#2563eb',
          margin: 0,
          letterSpacing: '-1.5px',
          lineHeight: 1.08,
          marginBottom: 8,
        }}>
          Teachers
        </h1>
        <div style={{
          fontSize: '1.13rem',
          color: '#555',
          fontWeight: 400,
          marginBottom: 32,
        }}>
          View and manage your fellow teachers
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

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaChalkboardTeacher size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{teachers.length}</StatNumber>
              <StatLabel>Total Teachers</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Faculty members
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaBook size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{uniqueSubjects.length}</StatNumber>
              <StatLabel>Subjects Taught</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Different subjects
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaSchool size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{filteredTeachers.length}</StatNumber>
              <StatLabel>Filtered Teachers</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Current view
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaEnvelope size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>95%</StatNumber>
              <StatLabel>Response Rate</StatLabel>
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
          <SectionTitle>Search & Filter Teachers</SectionTitle>
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
                placeholder="Search by name, email, or subject..."
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
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff',
                  minWidth: '150px'
                }}
              >
                <option value="">All Subjects</option>
                {uniqueSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </OverviewPanel>

        {/* Teachers List */}
        <OverviewPanel>
          <SectionTitle>Faculty Members</SectionTitle>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Loading teachers...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>
              {error}
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <FaChalkboardTeacher size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>
                {searchTerm || selectedSubject 
                  ? 'No teachers found matching your search criteria.' 
                  : 'No teachers found. Add teachers to get started!'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
              {filteredTeachers.map((teacher, index) => (
                <div
                  key={teacher._id || index}
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
                  onClick={() => navigate(`/teacher/assignments?teacher=${teacher._id}`)}
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
                        {teacher.name ? teacher.name.charAt(0).toUpperCase() : 'T'}
                      </div>
                      <div>
                        <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                          {teacher.name || 'Unknown Teacher'}
                        </h3>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                          {teacher.email || 'No email'}
                        </p>
                      </div>
                    </div>
                    
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaBook size={16} color="#6b7280" />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {teacher.subject || 'No Subject'}
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

export default TeacherSection;
