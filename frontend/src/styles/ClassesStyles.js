// ClassesStyles.js
import styled from 'styled-components';

export const ClassesContainer = styled.div`
  display: flex;
  padding-left: 240px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #f6f8fa;
  position: relative;
  z-index: 1;
`;

export const ClassesContent = styled.div`
  padding: 32px 0 0 0;
  width: 100%;
  max-width: 520px;
`;

export const ClassesHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0;
  text-align: left;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 36px;
    height: 2px;
    background: #1976d2;
    border-radius: 2px;
    margin-top: 6px;
  }
`;

export const AddClassForm = styled.form`
  margin-bottom: 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(33,147,176,0.07);
  border: 1.5px solid #e3e8ee;
  padding: 22px 22px 14px 22px;
  display: flex;
  gap: 10px;
  align-items: center;
  animation: fadeInClassCard 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 1;
`;

export const AddClassInput = styled.input`
  padding: 10px 14px;
  font-size: 1rem;
  border: 1.5px solid #e3e8ee;
  border-radius: 6px;
  flex: 1;
  transition: border 0.18s;
  background: #f8fafc;
  &:focus {
    border-color: #1976d2;
    outline: none;
  }
`;

export const AddClassButton = styled.button`
  padding: 10px 22px;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: none;
  transition: background 0.18s, transform 0.13s;
  &:hover {
    background-color: #125ea6;
    transform: translateY(-1px) scale(1.02);
  }
  &:active {
    background-color: #0d3c6e;
    transform: scale(0.98);
  }
`;

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

export const ClassListCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(33,147,176,0.07);
  border: 1.5px solid #e3e8ee;
  padding: 22px 22px 10px 22px;
  margin-bottom: 32px;
  margin-top: 8px;
  animation: fadeInClassCard 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 1;
`;

export const ClassList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  z-index: 1;
`;

export const ClassCard = styled.li`
  background: #fff;
  border-radius: 8px;
  box-shadow: none;
  padding: 14px 0 14px 0;
  font-size: 1.08rem;
  color: #1976d2;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1.5px solid #e3e8ee;
  animation: fadeInClassCard 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transition: background 0.18s;
  &:hover {
    background: #f6f8fa;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const ClassIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #e3e8ee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #1976d2;
  margin-right: 8px;
  box-shadow: none;
`;

export const ClassItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ClassContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */
`;

export const ClassHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const GradeHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ClassHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
`;

export const ClassHeaderIcon = styled.div`
  font-size: 1.5rem;
  color: #1976d2;
  display: flex;
  align-items: center;
`;
