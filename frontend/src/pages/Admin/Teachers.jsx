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
  Card,
  TeacherListCard,
  TeacherAvatar,
  SubjectBadge,
} from '../../styles/TeachersStyles'; // Import styled components from TeachersStyles.js
import { FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import { useFlashMessage } from '../../context/FlashMessageContext';
import styled, { keyframes } from 'styled-components';

const Banner = styled.div`
  width: auto;
  max-width: 100%;
  background: #e3f0fa;
  color: #1976d2;
  margin-bottom: 18px;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
`;
const BannerIcon = styled.div`
  font-size: 1.2rem;
  margin-right: 8px;
`;
const BannerText = styled.div`
  display: flex;
  flex-direction: column;
`;
const BannerTitle = styled.h1`
  font-size: 1.08rem;
  font-weight: 700;
  margin: 0 0 1px 0;
  letter-spacing: 0.2px;
`;
const BannerSubtitle = styled.div`
  font-size: 0.93rem;
  font-weight: 400;
  opacity: 0.85;
`;

const SidebarWidget = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
  padding: 20px 18px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 220px;
`;
const WidgetAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #e3eafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #1976d2;
  margin-bottom: 10px;
`;
const WidgetName = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 2px;
`;
const WidgetSubject = styled.div`
  color: #1976d2;
  font-size: 0.98rem;
  margin-bottom: 6px;
`;
const WidgetStar = styled.div`
  color: #fbc02d;
  font-size: 1.2rem;
`;

// Helper for random pastel backgrounds
const pastelColors = [
  '#e3f2fd', '#fce4ec', '#e8f5e9', '#fff3e0', '#f3e5f5', '#e0f7fa', '#f9fbe7', '#fbe9e7', '#ede7f6', '#f1f8e9'
];
function getRandomPastel(idx) {
  return pastelColors[idx % pastelColors.length];
}

// Modal and animation styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30, 42, 70, 0.25);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
const ModalCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.18);
  padding: 36px 32px 28px 32px;
  min-width: 320px;
  max-width: 95vw;
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: slideInUp 0.4s;
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
const ModalClose = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #1976d2;
  cursor: pointer;
  opacity: 0.7;
  &:hover { opacity: 1; }
`;
const ModalAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #e3eafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #1976d2;
  font-weight: 800;
  margin-bottom: 12px;
`;
const ModalName = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 2px;
`;
const ModalEmail = styled.div`
  color: #555;
  font-size: 1.05rem;
  margin-bottom: 8px;
`;
const ModalSubject = styled.div`
  color: #1976d2;
  font-size: 1.08rem;
  font-weight: 600;
  margin-bottom: 18px;
`;
const ModalStats = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 16px;
`;
const StatBox = styled.div`
  background: #f7f9fb;
  border-radius: 8px;
  padding: 10px 18px;
  text-align: center;
`;
const StatNumber = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  color: #1976d2;
`;
const StatLabel = styled.div`
  font-size: 0.97rem;
  color: #555;
`;
const ModalBadges = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const Badge = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 0.97rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
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
  const { showError, showSuccess } = useFlashMessage();
  const [modalTeacher, setModalTeacher] = useState(null);
  const [statAnim, setStatAnim] = useState({ exp: 0, classes: 0 });

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (modalTeacher) {
      let exp = 0, classes = 0;
      const expTarget = modalTeacher.experience || 5;
      const classesTarget = modalTeacher.classesTaught || 12;
      const expStep = Math.max(1, Math.floor(expTarget / 20));
      const classesStep = Math.max(1, Math.floor(classesTarget / 20));
      const interval = setInterval(() => {
        exp = Math.min(exp + expStep, expTarget);
        classes = Math.min(classes + classesStep, classesTarget);
        setStatAnim({ exp, classes });
        if (exp === expTarget && classes === classesTarget) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    } else {
      setStatAnim({ exp: 0, classes: 0 });
    }
  }, [modalTeacher]);

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

  return (
    <TeachersContainer>
      <Sidebar />
      <Content>
        <TeachersContent>
          <Banner>
            <BannerIcon><FaChalkboardTeacher /></BannerIcon>
            <BannerText>
              <BannerTitle>Empowering Educators</BannerTitle>
              <BannerSubtitle>"A good teacher can inspire hope, ignite the imagination, and instill a love of learning."</BannerSubtitle>
            </BannerText>
          </Banner>
          <Card style={{ marginBottom: 32, animation: 'slideInLeft 0.5s' }}>
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
                onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
              />
              <AddTeacherButton type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Teacher'}
              </AddTeacherButton>
            </AddTeacherForm>
          </Card>
          <TeacherListCard>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 160px 120px',
              fontWeight: 700,
              color: '#1976d2',
              fontSize: '1.05rem',
              marginBottom: 10,
              letterSpacing: 0.5,
              padding: '0 8px'
            }}>
              <span></span>
              <span>Name & Email</span>
              <span>Subject</span>
              <span></span>
            </div>
            <TeacherList>
              {loading && teachers.length === 0 ? (
                <div style={{ padding: 16, textAlign: 'center', color: '#888' }}>Loading teachers...</div>
              ) : (
                teachers.map((teacher, idx) => (
                  <TeacherItem
                    key={teacher._id || teacher.id}
                    style={{ background: getRandomPastel(idx), cursor: 'pointer' }}
                    onClick={() => setModalTeacher({
                      ...teacher,
                      experience: 5 + (idx % 6), // Placeholder
                      classesTaught: 10 + (idx * 2) % 15, // Placeholder
                      achievements: idx % 2 === 0 ? ['Top Rated', '5+ Years'] : ['New Joiner']
                    })}
                  >
                    <TeacherAvatar><FaChalkboardTeacher /></TeacherAvatar>
                    <span style={{ fontWeight: 600 }}>
                      {teacher.name}
                      <span style={{ color: '#888', fontWeight: 400, fontSize: '0.97em', marginLeft: 6 }}>
                        - {teacher.email}
                      </span>
                    </span>
                    <SubjectBadge>{teacher.subject}</SubjectBadge>
                    <span></span>
                  </TeacherItem>
                ))
              )}
            </TeacherList>
          </TeacherListCard>
          {/* Teacher Profile Modal */}
          {modalTeacher && (
            <ModalOverlay onClick={() => setModalTeacher(null)}>
              <ModalCard onClick={e => e.stopPropagation()}>
                <ModalClose onClick={() => setModalTeacher(null)}>&times;</ModalClose>
                <ModalAvatar><FaChalkboardTeacher /></ModalAvatar>
                <ModalName>{modalTeacher.name}</ModalName>
                <ModalEmail>{modalTeacher.email}</ModalEmail>
                <ModalSubject>{modalTeacher.subject}</ModalSubject>
                <ModalStats>
                  <StatBox>
                    <StatNumber>{statAnim.exp}</StatNumber>
                    <StatLabel>Years Exp.</StatLabel>
                  </StatBox>
                  <StatBox>
                    <StatNumber>{statAnim.classes}</StatNumber>
                    <StatLabel>Classes Taught</StatLabel>
                  </StatBox>
                </ModalStats>
                <ModalBadges>
                  {modalTeacher.achievements && modalTeacher.achievements.map((ach, i) => (
                    <Badge key={i}>{ach}</Badge>
                  ))}
                </ModalBadges>
              </ModalCard>
            </ModalOverlay>
          )}
        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default Teachers;

// Add slideInLeft animation
const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
`;
