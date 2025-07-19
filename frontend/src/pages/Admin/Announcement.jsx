import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaBullhorn, FaCalendarAlt, FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useFlashMessage } from '../../context/FlashMessageContext';
import styled, { keyframes } from 'styled-components';

// Modern styled components with theme support
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const AnnouncementContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 32px 40px;
  margin-left: 250px;
  background: #f3f4f8;
  min-height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 700px) {
    margin-left: 0;
    padding: 20px 16px;
  }
`;

const AnnouncementContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 32px;
  background: linear-gradient(135deg, #2563eb15 0%, #10b98115 100%);
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  animation: ${fadeInUp} 0.6s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #222;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #2563eb, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: #222;
  opacity: 0.8;
  margin: 0;
  font-weight: 400;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  color: #222;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);

  &:hover {
    background: #2563eb;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(37,99,235,0.2);
  }
`;

const AddAnnouncementCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: ${slideInLeft} 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AnnouncementForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  font-size: 1rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: #2563eb;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #fff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FilterButton = styled.button`
  padding: 12px 16px;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
  }
`;

const AnnouncementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const AnnouncementCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
`;

const AnnouncementHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const AnnouncementIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2);
`;

const AnnouncementInfo = styled.div`
  flex: 1;
`;

const AnnouncementTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const AnnouncementDate = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AnnouncementStatus = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 8px;
`;

const AnnouncementStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
`;

const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #2563eb;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 16px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInUp} 0.3s;
`;

const ModalCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: ${fadeInUp} 0.4s;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

