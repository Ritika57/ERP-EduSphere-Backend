// PerformanceSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';
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

const PerformanceSection = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      setLoading(true);
      try {
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        console.log('Student info:', studentInfo);
        if (!studentInfo || !studentInfo.id) {
          setPerformanceData([]);
          setLoading(false);
          return;
        }
        const response = await axios.get('/api/v1/performance');
        const allPerformances = response.data || [];
        console.log('All performances:', allPerformances);
        // Filter for this student (student field may be an object or string)
        const studentPerformances = allPerformances.filter(
          perf => perf.email && perf.email.trim().toLowerCase() === studentInfo.email.trim().toLowerCase()
        );
        console.log('Student performances:', studentPerformances);
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
  const totalMarks = scores.reduce((sum, score) => sum + score, 0);

  const lineChartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Performance Trends',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        data: scores
      }
    ]
  };

  return (
    <PerformanceContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <PerformanceHeader>Performance</PerformanceHeader>
        <PerformanceInfo>
          <PerformanceGraphContainer>
            {loading ? (
              <div>Loading...</div>
            ) : performanceData.length === 0 ? (
              <div>No performance data found.</div>
            ) : (
              <Line
                data={lineChartData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            )}
          </PerformanceGraphContainer>
          <TotalMarks>Total Marks: {totalMarks}</TotalMarks>
        </PerformanceInfo>
      </Content>
    </PerformanceContainer>
  );
};

export default PerformanceSection;
