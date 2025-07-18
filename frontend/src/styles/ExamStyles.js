// ExamStyles.js
import styled, { keyframes } from 'styled-components';
import { FaPlus, FaListAlt } from 'react-icons/fa';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: none; }
`;

export const ExamContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 40px 32px;
  margin-left: 250px;
  min-height: 100vh;
  background: #f7f9fc;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  animation: ${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  @media (max-width: 900px) {
    padding: 18px 2vw;
    margin-left: 0;
  }
`;

export const ERPCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10), 0 1.5px 8px rgba(0,0,0,0.04);
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  overflow: hidden;
  @media (max-width: 900px) {
    flex-direction: column;
    max-width: 100vw;
  }
`;

export const CardSection = styled.div`
  flex: 1;
  padding: 36px 32px 32px 32px;
  @media (max-width: 900px) {
    padding: 24px 12px;
  }
`;

export const VerticalDivider = styled.div`
  width: 1.5px;
  background: #e5e7eb;
  min-height: 420px;
  margin: 0 0;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 24px;
`;

export const IconContainer = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #10b98133, 0 2px 8px rgba(37,99,235,0.10);
`;

export const ExamCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10), 0 1.5px 8px rgba(0,0,0,0.04);
  padding: 32px 28px 28px 28px;
  min-width: 340px;
  max-width: 400px;
  width: 100%;
  animation: ${fadeInUp} 0.9s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  transition: box-shadow 0.3s, transform 0.3s;
  &:hover {
    box-shadow: 0 16px 48px #2563eb22, 0 4px 16px #10b98122;
    transform: translateY(-4px) scale(1.02);
  }
  @media (max-width: 900px) {
    min-width: 0;
    max-width: 100%;
    padding: 20px 8vw 18px 8vw;
  }
`;

export const DetailsCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10), 0 1.5px 8px rgba(0,0,0,0.04);
  padding: 32px 28px 28px 28px;
  flex: 1;
  min-width: 320px;
  animation: ${fadeInUp} 1.1s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  transition: box-shadow 0.3s, transform 0.3s;
  &:hover {
    box-shadow: 0 16px 48px #2563eb22, 0 4px 16px #10b98122;
    transform: translateY(-4px) scale(1.02);
  }
  @media (max-width: 900px) {
    min-width: 0;
    width: 100%;
    padding: 20px 8vw 18px 8vw;
  }
`;

export const AnimatedListItem = styled.li`
  margin-bottom: 10px;
  color: #333;
  font-size: 1.05rem;
  background: #f7faff;
  border-radius: 8px;
  padding: 10px 16px;
  box-shadow: 0 2px 8px #2563eb08;
  animation: ${fadeInUp} 0.7s cubic-bezier(.4,0,.2,1);
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Badge = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #2563eb 0%, #10b981 100%);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 2px 10px;
  margin-right: 8px;
`;

export const ExamHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ExamForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FormLabel = styled.label`
  font-size: 1.05rem;
  color: #222;
  margin-bottom: 2px;
`;

export const FormInput = styled.input`
  padding: 12px 14px;
  border: 1.5px solid #e0e7ef;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7faff;
  transition: border-color 0.25s, box-shadow 0.25s;
  outline: none;
  box-shadow: 0 0 0 0 rgba(37,99,235,0.10);
  margin-bottom: 2px;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #2563eb22;
    background: #fff;
  }
`;

export const AddButton = styled.button`
  padding: 12px 0;
  background: linear-gradient(90deg, #2563eb 0%, #10b981 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.08rem;
  font-weight: 700;
  box-shadow: 0 2px 8px #2563eb22;
  transition: background 0.25s, box-shadow 0.18s, transform 0.18s;
  &:hover {
    background: linear-gradient(90deg, #1d4ed8 0%, #38f9d7 100%);
    box-shadow: 0 8px 24px #10b98133, 0 4px 16px #2563eb22;
    transform: translateY(-2px) scale(1.04);
  }
`;

export const ExamResultsContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

export const ExamSubject = styled.h3`
  margin-bottom: 10px;
`;

export const ExamResult = styled.p`
  color: #555;
  margin-bottom: 10px;
`;

export const ExamChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px #2563eb08;
  animation: ${fadeInUp} 0.8s cubic-bezier(.4,0,.2,1);
`;

export const TableHead = styled.thead`
  background: linear-gradient(90deg, #2563eb 0%, #10b981 100%);
  color: #fff;
  font-size: 1.08rem;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f7faff;
  }
`;

export const TableCell = styled.td`
  padding: 10px 12px;
  text-align: left;
  color: #222;
  font-size: 1.05rem;
`;

export const TableHeaderCell = styled.th`
  padding: 12px 12px;
  text-align: left;
  font-weight: 700;
`;
