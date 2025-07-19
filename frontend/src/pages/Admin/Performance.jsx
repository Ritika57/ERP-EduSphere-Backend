// Performance.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import {
  PerformanceContainer,
  Content,
  PerformanceContent,
  PerformanceHeader,
  SchoolPerformance,
  IndividualPerformance,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatNumber,
  StatLabel,
  PerformanceGrid,
  PerformanceCard,
  StudentList,
  StudentItem,
  StudentAvatar,
  StudentInfo,
  StudentName,
  StudentScore,
  StudentSubject,
  SubjectBadge,
  PerformanceChart,
  ChartContainer,
  LoadingSpinner,
  EmptyState,
  EmptyIcon,
  EmptyText,
} from '../../styles/PerformanceStyles'; 
import AddPerformanceForm from '../../components/AddPerformanceForm';
import { 
  FaChartLine, 
  FaUserGraduate, 
  FaTrophy, 
  FaCalendarAlt,
  FaSpinner,
  FaInbox,
  FaStar,
  FaMedal
} from 'react-icons/fa';
import { useTheme } from '../../App';

const Performance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme()?.theme || {};
  const navigate = useNavigate();

  const fetchPerformance = () => {
    setLoading(true);
    fetch('/api/v1/performance')
      .then(res => res.json())
      .then(data => {
        setPerformanceData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  // Calculate school performance
  const totalStudents = performanceData.length;
  const averageScore = totalStudents > 0 ? (performanceData.reduce((sum, p) => sum + p.score, 0) / totalStudents).toFixed(2) : 0;
  const highestScore = totalStudents > 0 ? Math.max(...performanceData.map(p => p.score)) : 0;
  const totalRecords = performanceData.length;

  // Get unique subjects
  const subjects = [...new Set(performanceData.map(p => p.subject).filter(Boolean))];
  
  // Get top performers
  const topPerformers = performanceData
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const handleStatCardClick = () => {
    navigate('/admin/performance');
  };

  const handleStudentClick = (studentId) => {
    // Navigate to student details or performance details
    navigate(`/admin/performance?student=${studentId}`);
  };

  if (loading) {
    return (
      <PerformanceContainer>
        <Sidebar />
        <Content>
          <LoadingSpinner>
            <FaSpinner size={40} />
            <p>Loading performance data...</p>
          </LoadingSpinner>
        </Content>
      </PerformanceContainer>
    );
  }

  return (
    <PerformanceContainer>
      <Sidebar />
    
        <PerformanceContent>
          {/* Header */}
          <PerformanceHeader>
            <h1>Performance Overview</h1>
            <p>Track and manage student academic performance</p>
          </PerformanceHeader>

          {/* Add Performance Form */}
          <AddPerformanceForm onSuccess={fetchPerformance} />

          {/* Stats Grid */}
          <StatsGrid>
            <StatCard 
              onClick={handleStatCardClick}
              style={{ cursor: 'pointer' }}
            >
              <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <FaChartLine size={24} color="white" />
              </StatIcon>
              <StatInfo>
                <StatNumber>{averageScore}</StatNumber>
                <StatLabel>Average Score</StatLabel>
              </StatInfo>
            </StatCard>

            <StatCard 
              onClick={handleStatCardClick}
              style={{ cursor: 'pointer' }}
            >
              <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <FaUserGraduate size={24} color="white" />
              </StatIcon>
              <StatInfo>
                <StatNumber>{totalStudents}</StatNumber>
                <StatLabel>Total Students</StatLabel>
              </StatInfo>
            </StatCard>

            <StatCard 
              onClick={handleStatCardClick}
              style={{ cursor: 'pointer' }}
            >
              <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <FaTrophy size={24} color="white" />
              </StatIcon>
              <StatInfo>
                <StatNumber>{highestScore}</StatNumber>
                <StatLabel>Highest Score</StatLabel>
              </StatInfo>
            </StatCard>

            <StatCard 
              onClick={handleStatCardClick}
              style={{ cursor: 'pointer' }}
            >
              <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                <FaCalendarAlt size={24} color="white" />
              </StatIcon>
              <StatInfo>
                <StatNumber>{totalRecords}</StatNumber>
                <StatLabel>Total Records</StatLabel>
              </StatInfo>
            </StatCard>
          </StatsGrid>

          {/* Performance Grid */}
          <PerformanceGrid>
            {/* Top Performers */}
            <PerformanceCard>
              <h3>
                <FaStar style={{ marginRight: '8px', color: '#fbbf24' }} />
                Top Performers
              </h3>
              {topPerformers.length > 0 ? (
                <StudentList>
                  {topPerformers.map((record, index) => (
                    <StudentItem 
                      key={record._id}
                      onClick={() => handleStudentClick(record.student?._id || record.student)}
                      style={{ cursor: 'pointer' }}
                    >
                      <StudentAvatar>
                        {index === 0 && <FaMedal size={16} color="#fbbf24" />}
                        {index === 1 && <FaMedal size={16} color="#9ca3af" />}
                        {index === 2 && <FaMedal size={16} color="#cd7f32" />}
                        {index > 2 && <span>{index + 1}</span>}
                      </StudentAvatar>
                      <StudentInfo>
                        <StudentName>{record.student?.name || record.student}</StudentName>
                        <StudentScore>{record.score}%</StudentScore>
                        {record.subject && (
                          <SubjectBadge>{record.subject}</SubjectBadge>
                        )}
                      </StudentInfo>
                    </StudentItem>
                  ))}
                </StudentList>
              ) : (
                <EmptyState>
                  <EmptyIcon>
                    <FaInbox size={32} />
                  </EmptyIcon>
                  <EmptyText>No performance records yet</EmptyText>
                </EmptyState>
              )}
            </PerformanceCard>

            {/* All Performance Records */}
            <PerformanceCard>
              <h3>All Performance Records</h3>
              {performanceData.length > 0 ? (
                <StudentList>
                  {performanceData.map((record) => (
                    <StudentItem 
                      key={record._id}
                      onClick={() => handleStudentClick(record.student?._id || record.student)}
                      style={{ cursor: 'pointer' }}
                    >
                      <StudentAvatar>
                        <FaUserGraduate size={16} />
                      </StudentAvatar>
                      <StudentInfo>
                        <StudentName>{record.student?.name || record.student}</StudentName>
                        <StudentScore>{record.score}%</StudentScore>
                        {record.subject && (
                          <SubjectBadge>{record.subject}</SubjectBadge>
                        )}
                      </StudentInfo>
                    </StudentItem>
                  ))}
                </StudentList>
              ) : (
                <EmptyState>
                  <EmptyIcon>
                    <FaInbox size={32} />
                  </EmptyIcon>
                  <EmptyText>No performance records yet</EmptyText>
                </EmptyState>
              )}
            </PerformanceCard>
          </PerformanceGrid>

          {/* Performance Chart Placeholder */}
          {/* <PerformanceChart>
            <h3>Performance Trends</h3>
            <ChartContainer>
              <p>Chart visualization coming soon...</p>
            </ChartContainer>
          </PerformanceChart> */}
        </PerformanceContent>
    
    </PerformanceContainer>
  );
};

export default Performance;
