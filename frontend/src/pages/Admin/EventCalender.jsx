// EventCalendar.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  EventCalendarContainer,
  Content,
  CalendarContainer,
  Events,
  Event,
  AddEventForm,
  EventInput,
  AddEventButton,
  ErrorText,
  EventHeader,
  EventTitle,
  EventSubtitle,
  CurrentTime,
  DateSelector,
  DateInput,
  CalendarButton,
  EventList,
  EventCard,
  EventName,
  EventDate,
  EventTime,
  EventIcon,
  EmptyEvents,
  EmptyIcon,
  EmptyText,
  EventStats,
  StatItem,
  StatNumber,
  StatLabel,
} from '../../styles/EventCalendarStyles';
import { 
  FaRegCalendarAlt, 
  FaCalendarPlus, 
  FaClock, 
  FaMapMarkerAlt,
  FaInbox,
  FaStar,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useTheme } from '../../App';

const EventCalendar = ({ events: propEvents }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const theme = useTheme()?.theme || {};

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Only fetch events if not using propEvents
  useEffect(() => {
    if (!propEvents) {
      fetchEvents();
    }
  }, []);

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

  // Function to add a new event (only if not using propEvents)
  const addEvent = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setError('Please select a date for the event.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/v1/events', {
        events: newEvent,
        date: selectedDate,
      });
      setEvents([...events, response.data.event]);
      setNewEvent('');
      setSelectedDate('');
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error adding event');
      }
    }
  };

  // Use propEvents if provided, otherwise use local state
  const displayEvents = propEvents || events;

  // Calculate event statistics
  const totalEvents = displayEvents.length;
  const upcomingEvents = displayEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= new Date();
  }).length;
  const todayEvents = displayEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  }).length;

  // Format current time
  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // If this is being used as a standalone page (not in dashboard)
  if (!propEvents) {
    return (
      <EventCalendarContainer>
        <Sidebar />
        <Content>
          <EventHeader>
            <EventTitle>Events & Calendar</EventTitle>
            <EventSubtitle>Manage and schedule school events</EventSubtitle>
            <CurrentTime>Current Time: {formatTime(currentTime)}</CurrentTime>
          </EventHeader>

          <CalendarContainer>
            <DateSelector>
              <FaRegCalendarAlt size={20} />
              <DateInput
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
              <CalendarButton>Calendar</CalendarButton>
            </DateSelector>
            {selectedDate && (
              <div style={{ marginTop: 12, color: theme.primary, fontWeight: 500 }}>
                Selected Date: {new Date(selectedDate).toLocaleDateString()}
              </div>
            )}
          </CalendarContainer>

          <AddEventForm onSubmit={addEvent}>
            <h2>Add New Event</h2>
            <EventInput
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Enter Event Name"
            />
            <AddEventButton type="submit">Add Event</AddEventButton>
          </AddEventForm>

          {error && <ErrorText>{error}</ErrorText>}

          <Events>
            <h2>Events</h2>
            <EventList>
              {displayEvents.map((event, index) => (
                <EventCard key={index}>
                  <EventIcon>
                    <FaStar size={16} />
                  </EventIcon>
                  <div>
                    <EventName>{event.events}</EventName>
                    <EventDate>
                      {event.date ? new Date(event.date).toLocaleDateString() : 'No date'}
                    </EventDate>
                  </div>
                </EventCard>
              ))}
            </EventList>
          </Events>
        </Content>
      </EventCalendarContainer>
    );
  }

  // Dashboard version - simplified and beautiful
  return (
    <div>
      {/* Event Statistics */}
      <EventStats>
        <StatItem>
          <StatNumber>{totalEvents}</StatNumber>
          <StatLabel>Total Events</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{upcomingEvents}</StatNumber>
          <StatLabel>Upcoming</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{todayEvents}</StatNumber>
          <StatLabel>Today</StatLabel>
        </StatItem>
      </EventStats>

      {/* Current Time */}
      <CurrentTime style={{ marginBottom: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
        <FaClock size={14} style={{ marginRight: '6px' }} />
        {formatTime(currentTime)}
      </CurrentTime>

      {/* Events List */}
      <EventList>
        {displayEvents.length > 0 ? (
          displayEvents.slice(0, 5).map((event, index) => (
            <EventCard key={index}>
              <EventIcon style={{ 
                background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#4facfe', '#43e97b', '#ffecd2'][index % 5]}, ${['#764ba2', '#f5576c', '#00f2fe', '#38f9d7', '#fcb69f'][index % 5]})` 
              }}>
                <FaCalendarPlus size={14} color="white" />
              </EventIcon>
              <div style={{ flex: 1 }}>
                <EventName>{event.events}</EventName>
                <EventDate>
                  {event.date ? new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'No date'}
                </EventDate>
              </div>
            </EventCard>
          ))
        ) : (
          <EmptyEvents>
            <EmptyIcon>
              <FaInbox size={24} />
            </EmptyIcon>
            <EmptyText>No upcoming events</EmptyText>
          </EmptyEvents>
        )}
      </EventList>

      {/* Show more events indicator */}
      {displayEvents.length > 5 && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '16px', 
          color: theme.primary, 
          fontSize: '0.9rem',
          fontWeight: 500,
          cursor: 'pointer'
        }}>
          View {displayEvents.length - 5} more events
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
