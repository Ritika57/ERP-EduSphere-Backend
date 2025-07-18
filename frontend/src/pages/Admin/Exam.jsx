// Exam.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  ExamContainer,
  SidebarContainer,
  Content,
  ExamHeader,
  ExamForm,
  FormLabel,
  FormInput,
  AddButton,
  ERPCard,
  CardSection,
  VerticalDivider,
  CardHeader,
  IconContainer,
  DetailsTable,
  TableHead,
  TableRow,
  TableCell,
  TableHeaderCell,
} from '../../styles/ExamStyles';
import { FaPlus, FaListAlt } from 'react-icons/fa';

const Exam = () => {
  const [examData, setExamData] = useState([]);
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [className, setClassName] = useState('');
  const [marks, setMarks] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/exam/getall');
      if (Array.isArray(response.data.exams)) {
        setExamData(response.data.exams);
      } else {
        setExamData([]);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
      setExamData([]);
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    const newExam = { name, registrationNumber, className, marks: parseInt(marks), email };
    try {
      const response = await axios.post('http://localhost:4000/api/v1/exam', newExam);
      if (response.data && response.data.exam) {
        setExamData([...examData, response.data.exam]);
        setName('');
        setRegistrationNumber('');
        setClassName('');
        setMarks('');
        setEmail('');
      } else {
        console.error('Error: API response does not contain exam');
      }
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  const calculateTotalMarks = () => {
    let total = 0;
    for (let i = 0; i < examData.length; i++) {
      total += examData[i].marks;
    }
    return total;
  };

  return (
    <ExamContainer>
      <Sidebar />
      <Content>
        <ERPCard>
          <CardSection>
            <CardHeader>
              <IconContainer><FaPlus size={20} color="#fff" /></IconContainer>
              Add Exam
            </CardHeader>
            <ExamForm onSubmit={handleAddExam}>
              <FormLabel>Subject:</FormLabel>
              <FormInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormLabel>Registration Number:</FormLabel>
              <FormInput
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
              />
              <FormLabel>Class:</FormLabel>
              <FormInput
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
              <FormLabel>Marks:</FormLabel>
              <FormInput
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />
              <FormLabel>Email:</FormLabel>
              <FormInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AddButton type="submit">Add Exam</AddButton>
            </ExamForm>
          </CardSection>
          <VerticalDivider />
          <CardSection>
            <CardHeader>
              <IconContainer><FaListAlt size={20} color="#fff" /></IconContainer>
              Exam Details
            </CardHeader>
            <h2 style={{marginTop: 0, color: '#2563eb'}}>Total Marks: <span style={{color: '#10b981'}}>{calculateTotalMarks()}</span></h2>
            <DetailsTable>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Subject</TableHeaderCell>
                  <TableHeaderCell>Reg. Number</TableHeaderCell>
                  <TableHeaderCell>Class</TableHeaderCell>
                  <TableHeaderCell>Marks</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                </TableRow>
              </TableHead>
              <tbody>
                {examData.map((exam, index) => (
                  <TableRow key={index}>
                    <TableCell>{exam.name}</TableCell>
                    <TableCell>{exam.registrationNumber}</TableCell>
                    <TableCell>{exam.className}</TableCell>
                    <TableCell style={{color: '#10b981', fontWeight: 700}}>{exam.marks}</TableCell>
                    <TableCell style={{color: '#2563eb'}}>{exam.email}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </DetailsTable>
          </CardSection>
        </ERPCard>
      </Content>
    </ExamContainer>
  );
};

export default Exam;
