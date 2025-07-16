// TeacherProfileSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ProfileContainer, SidebarContainer, Content, ProfileHeader, ProfileDetails, ProfileLabel, ProfileInfo, EditButton } 
from '../../styles/SettingsProfileStyles'; 

const TeacherProfileSection = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    qualification: '',
    subject: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('teacherToken');
      if (!token) {
        console.log('No teacherToken found in localStorage');
        return;
      }
      try {
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
        // Optionally update localStorage with new info
        localStorage.setItem('teacherInfo', JSON.stringify(response.data.teacher));
      }
    } catch (error) {
      console.error('Error updating teacher profile:', error);
    }
  };

  if (!teacherInfo) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile Details</ProfileHeader>
        <ProfileDetails>
          <ProfileLabel>Name:</ProfileLabel>
          {editMode ? (
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
            />
          ) : (
            <ProfileInfo>{teacherInfo.name || '-'}</ProfileInfo>
          )}

          <ProfileLabel>Email:</ProfileLabel>
          {editMode ? (
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
            />
          ) : (
            <ProfileInfo>{teacherInfo.email}</ProfileInfo>
          )}

          <ProfileLabel>Phone:</ProfileLabel>
          {editMode ? (
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          ) : (
            <ProfileInfo>{teacherInfo.phone || '-'}</ProfileInfo>
          )}

          <ProfileLabel>Address:</ProfileLabel>
          {editMode ? (
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
            />
          ) : (
            <ProfileInfo>{teacherInfo.address || '-'}</ProfileInfo>
          )}

          <ProfileLabel>Qualification:</ProfileLabel>
          {editMode ? (
            <input
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              placeholder="Qualification"
            />
          ) : (
            <ProfileInfo>{teacherInfo.qualification || '-'}</ProfileInfo>
          )}

          <ProfileLabel>Subject:</ProfileLabel>
          {editMode ? (
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
          ) : (
            <ProfileInfo>{teacherInfo.subject || '-'}</ProfileInfo>
          )}
        </ProfileDetails>
        {editMode ? (
          <>
            <EditButton onClick={handleSave}>Save</EditButton>
            <EditButton onClick={handleCancel}>Cancel</EditButton>
          </>
        ) : (
          <EditButton onClick={handleEdit}>Edit Profile</EditButton>
        )}
      </Content>
    </ProfileContainer>
  );
};

export default TeacherProfileSection;
