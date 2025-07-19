// Students.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaUserGraduate, FaPlus, FaSearch, FaFilter, FaGraduationCap, FaIdCard, FaEnvelope } from 'react-icons/fa';
import { useFlashMessage } from '../../context/FlashMessageContext';
import styled, { keyframes } from 'styled-components';

// Modern styled components with theme support
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const StudentsContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 32px 40px;
  margin-left: 250px;
  background: #f3f4f8;
  min-height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 700px) {
    margin-left: 0;
    padding: 20px 16px;
  }
`;

const StudentsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 32px;
  background: linear-gradient(135deg, #2563eb15 0%, #10b98115 100%);
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  animation: ${fadeInUp} 0.6s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #222;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #2563eb, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: #222;
  opacity: 0.8;
  margin: 0;
  font-weight: 400;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  color: #222;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);

  &:hover {
    background: #2563eb;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(37,99,235,0.2);
  }
`;

const AddStudentCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: ${slideInLeft} 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddStudentForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  align-items: end;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #f9fafb;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #fff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FilterButton = styled.button`
  padding: 12px 16px;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
  }
`;

const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StudentCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
`;

const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const StudentAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 4px 0;
`;

const StudentEmail = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StudentRegNumber = styled.div`
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 8px;
`;

const StudentGrade = styled.div`
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 8px;
  margin-left: 8px;
`;

const StudentStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
`;

const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #2563eb;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 16px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInUp} 0.3s;
`;

const ModalCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: ${fadeInUp} 0.4s;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

const Students = () => {
  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    registrationNumber: '', 
    grade: '', 
    email: '', 
    password: '' 
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useFlashMessage();
  const [modalStudent, setModalStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
      showError('Failed to fetch students');
    } finally {
      setLoading(false);
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
        setLoading(true);
        const response = await axios.post('http://localhost:4000/api/v1/students', newStudent);
        setStudents([...students, response.data.student]);
        setNewStudent({ name: '', registrationNumber: '', grade: '', email: '', password: '' });
        showSuccess(response.data.message || 'Student added successfully!');
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error adding student. Please try again.';
        showError(errorMsg);
      } finally {
        setLoading(false);
      }
    } else {
      showError('Please fill in all fields.');
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRandomStats = (index) => ({
    attendance: 85 + (index % 15),
    assignments: 12 + (index % 8),
    performance: 78 + (index % 22)
  });

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <HeaderSection>
            <div>
              <HeaderTitle>Students Management</HeaderTitle>
              <HeaderSubtitle>Nurturing the future leaders of tomorrow</HeaderSubtitle>
            </div>
            <QuickActions>
              <ActionButton onClick={() => document.getElementById('addStudentForm')?.scrollIntoView({ behavior: 'smooth' })}>
                <FaPlus size={16} />
                Add Student
              </ActionButton>
            </QuickActions>
          </HeaderSection>

          <AddStudentCard id="addStudentForm">
            <CardTitle>
              <FaUserGraduate />
              Add New Student
            </CardTitle>
            <AddStudentForm onSubmit={handleAddStudent}>
              <FormGroup>
                <Label>
                  <FaUserGraduate size={14} />
                  Full Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter student's full name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  <FaIdCard size={14} />
                  Registration Number
                </Label>
                <Input
                  type="text"
                  placeholder="Enter registration number"
                  value={newStudent.registrationNumber}
                  onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  <FaGraduationCap size={14} />
                  Grade
                </Label>
                <Input
                  type="text"
                  placeholder="Enter grade/class"
                  value={newStudent.grade}
                  onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  <FaEnvelope size={14} />
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="Enter student's email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Student'}
              </SubmitButton>
            </AddStudentForm>
          </AddStudentCard>

          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search students by name, email, registration number, or grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterButton>
              <FaFilter size={14} />
              Filter
            </FilterButton>
          </SearchBar>

          {loading && students.length === 0 ? (
            <LoadingSpinner>
              <FaUserGraduate style={{ marginRight: '8px' }} />
              Loading students...
            </LoadingSpinner>
          ) : filteredStudents.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <FaUserGraduate />
              </EmptyStateIcon>
              <h3>No students found</h3>
              <p>Try adjusting your search criteria or add a new student.</p>
            </EmptyState>
          ) : (
            <StudentsGrid>
              {filteredStudents.map((student, idx) => {
                const stats = getRandomStats(idx);
                return (
                  <StudentCard
                    key={student._id || student.id}
                    onClick={() => setModalStudent({ ...student, ...stats })}
                  >
                    <StudentHeader>
                      <StudentAvatar>
                        <FaUserGraduate />
                      </StudentAvatar>
                      <StudentInfo>
                        <StudentName>{student.name}</StudentName>
                        <StudentEmail>
                          <FaEnvelope size={12} />
                          {student.email}
                        </StudentEmail>
                        <div style={{ marginTop: '8px' }}>
                          <StudentRegNumber>{student.registrationNumber}</StudentRegNumber>
                          <StudentGrade>{student.grade}</StudentGrade>
                        </div>
                      </StudentInfo>
                    </StudentHeader>
                    <StudentStats>
                      <Stat>
                        <StatNumber>{stats.attendance}%</StatNumber>
                        <StatLabel>Attendance</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.assignments}</StatNumber>
                        <StatLabel>Assignments</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.performance}%</StatNumber>
                        <StatLabel>Performance</StatLabel>
                      </Stat>
                    </StudentStats>
                  </StudentCard>
                );
              })}
            </StudentsGrid>
          )}

          {modalStudent && (
            <ModalOverlay onClick={() => setModalStudent(null)}>
              <ModalCard onClick={e => e.stopPropagation()}>
                <ModalClose onClick={() => setModalStudent(null)}>&times;</ModalClose>
                <StudentHeader>
                  <StudentAvatar style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                    <FaUserGraduate />
                  </StudentAvatar>
                  <StudentInfo>
                    <StudentName style={{ fontSize: '1.5rem' }}>{modalStudent.name}</StudentName>
                    <StudentEmail style={{ fontSize: '1rem' }}>
                      <FaEnvelope size={14} />
                      {modalStudent.email}
                    </StudentEmail>
                    <div style={{ marginTop: '12px' }}>
                      <StudentRegNumber>{modalStudent.registrationNumber}</StudentRegNumber>
                      <StudentGrade>{modalStudent.grade}</StudentGrade>
                    </div>
                  </StudentInfo>
                </StudentHeader>
                <StudentStats style={{ marginTop: '24px' }}>
                  <Stat>
                    <StatNumber>{modalStudent.attendance}%</StatNumber>
                    <StatLabel>Attendance Rate</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalStudent.assignments}</StatNumber>
                    <StatLabel>Assignments Completed</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalStudent.performance}%</StatNumber>
                    <StatLabel>Overall Performance</StatLabel>
                  </Stat>
                </StudentStats>
              </ModalCard>
            </ModalOverlay>
          )}
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default Students;
