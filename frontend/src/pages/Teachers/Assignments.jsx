// AssignmentSection.js
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
  ExamPageTitle, // <-- add this import
} from '../../styles/DashboardStyles';
import { 
  FaBook, 
  FaPlus, 
  FaArrowUp,
  FaSchool,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaCheckCircle,
} from 'react-icons/fa';
import { useTheme } from '../../App';

const AssignmentSection = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    grade: '',
    deadline: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
    fetchClasses();
  }, []);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      if (response.data && Array.isArray(response.data.assignments)) {
        setAssignments(response.data.assignments);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setError('Failed to load assignments');
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

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (!newAssignment.title.trim() || !newAssignment.description.trim() || !newAssignment.grade.trim() || !newAssignment.deadline.trim()) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/v1/assignments', newAssignment);
      if (response.data.success) {
        setMessage({ text: 'Assignment added successfully!', type: 'success' });
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
        setShowAddForm(false);
        
        // If the response includes the created assignment, add it to the list
        if (response.data.assignment) {
          setAssignments([...assignments, response.data.assignment]);
        } else {
          // Otherwise fetch the updated list
          await fetchAssignments();
        }
      }
    } catch (error) {
      console.error('Error adding assignment:', error);
      const errorMsg = error.response?.data?.message || 'Failed to add assignment. Please try again.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/v1/assignments/delete/${assignmentId}`);
        if (response.data.success) {
          setMessage({ text: 'Assignment deleted successfully!', type: 'success' });
          fetchAssignments();
        }
      } catch (error) {
        console.error('Error deleting assignment:', error);
        setMessage({ text: 'Failed to delete assignment. Please try again.', type: 'error' });
      }
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get unique grades for filter
  const uniqueGrades = [...new Set(assignments.map(assignment => assignment.grade))];

  // Filter assignments based on search term and selected grade
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !selectedGrade || assignment.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  // Calculate statistics
  const upcomingDeadlines = assignments.filter(assignment => {
    const deadline = new Date(assignment.deadline);
    const now = new Date();
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  const overdueAssignments = assignments.filter(assignment => {
    const deadline = new Date(assignment.deadline);
    const now = new Date();
    return deadline < now;
  });

  const theme = useTheme()?.theme || {};

  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content isOpen={true}>
        {/* Unique Gradient Header for Assignments */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
            borderRadius: 24,
            boxShadow: '0 6px 32px rgba(37,99,235,0.10)',
            padding: '32px 36px 28px 32px',
            marginBottom: 18,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 90,
          }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '50%',
            width: 70,
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px #10b98133',
            marginRight: 18,
            flexShrink: 0,
          }}>
            <FaBook size={38} color="#fff" />
          </div>
          <div>
            <h1 style={{
              fontSize: '2.7rem',
              fontWeight: 900,
              color: '#fff',
              margin: 0,
              letterSpacing: '-1.5px',
              textShadow: '0 2px 12px #2563eb55',
              lineHeight: 1.08,
            }}>
              Assignments
            </h1>
            <div style={{
              fontSize: '1.13rem',
              color: 'rgba(255,255,255,0.93)',
              fontWeight: 400,
              marginTop: 6,
              textShadow: '0 1px 4px #10b98133',
            }}>
              Manage assignments and track student progress
            </div>
          </div>
        </div>

        {/* Add Assignment Button */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div></div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(37,99,235,0.2)'
            }}
            onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.background = '#2563eb'}
          >
            <FaPlus size={16} />
            {showAddForm ? 'Cancel' : 'Add New Assignment'}
          </button>
        </div>

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

        {/* Add Assignment Form */}
        {showAddForm && (
          <OverviewPanel style={{ marginBottom: '32px' }}>
            <SectionTitle>Add New Assignment</SectionTitle>
            <form onSubmit={handleAddAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Assignment Title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  disabled={loading}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: loading ? '#f9fafb' : '#fff',
                    cursor: loading ? 'not-allowed' : 'text'
                  }}
                />
                <select
                  value={newAssignment.grade}
                  onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
                  disabled={loading}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: loading ? '#f9fafb' : '#fff',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  <option value="">Select Class</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem.grade}>
                      {classItem.grade}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Assignment Description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                disabled={loading}
                rows={4}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: loading ? '#f9fafb' : '#fff',
                  resize: 'vertical',
                  cursor: loading ? 'not-allowed' : 'text'
                }}
              />
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <input
                  type="date"
                  value={newAssignment.deadline}
                  onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                  disabled={loading}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: loading ? '#f9fafb' : '#fff',
                    flex: 1,
                    cursor: loading ? 'not-allowed' : 'text'
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    background: loading ? '#9ca3af' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!loading) e.target.style.background = '#1d4ed8';
                  }}
                  onMouseOut={(e) => {
                    if (!loading) e.target.style.background = '#2563eb';
                  }}
                >
                  {loading ? 'Adding...' : 'Add Assignment'}
                </button>
              </div>
            </form>
          </OverviewPanel>
        )}

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaBook size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{assignments.length}</StatNumber>
              <StatLabel>Total Assignments</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Active assignments
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <FaCalendarAlt size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{upcomingDeadlines.length}</StatNumber>
              <StatLabel>Upcoming Deadlines</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                Next 7 days
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <FaClock size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>{overdueAssignments.length}</StatNumber>
              <StatLabel>Overdue</StatLabel>
              <StatTrend positive={false}>
                <FaArrowUp size={12} />
                Need attention
              </StatTrend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <FaCheckCircle size={24} color="white" />
            </StatIcon>
            <StatInfo>
              <StatNumber>85%</StatNumber>
              <StatLabel>Completion Rate</StatLabel>
              <StatTrend positive>
                <FaArrowUp size={12} />
                This month
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
          <SectionTitle>Search & Filter Assignments</SectionTitle>
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
                placeholder="Search by title or description..."
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
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
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
                {uniqueGrades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </OverviewPanel>

        {/* Assignments List */}
        <OverviewPanel>
          <SectionTitle>My Assignments</SectionTitle>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Loading assignments...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>
              {error}
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <FaBook size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>
                {searchTerm || selectedGrade 
                  ? 'No assignments found matching your search criteria.' 
                  : 'No assignments found. Add your first assignment to get started!'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
              {filteredAssignments.map((assignment, index) => {
                const deadline = new Date(assignment.deadline);
                const now = new Date();
                const diffTime = deadline - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const isOverdue = deadline < now;
                const isUpcoming = diffDays >= 0 && diffDays <= 7;

                return (
                  <div
                    key={assignment._id || index}
                    style={{
                      background: '#fff',
                      borderRadius: '12px',
                      padding: '24px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      borderLeft: isOverdue ? '4px solid #dc2626' : isUpcoming ? '4px solid #f59e0b' : '4px solid #10b981'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-4px)';
                      e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    }}
                    onClick={() => navigate(`/teacher/students?assignment=${assignment._id}`)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FaBook size={20} color="white" />
                        </div>
                        <div>
                          <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                            {assignment.title || 'Untitled Assignment'}
                          </h3>
                          <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                            Class: {assignment.grade || 'No Class'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAssignment(assignment._id);
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
                    
                    <p style={{ 
                      margin: '0 0 16px 0', 
                      fontSize: '0.875rem', 
                      color: '#4b5563',
                      lineHeight: '1.5'
                    }}>
                      {assignment.description || 'No description provided'}
                    </p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCalendarAlt size={16} color="#6b7280" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          Due: {assignment.deadline ? new Date(assignment.deadline).toLocaleDateString() : 'No deadline'}
                        </span>
                      </div>
                      <div style={{
                        padding: '4px 12px',
                        background: isOverdue ? '#fef2f2' : isUpcoming ? '#fffbeb' : '#f0fdf4',
                        color: isOverdue ? '#dc2626' : isUpcoming ? '#d97706' : '#059669',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {isOverdue ? 'Overdue' : isUpcoming ? `${diffDays} days left` : 'Active'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </OverviewPanel>
      </Content>
    </TeacherDashboardContainer>
  );
};

export default AssignmentSection;
