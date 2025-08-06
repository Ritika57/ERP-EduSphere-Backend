// AnnouncementStyles.js
import styled, { keyframes } from 'styled-components';

// Animations for Announcement page
export const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
`;

export const AnnouncementContainer = styled.div`

  min-height: 100vh;
 
  @media (max-width: 700px) {
    flex-direction: column;
    margin-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px 24px;
  @media (max-width: 700px) {
    margin-left: 0;
    padding: 24px 16px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

// Unique banner for Announcements
export const AnnouncementBanner = styled.div`
  width: 100%;
  max-width: 800px;
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
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  animation: ${bounceIn} 0.6s ease-out;
`;

export const AnnouncementForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #e0e7ef;
  border-radius: 10px;
  background: #f8fafc;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  font-family: inherit;
  &:focus {
    border-color: #667eea;
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const Button = styled.button`
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

export const AnnouncementListCard = styled(Card)`
  margin-top: 0;
`;

export const AnnouncementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const AnnouncementItem = styled.li`
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

export const AnnouncementContent = styled.p`
  font-size: 1rem;
  color: #2d3748;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
`;

export const AnnouncementMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  font-size: 0.9rem;
  color: #718096;
`;

export const AnnouncementDate = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const AnnouncementHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const AnnouncementTitle = styled.h3`
  margin-bottom: 10px;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

