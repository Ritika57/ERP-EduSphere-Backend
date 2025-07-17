// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import EventCalendar from './EventCalender';
import Announcement from './Announcement';
import Performance from './Performance';
import axios from 'axios';
import {
  AdminDashboardContainer,
  Content,
  TopContent,
  BottomContent,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
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
  RecentActivity,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityTime,
  PerformanceChart,
  ChartContainer,
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
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { useTheme } from '../../App';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState([]);
  const [counts, setCounts] = useState({ students: 0, teachers: 0, classes: 0 });
  const theme = useTheme()?.theme || {};

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

  return (
    <AdminDashboardContainer>
      <Sidebar />
      <Content isOpen={isOpen}>
        {/* Welcome Section */}
        <WelcomeSection>
          <div>
            <WelcomeTitle>{getCurrentTime()}, Admin!</WelcomeTitle>
            <WelcomeSubtitle>Here's what's happening in your school today</WelcomeSubtitle>
          </div>
          <QuickActions>
            <ActionButton>
              <FaPlus size={16} />
              Add Student
            </ActionButton>
            <ActionButton>
              <FaCalendarAlt size={16} />
              Schedule Event
            </ActionButton>
            <ActionButton>
              <FaBell size={16} />
              Send Announcement
            </ActionButton>
          </QuickActions>
        </WelcomeSection>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
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

          <StatCard>
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

          <StatCard>
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

          <StatCard>
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
          <OverviewPanel>
            <SectionTitle>Performance Overview</SectionTitle>
            <Performance studentPerformance={studentPerformance} />
          </OverviewPanel>
          <EventPanel>
            <SectionTitle>Upcoming Events</SectionTitle>
            <EventCalendar events={events} />
          </EventPanel>
        </TopPanel>

        <BottomContent>
          <OverviewPanel style={{ flex: 1, marginRight: 18 }}>
            <SectionTitle>Recent Announcements</SectionTitle>
            <Announcement announcements={announcements} />
          </OverviewPanel>
          <OverviewPanel style={{ flex: 1, marginLeft: 18 }}>
            <SectionTitle>Quick Metrics</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <MetricCard>
                <MetricIcon style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}>
                  <FaUserGraduate size={16} color="white" />
                </MetricIcon>
                <div>
                  <MetricValue>92%</MetricValue>
                  <MetricLabel>Attendance Rate</MetricLabel>
                </div>
              </MetricCard>
              <MetricCard>
                <MetricIcon style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
                  <FaChartLine size={16} color="white" />
                </MetricIcon>
                <div>
                  <MetricValue>78%</MetricValue>
                  <MetricLabel>Pass Rate</MetricLabel>
                </div>
              </MetricCard>
              <MetricCard>
                <MetricIcon style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
                  <FaCalendarAlt size={16} color="white" />
                </MetricIcon>
                <div>
                  <MetricValue>15</MetricValue>
                  <MetricLabel>Events This Month</MetricLabel>
                </div>
              </MetricCard>
              <MetricCard>
                <MetricIcon style={{ background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' }}>
                  <FaBell size={16} color="white" />
                </MetricIcon>
                <div>
                  <MetricValue>8</MetricValue>
                  <MetricLabel>New Announcements</MetricLabel>
                </div>
              </MetricCard>
            </div>
          </OverviewPanel>
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
