// Performance.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import {
  PerformanceContainer,
  Content,
  PerformanceContent,
  PerformanceHeader,
  SchoolPerformance,
  IndividualPerformance,
} from '../../styles/PerformanceStyles'; 
import AddPerformanceForm from '../../components/AddPerformanceForm';

const Performance = () => {
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

  return (
    <PerformanceContainer>
      <Sidebar />
      <Content>
        <AddPerformanceForm onSuccess={fetchPerformance} />
        <PerformanceContent>
          <PerformanceHeader>School Performance</PerformanceHeader>
          <SchoolPerformance>
            <p>Average Score: {averageScore}</p>
            <p>Total Students: {totalStudents}</p>
          </SchoolPerformance>
          <PerformanceHeader>Individual Performance</PerformanceHeader>
          <IndividualPerformance>
            {performanceData.map((record) => (
              <p key={record._id}>
                {record.student?.name || record.student}: {record.score} {record.subject && `(${record.subject})`}
              </p>
            ))}
          </IndividualPerformance>
        </PerformanceContent>
      </Content>
    </PerformanceContainer>
  );
};

export default Performance;
