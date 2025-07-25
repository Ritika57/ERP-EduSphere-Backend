// CheckPerformanceSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { PerformanceContainer, Content, PerformanceContent, PerformanceHeader, SchoolPerformance, IndividualPerformance } 
from '../../styles/PerformanceStyles'; 
import AddPerformanceForm from '../../components/AddPerformanceForm';
import styled, { keyframes } from 'styled-components';

const CheckPerformanceSection = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPerformance = () => {
    setLoading(true);
    fetch('/api/v1/performance')
      .then(res => res.json())
      .then(data => {
        setPerformanceData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  // Calculate school performance
  const totalStudents = performanceData.length;
  const averageScore = totalStudents > 0 ? (performanceData.reduce((sum, p) => sum + p.score, 0) / totalStudents).toFixed(2) : 0;

  if (loading) return <div>Loading...</div>;

  // Glassmorphism and animation for performance cards
  const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const AnimatedBg = styled.div`
    position: absolute;
    bottom: -80px;
    right: -80px;
    width: 340px;
    height: 340px;
    z-index: 0;
    filter: blur(60px);
    opacity: 0.6;
    background: radial-gradient(circle at 60% 40%, ${({ theme }) => theme.accent}99 0%, ${({ theme }) => theme.primary}66 60%, transparent 100%);
    animation: floatBg 7s ease-in-out infinite alternate;
    @keyframes floatBg {
      0% { transform: scale(1) translateY(0) translateX(0); }
      100% { transform: scale(1.1) translateY(-30px) translateX(-40px); }
    }
  `;

  const GlassCard = styled.div`
    background: rgba(255,255,255,0.18);
    box-shadow: 0 8px 40px 0 rgba(37,99,235,0.13), 0 1.5px 8px rgba(0,0,0,0.04);
    backdrop-filter: blur(14px) saturate(1.1);
    border: 2px solid rgba(255,255,255,0.18);
    border-radius: 22px;
    padding: 36px 32px 28px 32px;
    margin-bottom: 36px;
    position: relative;
    z-index: 1;
    animation: ${fadeInUp} 0.7s cubic-bezier(.4,2,.6,1);
  `;

  const AnimatedHeader = styled(PerformanceHeader)`
    margin-bottom: 28px;
    h1, & {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0;
    }
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
      border-radius: 2px;
      margin-top: 8px;
    }
  `;

  const SchoolStats = styled.div`
    display: flex;
    gap: 32px;
    align-items: center;
    margin-bottom: 18px;
  `;

  const StatBox = styled.div`
    background: rgba(255,255,255,0.22);
    border-radius: 16px;
    padding: 18px 32px;
    font-size: 1.18rem;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 2px 12px ${({ theme }) => theme.primary}22;
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  const IndividualList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-height: 350px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.accent}33 ${({ theme }) => theme.card};

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 8px;
      background: ${({ theme }) => theme.card};
    }
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, ${({ theme }) => theme.primary}33, ${({ theme }) => theme.accent}66);
      border-radius: 8px;
    }
  `;

  const PerfItem = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    background: rgba(255,255,255,0.13);
    border-radius: 14px;
    padding: 16px 22px;
    box-shadow: 0 2px 8px ${({ theme }) => theme.accent}18;
    animation: ${fadeInUp} 0.5s cubic-bezier(.4,2,.6,1);
  `;

  const Avatar = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}22, ${({ theme }) => theme.accent}22);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
  `;

  const Name = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    font-size: 1.05rem;
    min-width: 120px;
  `;

  const Score = styled.div`
    font-weight: 800;
    color: ${({ theme }) => theme.accent};
    font-size: 1.18rem;
    background: ${({ theme }) => theme.accent}18;
    padding: 4px 16px;
    border-radius: 8px;
    box-shadow: 0 1px 6px ${({ theme }) => theme.accent}22;
  `;

  const SubjectBadge = styled.span`
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;

  return (
    <PerformanceContainer>
      <Sidebar />
      <Content>
        <AddPerformanceForm onSuccess={fetchPerformance} />
        <PerformanceContent style={{ position: 'relative' }}>
          <AnimatedBg />
          <GlassCard>
            <AnimatedHeader>School Performance</AnimatedHeader>
            <SchoolStats>
              <StatBox>Average Score: {averageScore}</StatBox>
              <StatBox>Total Students: {totalStudents}</StatBox>
            </SchoolStats>
          </GlassCard>
          <GlassCard>
            <AnimatedHeader>Individual Performance</AnimatedHeader>
            <IndividualList>
              {performanceData.map((record) => (
                <PerfItem key={record._id}>
                  <Avatar>{(record.student?.name || record.student || '?').charAt(0).toUpperCase()}</Avatar>
                  <Name>{record.student?.name || record.student}</Name>
                  <Score>{record.score}</Score>
                  {record.subject && <SubjectBadge>{record.subject}</SubjectBadge>}
                </PerfItem>
              ))}
            </IndividualList>
          </GlassCard>
        </PerformanceContent>
      </Content>
    </PerformanceContainer>
  );
};

export default CheckPerformanceSection;
