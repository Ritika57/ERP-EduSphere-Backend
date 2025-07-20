// AnnouncementSection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AnnouncementContainer,
  SidebarContainer,
  Content,
  AnnouncementHeader,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementTitle,
  AnnouncementContent,
} from '../../styles/AnnouncementStyles'; 
import { FaBullhorn, FaCalendarAlt, FaClock, FaUser, FaBell, FaInfoCircle, FaGraduationCap, FaNewspaper } from 'react-icons/fa';

const getStats = (announcements) => {
  if (!announcements.length) return { total: 0, recent: 0, important: 0, today: 0 };
  const total = announcements.length;
  const today = new Date().toDateString();
  const recent = announcements.filter(ann => {
    const annDate = new Date(ann.createdAt || Date.now()).toDateString();
    return annDate === today;
  }).length;
  const important = announcements.filter(ann => 
    ann.announcement?.toLowerCase().includes('important') || 
    ann.announcement?.toLowerCase().includes('urgent')
  ).length;
  const todayCount = announcements.filter(ann => {
    const annDate = new Date(ann.createdAt || Date.now()).toDateString();
    return annDate === today;
  }).length;
  return { total, recent, important, today: todayCount };
};

const StatCard = ({ icon, label, value, color, bg }) => (
  <div style={{
    flex: 1,
    minWidth: 140,
    background: bg,
    color: color,
    borderRadius: 16,
    padding: '24px 20px',
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
    fontWeight: 700,
    fontSize: '1rem',
    justifyContent: 'center',
  }}>
    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{label}</div>
  </div>
);

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
    setLoading(false);
  };

  const stats = getStats(announcements);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isImportant = (announcement) => {
    const text = announcement.announcement?.toLowerCase() || '';
    return text.includes('important') || text.includes('urgent') || text.includes('holiday');
  };

  return (
    <AnnouncementContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        {/* Main Card - Compact Design */}
        <div style={{
          background: 'white',
          borderRadius: 24,
          boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
          padding: '24px',
          margin: '0 auto',
          maxWidth: 1600,
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#6d5ac3', marginBottom: 6, letterSpacing: -0.5 }}>Announcements</h1>
            <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>
              Stay updated with the latest school announcements and important notices
            </div>
          </div>

          {/* Stat Cards - Compact */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <StatCard icon={<FaBullhorn />} label="Total Announcements" value={stats.total} color="#fff" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
            <StatCard icon={<FaBell />} label="Today's Updates" value={stats.today} color="#fff" bg="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" />
            <StatCard icon={<FaInfoCircle />} label="Important" value={stats.important} color="#fff" bg="linear-gradient(135deg, #f857a6 0%, #ff5858 100%)" />
            <StatCard icon={<FaNewspaper />} label="Recent" value={stats.recent} color="#fff" bg="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)" />
          </div>

          {/* Announcements Section */}
          <div style={{
            background: '#f8fafc',
            borderRadius: 16,
            padding: '20px',
            height: 'fit-content'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10
              }}>
                <FaGraduationCap size={18} color="#fff" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#374151', margin: 0 }}>Latest Announcements</h3>
            </div>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <div style={{ fontSize: 24, marginBottom: 16 }}>📢</div>
                <div>Loading announcements...</div>
              </div>
            ) : announcements.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#666',
                background: '#fff',
                borderRadius: 12,
                border: '2px dashed #e2e8f0'
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📢</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                  No Announcements Available
                </div>
                <div style={{ fontSize: 14, color: '#6b7280' }}>
                  Announcements will appear here once they are posted.
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {announcements.map((announcement, index) => (
                  <div key={announcement._id} style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '20px',
                    border: `1px solid ${isImportant(announcement) ? '#fecaca' : '#e5e7eb'}`,
                    boxShadow: `0 1px 3px rgba(0,0,0,0.1)`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {isImportant(announcement) && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)'
                      }}></div>
                    )}
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{
                        background: isImportant(announcement) 
                          ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' 
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2
                      }}>
                        {isImportant(announcement) ? (
                          <FaInfoCircle size={14} color="#fff" />
                        ) : (
                          <FaBullhorn size={14} color="#fff" />
                        )}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: 16, 
                          fontWeight: 600, 
                          color: isImportant(announcement) ? '#dc2626' : '#374151',
                          marginBottom: 8,
                          lineHeight: 1.4
                        }}>
                          {announcement.announcement}
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FaCalendarAlt size={12} color="#6b7280" />
                            <span style={{ fontSize: 12, color: '#6b7280' }}>
                              {formatDate(announcement.createdAt || Date.now())}
                            </span>
                          </div>
                          
                          {isImportant(announcement) && (
                            <div style={{
                              background: '#fef2f2',
                              color: '#dc2626',
                              padding: '2px 8px',
                              borderRadius: 12,
                              fontSize: 11,
                              fontWeight: 600,
                              border: '1px solid #fecaca'
                            }}>
                              IMPORTANT
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Content>
    </AnnouncementContainer>
  );
};

export default AnnouncementSection;
