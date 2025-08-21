// TeacherDashboard.js
import React, { useEffect, useState } from 'react';
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
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatNumber,
  StatLabel,
  StatTrend,
  TopPanel,
  OverviewPanel,
  SectionTitle,
  MetricCard,
  MetricValue,
  MetricLabel,
  MetricIcon,
  ActivityPanel,
  ActivityItem,
} from '../../styles/DashboardStyles';
import { 
  FaUserGraduate, 
  FaSchool, 
  FaChartLine,
  FaCalendarAlt,
  FaBell,
  FaPlus,
  FaArrowUp,
  FaClipboardList,
} from 'react-icons/fa';
import { useTheme } from '../../App';

const TeacherDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all data in parallel
      const [studentsRes, classesRes, eventsRes, assignmentsRes, announcementsRes] = await Promise.all([
        axios.get('http://localhost:4000/api/v1/students/getall'),
        axios.get('http://localhost:4000/api/v1/class/getall'),
        axios.get('http://localhost:4000/api/v1/events/getall'),
        axios.get('http://localhost:4000/api/v1/assignments/getall'),
        axios.get('http://localhost:4000/api/v1/announcements/getall'),
      ]);

      setTotalStudents(studentsRes.data.students ? studentsRes.data.students.length : 0);
      setTotalClasses(classesRes.data.classes ? classesRes.data.classes.length : 0);
      setAssignments(assignmentsRes.data.assignments || []);
      setAnnouncements(announcementsRes.data.announcements || []);

      // Process events
      const events = eventsRes.data.event || [];
      const sorted = events
        .filter(e => e.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentActivities(sorted);

      // Upcoming events: next 7 days
      const now = new Date();
      const weekFromNow = new Date();
      weekFromNow.setDate(now.getDate() + 7);
      const upcoming = events.filter(e => {
        const d = new Date(e.date);
        return d >= now && d <= weekFromNow;
      });
      setUpcomingEvents(upcoming);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    navigate('/teacher/dashboard');
  };

  const handleAddAssignmentClick = () => {
    navigate('/teacher/assignments');
  };

  const handleScheduleEventClick = () => {
    navigate('/teacher/events');
  };

  const handleSendAnnouncementClick = () => {
    navigate('/teacher/communication');
  };

  const theme = useTheme()?.theme || {};

  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content isOpen={true}>
        {/* Welcome Section */}
        <WelcomeSection>
          <div 
            onClick={handleWelcomeClick}
            style={{ cursor: 'pointer' }}
          >
            <WelcomeTitle>{getCurrentTime()}, Teacher!</WelcomeTitle>
            <WelcomeSubtitle>Here&apos;s what&apos;s happening in your classes today</WelcomeSubtitle>
          </div>
          <QuickActions>
            <ActionButton onClick={handleAddAssignmentClick}>
              <FaPlus size={16} />
              Add Assignment
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

        {/* Quick Metrics Section */}
        {/* <div style={{ 
          marginBottom: '32px',
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}> */}
          {/* Quick Metrics title removed to avoid implying static data */}
        

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard 
            onClick={() => handleCardClick('/teacher/students')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaUserGraduate size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{totalStudents}</StatNumber>
              <StatLabel>My Students</StatLabel>
              {/* <StatTrend positive>
                <FaArrowUp size={12} />
                +8% this month
              </StatTrend> */}
            </StatInfo>
          </StatCard>

          <StatCard 
            onClick={() => handleCardClick('/teacher/classes')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaSchool size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{totalClasses}</StatNumber>
              <StatLabel>My Classes</StatLabel>
              {/* Trend removed (static) */}
            </StatInfo>
          </StatCard>

          <StatCard 
            onClick={() => handleCardClick('/teacher/assignments')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaClipboardList size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{assignments.length}</StatNumber>
              <StatLabel>Assignments</StatLabel>
              {/* Trend removed (static) */}
            </StatInfo>
          </StatCard>
          <StatCard 
            onClick={() => handleCardClick('/teacher/assignments')}
            style={{ cursor: 'pointer' }}
          >
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaClipboardList size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{announcements.length}</StatNumber>
              <StatLabel>Announcements</StatLabel>
              {/* Trend removed (static) */}
            </StatInfo>
          </StatCard>
          {/* <StatCard 
            onClick={() => handleCardClick('/teacher/performance')}
            style={{ cursor: 'pointer' }}
          > */}
            {/* <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaChartLine size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>—</StatNumber>
              <StatLabel>Class Average</StatLabel>
            </StatInfo> */}
          {/* </StatCard> */}
        </StatsGrid>

        {/* Main Content Panels */}
        <TopPanel>
          <OverviewPanel style={{ flex: 1.2 }}>
            <SectionTitle>Recent Activities</SectionTitle>
            <ActivityPanel>
              {recentActivities.length === 0 && <ActivityItem>No recent activities.</ActivityItem>}
              {recentActivities.map((activity, idx) => (
                <ActivityItem key={idx} style={{ animation: 'fadeIn 0.5s', animationDelay: `${idx * 0.05}s`, animationFillMode: 'backwards' }}>
                  <FaCalendarAlt color={theme.primary || '#2563eb'} size={20} />
                  <span style={{ flex: 1 }}><b>{activity.events}</b></span>
                  <span style={{ fontSize: '0.95em', color: theme.text, opacity: 0.7 }}>
                    {activity.date ? new Date(activity.date).toLocaleDateString() : 'No date'}
                  </span>
                </ActivityItem>
              ))}
            </ActivityPanel>
          </OverviewPanel>
          
          <div style={{ flex: 0.8 }}>
            <OverviewPanel style={{ marginBottom: '32px' }}>
              <SectionTitle>Upcoming Events</SectionTitle>
              <ActivityPanel>
                {upcomingEvents.length === 0 && <ActivityItem>No upcoming events.</ActivityItem>}
                {upcomingEvents.map((event, idx) => (
                  <ActivityItem key={idx} style={{ animation: 'fadeIn 0.5s', animationDelay: `${idx * 0.05}s`, animationFillMode: 'backwards' }}>
                    <FaCalendarAlt color={theme.primary || '#2563eb'} size={20} />
                    <span style={{ flex: 1 }}><b>{event.events}</b></span>
                    <span style={{ fontSize: '0.95em', color: theme.text, opacity: 0.7 }}>
                      {event.date ? new Date(event.date).toLocaleDateString() : 'No date'}
                    </span>
                  </ActivityItem>
                ))}
              </ActivityPanel>
            </OverviewPanel>

            <OverviewPanel>
              <SectionTitle>Recent Announcements</SectionTitle>
              <ActivityPanel>
                {announcements.length === 0 && <ActivityItem>No recent announcements.</ActivityItem>}
                {announcements.slice(0, 3).map((announcement, idx) => (
                  <ActivityItem key={idx} style={{ animation: 'fadeIn 0.5s', animationDelay: `${idx * 0.05}s`, animationFillMode: 'backwards' }}>
                    <FaBell color={theme.primary || '#2563eb'} size={20} />
                    <span style={{ flex: 1 }}><b>{announcement.announcement}</b></span>
                    <span style={{ fontSize: '0.95em', color: theme.text, opacity: 0.7 }}>
                      {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </ActivityItem>
                ))}
              </ActivityPanel>
            </OverviewPanel>
          </div>
        </TopPanel>
      </Content>
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboard;
