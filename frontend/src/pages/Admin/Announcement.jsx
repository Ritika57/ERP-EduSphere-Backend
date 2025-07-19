import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBullhorn, FaCalendarAlt } from 'react-icons/fa';
import {
  AnnouncementContainer,
  Content,
  Title,
  AnnouncementForm,
  FormGroup,
  Label,
  TextArea,
  Button,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementContent,
  AnnouncementBanner,
  BannerIcon,
  BannerText,
  BannerTitle,
  BannerSubtitle,
  Card,
  AnnouncementListCard,
  AnnouncementMeta,
  AnnouncementDate,
} from '../../styles/AnnouncementStyles';

const Announcement = ({ announcements: propAnnouncements }) => {
  // State for managing announcement
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };
  

  useEffect(() => {
    if (!propAnnouncements) {
      fetchAnnouncements();
    }
  }, [propAnnouncements]);

  // Use prop announcements if provided, otherwise use local state
  const displayAnnouncements = propAnnouncements || announcements;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/announcements', {
        announcement: announcement, // Ensure that the key matches the backend model
      });
      console.log('Announcement sent:', response.data);
      // Display success toast message
      toast.success('Announcement sent successfully');
      // Clear the form
      setAnnouncement('');
      // Fetch announcements again to update the list
      fetchAnnouncements();
    } catch (error) {
      console.error('Error sending announcement:', error);
      // Display error toast message
      toast.error('Error sending announcement');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewMoreClick = () => {
    navigate('/admin/communication');
  };

  const handleAddAnnouncementClick = () => {
    navigate('/admin/communication');
  };

  // If this is being used in dashboard (with prop announcements)
  if (propAnnouncements) {
    return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <div style={{
            fontWeight: 700,
            color: '#667eea',
            fontSize: '1.1rem',
            letterSpacing: 0.5
          }}>
            Recent Announcements
          </div>
          <button
            onClick={handleAddAnnouncementClick}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
            }}
          >
            <FaBullhorn size={12} />
            Add Announcement
          </button>
        </div>
        <AnnouncementList>
          {displayAnnouncements.length > 0 ? (
            displayAnnouncements.slice(0, 3).map((announcement, index) => (
              <AnnouncementItem key={announcement._id} style={{ animationDelay: `${index * 0.1}s` }}>
                <AnnouncementContent>{announcement.announcement}</AnnouncementContent>
                <AnnouncementMeta>
                  <FaCalendarAlt />
                  <AnnouncementDate>
                    {formatDate(announcement.createdAt || new Date())}
                  </AnnouncementDate>
                </AnnouncementMeta>
              </AnnouncementItem>
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              color: '#718096',
              fontStyle: 'italic'
            }}>
              No announcements yet
            </div>
          )}
        </AnnouncementList>
        
        {displayAnnouncements.length > 3 && (
          <div 
            onClick={handleViewMoreClick}
            style={{ 
              textAlign: 'center', 
              marginTop: '16px', 
              color: '#667eea', 
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            View {displayAnnouncements.length - 3} more announcements
          </div>
        )}
      </div>
    );
  }

  // Standalone version
  return (
    <AnnouncementContainer>
      <ToastContainer />
      <Sidebar />
      <Content>
        <Title>Announcements</Title>
        
        <AnnouncementBanner>
          <BannerIcon><FaBullhorn /></BannerIcon>
          <BannerText>
            <BannerTitle>Communication Hub</BannerTitle>
            <BannerSubtitle>"Keep everyone informed with important updates and announcements."</BannerSubtitle>
          </BannerText>
        </AnnouncementBanner>

        <Card>
          <AnnouncementForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="announcement">Announcement Message:</Label>
              <TextArea
                id="announcement"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                required
                placeholder="Enter your announcement here..."
              />
            </FormGroup>
            <Button type="submit">Send Announcement</Button>
          </AnnouncementForm>
        </Card>

        <AnnouncementListCard>
          <div style={{
            fontWeight: 700,
            color: '#667eea',
            fontSize: '1.1rem',
            marginBottom: 16,
            letterSpacing: 0.5
          }}>
            Recent Announcements
          </div>
          <AnnouncementList>
            {displayAnnouncements.map((announcement, index) => (
              <AnnouncementItem key={announcement._id} style={{ animationDelay: `${index * 0.1}s` }}>
                <AnnouncementContent>{announcement.announcement}</AnnouncementContent>
                <AnnouncementMeta>
                  <FaCalendarAlt />
                  <AnnouncementDate>
                    {formatDate(announcement.createdAt || new Date())}
                  </AnnouncementDate>
                </AnnouncementMeta>
              </AnnouncementItem>
            ))}
          </AnnouncementList>
        </AnnouncementListCard>
      </Content>
    </AnnouncementContainer>
  );
};

export default Announcement;
