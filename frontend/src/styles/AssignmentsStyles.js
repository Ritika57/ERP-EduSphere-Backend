// AssignmentsStyles.js
import styled, { keyframes } from 'styled-components';

// Unique animations for Assignments page
export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(103, 58, 183, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(103, 58, 183, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(103, 58, 183, 0);
  }
`;

export const AssignmentsContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

export const AssignmentsContent = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const AssignmentsHeader = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

// Unique banner for Assignments
export const AssignmentBanner = styled.div`
  width: auto;
  max-width: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: #fff;
  margin-bottom: 24px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${bounceIn} 0.8s ease-out;
`;

export const BannerIcon = styled.div`
  font-size: 1.8rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BannerText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BannerTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  letter-spacing: 0.5px;
`;

export const BannerSubtitle = styled.div`
  font-size: 0.95rem;
  font-weight: 400;
  opacity: 0.9;
`;

// Card components
export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding: 32px 28px 24px 28px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  animation: ${bounceIn} 0.6s ease-out;
`;

export const AddAssignmentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 0;
`;

export const AddAssignmentInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e0e7ef;
  border-radius: 10px;
  font-size: 1rem;
  background: #f8fafc;
  transition: all 0.3s ease;
  &:focus {
    border-color: #667eea;
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const AddAssignmentTextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e0e7ef;
  border-radius: 10px;
  font-size: 1rem;
  background: #f8fafc;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s ease;
  &:focus {
    border-color: #667eea;
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const AddAssignmentButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const AssignmentListCard = styled(Card)`
  margin-top: 0;
`;

export const AssignmentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const AssignmentItem = styled.li`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
  animation: ${slideInRight} 0.5s ease-out;
  &:hover {
    transform: translateX(8px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  }
`;

export const AssignmentTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
`;

export const AssignmentDescription = styled.p`
  color: #4a5568;
  margin-bottom: 12px;
  line-height: 1.5;
`;

export const AssignmentMeta = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 12px;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
`;

export const GradeBadge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const DeadlineBadge = styled.span`
  background: #fed7d7;
  color: #c53030;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 0.9rem;
  font-weight: 600;
`;

// Keep existing exports for compatibility
export const AssignmentCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;

export const AssignmentButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export const AssignmentDoneMessage = styled.p`
  color: #28a745;
  font-weight: bold;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;
