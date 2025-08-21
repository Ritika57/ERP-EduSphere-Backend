// AdminDashboard.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import EventCalendar from './EventCalender';
import Announcement from './Announcement';
import Performance from './Performance';
import axios from 'axios';
import {
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
  const [counts, setCounts] = useState({ students: 0, teachers: 0 });
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
      const [studentsRes, teachersRes] = await Promise.all([
        axios.get('http://localhost:4000/api/v1/students/count'),
        axios.get('http://localhost:4000/api/v1/teachers/count'),
        // axios.get('http://localhost:4000/api/v1/class/count'),
      ]);
      setCounts({
        students: studentsRes.data.count,
        teachers: teachersRes.data.count,
        // classes: classesRes.data.count,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  // Compute dynamic average performance (if data is available)
  const averagePerformance = studentPerformance && studentPerformance.length > 0
    ? Math.round(
        studentPerformance.reduce((sum, rec) => sum + (Number(rec.score) || 0), 0) /
        studentPerformance.length
      )
    : null;

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
    <AdminLayout>
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


        {/* Quick metrics section removed to avoid static data */}

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
              {/* Trend removed (static) */}
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
              {/* Trend removed (static) */}
            </StatInfo>
          </StatCard>

          {/* <StatCard 
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
          </StatCard> */}

          <StatCard 
            onClick={() => handleCardClick('/admin/performance')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaChartLine size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{averagePerformance !== null ? `${averagePerformance}%` : '—'}</StatNumber>
              <StatLabel>Average Performance</StatLabel>
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
    </AdminLayout>
  );
};

export default AdminDashboard;
