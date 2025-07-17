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
} from '../../styles/DashboardStyles';
import { FaUserGraduate, FaChalkboardTeacher, FaSchool } from 'react-icons/fa';
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

  return (
    <AdminDashboardContainer>
      <Sidebar />
      <Content isOpen={isOpen}>
        <TopPanel>
          <OverviewPanel>
            <SectionTitle>Overview</SectionTitle>
            <CardContainer>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <FaUserGraduate size={28} color={theme.primary || '#2563eb'} style={{ marginRight: 12 }} />
                  <CardTitle>Total Students</CardTitle>
                </div>
                <CardContent>{counts.students}</CardContent>
              </Card>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <FaChalkboardTeacher size={28} color={theme.primary || '#2563eb'} style={{ marginRight: 12 }} />
                  <CardTitle>Total Teachers</CardTitle>
                </div>
                <CardContent>{counts.teachers}</CardContent>
              </Card>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <FaSchool size={28} color={theme.primary || '#2563eb'} style={{ marginRight: 12 }} />
                  <CardTitle>Total Classes</CardTitle>
                </div>
                <CardContent>{counts.classes}</CardContent>
              </Card>
            </CardContainer>
          </OverviewPanel>
          <EventPanel>
            <SectionTitle>Events</SectionTitle>
            <EventCalendar events={events} />
          </EventPanel>
        </TopPanel>

        <BottomContent>
          <OverviewPanel style={{ flex: 1, marginRight: 18 }}>
            <SectionTitle>Performance</SectionTitle>
            <Performance studentPerformance={studentPerformance} />
          </OverviewPanel>
          <OverviewPanel style={{ flex: 1, marginLeft: 18 }}>
            <SectionTitle>Announcements</SectionTitle>
            <Announcement announcements={announcements} />
          </OverviewPanel>
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
