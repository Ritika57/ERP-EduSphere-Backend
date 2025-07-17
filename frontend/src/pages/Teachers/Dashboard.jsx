// TeacherDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { TeacherDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent } 
from '../../styles/DashboardStyles';
import { OverviewPanel, ActivityPanel, ActivityItem } from '../../styles/DashboardStyles';
import { FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from '../../App';

const TeacherDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Fetch total students
    axios.get('http://localhost:4000/api/v1/students/getall')
      .then(res => setTotalStudents(res.data.students ? res.data.students.length : 0))
      .catch(() => setTotalStudents(0));
    // Fetch total teachers
    axios.get('http://localhost:4000/api/v1/teachers/getall')
      .then(res => setTotalTeachers(res.data.teachers ? res.data.teachers.length : 0))
      .catch(() => setTotalTeachers(0));
    // Fetch total classes
    axios.get('http://localhost:4000/api/v1/class/getall')
      .then(res => setTotalClasses(res.data.classes ? res.data.classes.length : 0))
      .catch(() => setTotalClasses(0));
    // Fetch recent activities (example: recent events)
    axios.get('http://localhost:4000/api/v1/events/getall')
      .then(res => {
        const events = res.data.event || [];
        // Sort by date descending, take last 5
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
      })
      .catch(() => {
        setRecentActivities([]);
        setUpcomingEvents([]);
      });
  }, []);

  const theme = useTheme()?.theme || {};

  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content>
        <OverviewPanel style={{ marginBottom: 32 }}>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Total Students</CardTitle>
              <CardContent>{totalStudents}</CardContent>
            </Card>
            <Card>
              <CardTitle>Total Teachers</CardTitle>
              <CardContent>{totalTeachers}</CardContent>
            </Card>
            <Card>
              <CardTitle>Total Classes</CardTitle>
              <CardContent>{totalClasses}</CardContent>
            </Card>
          </CardContainer>
        </OverviewPanel>

        <OverviewPanel style={{ marginBottom: 32 }}>
          <SectionTitle>Recent Activity</SectionTitle>
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

        <OverviewPanel>
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

        {/* Add more sections for other parts of the admin dashboard */}
      </Content>
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboard;
