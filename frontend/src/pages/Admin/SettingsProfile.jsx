// SettingsProfile.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileDetails,
  ProfileLabel,
  ProfileInfo,
  EditButton,
} from '../../styles/SettingsProfileStyles';

const SettingsProfile = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    qualification: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:4000/api/v1/register/admin/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.admin) {
          setAdminInfo(response.data.admin);
          setForm({
            name: response.data.admin.name || '',
            email: response.data.admin.email || '',
            phone: response.data.admin.phone || '',
            address: response.data.admin.address || '',
            qualification: response.data.admin.qualification || '',
          });
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setForm({
      name: adminInfo.name || '',
      email: adminInfo.email || '',
      phone: adminInfo.phone || '',
      address: adminInfo.address || '',
      qualification: adminInfo.qualification || '',
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await axios.put(
        'http://localhost:4000/api/v1/register/admin/profile',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.admin) {
        setAdminInfo(response.data.admin);
        setEditMode(false);
        // Update localStorage with new info
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
      }
    } catch (error) {
      console.error('Error updating admin profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    localStorage.removeItem('adminToken');
    navigate('/admin-signIn');
  };

  if (!adminInfo) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        <button onClick={handleLogout} style={{margin: '20px', padding: '10px 20px'}}>Logout</button>
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
            <ProfileInfo>{adminInfo.name || '-'}</ProfileInfo>
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
            <ProfileInfo>{adminInfo.email}</ProfileInfo>
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
            <ProfileInfo>{adminInfo.phone || '-'}</ProfileInfo>
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
            <ProfileInfo>{adminInfo.address || '-'}</ProfileInfo>
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
            <ProfileInfo>{adminInfo.qualification || '-'}</ProfileInfo>
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

export default SettingsProfile;
