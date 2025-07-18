// TeachersStyles.js
import styled, { keyframes } from 'styled-components';

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const TeachersContainer = styled.div`
  display: flex;
  
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

export const TeachersContent = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f7f9fb;
`;

export const TeachersHeader = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #222;
  letter-spacing: 1px;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 32px 28px 24px 28px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const AddTeacherForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 0;
  align-items: center;
`;

export const AddTeacherInput = styled.input`
  flex: 1 1 180px;
  min-width: 140px;
  padding: 10px 14px;
  border: 1.5px solid #e0e7ef;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7f9fb;
  transition: border 0.2s;
  &:focus {
    border-color: #1976d2;
    outline: none;
    background: #fff;
  }
`;

export const AddTeacherButton = styled.button`
  padding: 10px 22px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  transition: background 0.2s, transform 0.15s;
  &:hover {
    background: #125ea2;
    transform: translateY(-2px) scale(1.03);
  }
`;

export const TeacherListCard = styled(Card)`
  margin-top: 0;
`;

export const TeacherList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TeacherItem = styled.li`
  display: grid;
  grid-template-columns: 40px 1fr 160px 120px;
  align-items: center;
  background: #f9fafd;
  border-radius: 10px;
  padding: 12px 18px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.04);
  font-size: 1rem;
  font-weight: 500;
  color: #222;
  transition: box-shadow 0.2s, transform 0.15s;
  animation: ${fadeInUp} 0.4s;
  &:hover {
    box-shadow: 0 6px 18px rgba(25, 118, 210, 0.10);
    transform: translateY(-2px) scale(1.01);
    background: #f1f7ff;
  }
`;

export const TeacherAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e3eafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #1976d2;
  font-weight: 700;
`;

export const SubjectBadge = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 8px;
`;
