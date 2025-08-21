// PerformanceStyles.js
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

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const PerformanceContainer = styled.div``;

export const Content = styled.div`
  flex: 1;
  padding: 32px 40px;
  margin-left: 250px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
  overflow-y: auto;
`;

export const PerformanceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Header
export const PerformanceHeader = styled.div`
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.6s ease-out;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.text};
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    margin: 0;
    font-weight: 400;
  }
`;

// Stats Grid
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 28px 24px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
`;

export const StatInfo = styled.div`
  flex: 1;
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  line-height: 1;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-weight: 500;
`;

// Performance Grid
export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const PerformanceCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text};
    margin: 0 0 24px 0;
    display: flex;
    align-items: center;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
      border-radius: 2px;
    }
  }
`;

export const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Scrollable variant for long lists
export const ScrollableList = styled(StudentList)`
  max-height: 420px;
  overflow-y: auto;
  padding-right: 6px;

  /* nice scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border};
    border-radius: 8px;
  }
`;

export const StudentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
`;

export const StudentAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.accent}20);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
`;

export const StudentInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const StudentName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-width: 120px;
`;

export const StudentScore = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  font-size: 1.125rem;
  background: ${({ theme }) => theme.primary}10;
  padding: 4px 12px;
  border-radius: 8px;
`;

export const StudentSubject = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

export const SubjectBadge = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Performance Chart
export const PerformanceChart = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: ${fadeInUp} 0.6s ease-out 0.3s both;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text};
    margin: 0 0 24px 0;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
      border-radius: 2px;
    }
  }
`;

export const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  border: 2px dashed ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  font-size: 1.1rem;
`;

// Loading and Empty States
export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;

  svg {
    animation: ${spin} 1s linear infinite;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.4;
  margin-bottom: 16px;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  font-size: 1rem;
  margin: 0;
`;

// Legacy components (keeping for compatibility)
export const SchoolPerformance = styled.div`
  margin-bottom: 20px;
`;

export const IndividualPerformance = styled.div``;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

export const PerformanceInfo = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const PerformanceGraphContainer = styled.div`
  margin-bottom: 20px;
`;

export const TotalMarks = styled.div`
  font-weight: bold;
`;
