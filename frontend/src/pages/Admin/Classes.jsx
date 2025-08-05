// Classes.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaChalkboard, FaPlus, FaSearch, FaFilter, FaUsers, FaGraduationCap, FaBook } from 'react-icons/fa';
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

const ClassesContainer = styled.div`
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

const ClassesContent = styled.div`
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

const AddClassCard = styled.div`
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

const AddClassForm = styled.form`
  display: flex;
  gap: 16px;
  align-items: end;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;
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
  white-space: nowrap;

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

const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const ClassCard = styled.div`
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

const ClassHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const ClassIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
`;

const ClassInfo = styled.div`
  flex: 1;
`;

const ClassName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 4px 0;
`;

const ClassDescription = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
`;

const ClassBadge = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 8px;
`;

const ClassStats = styled.div`
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

const Classes = () => {
  const [newClassName, setNewClassName] = useState('');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useFlashMessage();
  const [modalClass, setModalClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.error('Error fetching classes: Invalid data format', response.data);
        showError('Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
      showError('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (newClassName.trim() !== '') {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:4000/api/v1/class', { grade: newClassName });
        setNewClassName('');
        showSuccess('Class added successfully!');
        
        // If the response includes the created class, add it to the list
        if (response.data.class) {
          setClasses(prevClasses => [...prevClasses, response.data.class]);
        } else {
          // Otherwise fetch the updated list
          await fetchClasses();
        }
      } catch (error) {
        console.error('Error adding class:', error);
        showError('Failed to add class');
      } finally {
        setLoading(false);
      }
    } else {
      showError('Please enter a class name');
    }
  };

  const filteredClasses = classes.filter(classItem =>
    (classItem.grade || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRandomStats = (index) => ({
    students: 15 + (index % 25),
    teachers: 2 + (index % 3),
    subjects: 6 + (index % 4)
  });

  return (
    <ClassesContainer>
      <Sidebar />
      <Content>
        <ClassesContent>
          <HeaderSection>
            <div>
              <HeaderTitle>Classes Management</HeaderTitle>
              <HeaderSubtitle>Organizing learning environments for academic excellence</HeaderSubtitle>
            </div>
            <QuickActions>
              <ActionButton onClick={() => document.getElementById('addClassForm')?.scrollIntoView({ behavior: 'smooth' })}>
                <FaPlus size={16} />
                Add Class
              </ActionButton>
            </QuickActions>
          </HeaderSection>

          <AddClassCard id="addClassForm">
            <CardTitle>
              <FaChalkboard />
              Add New Class
            </CardTitle>
            <AddClassForm onSubmit={handleAddClass}>
              <FormGroup>
                <Label>
                  <FaGraduationCap size={14} />
                  Class Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter class name (e.g., Grade 10A, Class 12B)"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Class'}
              </SubmitButton>
            </AddClassForm>
          </AddClassCard>

          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search classes by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterButton>
              <FaFilter size={14} />
              Filter
            </FilterButton>
          </SearchBar>

          {loading && classes.length === 0 ? (
            <LoadingSpinner>
              <FaChalkboard style={{ marginRight: '8px' }} />
              Loading classes...
            </LoadingSpinner>
          ) : filteredClasses.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <FaChalkboard />
              </EmptyStateIcon>
              <h3>No classes found</h3>
              <p>Try adjusting your search criteria or add a new class.</p>
            </EmptyState>
          ) : (
            <ClassesGrid>
              {filteredClasses.map((classItem, idx) => {
                const stats = getRandomStats(idx);
                return (
                  <ClassCard
                    key={classItem._id || classItem.id || idx}
                    onClick={() => setModalClass({ ...classItem, ...stats })}
                  >
                    <ClassHeader>
                      <ClassIcon>
                        <FaChalkboard />
                      </ClassIcon>
                      <ClassInfo>
                        <ClassName>{classItem.grade || 'Unnamed Class'}</ClassName>
                        <ClassDescription>Academic class for student learning</ClassDescription>
                        <ClassBadge>Active</ClassBadge>
                      </ClassInfo>
                    </ClassHeader>
                    <ClassStats>
                      <Stat>
                        <StatNumber>{stats.students}</StatNumber>
                        <StatLabel>Students</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.teachers}</StatNumber>
                        <StatLabel>Teachers</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.subjects}</StatNumber>
                        <StatLabel>Subjects</StatLabel>
                      </Stat>
                    </ClassStats>
                  </ClassCard>
                );
              })}
            </ClassesGrid>
          )}

          {modalClass && (
            <ModalOverlay onClick={() => setModalClass(null)}>
              <ModalCard onClick={e => e.stopPropagation()}>
                <ModalClose onClick={() => setModalClass(null)}>&times;</ModalClose>
                <ClassHeader>
                  <ClassIcon style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                    <FaChalkboard />
                  </ClassIcon>
                  <ClassInfo>
                    <ClassName style={{ fontSize: '1.5rem' }}>{modalClass.grade || 'Unnamed Class'}</ClassName>
                    <ClassDescription style={{ fontSize: '1rem' }}>Academic class for student learning</ClassDescription>
                    <ClassBadge style={{ marginTop: '12px' }}>Active</ClassBadge>
                  </ClassInfo>
                </ClassHeader>
                <ClassStats style={{ marginTop: '24px' }}>
                  <Stat>
                    <StatNumber>{modalClass.students}</StatNumber>
                    <StatLabel>Total Students</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalClass.teachers}</StatNumber>
                    <StatLabel>Assigned Teachers</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalClass.subjects}</StatNumber>
                    <StatLabel>Subjects Taught</StatLabel>
                  </Stat>
                </ClassStats>
              </ModalCard>
            </ModalOverlay>
          )}
        </ClassesContent>
      </Content>
    </ClassesContainer>
  );
};

export default Classes;
