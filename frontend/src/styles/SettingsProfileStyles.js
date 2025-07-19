// SettingsProfileStyles.js
import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; 
`;

export const Content = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
`;

export const ProfileCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(33,147,176,0.13);
  padding: 38px 36px 32px 36px;
  min-width: 340px;
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
  animation: fadeInProfileCard 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 1;
  @keyframes fadeInProfileCard {
    0% { opacity: 0; transform: translateY(30px) scale(0.97); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export const ProfileAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1976d2 60%, #6dd5ed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #fff;
  margin: 0 auto 18px auto;
  box-shadow: 0 2px 12px rgba(33,147,176,0.10);
`;

export const Divider = styled.div`
  width: 100%;
  height: 1.5px;
  background: linear-gradient(90deg, #e3f0ff 0%, #1976d2 100%);
  opacity: 0.18;
  margin: 24px 0 18px 0;
  border-radius: 2px;
`;

export const ProfileHeader = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1976d2;
  margin-bottom: 18px;
  text-align: center;
`;

export const ProfileDetails = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProfileLabel = styled.label`
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 2px;
`;

export const ProfileInfo = styled.p`
  margin-bottom: 10px;
  color: #222;
  font-size: 1.08rem;
`;

export const EditButton = styled.button`
  padding: 10px 22px;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.08rem;
  margin: 10px 8px 0 0;
  box-shadow: 0 2px 8px rgba(33,147,176,0.08);
  transition: background 0.18s, transform 0.13s;
  &:hover {
    background-color: #125ea6;
    transform: translateY(-2px) scale(1.04);
  }
  &:active {
    background-color: #0d3c6e;
    transform: scale(0.98);
  }
`;

export const ProfileDetail = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.span`
  font-weight: bold;
`;

export const Value = styled.span`
  margin-left: 10px;
`;
