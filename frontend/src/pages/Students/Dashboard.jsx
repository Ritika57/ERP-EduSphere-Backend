// StudentDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { StudentDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent } 
from '../../styles/DashboardStyles';

const StudentDashboard = () => {
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [performanceScore, setPerformanceScore] = useState('-');
  const [term, setTerm] = useState('-');
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Assignments</CardTitle>
              <CardContent>{assignmentCount}</CardContent>
            </Card>
            <Card>
              <CardTitle>Performance</CardTitle>
              <CardContent>{performanceScore}</CardContent>
            </Card>
            <Card>
              <CardTitle>Term</CardTitle>
              <CardContent>{term}</CardContent>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ul>
            {recentActivities.length === 0 && <li>No recent activities.</li>}
            {recentActivities.map((activity, idx) => (
              <li key={idx}>
                [{activity.type}] {activity.title} {activity.score ? `(Score: ${activity.score})` : ''} {activity.date ? `(${new Date(activity.date).toLocaleDateString()})` : ''}
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionTitle>Upcoming Events</SectionTitle>
          <ul>
            {upcomingEvents.length === 0 && <li>No upcoming events.</li>}
            {upcomingEvents.map((event, idx) => (
              <li key={idx}>
                {event.events} ({event.date ? new Date(event.date).toLocaleDateString() : 'No date'})
              </li>
            ))}
          </ul>
        </Section>

        {/* Add more sections for other parts of the admin dashboard */}
      </Content>
    </StudentDashboardContainer> 
  );
};

export default StudentDashboard;