const Announcement = ({ announcements: propAnnouncements }) => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useFlashMessage();
  const [modalAnnouncement, setModalAnnouncement] = useState(null);
  const navigate = useNavigate();

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      showError('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!propAnnouncements) {
      fetchAnnouncements();
    }
  }, [propAnnouncements]);

  const displayAnnouncements = propAnnouncements || announcements;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (announcement.trim() !== '') {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:4000/api/v1/announcements', {
          announcement: announcement,
        });
        console.log('Announcement sent:', response.data);
        showSuccess('Announcement sent successfully!');
        setAnnouncement('');
        fetchAnnouncements();
      } catch (error) {
        console.error('Error sending announcement:', error);
        showError('Error sending announcement');
      } finally {
        setLoading(false);
      }
    } else {
      showError('Please enter an announcement message');
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

  const filteredAnnouncements = displayAnnouncements.filter(announcement =>
    (announcement.announcement || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRandomStats = (index) => ({
    views: 45 + (index % 55),
    responses: 2 + (index % 8),
    priority: index % 3 === 0 ? 'High' : index % 3 === 1 ? 'Medium' : 'Low'
  });

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
            color: '#2563eb',
            fontSize: '1.1rem',
            letterSpacing: 0.5
          }}>
            Recent Announcements
          </div>
          <ActionButton onClick={handleAddAnnouncementClick}>
            <FaPlus size={12} />
            Add Announcement
          </ActionButton>
        </div>
        <AnnouncementsGrid>
          {displayAnnouncements.length > 0 ? (
            displayAnnouncements.slice(0, 3).map((announcement, index) => (
              <AnnouncementCard key={announcement._id} style={{ animationDelay: `${index * 0.1}s` }}>
                <AnnouncementHeader>
                  <AnnouncementIcon>
                    <FaBullhorn />
                  </AnnouncementIcon>
                  <AnnouncementInfo>
                    <AnnouncementTitle>{announcement.announcement}</AnnouncementTitle>
                    <AnnouncementDate>
                      <FaCalendarAlt size={12} />
                      {formatDate(announcement.createdAt || new Date())}
                    </AnnouncementDate>
                  </AnnouncementInfo>
                </AnnouncementHeader>
              </AnnouncementCard>
            ))
          ) : (
            <EmptyState>
              <EmptyStateIcon>
                <FaBullhorn />
              </EmptyStateIcon>
              <h3>No announcements yet</h3>
              <p>Start communicating with your community</p>
            </EmptyState>
          )}
        </AnnouncementsGrid>
        
        {displayAnnouncements.length > 3 && (
          <div 
            onClick={handleViewMoreClick}
            style={{ 
              textAlign: 'center', 
              marginTop: '16px', 
              color: '#2563eb', 
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
      <Sidebar />
      <Content>
        <AnnouncementContent>
          <HeaderSection>
            <div>
              <HeaderTitle>Communication Hub</HeaderTitle>
              <HeaderSubtitle>Keep everyone informed with important updates and announcements</HeaderSubtitle>
            </div>
            <QuickActions>
              <ActionButton onClick={() => document.getElementById('addAnnouncementForm')?.scrollIntoView({ behavior: 'smooth' })}>
                <FaPlus size={16} />
                Add Announcement
              </ActionButton>
            </QuickActions>
          </HeaderSection>

          <AddAnnouncementCard id="addAnnouncementForm">
            <CardTitle>
              <FaBullhorn />
              Send New Announcement
            </CardTitle>
            <AnnouncementForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label>
                  <FaBullhorn size={14} />
                  Announcement Message
                </Label>
                <TextArea
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  required
                  placeholder="Enter your announcement here..."
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Announcement'}
              </SubmitButton>
            </AnnouncementForm>
          </AddAnnouncementCard>

          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterButton>
              <FaFilter size={14} />
              Filter
            </FilterButton>
          </SearchBar>

          {loading && displayAnnouncements.length === 0 ? (
            <LoadingSpinner>
              <FaBullhorn style={{ marginRight: '8px' }} />
              Loading announcements...
            </LoadingSpinner>
          ) : filteredAnnouncements.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <FaBullhorn />
              </EmptyStateIcon>
              <h3>No announcements found</h3>
              <p>Try adjusting your search criteria or send a new announcement.</p>
            </EmptyState>
          ) : (
            <AnnouncementsGrid>
              {filteredAnnouncements.map((announcement, idx) => {
                const stats = getRandomStats(idx);
                return (
                  <AnnouncementCard
                    key={announcement._id || idx}
                    onClick={() => setModalAnnouncement({ ...announcement, ...stats })}
                  >
                    <AnnouncementHeader>
                      <AnnouncementIcon>
                        <FaBullhorn />
                      </AnnouncementIcon>
                      <AnnouncementInfo>
                        <AnnouncementTitle>{announcement.announcement || 'No content'}</AnnouncementTitle>
                        <AnnouncementDate>
                          <FaCalendarAlt size={12} />
                          {formatDate(announcement.createdAt || new Date())}
                        </AnnouncementDate>
                        <AnnouncementStatus>{stats.priority} Priority</AnnouncementStatus>
                      </AnnouncementInfo>
                    </AnnouncementHeader>
                    <AnnouncementStats>
                      <Stat>
                        <StatNumber>{stats.views}</StatNumber>
                        <StatLabel>Views</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.responses}</StatNumber>
                        <StatLabel>Responses</StatLabel>
                      </Stat>
                    </AnnouncementStats>
                  </AnnouncementCard>
                );
              })}
            </AnnouncementsGrid>
          )}

          {modalAnnouncement && (
            <ModalOverlay onClick={() => setModalAnnouncement(null)}>
              <ModalCard onClick={e => e.stopPropagation()}>
                <ModalClose onClick={() => setModalAnnouncement(null)}>&times;</ModalClose>
                <AnnouncementHeader>
                  <AnnouncementIcon style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                    <FaBullhorn />
                  </AnnouncementIcon>
                  <AnnouncementInfo>
                    <AnnouncementTitle style={{ fontSize: '1.3rem' }}>{modalAnnouncement.announcement || 'No content'}</AnnouncementTitle>
                    <AnnouncementDate style={{ fontSize: '1rem' }}>
                      <FaCalendarAlt size={14} />
                      {formatDate(modalAnnouncement.createdAt || new Date())}
                    </AnnouncementDate>
                    <AnnouncementStatus style={{ marginTop: '12px' }}>{modalAnnouncement.priority} Priority</AnnouncementStatus>
                  </AnnouncementInfo>
                </AnnouncementHeader>
                <AnnouncementStats style={{ marginTop: '24px' }}>
                  <Stat>
                    <StatNumber>{modalAnnouncement.views}</StatNumber>
                    <StatLabel>Total Views</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalAnnouncement.responses}</StatNumber>
                    <StatLabel>Responses Received</StatLabel>
                  </Stat>
                </AnnouncementStats>
              </ModalCard>
            </ModalOverlay>
          )}
        </AnnouncementContent>
      </Content>
    </AnnouncementContainer>
  );
};

export default Announcement;
