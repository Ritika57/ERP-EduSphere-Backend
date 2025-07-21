// AdminDashboardStyles.js
import styled, { keyframes } from "styled-components";

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

export const AdminDashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px 20px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 700px) {
    padding: 20px 12px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 8px;
  }
`;

// Welcome Section
export const WelcomeSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 32px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}15 0%,
    ${({ theme }) => theme.accent}15 100%
  );
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  animation: ${fadeInUp} 0.6s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

export const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0 0 8px 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0;
  font-weight: 400;
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
  }
`;

// Stats Grid
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 28px 24px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.accent}
    );
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 8px;
`;

export const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ positive }) => (positive ? "#10b981" : "#ef4444")};
`;

// Main Content Panels
export const TopPanel = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  align-items: flex-start;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const BottomContent = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const OverviewPanel = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.border};
  padding: 32px;
  flex: 1;
  min-height: 400px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
`;

export const EventPanel = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.border};
  padding: 32px;
  flex: 1;
  min-height: 400px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  letter-spacing: -0.5px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.accent}
    );
    border-radius: 2px;
  }
`;

// Metric Cards
export const MetricCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const MetricIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  line-height: 1;
  margin-bottom: 4px;
`;

export const MetricLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-weight: 500;
`;

// Legacy components (keeping for compatibility)
export const TopContent = styled.div`
  display: flex;
  gap: 24px;
  flex: 1;
`;

export const Section = styled.section`
  margin-bottom: 48px;
  flex: 1;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  max-width: 820px;
  margin: 32px auto 0 auto;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 18px;
    margin-top: 18px;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 20px 16px;
  border-radius: 22px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.25s ${({ theme }) => theme.transition},
    box-shadow 0.25s ${({ theme }) => theme.transition};
  cursor: pointer;
  flex: 1 1 220px;
  max-width: 240px;
  min-width: 180px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.1);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.15rem;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
`;

export const CardContent = styled.p`
  font-size: 2.1rem;
  color: ${({ theme }) => theme.text};
  font-weight: 800;
  margin-top: 8px;
`;

// Additional components for future use
export const RecentActivity = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`;

export const PerformanceChart = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`;

// Legacy containers
export const StudentDashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
`;

export const TeacherDashboardContainer = styled.div`
  display: flex;
  padding-left: 240px;
  background: ${({ theme }) => theme.background};
`;

export const ActivityPanel = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 20px 18px 10px 18px;
  margin-bottom: 32px;
`;
