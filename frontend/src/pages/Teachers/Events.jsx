// EventSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { FaCalendarAlt, FaPlus, FaClock, FaMapMarkerAlt, FaUsers, FaBell } from 'react-icons/fa';
import { useTheme } from '../../App';

// Styled Components
const EventContainer = styled.div`
  display: flex;
  min-height: 100vh;
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

const Header = styled.div`
  margin-bottom: 32px;
  animation: fadeIn 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0;
  font-weight: 400;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.2rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  animation: fadeIn 0.6s ease-out 0.2s both;
`;

const PanelTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 20px 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #20bf6b, #0fb9b1);
    border-radius: 2px;
  }
`;

const AddEventForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: #f7fafc;
  color: #2d3748;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: white;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f7fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    background: white;
  }
`;

const EventIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
`;

const EventDetails = styled.div`
  flex: 1;
`;

const EventName = styled.div`
  font-weight: 600;
  color: #2d3748;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const EventDate = styled.div`
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  background: #fed7d7;
  border: 1px solid #feb2b2;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #718096;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme()?.theme || {};

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      setEvents(response.data.event || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to add a new event
  const addEvent = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setError('Please select a date for the event.');
      return;
    }
    if (!newEvent.trim()) {
      setError('Please enter an event description.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:4000/api/v1/events', {
        events: newEvent,
        date: selectedDate,
      });
      setEvents([...events, response.data.event]);
      setNewEvent('');
      setSelectedDate('');
      setError(null);
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error adding event');
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalEvents = events.length;
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= new Date();
  }).length;
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  }).length;

  return (
    <EventContainer>
      <Sidebar />
      <Content>
        <Header>
          <Title>Events & Calendar</Title>
          <Subtitle>Manage and schedule school events</Subtitle>
        </Header>

        {/* Statistics Cards */}
        <StatsGrid>
          <StatCard>
            <StatIcon>
              <FaCalendarAlt />
            </StatIcon>
            <StatNumber>{totalEvents}</StatNumber>
            <StatLabel>Total Events</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>
              <FaClock />
            </StatIcon>
            <StatNumber>{upcomingEvents}</StatNumber>
            <StatLabel>Upcoming Events</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>
              <FaBell />
            </StatIcon>
            <StatNumber>{todayEvents}</StatNumber>
            <StatLabel>Today's Events</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* Main Content */}
        <MainContent>
          {/* Add Event Panel */}
          <Panel>
            <PanelTitle>Add New Event</PanelTitle>
        <AddEventForm onSubmit={addEvent}>
              <FormGroup>
                <Label>Event Description</Label>
                <Input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
                  placeholder="Enter event description..."
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Event Date</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </FormGroup>
              
              <Button type="submit" disabled={loading}>
                <FaPlus />
                {loading ? 'Adding...' : 'Add Event'}
              </Button>
        </AddEventForm>
            
            {error && (
              <ErrorMessage>
                <FaBell />
                {error}
              </ErrorMessage>
            )}
          </Panel>

          {/* Events List Panel */}
          <Panel>
            <PanelTitle>All Events</PanelTitle>
            <EventList>
              {events.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>
                    <FaCalendarAlt />
                  </EmptyIcon>
                  <EmptyText>No events scheduled yet</EmptyText>
                </EmptyState>
              ) : (
                events.map((event, index) => (
                  <EventItem key={index}>
                    <EventIcon>
                      <FaCalendarAlt />
                    </EventIcon>
                    <EventDetails>
                      <EventName>{event.events}</EventName>
                      <EventDate>
                {event.date ? new Date(event.date).toLocaleDateString() : 'No date'}
                      </EventDate>
                    </EventDetails>
                  </EventItem>
                ))
              )}
            </EventList>
          </Panel>
        </MainContent>
      </Content>
    </EventContainer>
  );
};

export default EventSection;
