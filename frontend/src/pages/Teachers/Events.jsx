// EventSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { EventCalendarContainer, Content, CalendarContainer, Events, Event, AddEventForm, EventInput, AddEventButton, ErrorText } 
from '../../styles/EventCalendarStyles'; 

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState(null);

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
    }
  };

  return (
    <EventCalendarContainer>
      <Sidebar />
      <Content>
        <h1>Events & Calendar</h1>
        <div>Current Time: {new Date().toLocaleString()}</div>
        <CalendarContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{ marginLeft: 4 }}
            />
            <span style={{ marginLeft: 8 }}>Calendar</span>
          </div>
          {selectedDate && (
            <div style={{ marginTop: 8 }}>Selected Date: {selectedDate}</div>
          )}
        </CalendarContainer>
        <AddEventForm onSubmit={addEvent}>
          <h2>Add New Event</h2>
          <EventInput
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Enter Event"
          />
          <AddEventButton type="submit">Add Event</AddEventButton>
        </AddEventForm>
        {error && <ErrorText>{error}</ErrorText>}
        <Events>
          <h2>Events</h2>
          {events.map((event, index) => (
            <Event key={index}>
              <div><strong>{event.events}</strong></div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>
                {event.date ? new Date(event.date).toLocaleDateString() : 'No date'}
              </div>
            </Event>
          ))}
        </Events>
      </Content>
    </EventCalendarContainer>
  );
};
export default EventSection;
