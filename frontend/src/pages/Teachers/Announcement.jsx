// CheckAnnouncementSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
  OverviewPanel,
  ActionButton,
  ActivityPanel,
  ActivityItem,
  MetricCard,
  MetricIcon,
  MetricValue,
  MetricLabel
} from '../../styles/DashboardStyles';
import { AnnouncementContainer, AnnouncementForm, FormGroup, Label, TextArea, Button, AnnouncementList } from '../../styles/AnnouncementStyles';
import { FaBullhorn, FaBell } from 'react-icons/fa';
import styled from 'styled-components';
import { useTheme } from '../../App';

const AnimatedBg = styled.div`
  position: absolute;
  top: -60px;
  left: -60px;
  width: 340px;
  height: 340px;
  z-index: 0;
  filter: blur(60px);
  opacity: 0.7;
  background: radial-gradient(circle at 60% 40%, ${({ theme }) => theme.primary}99 0%, ${({ theme }) => theme.accent}66 60%, transparent 100%);
  animation: floatBg 7s ease-in-out infinite alternate;
  @keyframes floatBg {
    0% { transform: scale(1) translateY(0) translateX(0); }
    100% { transform: scale(1.1) translateY(30px) translateX(40px); }
  }
`;

const GlassPanel = styled(OverviewPanel)`
  background: rgba(255,255,255,0.18) !important;
  box-shadow: 0 8px 40px 0 rgba(37,99,235,0.18), 0 1.5px 8px rgba(0,0,0,0.04) !important;
  backdrop-filter: blur(16px) saturate(1.2);
  border: 2.5px solid rgba(255,255,255,0.22) !important;
  overflow: hidden;
  position: relative;
`;

const GlowingButton = styled(Button)`
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 0 16px 2px ${({ theme }) => theme.primary}55, 0 2px 16px 0 ${({ theme }) => theme.accent}33;
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: box-shadow 0.22s, border 0.22s, background 0.22s;
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    border-radius: 16px;
    background: linear-gradient(120deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.accent} 100%);
    filter: blur(8px);
    opacity: 0.7;
    transition: opacity 0.22s;
    animation: glowBtn 2.5s linear infinite alternate;
  }
  @keyframes glowBtn {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  &:hover::before {
    opacity: 1;
  }
`;

const fadeInUp = styled.div`
  animation: fadeInUp 0.7s cubic-bezier(.4,2,.6,1);
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 32px 40px;
  margin-left: 250px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 700px) {
    margin-left: 160px;
    padding: 20px 20px;
  }
  
  @media (max-width: 480px) {
    margin-left: 0;
    padding: 16px 16px;
  }
`;

const CheckAnnouncementSection = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme()?.theme || {};

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/announcements', {
        announcement: announcement,
      });
      console.log('Announcement sent:', response.data);
      setAnnouncement('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error sending announcement:', error);
      setError('Error sending announcement');
    }
  };

  return (
    <AnnouncementContainer>
      <Sidebar />
      <Content>
        <AnimatedBg />
        <WelcomeSection>
          <div>
            <WelcomeTitle>Welcome, Teacher!</WelcomeTitle>
            <WelcomeSubtitle>Send important announcements to your students and staff below.</WelcomeSubtitle>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <ActionButton type="button" style={{ pointerEvents: 'none', opacity: 0.7 }}>
              <FaBullhorn size={16} />
              Send Announcement
            </ActionButton>
          </div>
        </WelcomeSection>
        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '0 0 32px 0', maxWidth: 900, width: '100%' }}>
          <MetricCard style={{ 
            background: 'white', 
            border: '1px solid #e5e7eb', 
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            minHeight: 120,
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            <MetricIcon style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <FaBullhorn size={20} color="white" />
            </MetricIcon>
            <div>
              <MetricValue style={{ 
                color: '#2d3748', 
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '4px'
              }}>
                {announcements.length}
              </MetricValue>
              <MetricLabel style={{ 
                color: '#718096', 
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Total Announcements
              </MetricLabel>
            </div>
          </MetricCard>
          
          <MetricCard style={{ 
            background: 'white', 
            border: '1px solid #e5e7eb', 
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            minHeight: 120,
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            <MetricIcon style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <FaBell size={20} color="white" />
            </MetricIcon>
            <div>
              <MetricValue style={{ 
                color: '#2d3748', 
                fontSize: '1.1rem',
                fontWeight: '600',
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '4px'
              }}>
                {announcements.length > 0 ? announcements[announcements.length-1].announcement : 'No announcements yet'}
              </MetricValue>
              <MetricLabel style={{ 
                color: '#718096', 
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Most Recent
              </MetricLabel>
            </div>
          </MetricCard>
        </div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          <GlassPanel style={{ flex: 1, minWidth: 340, maxWidth: 700, margin: '0 auto' }}>
            <SectionTitle>Send Announcement</SectionTitle>
            <AnnouncementForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="announcement">Announcement:</Label>
                <TextArea
                  id="announcement"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  required
                  rows={4}
                  cols={50}
                />
              </FormGroup>
              <GlowingButton type="submit" style={{ fontSize: '1.08rem', padding: '14px 38px', marginTop: 8 }}>
                <FaBullhorn style={{ marginRight: 8 }} />
                Send Announcement
              </GlowingButton>
            </AnnouncementForm>
          </GlassPanel>
          <GlassPanel style={{ flex: 1, minWidth: 340, maxWidth: 700, margin: '0 auto' }}>
            <SectionTitle>Recent Announcements</SectionTitle>
            <ActivityPanel>
              {announcements.length === 0 && <ActivityItem>No recent announcements.</ActivityItem>}
              {announcements.map((announcement, idx) => (
                <ActivityItem key={announcement._id} style={{ animation: 'fadeIn 0.5s', animationDelay: `${idx * 0.05}s`, animationFillMode: 'backwards', background: 'rgba(255,255,255,0.82)', borderRadius: 14, boxShadow: '0 4px 18px rgba(37,99,235,0.10)', marginBottom: 16, padding: 18, transition: 'box-shadow 0.22s, transform 0.18s', position: 'relative' }}>
                  <FaBell color="#2563eb" size={20} style={{ marginRight: 12 }} />
                  <span style={{ flex: 1 }}><b>{announcement.announcement}</b></span>
                </ActivityItem>
              ))}
            </ActivityPanel>
          </GlassPanel>
        </div>
      </Content>
    </AnnouncementContainer>
  );
};

export default CheckAnnouncementSection;
