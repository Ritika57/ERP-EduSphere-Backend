// Students.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaUserGraduate } from 'react-icons/fa';
import {
  StudentsContainer,
  Content,
  StudentsHeaderRow,
  StudentsHeaderIcon,
  StudentsHeader,
  AddStudentForm,
  AddStudentInput,
  AddStudentButton,
  StudentsListCard,
  StudentsListCardSubtitle,
  StudentList,
  StudentItem,
  StudentAvatar,
  GradeBadge,
} from '../../styles/StudentsStyles';
import { useFlashMessage } from '../../context/FlashMessageContext';

const Students = () => {
  const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', grade: '', email: '', password: '' });
  const [students, setStudents] = useState([]);
  const { showSuccess, showError } = useFlashMessage();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (
      newStudent.name.trim() !== '' &&
      newStudent.registrationNumber.trim() !== '' &&
      newStudent.grade.trim() !== '' &&
      newStudent.email.trim() !== '' &&
      newStudent.password.trim() !== ''
    ) {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/students', newStudent);
        setStudents([...students, response.data.student]);
        setNewStudent({ name: '', registrationNumber: '', grade: '', email: '', password: '' });
        showSuccess(response.data.message || 'Student added successfully!');
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error adding student. Please try again.';
        showError(errorMsg);
      }
    } else {
      showError('Please fill in all fields.');
    }
  };

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <div style={{ maxWidth: 600, width: '100%' }}>
          <StudentsHeaderRow>
            <StudentsHeaderIcon><FaUserGraduate /></StudentsHeaderIcon>
            <StudentsHeader>Students</StudentsHeader>
          </StudentsHeaderRow>
          <AddStudentForm onSubmit={handleAddStudent}>
            <AddStudentInput
              type="text"
              placeholder="Enter student name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <AddStudentInput
              type="text"
              placeholder="Enter registration number"
              value={newStudent.registrationNumber}
              onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
            />
            <AddStudentInput
              type="text"
              placeholder="Enter grade"
              value={newStudent.grade}
              onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
            />
            <AddStudentInput
              type="email"
              placeholder="Enter email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <AddStudentInput
              type="password"
              placeholder="Enter password"
              value={newStudent.password}
              onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            />
            <AddStudentButton type="submit">Add Student</AddStudentButton>
          </AddStudentForm>
          <StudentsListCard>
            <h3 style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#1976d2',
              margin: 0,
              marginBottom: 6,
              letterSpacing: 1
            }}>
              Students List
            </h3>
            <StudentsListCardSubtitle>
              All students currently registered
            </StudentsListCardSubtitle>
            <StudentList>
              {students.map((student, idx) => (
                <StudentItem key={student._id || student.id} style={{ gridTemplateColumns: '32px 1fr 160px 80px 56px' }}>
                  <StudentAvatar><FaUserGraduate /></StudentAvatar>
                  <span className="student-name">{student.name}</span>
                  <span style={{ color: '#555', fontWeight: 500, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.email}</span>
                  <span className="student-reg">{student.registrationNumber}</span>
                  <GradeBadge>{student.grade}</GradeBadge>
                </StudentItem>
              ))}
            </StudentList>
          </StudentsListCard>
        </div>
      </Content>
    </StudentsContainer>
  );
};

export default Students;
