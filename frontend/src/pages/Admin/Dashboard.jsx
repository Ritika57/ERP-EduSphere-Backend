// AdminDashboard.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import EventCalendar from './EventCalender';
import Announcement from './Announcement';
import Performance from './Performance';
import axios from 'axios';
import {
  AdminDashboardContainer,
  Content,
  BottomContent,
  SectionTitle,
  TopPanel,
  OverviewPanel,
  EventPanel,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatNumber,
  StatLabel,
  StatTrend,
  QuickActions,
  ActionButton,
  MetricCard,
  MetricValue,
  MetricLabel,
  MetricIcon,
} from '../../styles/DashboardStyles';
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaSchool, 
  FaChartLine,
  FaCalendarAlt,
  FaBell,
  FaPlus,
  FaArrowUp,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState([]);
  const [counts, setCounts] = useState({ students: 0, teachers: 0, classes: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchStudentPerformance();
    fetchCounts();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      setEvents(response.data.event || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/performance/getall');
      setStudentPerformance(response.data.performance || []);
    } catch (error) {
      console.error('Error fetching student performance:', error);
    }
  };

  const fetchCounts = async () => {
    try {
      const [studentsRes, teachersRes, classesRes] = await Promise.all([
        axios.get('http://localhost:4000/api/v1/students/count'),
        axios.get('http://localhost:4000/api/v1/teachers/count'),
        axios.get('http://localhost:4000/api/v1/class/count'),
      ]);
      setCounts({
        students: studentsRes.data.count,
        teachers: teachersRes.data.count,
        classes: classesRes.data.count,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
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
    navigate(route);
  };

  const handleWelcomeClick = () => {
    // Navigate to dashboard or refresh the current page
    navigate('/admin/dashboard');
  };

  const handleAddStudentClick = () => {
    navigate('/admin/students');
  };

  const handleScheduleEventClick = () => {
    navigate('/admin/events');
  };

  const handleSendAnnouncementClick = () => {
    navigate('/admin/communication');
  };

  return (
    <AdminDashboardContainer>
      <Sidebar />
      <Content isOpen={true}>
        {/* Welcome Section */}
        <WelcomeSection>
          <div 
            onClick={handleWelcomeClick}
            style={{ cursor: 'pointer' }}
          >
            <WelcomeTitle>{getCurrentTime()}, Admin!</WelcomeTitle>
            <WelcomeSubtitle>Here&apos;s what&apos;s happening in your school today</WelcomeSubtitle>
          </div>
          <QuickActions>
            <ActionButton onClick={handleAddStudentClick}>
              <FaPlus size={16} />
              Add Student
            </ActionButton>
            <ActionButton onClick={handleScheduleEventClick}>
              <FaCalendarAlt size={16} />
              Schedule Event
            </ActionButton>
            <ActionButton onClick={handleSendAnnouncementClick}>
              <FaBell size={16} />
              Send Announcement
            </ActionButton>
          </QuickActions>
        </WelcomeSection>


        {/* Quick Metrics Section - Between Performance and Events */}
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
              onClick={() => handleCardClick('/admin/attendance')}
              style={{ cursor: 'pointer' }}
            >
              <MetricIcon style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}>
                <FaUserGraduate size={16} color="white" />
              </MetricIcon>
              <div>
                <MetricValue>92%</MetricValue>
                <MetricLabel>Attendance Rate</MetricLabel>
              </div>
            </MetricCard>
            <MetricCard 
              onClick={() => handleCardClick('/admin/performance')}
              style={{ cursor: 'pointer' }}
            >
              <MetricIcon style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
                <FaChartLine size={16} color="white" />
              </MetricIcon>
              <div>
                <MetricValue>78%</MetricValue>
                <MetricLabel>Pass Rate</MetricLabel>
              </div>
            </MetricCard>
            <MetricCard 
              onClick={() => handleCardClick('/admin/events')}
              style={{ cursor: 'pointer' }}
            >
              <MetricIcon style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
                <FaCalendarAlt size={16} color="white" />
              </MetricIcon>
              <div>
                <MetricValue>15</MetricValue>
                <MetricLabel>Events This Month</MetricLabel>
              </div>
            </MetricCard>
            <MetricCard 
              onClick={() => handleCardClick('/admin/communication')}
              style={{ cursor: 'pointer' }}
            >
              <MetricIcon style={{ background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' }}>
                <FaBell size={16} color="white" />
              </MetricIcon>
              <div>
                <MetricValue>8</MetricValue>
                <MetricLabel>New Announcements</MetricLabel>
              </div>
            </MetricCard>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard 
            onClick={() => handleCardClick('/admin/students')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaUserGraduate size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{counts.students}</StatNumber>
              <StatLabel>Total Students</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                +12% this month
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard 
            onClick={() => handleCardClick('/admin/teachers')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaChalkboardTeacher size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{counts.teachers}</StatNumber>
              <StatLabel>Total Teachers</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                +5% this month
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard 
            onClick={() => handleCardClick('/admin/classes')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaSchool size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{counts.classes}</StatNumber>
              <StatLabel>Total Classes</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                +3% this month
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard 
            onClick={() => handleCardClick('/admin/performance')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaChartLine size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>85%</StatNumber>
              <StatLabel>Average Performance</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                +8% this month
              </StatTrend>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        {/* Main Content Panels */}
        <TopPanel>
          <OverviewPanel style={{ flex: 1.2 }}>
            <SectionTitle>Performance Overview</SectionTitle>
            <Performance hideAddPerformanceForm />
          </OverviewPanel>
          <div style={{ flex: 0.8 }}>
          <EventPanel >
            <SectionTitle>Upcoming Events</SectionTitle>
            <EventCalendar events={events} />
          </EventPanel>
            <OverviewPanel style={{ marginTop: '40px' }}>
            <SectionTitle>Recent Announcements</SectionTitle>
            <Announcement announcements={announcements} />
          </OverviewPanel>
          </div>
        </TopPanel>

        <BottomContent>
     
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
