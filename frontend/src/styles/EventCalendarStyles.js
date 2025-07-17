// EventCalendarStyles.js
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

export const EventCalendarContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px 40px;
  margin-left: 250px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
  overflow-y: auto;
`;

// Header Components
export const EventHeader = styled.div`
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

export const EventTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const EventSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0 0 16px 0;
  font-weight: 400;
`;

export const CurrentTime = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Calendar Container
export const CalendarContainer = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
`;

export const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

export const DateInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  outline: none;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

export const CalendarButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37,99,235,0.2);
  }
`;

// Event Statistics
export const EventStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
`;

export const StatItem = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
`;

export const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Events List
export const Events = styled.div`
  margin-top: 20px;
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EventCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
`;

export const EventIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const EventName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  margin-bottom: 4px;
`;

export const EventDate = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-weight: 500;
`;

export const EventTime = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`;

// Empty State
export const EmptyEvents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 2px dashed ${({ theme }) => theme.border};
`;

export const EmptyIcon = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.4;
  margin-bottom: 12px;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  font-size: 0.9rem;
  margin: 0;
`;

// Add Event Form
export const AddEventForm = styled.form`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const EventInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;
  margin-bottom: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
  }
`;

export const AddEventButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
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
  gap: 8px;
  box-shadow: 0 4px 16px rgba(37,99,235,0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37,99,235,0.3);
  }
`;

export const ErrorText = styled.p`
  color: #ef4444;
  background: #ef444420;
  border: 1px solid #ef444440;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Legacy components (keeping for compatibility)
export const Event = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
`;
