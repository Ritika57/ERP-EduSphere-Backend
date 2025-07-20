// PerformanceSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  PerformanceContainer,
  SidebarContainer,
  Content,
  PerformanceHeader,
  PerformanceInfo,
  PerformanceGraphContainer,
  TotalMarks,
} from '../../styles/PerformanceStyles';
import { FaChartLine, FaTrophy, FaBullseye, FaGraduationCap, FaBook, FaStar, FaAward } from 'react-icons/fa';
import 'chart.js/auto';

const getStats = (performances) => {
  if (!performances.length) return { total: 0, avg: 0, max: 0, min: 0, subjects: 0 };
  const total = performances.reduce((sum, perf) => sum + perf.score, 0);
  const avg = Math.round(total / performances.length);
  const scores = performances.map(p => p.score);
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const subjects = performances.length;
  return { total, avg, max, min, subjects };
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

const PerformanceSection = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      setLoading(true);
      try {
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        if (!studentInfo || !studentInfo.id) {
          setPerformanceData([]);
          setLoading(false);
          return;
        }
        const response = await axios.get('/api/v1/performance');
        const allPerformances = response.data || [];
        const studentPerformances = allPerformances.filter(
          perf => perf.student.email && perf.student.email.trim().toLowerCase() === studentInfo.email.trim().toLowerCase()
        );
        setPerformanceData(studentPerformances);
      } catch (error) {
        setPerformanceData([]);
      }
      setLoading(false);
    };
    fetchPerformance();
  }, []);

  const subjects = performanceData.map(perf => perf.subject);
  const scores = performanceData.map(perf => perf.score);
  const stats = getStats(performanceData);

  const lineChartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Performance Trends',
        fill: false,
        lineTension: 0.4,
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
        borderWidth: 3,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        data: scores
      }
    ]
  };

  const barChartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Subject Performance',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderColor: '#667eea',
        borderWidth: 1,
        hoverBackgroundColor: '#10b981',
        hoverBorderColor: '#10b981',
        data: scores
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9'
        },
        ticks: {
          color: '#64748b'
        }
      },
      x: {
        grid: {
          color: '#f1f5f9'
        },
        ticks: {
          color: '#64748b'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#374151',
          font: {
            size: 14,
            weight: '600'
          }
        }
      }
    }
  };

  return (
    <PerformanceContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        {/* Main Card - Compact Design */}
        <div style={{
          background: 'white',
          borderRadius: 24,
          boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
          padding: '24px',
          margin: '0 auto',
          maxWidth: 1600,
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#6d5ac3', marginBottom: 6, letterSpacing: -0.5 }}>Performance</h1>
            <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>
              Track your academic performance and progress across subjects
            </div>
          </div>

          {/* Stat Cards - Compact */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <StatCard icon={<FaBook />} label="Total Subjects" value={stats.subjects} color="#fff" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
            <StatCard icon={<FaTrophy />} label="Total Marks" value={stats.total} color="#fff" bg="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" />
            <StatCard icon={<FaBullseye />} label="Average Score" value={stats.avg} color="#fff" bg="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)" />
            <StatCard icon={<FaStar />} label="Highest Score" value={stats.max} color="#fff" bg="linear-gradient(135deg, #f857a6 0%, #ff5858 100%)" />
          </div>

          {/* Content Sections - Side by Side */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {/* Left Section - Performance Chart */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '20px',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}>
                    <FaChartLine size={18} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#374151', margin: 0 }}>Performance Trends</h3>
                </div>
                
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                    <div style={{ fontSize: 20, marginBottom: 12 }}>📊</div>
                    <div>Loading performance data...</div>
                  </div>
                ) : performanceData.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '30px 16px', 
                    color: '#666',
                    background: '#fff',
                    borderRadius: 12,
                    border: '2px dashed #e2e8f0'
                  }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📈</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#374151' }}>
                      No Performance Data Found
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Your performance data will appear here once available.
                    </div>
                  </div>
                ) : (
                  <div style={{ height: 300 }}>
                    <Line
                      data={lineChartData}
                      options={chartOptions}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Subject Performance */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '20px',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}>
                    <FaAward size={18} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#374151', margin: 0 }}>Subject Performance</h3>
                </div>
                
                {performanceData.length > 0 ? (
                  <div style={{ height: 300 }}>
                    <Bar
                      data={barChartData}
                      options={chartOptions}
                    />
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 16px', 
                    color: '#666',
                    background: '#fff',
                    borderRadius: 12
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Chart will appear when performance data is available</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Performance Details */}
          {performanceData.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}>
                    <FaGraduationCap size={18} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#374151', margin: 0 }}>Subject Details</h3>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {performanceData.map((perf, index) => (
                    <div key={index} style={{
                      background: '#fff',
                      borderRadius: 10,
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      flex: '1 1 200px',
                      minWidth: 200
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, color: '#374151', fontSize: 14 }}>{perf.subject}</span>
                        <div style={{
                          background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
                          color: '#fff',
                          padding: '3px 10px',
                          borderRadius: 16,
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {perf.score} marks
                        </div>
                      </div>
                      <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${(perf.score / Math.max(...scores)) * 100}%`, 
                          height: '100%', 
                          background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)', 
                          borderRadius: 4, 
                          transition: 'width 0.5s' 
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Content>
    </PerformanceContainer>
  );
};

export default PerformanceSection;
