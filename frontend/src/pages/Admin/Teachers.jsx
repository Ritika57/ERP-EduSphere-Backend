// Teachers.js
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaChalkboardTeacher, FaPlus, FaFilter } from 'react-icons/fa';
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



const TeachersContainer = styled.div`
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

const TeachersContent = styled.div`
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

const AddTeacherCard = styled.div`
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

const AddTeacherForm = styled.form`
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

const TeachersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const TeacherCard = styled.div`
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

const TeacherHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const TeacherAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
`;

const TeacherInfo = styled.div`
  flex: 1;
`;

const TeacherName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 4px 0;
`;

const TeacherEmail = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
`;

const TeacherSubject = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 8px;
`;

const TeacherStats = styled.div`
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

const Teachers = () => {
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    subject: '',
    password: ''
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showError, showSuccess } = useFlashMessage();
  const [modalTeacher, setModalTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/teachers/getall');
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      showError('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (newTeacher.name.trim() !== '' && newTeacher.email.trim() !== '' && newTeacher.subject.trim() !== '' && newTeacher.password.trim() !== '') {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:4000/api/v1/teachers', newTeacher);
        if (response.data.success && response.data.teacher) {
          setTeachers([...teachers, response.data.teacher]);
          setNewTeacher({ name: '', email: '', subject: '', password: '' });
          showSuccess(response.data.message || 'Teacher added successfully!');
        } else {
          showError('Failed to add teacher');
        }
      } catch (error) {
        console.error('Error adding teacher:', error);
        showError(error.response?.data?.message || 'Failed to add teacher');
      } finally {
        setLoading(false);
      }
    } else {
      showError('Please fill all fields');
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRandomStats = (index) => ({
    experience: 3 + (index % 8),
    classes: 8 + (index % 12),
    students: 25 + (index % 50)
  });

  return (
    <TeachersContainer>
      <Sidebar />
      <Content>
        <TeachersContent>
          <HeaderSection>
            <div>
              <HeaderTitle>Teachers Management</HeaderTitle>
              <HeaderSubtitle>Empowering educators to inspire the next generation</HeaderSubtitle>
            </div>
            <QuickActions>
              <ActionButton onClick={() => document.getElementById('addTeacherForm')?.scrollIntoView({ behavior: 'smooth' })}>
                <FaPlus size={16} />
                Add Teacher
              </ActionButton>
            </QuickActions>
          </HeaderSection>

          <AddTeacherCard id="addTeacherForm">
            <CardTitle>
              <FaChalkboardTeacher />
              Add New Teacher
            </CardTitle>
            <AddTeacherForm onSubmit={handleAddTeacher}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  placeholder="Enter teacher's full name"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="Enter teacher's email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Subject</Label>
                <Input
                  type="text"
                  placeholder="Enter subject taught"
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={newTeacher.password}
                  onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Teacher'}
              </SubmitButton>
            </AddTeacherForm>
          </AddTeacherCard>

          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search teachers by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterButton>
              <FaFilter size={14} />
              Filter
            </FilterButton>
          </SearchBar>

          {loading && teachers.length === 0 ? (
            <LoadingSpinner>
              <FaChalkboardTeacher style={{ marginRight: '8px' }} />
              Loading teachers...
            </LoadingSpinner>
          ) : filteredTeachers.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <FaChalkboardTeacher />
              </EmptyStateIcon>
              <h3>No teachers found</h3>
              <p>Try adjusting your search criteria or add a new teacher.</p>
            </EmptyState>
          ) : (
            <TeachersGrid>
              {filteredTeachers.map((teacher, idx) => {
                const stats = getRandomStats(idx);
                return (
                  <TeacherCard
                    key={teacher._id || teacher.id}
                    onClick={() => setModalTeacher({ ...teacher, ...stats })}
                  >
                    <TeacherHeader>
                      <TeacherAvatar>
                        <FaChalkboardTeacher />
                      </TeacherAvatar>
                      <TeacherInfo>
                        <TeacherName>{teacher.name}</TeacherName>
                        <TeacherEmail>{teacher.email}</TeacherEmail>
                        <TeacherSubject>{teacher.subject}</TeacherSubject>
                      </TeacherInfo>
                    </TeacherHeader>
                    {/* <TeacherStats>
                      <Stat>
                        <StatNumber>{stats.experience}</StatNumber>
                        <StatLabel>Years Exp.</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.classes}</StatNumber>
                        <StatLabel>Classes</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.students}</StatNumber>
                        <StatLabel>Students</StatLabel>
                      </Stat>
                    </TeacherStats> */}
                  </TeacherCard>
                );
              })}
            </TeachersGrid>
          )}

          {modalTeacher && (
            <ModalOverlay onClick={() => setModalTeacher(null)}>
              <ModalCard onClick={e => e.stopPropagation()}>
                <ModalClose onClick={() => setModalTeacher(null)}>&times;</ModalClose>
                <TeacherHeader>
                  <TeacherAvatar style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                    <FaChalkboardTeacher />
                  </TeacherAvatar>
                  <TeacherInfo>
                    <TeacherName style={{ fontSize: '1.5rem' }}>{modalTeacher.name}</TeacherName>
                    <TeacherEmail style={{ fontSize: '1rem' }}>{modalTeacher.email}</TeacherEmail>
                    <TeacherSubject style={{ marginTop: '12px' }}>{modalTeacher.subject}</TeacherSubject>
                  </TeacherInfo>
                </TeacherHeader>
                {/* <TeacherStats style={{ marginTop: '24px' }}>
                  <Stat>
                    <StatNumber>{modalTeacher.experience}</StatNumber>
                    <StatLabel>Years Experience</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalTeacher.classes}</StatNumber>
                    <StatLabel>Classes Taught</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalTeacher.students}</StatNumber>
                    <StatLabel>Students</StatLabel>
                  </Stat>
                </TeacherStats> */}
              </ModalCard>
            </ModalOverlay>
          )}
        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default Teachers;
