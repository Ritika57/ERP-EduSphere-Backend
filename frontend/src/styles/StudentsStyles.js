// StudentsStyles.js
import styled from 'styled-components';

export const StudentsContainer = styled.div`
  display: flex;
 
`;

export const Content = styled.div`
  flex: 1;
  min-height: 100vh;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #f6f8fa;
  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

export const StudentsHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0;
  width: 100%;
  max-width: 520px;
`;

export const StudentsHeaderIcon = styled.div`
  font-size: 1.5rem;
  color: #1976d2;
  display: flex;
  align-items: center;
`;

export const StudentsHeader = styled.h2`
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

export const AddStudentForm = styled.form`
  margin-bottom: 32px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(33,147,176,0.07);
  border: 1.5px solid #e3e8ee;
  padding: 22px 22px 14px 22px;
  width: 100%;
  max-width: 520px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  align-items: center;
  animation: fadeInStudentCard 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 1;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    max-width: 98vw;
  }
`;

export const AddStudentInput = styled.input`
  padding: 10px 14px;
  font-size: 1rem;
  border: 1.5px solid #e3e8ee;
  border-radius: 6px;
  background: #f8fafc;
  transition: border 0.18s;
  width: 100%;
  &:focus {
    border-color: #1976d2;
    outline: none;
  }
`;

export const AddStudentButton = styled.button`
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
  grid-column: span 2;
  width: 100%;
  @media (max-width: 700px) {
    grid-column: span 1;
  }
  &:hover {
    background-color: #125ea6;
    transform: translateY(-1px) scale(1.02);
  }
  &:active {
    background-color: #0d3c6e;
    transform: scale(0.98);
  }
`;

export const StudentsListCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(33,147,176,0.07);
  border: 1.5px solid #e3e8ee;
  padding: 32px 32px 18px 32px;
  margin-bottom: 36px;
  margin-top: 18px;
  width: 100%;
  max-width: 520px;
  animation: fadeInStudentCard 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 1;
  @media (max-width: 700px) {
    max-width: 98vw;
    padding: 18px 6vw 12px 6vw;
  }
`;

export const StudentsListCardSubtitle = styled.div`
  color: #6b7280;
  font-size: 1.01rem;
  margin-bottom: 18px;
  margin-top: 2px;
`;

export const StudentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  z-index: 1;
`;

export const StudentItem = styled.li`
  background: #fff;
  border-radius: 6px;
  box-shadow: none;
  padding: 14px 0 14px 0;
  font-size: 1.08rem;
  color: #1976d2;
  font-weight: 600;
  display: grid;
  grid-template-columns: 32px 1fr 80px 56px;
  align-items: center;
  gap: 0 10px;
  border-bottom: 1.5px solid #e3e8ee;
  animation: fadeInStudentCard 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transition: background 0.18s;
  &:hover {
    background: #f6f8fa;
  }
  &:last-child {
    border-bottom: none;
  }
  .student-name {
    color: #222;
    font-weight: 700;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .student-reg {
    color: #888;
    font-weight: 500;
    text-align: right;
    min-width: 60px;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const StudentAvatar = styled.div`
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

export const GradeBadge = styled.span`
  background: #1976d2;
  color: #fff;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 12px;
`;
