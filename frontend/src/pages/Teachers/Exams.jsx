// CheckExamSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  TeacherDashboardContainer,
  Content,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  QuickActions,
  ActionButton,
  SectionTitle,
  OverviewPanel,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatNumber,
  StatLabel,
  StatTrend,
} from '../../styles/DashboardStyles';
import { 
  FaFileAlt, 
  FaPlus, 
  FaArrowUp,
  FaSchool,
  FaUserGraduate,
  FaSearch,
  FaFilter,
  FaTrash,
  FaChartLine,
  FaCalendarAlt,
  FaTrophy,
  FaEdit,
} from 'react-icons/fa';


const CheckExamSection = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [newExam, setNewExam] = useState({
    name: '',
    registrationNumber: '',
    className: '',
    marks: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
    fetchClasses();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/exam/getall');
      if (response.data && Array.isArray(response.data.exams)) {
        setExams(response.data.exams);
      } else {
        setExams([]);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
      setError('Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    if (!newExam.name.trim() || !newExam.registrationNumber.trim() || !newExam.className.trim() || !newExam.marks.trim()) {
      setMessage({ text: 'Please fill in all required fields', type: 'error' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/exam', newExam);
      if (response.data.success) {
        setMessage({ text: 'Exam record added successfully!', type: 'success' });
        setNewExam({ name: '', registrationNumber: '', className: '', marks: '', email: '' });
        setShowAddForm(false);
        fetchExams();
      }
    } catch (error) {
      console.error('Error adding exam:', error);
      setMessage({ text: 'Failed to add exam record. Please try again.', type: 'error' });
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam record?')) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/v1/exam/delete/${examId}`);
        if (response.data.success) {
          setMessage({ text: 'Exam record deleted successfully!', type: 'success' });
          fetchExams();
        }
      } catch (error) {
        console.error('Error deleting exam:', error);
        setMessage({ text: 'Failed to delete exam record. Please try again.', type: 'error' });
      }
    }
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setShowEditForm(true);
    setShowAddForm(false);
    
    // Scroll to edit form after a short delay to ensure it's rendered
    setTimeout(() => {
      const editForm = document.getElementById('edit-exam-form');
      if (editForm) {
        editForm.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        // Add focus to the first input field
        const firstInput = editForm.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }
    }, 100);
  };

  const handleUpdateExam = async (e) => {
    e.preventDefault();
    if (!editingExam.name.trim() || !editingExam.registrationNumber.trim() || !editingExam.className.trim() || !editingExam.marks.trim()) {
      setMessage({ text: 'Please fill in all required fields', type: 'error' });
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/v1/exam/update/${editingExam._id}`, editingExam);
      if (response.data.success) {
        setMessage({ text: 'Exam record updated successfully!', type: 'success' });
        setEditingExam(null);
        setShowEditForm(false);
        fetchExams();
      }
    } catch (error) {
      console.error('Error updating exam:', error);
      setMessage({ text: 'Failed to update exam record. Please try again.', type: 'error' });
    }
  };

  const handleCancelEdit = () => {
    setEditingExam(null);
    setShowEditForm(false);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get unique classes for filter
  const uniqueClasses = [...new Set(exams.map(exam => exam.className))];

  // Filter exams based on search term and selected class
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || exam.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Calculate statistics
  const totalMarks = exams.reduce((sum, exam) => sum + (exam.marks || 0), 0);
  const averageMarks = exams.length > 0 ? Math.round(totalMarks / exams.length) : 0;
  const topPerformers = exams.filter(exam => exam.marks >= 90).length;
  const needsImprovement = exams.filter(exam => exam.marks < 60).length;

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
            }
          }
        `}
      </style>
      <TeacherDashboardContainer>
      <Sidebar />
      <Content isOpen={true}>
        {/* Welcome Section */}
        <WelcomeSection>
          <div>
            <WelcomeTitle>{getCurrentTime()}, Teacher!</WelcomeTitle>
            <WelcomeSubtitle>Manage exam records and track student performance</WelcomeSubtitle>
          </div>
          <QuickActions>
            <ActionButton onClick={() => setShowAddForm(!showAddForm)}>
              <FaPlus size={16} />
              {showAddForm ? 'Cancel' : 'Add Exam Record'}
            </ActionButton>
            <ActionButton onClick={() => navigate('/teacher/performance')}>
              <FaChartLine size={16} />
              View Performance
            </ActionButton>
            <ActionButton onClick={() => navigate('/teacher/students')}>
              <FaUserGraduate size={16} />
              View Students
            </ActionButton>
          </QuickActions>
        </WelcomeSection>

        {/* Message Display */}
        {message.text && (
          <div style={{
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '20px',
            color: message.type === 'success' ? '#155724' : '#721c24',
            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            {message.text}
          </div>
        )}

        {/* Add Exam Form */}
        {showAddForm && (
          <OverviewPanel style={{ marginBottom: '32px' }}>
            <SectionTitle>Add New Exam Record</SectionTitle>
            <form onSubmit={handleAddExam} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Student Name"
                  value={newExam.name}
                  onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                />
                <input
                  type="text"
                  placeholder="Registration Number"
                  value={newExam.registrationNumber}
                  onChange={(e) => setNewExam({ ...newExam, registrationNumber: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <select
                  value={newExam.className}
                  onChange={(e) => setNewExam({ ...newExam, className: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                >
                  <option value="">Select Class</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem.grade}>
                      {classItem.grade}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Marks (0-100)"
                  value={newExam.marks}
                  onChange={(e) => setNewExam({ ...newExam, marks: e.target.value })}
                  min="0"
                  max="100"
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                />
              </div>
              <input
                type="email"
                placeholder="Student Email (Optional)"
                value={newExam.email}
                onChange={(e) => setNewExam({ ...newExam, email: e.target.value })}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  alignSelf: 'flex-start'
                }}
                onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.background = '#2563eb'}
              >
                Add Exam Record
              </button>
            </form>
          </OverviewPanel>
        )}

        {/* Edit Exam Form */}
        {showEditForm && editingExam && (
          <OverviewPanel 
            id="edit-exam-form"
            style={{ 
              marginBottom: '32px',
              border: '2px solid #2563eb',
              boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
              animation: 'pulse 2s ease-in-out'
            }}
          >
            <SectionTitle style={{ color: '#2563eb' }}>✏️ Edit Exam Record</SectionTitle>
            <form onSubmit={handleUpdateExam} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Student Name"
                  value={editingExam.name}
                  onChange={(e) => setEditingExam({ ...editingExam, name: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                />
                <input
                  type="text"
                  placeholder="Registration Number"
                  value={editingExam.registrationNumber}
                  onChange={(e) => setEditingExam({ ...editingExam, registrationNumber: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <select
                  value={editingExam.className}
                  onChange={(e) => setEditingExam({ ...editingExam, className: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                >
                  <option value="">Select Class</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem.grade}>
                      {classItem.grade}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Marks (0-100)"
                  value={editingExam.marks}
                  onChange={(e) => setEditingExam({ ...editingExam, marks: e.target.value })}
                  min="0"
                  max="100"
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: '#fff'
                  }}
                />
              </div>
              <input
                type="email"
                placeholder="Student Email (Optional)"
                value={editingExam.email || ''}
                onChange={(e) => setEditingExam({ ...editingExam, email: e.target.value })}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff'
                }}
              />
              <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#047857'}
                  onMouseOut={(e) => e.target.style.background = '#059669'}
                >
                  Update Exam Record
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: '12px 24px',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#4b5563'}
                  onMouseOut={(e) => e.target.style.background = '#6b7280'}
                >
                  Cancel
                </button>
              </div>
            </form>
          </OverviewPanel>
        )}

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaFileAlt size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{exams.length}</StatNumber>
              <StatLabel>Total Exam Records</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Student records
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaChartLine size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{averageMarks}%</StatNumber>
              <StatLabel>Average Marks</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Class average
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaTrophy size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{topPerformers}</StatNumber>
              <StatLabel>Top Performers</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                90%+ marks
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaUserGraduate size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{needsImprovement}</StatNumber>
              <StatLabel>Need Improvement</StatLabel>
              <StatTrend positive={false}>
                <FaArrowUp size={12} />
                Below 60%
              </StatTrend>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        {/* Search and Filter Section */}
        <OverviewPanel style={{ 
          marginBottom: '20px', 
          padding: '24px 32px', 
          minHeight: 'auto' 
        }}>
          <SectionTitle>Search & Filter Exam Records</SectionTitle>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
              <FaSearch style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#6b7280' 
              }} />
              <input
                type="text"
                placeholder="Search by name or registration number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff'
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaFilter size={16} color="#6b7280" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#fff',
                  minWidth: '150px'
                }}
              >
                <option value="">All Classes</option>
                {uniqueClasses.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </OverviewPanel>

        {/* Exams List */}
        <OverviewPanel>
          <SectionTitle>Exam Records</SectionTitle>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Loading exam records...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>
              {error}
            </div>
          ) : filteredExams.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <FaFileAlt size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>
                {searchTerm || selectedClass 
                  ? 'No exam records found matching your search criteria.' 
                  : 'No exam records found. Add your first exam record to get started!'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
              {filteredExams.map((exam, index) => {
                const isTopPerformer = exam.marks >= 90;
                const needsHelp = exam.marks < 60;

                return (
                                     <div
                     key={exam._id || index}
                     style={{
                       background: editingExam?._id === exam._id ? '#f0f9ff' : '#fff',
                       borderRadius: '12px',
                       padding: '24px',
                       border: editingExam?._id === exam._id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                       boxShadow: editingExam?._id === exam._id ? '0 4px 12px rgba(37, 99, 235, 0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                       transition: 'all 0.2s ease',
                       cursor: 'pointer',
                       borderLeft: isTopPerformer ? '4px solid #10b981' : needsHelp ? '4px solid #dc2626' : '4px solid #f59e0b'
                     }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-4px)';
                      e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    }}
                    onClick={() => navigate(`/teacher/performance?student=${exam.registrationNumber}`)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.25rem',
                          fontWeight: '600'
                        }}>
                          {exam.name ? exam.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div>
                          <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                            {exam.name || 'Unknown Student'}
                          </h3>
                          <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                            ID: {exam.registrationNumber || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {editingExam?._id === exam._id && (
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#2563eb',
                            fontWeight: '600',
                            padding: '2px 6px',
                            background: '#eff6ff',
                            borderRadius: '4px',
                            marginRight: '4px'
                          }}>
                            EDITING
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditExam(exam);
                          }}
                          style={{
                            background: editingExam?._id === exam._id ? '#2563eb' : 'none',
                            border: 'none',
                            color: editingExam?._id === exam._id ? 'white' : '#2563eb',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            if (editingExam?._id !== exam._id) {
                              e.target.style.background = '#eff6ff';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (editingExam?._id !== exam._id) {
                              e.target.style.background = 'none';
                            }
                          }}
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExam(exam._id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#dc2626',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => e.target.style.background = '#fef2f2'}
                          onMouseOut={(e) => e.target.style.background = 'none'}
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaSchool size={16} color="#6b7280" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {exam.className || 'No Class'}
                        </span>
                      </div>
                      <div style={{
                        padding: '4px 12px',
                        background: isTopPerformer ? '#f0fdf4' : needsHelp ? '#fef2f2' : '#fffbeb',
                        color: isTopPerformer ? '#059669' : needsHelp ? '#dc2626' : '#d97706',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {exam.marks}% Marks
                      </div>
                    </div>

                    {exam.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCalendarAlt size={14} color="#6b7280" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {exam.email}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </OverviewPanel>
      </Content>
    </TeacherDashboardContainer>
    </>
  );
};

export default CheckExamSection;
