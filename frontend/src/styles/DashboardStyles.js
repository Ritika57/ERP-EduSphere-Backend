// AdminDashboardStyles.js
import styled from 'styled-components';

export const AdminDashboardContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px 24px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ${({ theme }) => theme.transition};
  background: ${({ theme }) => theme.background};
`;

export const TopContent = styled.div`
  display: flex;
  gap: 24px;
  flex: 1;
`;

export const BottomContent = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 24px;
`;

export const Section = styled.section`
  margin-bottom: 48px;
  flex: 1;
`;

export const TopPanel = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  align-items: flex-start;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const OverviewPanel = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 28px 24px 18px 24px;
  flex: 2;
  min-width: 320px;
  min-height: 260px;
`;

export const EventPanel = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 28px 24px 18px 24px;
  flex: 1.2;
  min-width: 260px;
`;

export const SectionTitle = styled.h2`
  font-size: 2.1rem;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  letter-spacing: -1px;
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
  transition: transform 0.25s ${({ theme }) => theme.transition}, box-shadow 0.25s ${({ theme }) => theme.transition};
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
    box-shadow: 0 8px 24px rgba(37,99,235,0.10);
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

export const StudentDashboardContainer = styled.div`
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

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorder};
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  transition: background 0.2s;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${({ theme }) => theme.inputBg};
  }
`;