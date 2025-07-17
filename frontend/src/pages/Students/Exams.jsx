import React, { useRef, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2'; 
import {
  ExamContainer,
  SidebarContainer,
  Content,
  ExamHeader,
  ExamResultsContainer,
  ExamSubject,
  ExamResult,
  ExamChartContainer,
} from '../../styles/ExamStyles'; 
import 'chart.js/auto';
import axios from 'axios';

const ExamSection = () => {
  console.log('ExamSection component loaded');
  const chartRef = useRef(null);
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect running');
    const fetchExams = async () => {
      setLoading(true);
      try {
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        console.log('Student info:', studentInfo);
        if (!studentInfo || !studentInfo.email) {
          console.log('No studentInfo or email');
          setExamResults([]);
          setLoading(false);
          return;
        }
        const response = await axios.get('/api/v1/exam/getall');
        console.log('Fetched exams:', response.data.exams);
        const allExams = response.data.exams || [];
        const studentExams = allExams.filter(
          exam => exam.email && exam.email.trim().toLowerCase() === studentInfo.email.trim().toLowerCase()
        );
        console.log('Filtered exams:', studentExams);
        setExamResults(studentExams);
      } catch (error) {
        console.error('Error in fetchExams:', error);
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
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderWidth: 1,
        hoverBackgroundColor: '#0056b3',
        hoverBorderColor: '#0056b3',
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

  return (
    <ExamContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ExamHeader>Exam Results</ExamHeader>
        <ExamResultsContainer>
          {loading ? (
            <div>Loading...</div>
          ) : examResults.length === 0 ? (
            <div>No exam results found.</div>
          ) : (
            <>
              {examResults.map((exam, index) => (
                <div key={index}>
                  <ExamSubject>{exam.name}</ExamSubject>
                  <ExamResult>Score: {exam.marks}%</ExamResult>
                </div>
              ))}
              <ExamChartContainer>
                <Bar
                  ref={chartRef}
                  data={barChartData}
                  options={chartOptions}
                />
              </ExamChartContainer>
            </>
          )}
        </ExamResultsContainer>
      </Content>
    </ExamContainer>
  );
};

export default ExamSection;
