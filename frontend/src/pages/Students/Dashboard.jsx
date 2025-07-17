// StudentDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { StudentDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent } 
from '../../styles/DashboardStyles';
import { FaUserGraduate, FaChartLine, FaCalendarAlt, FaCheckCircle, FaBullhorn } from 'react-icons/fa';
import { ActivityPanel, ActivityItem } from '../../styles/DashboardStyles';
import { useTheme } from '../../App';
import { OverviewPanel } from '../../styles/DashboardStyles';

const StudentDashboard = () => {
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [performanceScore, setPerformanceScore] = useState('-');
  const [term, setTerm] = useState('-');
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const theme = useTheme()?.theme || {};

  // Assume studentId is stored in localStorage after login
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    // Fetch assignments for this student
    axios.get('http://localhost:4000/api/v1/assignments/getall')
      .then(res => {
        // If assignments are filtered by student, filter here
        const assignments = res.data.assignments || [];
        setAssignmentCount(assignments.length);
        // Recent assignments as activity
        setRecentActivities(assignments.slice(-5).reverse().map(a => ({ type: 'Assignment', title: a.title, date: a.deadline })));
      })
      .catch(() => setAssignmentCount(0));
    // Fetch performance for this student
    axios.get('http://localhost:4000/api/v1/performance')
      .then(res => {
        const performances = res.data.filter ? res.data.filter(p => p.student === studentId) : res.data;
        if (performances && performances.length > 0) {
          setPerformanceScore(performances[0].score || '-');
          setRecentActivities(prev => [
            ...prev,
            ...performances.slice(-3).reverse().map(p => ({ type: 'Performance', title: p.subject, date: p.date, score: p.score }))
          ]);
        }
      })
      .catch(() => setPerformanceScore('-'));
    // Fetch term (if available)
    // If you have a term API, use it here. For now, set a placeholder.
    setTerm('1');
    // Fetch upcoming events
    axios.get('http://localhost:4000/api/v1/events/getall')
      .then(res => {
        const events = res.data.event || [];
        const now = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(now.getDate() + 7);
        const upcoming = events.filter(e => {
          const d = new Date(e.date);
          return d >= now && d <= weekFromNow;
        });
        setUpcomingEvents(upcoming);
        setRecentActivities(prev => [
          ...prev,
          ...upcoming.slice(0, 2).map(e => ({ type: 'Event', title: e.events, date: e.date }))
        ]);
      })
      .catch(() => setUpcomingEvents([]));
  }, [studentId]);

  return (
    <StudentDashboardContainer>
      <Sidebar />
      <Content>
        <OverviewPanel style={{ marginBottom: 32 }}>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <FaUserGraduate size={28} color={theme.primary || '#2563eb'} style={{ marginRight: 12 }} />
                <CardTitle>Assignments</CardTitle>
              </div>
              <CardContent>{assignmentCount}</CardContent>
            </Card>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <FaChartLine size={28} color={theme.primary || '#2563eb'} style={{ marginRight: 12 }} />
                <CardTitle>Performance</CardTitle>
              </div>
              <CardContent>{performanceScore}</CardContent>
            </Card>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <FaCalendarAlt size={28} color={theme.primary || '#2563eb'} style={{ marginRight: 12 }} />
                <CardTitle>Term</CardTitle>
              </div>
              <CardContent>{term}</CardContent>
            </Card>
          </CardContainer>
        </OverviewPanel>

        <OverviewPanel style={{ marginBottom: 32 }}>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityPanel>
            {recentActivities.length === 0 && <ActivityItem>No recent activities.</ActivityItem>}
            {recentActivities.map((activity, idx) => {
              let icon = <FaCheckCircle color={theme.primary || '#2563eb'} size={20} />;
              if (activity.type === 'Assignment') icon = <FaUserGraduate color={theme.primary || '#2563eb'} size={20} />;
              if (activity.type === 'Performance') icon = <FaChartLine color={theme.primary || '#2563eb'} size={20} />;
              if (activity.type === 'Event') icon = <FaBullhorn color={theme.primary || '#2563eb'} size={20} />;
              let label = `[${activity.type}]`;
              if (activity.type === 'Assignment') {
                label += ` ${activity.title}`;
              } else if (activity.type === 'Performance') {
                label += ` ${activity.title}`;
              } else if (activity.type === 'Event') {
                label += ` ${activity.title}`;
              }
              return (
                <ActivityItem key={idx} style={{ animation: 'fadeIn 0.5s', animationDelay: `${idx * 0.05}s`, animationFillMode: 'backwards' }}>
                  {icon}
                  <span style={{ flex: 1 }}>
                    <b>{label}</b> {activity.score ? <span style={{ color: theme.accent, fontWeight: 600 }}>(Score: {activity.score})</span> : ''}
                  </span>
                  <span style={{ fontSize: '0.95em', color: theme.text, opacity: 0.7 }}>
                    {activity.date ? new Date(activity.date).toLocaleDateString() : ''}
                  </span>
                </ActivityItem>
              );
            })}
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
    </StudentDashboardContainer> 
  );
};

export default StudentDashboard;
