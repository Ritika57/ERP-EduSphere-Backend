import React, { useRef, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2'; 
import {
  ExamContainer,
  SidebarContainer,
  Content,
  ERPCard,
  CardSection,
  VerticalDivider,
  CardHeader,
  IconContainer,
  ExamCard,
  DetailsCard,
  Badge,
  ExamHeader,
  ExamResultsContainer,
  ExamSubject,
  ExamResult,
  ExamChartContainer,
} from '../../styles/ExamStyles'; 
import { FaChartBar, FaCheckCircle, FaGraduationCap, FaTrophy, FaArrowDown, FaBook, FaCalendarAlt } from 'react-icons/fa';
import 'chart.js/auto';
import axios from 'axios';

const getStats = (exams) => {
  if (!exams.length) return { total: 0, avg: 0, max: 0, min: 0 };
  const total = exams.length;
  const marksArr = exams.map(e => e.marks);
  const avg = Math.round(marksArr.reduce((a, b) => a + b, 0) / total);
  const max = Math.max(...marksArr);
  const min = Math.min(...marksArr);
  return { total, avg, max, min };
};

const StatCard = ({ icon, label, value, color, bg }) => (
  <div style={{
    flex: 1,
    minWidth: 140,
    background: bg,
    color: color,
    borderRadius: 16,
    padding: '24px 20px',
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
    fontWeight: 700,
    fontSize: '1rem',
    justifyContent: 'center',
  }}>
    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{label}</div>
  </div>
);

const ExamSection = () => {
  const chartRef = useRef(null);
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        if (!studentInfo || !studentInfo.email) {
          setExamResults([]);
          setLoading(false);
          return;
        }
        const response = await axios.get('/api/v1/exam/getall');
        const allExams = response.data.exams || [];
        const studentExams = allExams.filter(
          exam => exam.email && exam.email.trim().toLowerCase() === studentInfo.email.trim().toLowerCase()
        );
        setExamResults(studentExams);
      } catch (error) {
        setExamResults([]);
      }
      setLoading(false);
    };
    fetchExams();
  }, []);

  // Prepare data for chart
  const subjects = examResults.map(exam => exam.name);
  const results = examResults.map(exam => exam.marks);

  const barChartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Exam Results',
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
        borderWidth: 1,
        hoverBackgroundColor: '#10b981',
        hoverBorderColor: '#10b981',
        data: results
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        max: 100
      }
    }
  };

  const stats = getStats(examResults);

  return (
    <ExamContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        {/* Main Card - Compact Design */}
        <div style={{
          background: 'white',
          borderRadius: 24,
          boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
          padding: '32px',
          margin: '0 auto',
          maxWidth: 1200,
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#6d5ac3', marginBottom: 8, letterSpacing: -0.5 }}>Exam Results</h1>
            <div style={{ fontSize: 16, color: '#666', fontWeight: 500 }}>
              Track your exam performance and academic progress
            </div>
          </div>

          {/* Stat Cards - Compact */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
            <StatCard icon={<FaBook />} label="Total Exams" value={stats.total} color="#fff" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
            <StatCard icon={<FaChartBar />} label="Average Score" value={stats.avg + '%'} color="#fff" bg="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" />
            <StatCard icon={<FaTrophy />} label="Highest Score" value={stats.max + '%'} color="#fff" bg="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)" />
            <StatCard icon={<FaArrowDown />} label="Lowest Score" value={stats.min + '%'} color="#fff" bg="linear-gradient(135deg, #f857a6 0%, #ff5858 100%)" />
          </div>

          {/* Content Sections - Side by Side */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {/* Left Section - Exam Results */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '24px',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <FaGraduationCap size={20} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#374151', margin: 0 }}>Your Exam Results</h3>
                </div>
                
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    <div style={{ fontSize: 24, marginBottom: 16 }}>📚</div>
                    <div>Loading exam results...</div>
                  </div>
                ) : examResults.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 20px', 
                    color: '#666',
                    background: '#fff',
                    borderRadius: 12,
                    border: '2px dashed #e2e8f0'
                  }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                      No Exam Results Found
                    </div>
                    <div style={{ fontSize: 14, color: '#6b7280' }}>
                      Your exam results will appear here once they are available.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {examResults.map((exam, index) => (
                      <div key={index} style={{
                        background: '#fff',
                        borderRadius: 12,
                        padding: '16px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FaCheckCircle color="#10b981" size={16} />
                            <span style={{ fontWeight: 600, color: '#374151' }}>{exam.name}</span>
                          </div>
                          <div style={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
                            color: '#fff',
                            padding: '4px 12px',
                            borderRadius: 20,
                            fontSize: 14,
                            fontWeight: 600
                          }}>
                            {exam.marks}%
                          </div>
                        </div>
                        <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                          <div style={{ width: `${exam.marks}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)', borderRadius: 6, transition: 'width 0.5s' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Chart */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '24px',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <FaChartBar size={20} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#374151', margin: 0 }}>Results Chart</h3>
                </div>
                
                {examResults.length > 0 ? (
                  <div style={{ height: 300 }}>
                    <Bar
                      ref={chartRef}
                      data={barChartData}
                      options={chartOptions}
                    />
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '60px 20px', 
                    color: '#666',
                    background: '#fff',
                    borderRadius: 12
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
                    <div style={{ fontSize: 14, color: '#6b7280' }}>Chart will appear when exam results are available</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </ExamContainer>
  );
};

export default ExamSection;
