// TeacherProfileSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUserCog, FaEdit, FaSave, FaTimes, FaSignOutAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaUser, FaShieldAlt, FaCog, FaChalkboardTeacher } from 'react-icons/fa';
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

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
`;

const ProfileContainer = styled.div`
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

const ProfileContent = styled.div`
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

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: ${slideInLeft} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  height: fit-content;

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

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  margin: 0 auto 24px auto;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
  position: relative;
  animation: ${pulseGlow} 2s infinite;

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #10b981);
    z-index: -1;
    opacity: 0.3;
  }
`;

const ProfileName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin: 0 0 8px 0;
`;

const ProfileRole = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  margin: 0 auto 24px auto;
  display: inline-block;
  width: fit-content;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const Stat = styled.div`
  text-align: center;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
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

const LogoutButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
  }
`;

const DetailsCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: ${fadeInUp} 0.6s ease-out;
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2563eb;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background: #f3f4f6;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: #2563eb;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background: #f3f4f6;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const InfoDisplay = styled.div`
  padding: 12px 16px;
  background: #f8fafc;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  color: #374151;
  min-height: 48px;
  display: flex;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
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
  display: flex;
  align-items: center;
  gap: 8px;

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

const CancelButton = styled.button`
  padding: 12px 24px;
  background: #fff;
  color: #374151;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
`;

const EditButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
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

const TeacherProfileSection = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    qualification: '',
    subject: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('teacherToken');
      if (!token) {
        console.log('No teacherToken found in localStorage');
        return;
      }
      try {
        setLoading(true);
        console.log('Making API call to /api/v1/teachers/profile');
        const response = await axios.get('http://localhost:4000/api/v1/teachers/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API response:', response);
        if (response.data && response.data.teacher) {
          setTeacherInfo(response.data.teacher);
          setForm({
            name: response.data.teacher.name || '',
            email: response.data.teacher.email || '',
            phone: response.data.teacher.phone || '',
            address: response.data.teacher.address || '',
            qualification: response.data.teacher.qualification || '',
            subject: response.data.teacher.subject || '',
          });
        } else {
          console.log('No teacher data in response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => setEditMode(true);
  
  const handleCancel = () => {
    setEditMode(false);
    setForm({
      name: teacherInfo.name || '',
      email: teacherInfo.email || '',
      phone: teacherInfo.phone || '',
      address: teacherInfo.address || '',
      qualification: teacherInfo.qualification || '',
      subject: teacherInfo.subject || '',
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('teacherToken');
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await axios.put(
        'http://localhost:4000/api/v1/teachers/profile',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.teacher) {
        setTeacherInfo(response.data.teacher);
        setEditMode(false);
        localStorage.setItem('teacherInfo', JSON.stringify(response.data.teacher));
      }
    } catch (error) {
      console.error('Error updating teacher profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('teacherInfo');
    localStorage.removeItem('teacherToken');
    navigate('/teacher-signIn');
  };

  if (loading && !teacherInfo) {
    return (
      <ProfileContainer>
        <Sidebar />
        <Content>
          <LoadingSpinner>
            <FaUserCog style={{ marginRight: '8px' }} />
            Loading profile...
          </LoadingSpinner>
        </Content>
      </ProfileContainer>
    );
  }

  if (!teacherInfo) {
    return (
      <ProfileContainer>
        <Sidebar />
        <Content>
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <FaUserCog style={{ fontSize: '3rem', marginBottom: '16px' }} />
            <h3>Profile not found</h3>
            <p>Unable to load profile information</p>
          </div>
        </Content>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <Sidebar />
      <Content>
        <ProfileContent>
          <HeaderSection>
            <div>
              <HeaderTitle>Profile & Settings</HeaderTitle>
              <HeaderSubtitle>Manage your account settings and personal information</HeaderSubtitle>
            </div>
            <QuickActions>
              {!editMode && (
                <ActionButton onClick={handleEdit}>
                  <FaEdit size={16} />
                  Edit Profile
                </ActionButton>
              )}
            </QuickActions>
          </HeaderSection>

          <ProfileGrid>
            <ProfileCard>
              <ProfileAvatar>
                <FaChalkboardTeacher />
              </ProfileAvatar>
              <ProfileName>{teacherInfo.name || 'Teacher User'}</ProfileName>
              <ProfileRole>Teacher</ProfileRole>
              
              <ProfileStats>
                <Stat>
                  <StatNumber>1</StatNumber>
                  <StatLabel>Account</StatLabel>
                </Stat>
                <Stat>
                  <StatNumber>100%</StatNumber>
                  <StatLabel>Active</StatLabel>
                </Stat>
              </ProfileStats>

              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt size={16} />
                Logout
              </LogoutButton>
            </ProfileCard>

            <DetailsCard>
              <CardTitle>
                <FaUserCog />
                Profile Details
              </CardTitle>
              
              <FormGrid>
                <FormGroup>
                  <Label>
                    <FaUser size={14} />
                    Full Name
                  </Label>
                  {editMode ? (
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <InfoDisplay>
                      {teacherInfo.name || 'Not provided'}
                    </InfoDisplay>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FaEnvelope size={14} />
                    Email Address
                  </Label>
                  {editMode ? (
                    <Input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      type="email"
                    />
                  ) : (
                    <InfoDisplay>
                      {teacherInfo.email || 'Not provided'}
                    </InfoDisplay>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FaPhone size={14} />
                    Phone Number
                  </Label>
                  {editMode ? (
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <InfoDisplay>
                      {teacherInfo.phone || 'Not provided'}
                    </InfoDisplay>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FaGraduationCap size={14} />
                    Qualification
                  </Label>
                  {editMode ? (
                    <Input
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      placeholder="Enter your qualification"
                    />
                  ) : (
                    <InfoDisplay>
                      {teacherInfo.qualification || 'Not provided'}
                    </InfoDisplay>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FaChalkboardTeacher size={14} />
                    Subject
                  </Label>
                  {editMode ? (
                    <Input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Enter your subject"
                    />
                  ) : (
                    <InfoDisplay>
                      {teacherInfo.subject || 'Not provided'}
                    </InfoDisplay>
                  )}
                </FormGroup>

                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label>
                    <FaMapMarkerAlt size={14} />
                    Address
                  </Label>
                  {editMode ? (
                    <TextArea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <InfoDisplay>
                      {teacherInfo.address || 'Not provided'}
                    </InfoDisplay>
                  )}
                </FormGroup>
              </FormGrid>

              <ButtonGroup>
                {editMode ? (
                  <>
                    <CancelButton onClick={handleCancel}>
                      <FaTimes size={16} />
                      Cancel
                    </CancelButton>
                    <SaveButton onClick={handleSave} disabled={loading}>
                      <FaSave size={16} />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </SaveButton>
                  </>
                ) : (
                  <EditButton onClick={handleEdit}>
                    <FaEdit size={16} />
                    Edit Profile
                  </EditButton>
                )}
              </ButtonGroup>
            </DetailsCard>
          </ProfileGrid>
        </ProfileContent>
      </Content>
    </ProfileContainer>
  );
};

export default TeacherProfileSection;
