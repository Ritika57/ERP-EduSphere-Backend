// SettingsProfile.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUserCog } from 'react-icons/fa';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileDetails,
  ProfileLabel,
  ProfileInfo,
  EditButton,
  ProfileCard,
  ProfileAvatar,
  Divider
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
        {/* Profile Banner */}
        <div style={{
          width: 'auto',
          maxWidth: '100%',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          marginBottom: '24px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'bounceIn 0.8s ease-out'
        }}>
          <div style={{
            fontSize: '1.8rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FaUserCog />
          </div>
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              margin: '0 0 4px 0',
              letterSpacing: '0.5px'
            }}>
              Profile Management
            </h3>
            <div style={{
              fontSize: '0.95rem',
              fontWeight: '400',
              opacity: '0.9'
            }}>
              "Manage your account settings and personal information."
            </div>
          </div>
        </div>

        <ProfileCard>
          <ProfileAvatar>
            <FaUserCircle />
          </ProfileAvatar>
          <ProfileHeader>Admin Profile</ProfileHeader>
          <EditButton onClick={handleLogout} style={{ margin: '0 auto 18px auto', display: 'block', background: '#fff', color: '#1976d2', border: '2px solid #1976d2' }}>Logout</EditButton>
          <Divider />
          <ProfileHeader style={{ fontSize: '1.3rem', marginBottom: 10 }}>Profile Details</ProfileHeader>
          <ProfileDetails>
            <ProfileLabel>Name:</ProfileLabel>
            {editMode ? (
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                style={{ marginBottom: 10, padding: '8px 12px', borderRadius: 6, border: '1px solid #e3f0ff', fontSize: '1rem' }}
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
                style={{ marginBottom: 10, padding: '8px 12px', borderRadius: 6, border: '1px solid #e3f0ff', fontSize: '1rem' }}
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
                style={{ marginBottom: 10, padding: '8px 12px', borderRadius: 6, border: '1px solid #e3f0ff', fontSize: '1rem' }}
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
                style={{ marginBottom: 10, padding: '8px 12px', borderRadius: 6, border: '1px solid #e3f0ff', fontSize: '1rem' }}
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
                style={{ marginBottom: 10, padding: '8px 12px', borderRadius: 6, border: '1px solid #e3f0ff', fontSize: '1rem' }}
              />
            ) : (
              <ProfileInfo>{adminInfo.qualification || '-'}</ProfileInfo>
            )}
          </ProfileDetails>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            {editMode ? (
              <>
                <EditButton onClick={handleSave}>Save</EditButton>
                <EditButton onClick={handleCancel} style={{ background: '#fff', color: '#1976d2', border: '2px solid #1976d2' }}>Cancel</EditButton>
              </>
            ) : (
              <EditButton onClick={handleEdit}>Edit Profile</EditButton>
            )}
          </div>
        </ProfileCard>
      </Content>
    </ProfileContainer>
  );
};

export default SettingsProfile;
