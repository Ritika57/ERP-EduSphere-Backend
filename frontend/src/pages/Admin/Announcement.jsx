import React, { useState, useEffect } from 'react';
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

const Announcement = () => {
  // State for managing announcement
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

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
    fetchAnnouncements();
  }, []);

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
            {announcements.map((announcement, index) => (
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
