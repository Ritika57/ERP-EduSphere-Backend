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
} from '../../styles/DashboardStyles';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState([]);
  const [counts, setCounts] = useState({ students: 0, teachers: 0, classes: 0 });

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
        <TopContent>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <CardContainer>
              <Card>
                <CardTitle>Total Students</CardTitle>
                <CardContent>{counts.students}</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Teachers</CardTitle>
                <CardContent>{counts.teachers}</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Classes</CardTitle>
                <CardContent>{counts.classes}</CardContent>
              </Card>
            </CardContainer>
          </Section>

          <Section>
            <EventCalendar events={events} />
          </Section>
        </TopContent>

        <BottomContent>
          <Performance studentPerformance={studentPerformance} />
          <Announcement announcements={announcements} />
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
