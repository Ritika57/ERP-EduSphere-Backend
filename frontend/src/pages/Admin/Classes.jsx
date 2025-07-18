// Classes.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaChalkboard } from 'react-icons/fa';
import {
  ClassesContainer,
  Content,
  ClassesContent,
  ClassesHeader,
  ClassList,
  // ClassItem, // (not used)
  ClassCard,
  AddClassForm,
  AddClassInput,
  AddClassButton,
  ClassHeaderRow,
  ClassHeaderIcon,
  ClassIcon,
  MessageBox,
  ClassListCard
} from '../../styles/ClassesStyles';

const Classes = () => {
  const [newClassName, setNewClassName] = useState('');
  const [classes, setClasses] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.error('Error fetching classes: Invalid data format', response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (newClassName.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/class', { grade: newClassName });
        setClasses(prevClasses => {
          if (Array.isArray(prevClasses)) {
            return [...prevClasses, response.data];
          } else {
            return [];
          }
        });
        setNewClassName('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (error) {
        console.error('Error adding class:', error);
      }
    }
  };

  return (
    <ClassesContainer>
      <Sidebar />
      <Content>
        {showSuccess && (
          <MessageBox success style={{
            position: 'fixed',
            top: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            minWidth: 220,
            textAlign: 'center',
            fontWeight: 700
          }}>
            Class added successfully!
          </MessageBox>
        )}
        <ClassesContent>
          <ClassHeaderRow>
            <ClassHeaderIcon><FaChalkboard /></ClassHeaderIcon>
            <ClassesHeader>Classes</ClassesHeader>
          </ClassHeaderRow>
          {/* Placeholder for future success/error messages */}
          {/* <MessageBox success>Class added successfully!</MessageBox> */}
          <AddClassForm onSubmit={handleAddClass}>
            <AddClassInput
              type="text"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <AddClassButton type="submit">Add Class</AddClassButton>
          </AddClassForm>
          <div style={{ height: 18 }} />
          {/* Card for already added classes */}
          <ClassListCard>
            <h3 style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#1976d2',
              margin: 0,
              marginBottom: 18,
              letterSpacing: 1
            }}>
              Classes That Were Added
            </h3>
            <ClassList>
              {Array.isArray(classes) && classes.map((classItem, index) => (
                <ClassCard key={index}>
                  <ClassIcon><FaChalkboard /></ClassIcon>
                  {classItem.grade}
                </ClassCard>
              ))}
            </ClassList>
          </ClassListCard>
        </ClassesContent>
      </Content>
    </ClassesContainer>
  );
};

export default Classes;
