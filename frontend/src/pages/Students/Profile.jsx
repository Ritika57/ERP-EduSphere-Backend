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
} from '../../styles/SettingsProfileStyles';
import { FaUser, FaIdCard, FaGraduationCap, FaEnvelope, FaSignOutAlt, FaUserCircle, FaCog, FaShieldAlt } from 'react-icons/fa';

const ProfileSection = () => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('studentInfo');
    navigate('/choose-user');
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
        const response = await axios.get('/api/v1/students/getall');
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

  const getGradeColor = (grade) => {
    switch (grade?.toUpperCase()) {
      case 'A': return '#10b981';
      case 'B': return '#3b82f6';
      case 'C': return '#f59e0b';
      case 'D': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        {/* Main Card - Compact Design */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 24,
          boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
          padding: '32px 48px',
          margin: '0 auto',
          maxWidth: 1600,
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#ffffff', marginBottom: 6, letterSpacing: -0.5 }}>Profile</h1>
            <div style={{ fontSize: 14, color: '#ffffff', fontWeight: 500 }}>
              Manage your student profile and account settings
            </div>
          </div>

          {/* Profile Content */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {/* Left Section - Profile Information */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '24px',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12
                  }}>
                    <FaUserCircle size={40} color="#fff" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#3b82f6', margin: '0 0 4px 0' }}>
                      {studentProfile?.name || 'Student Name'}
                    </h3>
                    <div style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>
                      Student
                    </div>
                  </div>
                </div>

        {loading ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    <div style={{ fontSize: 24, marginBottom: 16 }}>👤</div>
                    <div>Loading profile...</div>
                  </div>
        ) : error ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '30px 16px', 
                    color: '#dc2626',
                    background: '#fef2f2',
                    borderRadius: 12,
                    border: '1px solid #fecaca'
                  }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#dc2626' }}>
                      Error Loading Profile
                    </div>
                    <div style={{ fontSize: 12, color: '#ef4444' }}>
                      {error}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{
                      background: '#fff',
                      borderRadius: 12,
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <FaUser size={14} color="#6b7280" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Full Name</span>
                      </div>
                      <div style={{ fontSize: 16, color: '#1f2937', fontWeight: 500 }}>
                        {studentProfile?.name}
                      </div>
                    </div>

                    <div style={{
                      background: '#fff',
                      borderRadius: 12,
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <FaIdCard size={14} color="#6b7280" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Registration Number</span>
                      </div>
                      <div style={{ fontSize: 16, color: '#1f2937', fontWeight: 500 }}>
                        {studentProfile?.registrationNumber}
                      </div>
                    </div>

                    <div style={{
                      background: '#fff',
                      borderRadius: 12,
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <FaGraduationCap size={14} color="#6b7280" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Grade</span>
                      </div>
                      <div style={{ 
                        fontSize: 16, 
                        color: getGradeColor(studentProfile?.grade), 
                        fontWeight: 600,
                        background: `${getGradeColor(studentProfile?.grade)}10`,
                        padding: '4px 12px',
                        borderRadius: 8,
                        display: 'inline-block'
                      }}>
                        {studentProfile?.grade}
                      </div>
                    </div>

                    <div style={{
                      background: '#fff',
                      borderRadius: 12,
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <FaEnvelope size={14} color="#6b7280" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Email Address</span>
                      </div>
                      <div style={{ fontSize: 16, color: '#1f2937', fontWeight: 500 }}>
                        {studentProfile?.email}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Account Actions */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: 16,
                padding: '24px',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}>
                    <FaCog size={18} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#374151', margin: 0 }}>Account Settings</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button 
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(220, 38, 38, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.2)';
                    }}
                  >
                    <FaSignOutAlt size={16} />
                    Logout
                  </button>

                  <div style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <FaShieldAlt size={14} color="#6b7280" />
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Account Security</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>
                      Your account is secure and protected. All your personal information is encrypted and stored safely.
                    </div>
                  </div>

                  <div style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <FaUser size={14} color="#6b7280" />
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Profile Status</span>
                    </div>
                    <div style={{ 
                      fontSize: 12, 
                      color: '#10b981',
                      fontWeight: 600,
                      background: '#dcfce7',
                      padding: '4px 8px',
                      borderRadius: 6,
                      display: 'inline-block'
                    }}>
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </ProfileContainer>
  );
};

export default ProfileSection;
