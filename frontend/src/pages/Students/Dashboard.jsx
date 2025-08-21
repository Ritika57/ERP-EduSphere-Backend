// StudentDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { 
  StudentDashboardContainer, 
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  QuickActions,
  ActionButton,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatNumber,
  StatLabel,
  StatTrend,
  SectionTitle,
  OverviewPanel,
  ActivityPanel,
  ActivityItem,
  MetricCard,
  MetricValue,
  MetricLabel,
  MetricIcon
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
  FaUserGraduate, 
  FaChartLine, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaBullhorn,
  FaBook,
  FaBell,
  FaPlus,
  FaArrowUp,
  FaFileAlt,
  FaGraduationCap
} from 'react-icons/fa';
import { useTheme } from '../../App';

const StudentDashboard = () => {
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [performanceScore, setPerformanceScore] = useState('-');
  const [term, setTerm] = useState('-');
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const theme = useTheme()?.theme || {};

  // Assume studentId is stored in localStorage after login
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    fetchDashboardData();
  }, [studentId]);

  const fetchDashboardData = async () => {
    try {
      // Get student info from localStorage to get their grade
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      
      // Fetch assignments
      const assignmentsRes = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      const allAssignments = assignmentsRes.data.assignments || [];
      
      // Filter assignments by student's grade if grade is available
      let assignments = allAssignments;
      if (studentInfo && studentInfo.grade) {
        assignments = allAssignments.filter(assignment => {
          // Handle different grade formats (e.g., "10", "Grade 10", "10th")
          const assignmentGrade = assignment.grade?.toString().toLowerCase();
          const studentGrade = studentInfo.grade?.toString().toLowerCase();
          
          if (!assignmentGrade || !studentGrade) return false;
          
          // Direct match
          if (assignmentGrade === studentGrade) return true;
          
          // Extract numbers for comparison
          const assignmentGradeNum = assignmentGrade.match(/\d+/)?.[0];
          const studentGradeNum = studentGrade.match(/\d+/)?.[0];
          
          return assignmentGradeNum && studentGradeNum && assignmentGradeNum === studentGradeNum;
        });
        console.log('Dashboard: Filtered assignments for grade', studentInfo.grade + ':', assignments.length, 'out of', allAssignments.length);
      } else {
        console.log('Dashboard: No student grade found, showing all assignments');
      }
      
      setAssignmentCount(assignments.length);

      // Fetch performance
      const performanceRes = await axios.get('http://localhost:4000/api/v1/performance');
      const performances = performanceRes.data.filter ? performanceRes.data.filter(p => p.student === studentId) : performanceRes.data;
      if (performances && performances.length > 0) {
        setPerformanceScore(performances[0].score || '-');
      }

      // Fetch exams
      const examsRes = await axios.get('http://localhost:4000/api/v1/exams/getall');
      const exams = examsRes.data.exams || [];
      setExamCount(exams.length);

      // Fetch announcements
      const announcementsRes = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      const announcements = announcementsRes.data.announcements || [];
      setAnnouncementCount(announcements.length);

      // Fetch events
      const eventsRes = await axios.get('http://localhost:4000/api/v1/events/getall');
      const events = eventsRes.data.event || [];
      const now = new Date();
      const weekFromNow = new Date();
      weekFromNow.setDate(now.getDate() + 7);
      const upcoming = events.filter(e => {
        const d = new Date(e.date);
        return d >= now && d <= weekFromNow;
      });
      setUpcomingEvents(upcoming);

      // Avoid static placeholders; keep values if available from backend later
      setAttendanceRate(attendanceRate || 0);
      setTerm(term || '-');

      // Combine recent activities (use filtered assignments)
      const activities = [
        ...assignments.slice(-3).reverse().map(a => ({ 
          type: 'Assignment', 
          title: a.title, 
          date: a.deadline,
          icon: <FaFileAlt color={theme.primary || '#2563eb'} size={20} />
        })),
        ...performances.slice(-2).reverse().map(p => ({ 
          type: 'Performance', 
          title: p.subject, 
          date: p.date, 
          score: p.score,
          icon: <FaChartLine color={theme.primary || '#2563eb'} size={20} />
        })),
        ...upcoming.slice(0, 2).map(e => ({ 
          type: 'Event', 
          title: e.events, 
          date: e.date,
          icon: <FaCalendarAlt color={theme.primary || '#2563eb'} size={20} />
        }))
      ];
      setRecentActivities(activities);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleCardClick = (route) => {
    // Navigate to different sections
    window.location.href = route;
  };

  const handleWelcomeClick = () => {
    // Navigate to dashboard or refresh the current page
    window.location.href = '/student/dashboard';
  };

  const handleViewAssignmentsClick = () => {
    window.location.href = '/student/assignments';
  };

  const handleViewExamsClick = () => {
    window.location.href = '/student/exams';
  };

  const handleViewPerformanceClick = () => {
    window.location.href = '/student/performance';
  };

  return (
    <StudentDashboardContainer>
      <Sidebar onToggle={setSidebarOpen} />
      <Content isOpen={sidebarOpen}>
        {/* Welcome Section */}
        <WelcomeSection>
          <div 
            onClick={handleWelcomeClick}
            style={{ cursor: 'pointer' }}
          >
            <WelcomeTitle>{getCurrentTime()}, Student!</WelcomeTitle>
            <WelcomeSubtitle>Here&apos;s what&apos;s happening in your academic journey today</WelcomeSubtitle>
          </div>
          <QuickActions>
            <ActionButton onClick={handleViewAssignmentsClick}>
              <FaFileAlt size={16} />
              View Assignments
            </ActionButton>
            <ActionButton onClick={handleViewExamsClick}>
              <FaBook size={16} />
              View Exams
            </ActionButton>
            <ActionButton onClick={handleViewPerformanceClick}>
              <FaChartLine size={16} />
              View Performance
            </ActionButton>
          </QuickActions>
        </WelcomeSection>

        {/* Quick Metrics Section */}
        <div style={{ 
          marginBottom: '32px',
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <SectionTitle style={{ 
            marginBottom: '20px',
            fontSize: '1.3rem',
            fontWeight: '700',
            color: '#2d3748',
            position: 'relative'
          }}>
            Quick Metrics
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              left: '0',
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #20bf6b, #0fb9b1)',
              borderRadius: '2px'
            }}></div>
          </SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <MetricCard 
              onClick={() => handleCardClick('/student/assignments')}
              style={{ cursor: 'pointer' }}
            >
              <MetricIcon style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}>
                <FaFileAlt size={16} color="white" />
              </MetricIcon>
              <div>
                <MetricValue>{assignmentCount}</MetricValue>
                <MetricLabel>Assignments</MetricLabel>
              </div>
            </MetricCard>
            <MetricCard 
              onClick={() => handleCardClick('/student/exams')}
              style={{ cursor: 'pointer' }}
            >
              <MetricIcon style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
                <FaBook size={16} color="white" />
              </MetricIcon>
              <div>
                <MetricValue>{examCount}</MetricValue>
                <MetricLabel>Exams</MetricLabel>
              </div>
            </MetricCard>
            <MetricCard 
              onClick={() => handleCardClick('/student/attendance')}
              style={{ cursor: 'pointer' }}
            >
              <MetricIcon style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
                <FaCalendarAlt size={16} color="white" />
              </MetricIcon>
              <div>
                <MetricValue>{attendanceRate}%</MetricValue>
                <MetricLabel>Attendance</MetricLabel>
              </div>
            </MetricCard>
            <MetricCard 
              onClick={() => handleCardClick('/student/communication')}
              style={{ cursor: 'pointer' }}
            >
              <MetricIcon style={{ background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' }}>
                <FaBell size={16} color="white" />
              </MetricIcon>
              <div>
                <MetricValue>{announcementCount}</MetricValue>
                <MetricLabel>Announcements</MetricLabel>
              </div>
            </MetricCard>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard 
            onClick={() => handleCardClick('/student/assignments')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaFileAlt size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{assignmentCount}</StatNumber>
              <StatLabel>Total Assignments</StatLabel>
              {/* Trend removed (static) */}
            </StatInfo>
          </StatCard>

          <StatCard 
            onClick={() => handleCardClick('/student/performance')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaChartLine size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{performanceScore}</StatNumber>
              <StatLabel>Performance Score</StatLabel>
              {/* Trend removed (static) */}
            </StatInfo>
          </StatCard>

          <StatCard 
            onClick={() => handleCardClick('/student/exams')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaGraduationCap size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{examCount}</StatNumber>
              <StatLabel>Total Exams</StatLabel>
              {/* Trend removed (static) */}
            </StatInfo>
          </StatCard>

          {/* <StatCard 
            onClick={() => handleCardClick('/student/attendance')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaCalendarAlt size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{attendanceRate}%</StatNumber>
              <StatLabel>Attendance Rate</StatLabel>
              Trend removed (static)
            </StatInfo>
          </StatCard> */}
        </StatsGrid>

        {/* Recent Activity Section */}
       
      </Content>
    </StudentDashboardContainer> 
  );
};

export default StudentDashboard;
