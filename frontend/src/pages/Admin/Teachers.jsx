// Teachers.js
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  TeachersContainer,
  Content,
  TeachersContent,
  TeachersHeader,
  TeacherList,
  TeacherItem,
  AddTeacherForm,
  AddTeacherInput,
  AddTeacherButton,
} from '../../styles/TeachersStyles'; // Import styled components from TeachersStyles.js

const Teachers = () => {
const [newTeacher, setNewTeacher] = useState({
  name: '',
  email: '',
  subject: '',
  password: ''
});
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (newTeacher.name.trim() !== '' && newTeacher.email.trim() !== '' && newTeacher.subject.trim() !== '' && newTeacher.password.trim() !== '') {
      try {
        setLoading(true);
        setError('');
        const response = await axios.post('http://localhost:4000/api/v1/teachers', newTeacher);
        
        if (response.data.success && response.data.teacher) {
          setTeachers([...teachers, response.data.teacher]);
          setNewTeacher({ name: '', email: '', subject: '', password: '' });
        } else {
          setError('Failed to add teacher');
        }
      } catch (error) {
        console.error('Error adding teacher:', error);
        setError(error.response?.data?.message || 'Failed to add teacher');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please fill all fields');
    }
  };

  return (
    <TeachersContainer>
      <Sidebar />
      <Content>
        <TeachersContent>
          <TeachersHeader>Teachers</TeachersHeader>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <AddTeacherForm onSubmit={handleAddTeacher}>
            <AddTeacherInput
              type="text"
              placeholder="Enter teacher name"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            />
            <AddTeacherInput
              type="email"
              placeholder="Enter teacher email"
              value={newTeacher.email}
              onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            />
            <AddTeacherInput
              type="text"
              placeholder="Enter teacher subject"
              value={newTeacher.subject}
              onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
            />
            <AddTeacherInput
              type="password"
              placeholder="Enter teacher password"
              value={newTeacher.password}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, password: e.target.value })
              }
            />  
            <AddTeacherButton type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Teacher'}
            </AddTeacherButton>
          </AddTeacherForm>
          <TeacherList>
            {loading && teachers.length === 0 ? (
              <div>Loading teachers...</div>
            ) : (
              teachers.map((teacher) => (
                <TeacherItem key={teacher._id || teacher.id}>{teacher.name} - {teacher.email} - {teacher.subject}</TeacherItem>
              ))
            )}
          </TeacherList>
        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default Teachers;
