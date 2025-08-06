// AttendanceStyles.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: none; }
`;

export const AttendanceContainer = styled.div`
  display: flex;
  min-height: 100vh;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 40px 32px;
  margin-left: 250px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  animation: ${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  @media (max-width: 900px) {
    padding: 18px 2vw;
    margin-left: 0;
  }
`;

export const AttendanceContent = styled.div`
  padding: 20px;
  background: linear-gradient(120deg, #f0faff 0%, #e3f0ff 100%);
  border-radius: 18px;
`;

export const AttendanceHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const AttendanceList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AttendanceItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const StudentName = styled.span`
  flex: 1;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a237e;
  letter-spacing: 0.5px;
  margin-right: 18px;
`;

export const CheckboxLabel = styled.label`
  margin-right: 10px;
`;

export const Divider = styled.hr`
  margin-top: 5px;
  border: 0;
  border-top: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, transform 0.15s;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-2px) scale(1.03);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    animation: ${spin} 1s linear infinite;
  }
`;

// Card for each student
export const Card = styled.div`
  background: rgba(255,255,255,0.82);
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 38px 36px 32px 36px;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
  border: 2.5px solid transparent;
  background-clip: padding-box;
  overflow: hidden;
  transition: box-shadow 0.28s, transform 0.22s, border 0.22s;
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 22px;
    padding: 2.5px;
    background: linear-gradient(120deg, #6dd5ed 0%, #2193b0 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  backdrop-filter: blur(8px) saturate(1.15);
  &:hover {
    box-shadow: 0 16px 48px rgba(33,147,176,0.18);
    border: 2.5px solid #6dd5ed;
    transform: translateY(-4px) scale(1.012);
  }
`;

// Animated card entry
export const AnimatedCard = styled.div`
  animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.98);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

// Animated checkmark
export const AnimatedCheck = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 7px;
  animation: popIn 0.35s cubic-bezier(0.23, 1, 0.32, 1);
  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(-30deg);
    }
    80% {
      opacity: 1;
      transform: scale(1.15) rotate(8deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
`;

// Group for radio buttons
export const StatusGroup = styled.div`
  display: flex;
  gap: 18px;
  margin-left: 24px;
`;

// Custom radio button
export const StatusRadio = styled.input.attrs({ type: 'radio' })`
  accent-color: #007bff;
  margin-right: 6px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  transition: box-shadow 0.18s;
`;

export const StatusLabel = styled.label`
  font-size: 1.08rem;
  font-weight: 600;
  color: ${({ status }) =>
    status === 'Present' ? '#237a3b' :
    status === 'Absent' ? '#b71c1c' :
    status === 'Absent with apology' ? '#b26a00' : '#1a1a1a'};
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 8px;
  background: ${({ status }) =>
    status === 'Present' ? '#e8f5e9' :
    status === 'Absent' ? '#ffebee' :
    status === 'Absent with apology' ? '#fff8e1' : '#f7faff'};
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  margin-right: 6px;
  transition: background 0.18s, box-shadow 0.18s, color 0.18s;
  &:hover, &[aria-checked='true'] {
    background: ${({ status }) =>
      status === 'Present' ? '#c8e6c9' :
      status === 'Absent' ? '#ffcdd2' :
      status === 'Absent with apology' ? '#ffe0b2' : '#e3f0ff'};
    color: ${({ status }) =>
      status === 'Present' ? '#1b5e20' :
      status === 'Absent' ? '#b71c1c' :
      status === 'Absent with apology' ? '#b26a00' : '#007bff'};
    box-shadow: 0 2px 8px rgba(0,123,255,0.07);
  }
`;

// Soft background image
export const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
  opacity: 0.18;
  filter: blur(2.5px) brightness(1.08);
  pointer-events: none;
`;

// Loading spinner
export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  animation: spin 1s linear infinite;
  margin: 60px auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Message box for success/error
export const MessageBox = styled.div`
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 18px;
  color: ${({ success }) => (success ? '#155724' : '#721c24')};
  background: ${({ success }) => (success ? '#d4edda' : '#f8d7da')};
  border: 1px solid ${({ success }) => (success ? '#c3e6cb' : '#f5c6cb')};
  font-size: 1.08rem;
  font-weight: 500;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
`;

export const AttendanceDate = styled.div`
  font-size: 1.08rem;
  font-weight: 500;
  color: #1976d2;
  background: #e3f0ff;
  padding: 6px 18px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 18px;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.07);
`;

export const AttendanceStatus = styled.span`
  display: inline-block;
  font-size: 1.05rem;
  font-weight: 600;
  margin-left: 12px;
  padding: 4px 14px;
  border-radius: 6px;
  color: ${({ present }) => (present ? '#388e3c' : '#d32f2f')};
  background: ${({ present }) => (present ? '#e8f5e9' : '#ffebee')};
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`;


export const SidebarContainer = styled.div`
  flex: 0 0 auto; /* Flexible sidebar width */
`;