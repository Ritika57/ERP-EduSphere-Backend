// ProfileSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileInfo,
  ProfileDetail,
  Label,
  Value,
} from '../../styles/SettingsProfileStyles'; // Import styled components from ProfileSectionStyles.js

const ProfileSection = () => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('studentInfo');
    navigate('/student-signIn');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        if (!studentInfo || !studentInfo.email) {
          setError('No student info found.');
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:4000/api/v1/students/getall');
        const students = response.data.students || [];
        const student = students.find(s => s.email && s.email.trim().toLowerCase() === studentInfo.email.trim().toLowerCase());
        if (!student) {
          setError('Student profile not found.');
          setLoading(false);
          return;
        }
        setStudentProfile(student);
      } catch (err) {
        setError('Failed to fetch student profile.');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        <button onClick={handleLogout} style={{margin: '20px', padding: '10px 20px'}}>Logout</button>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <ProfileInfo>
            <ProfileDetail>
              <Label>Name:</Label>
              <Value>{studentProfile.name}</Value>
            </ProfileDetail>
            <ProfileDetail>
              <Label>Registration Number:</Label>
              <Value>{studentProfile.registrationNumber}</Value>
            </ProfileDetail>
            <ProfileDetail>
              <Label>Grade:</Label>
              <Value>{studentProfile.grade}</Value>
            </ProfileDetail>
            <ProfileDetail>
              <Label>Email:</Label>
              <Value>{studentProfile.email}</Value>
            </ProfileDetail>
          </ProfileInfo>
        )}
      </Content>
    </ProfileContainer>
  );
};

export default ProfileSection;
