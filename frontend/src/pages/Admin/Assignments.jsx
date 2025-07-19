import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaClipboardList, 
  FaCalendarAlt, 
  FaGraduationCap, 
  FaPlus, 
  FaSpinner,
  FaBook,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const Assignments = () => {
  const [newAssignment, setNewAssignment] = useState({ 
    title: '', 
    description: '', 
    grade: '', 
    deadline: '' 
  });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fallback theme values in case theme context is not available
  const theme = {
    background: '#f3f4f8',
    card: '#fff',
    text: '#222',
    primary: '#2563eb',
    accent: '#10b981',
    border: '#e5e7eb',
    inputBg: '#f3f4f6',
    inputBorder: '#e5e7eb',
    shadow: '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.title.trim() !== '' && 
        newAssignment.description.trim() !== '' && 
        newAssignment.grade.trim() !== '' && 
        newAssignment.deadline.trim() !== '') {
      try {
        setSubmitting(true);
        const response = await axios.post('http://localhost:4000/api/v1/assignments', newAssignment);
        toast.success('Assignment added successfully! 🎉');
        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
        toast.error('Failed to add assignment');
      } finally {
        setSubmitting(false);
      }
    } else {
      toast.warning('Please fill in all fields');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (deadline) => {
    const daysLeft = getDaysUntilDeadline(deadline);
    if (daysLeft < 0) return '#ef4444'; // Red for overdue
    if (daysLeft <= 3) return '#f59e0b'; // Orange for due soon
    return '#10b981'; // Green for on track
  };

  const getStatusIcon = (deadline) => {
    const daysLeft = getDaysUntilDeadline(deadline);
    if (daysLeft < 0) return <FaExclamationTriangle />;
    if (daysLeft <= 3) return <FaClock />;
    return <FaCheckCircle />;
  };

  // Add subtle CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from { 
          opacity: 0; 
          transform: translateY(20px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      @keyframes slideInLeft {
        from { 
          opacity: 0; 
          transform: translateX(-20px); 
        }
        to { 
          opacity: 1; 
          transform: translateX(0); 
        }
      }
      
      @keyframes slideInRight {
        from { 
          opacity: 0; 
          transform: translateX(20px); 
        }
        to { 
          opacity: 1; 
          transform: translateX(0); 
        }
      }
      
      @keyframes subtlePulse {
        0%, 100% { 
          transform: scale(1); 
        }
        50% { 
          transform: scale(1.02); 
        }
      }
      
      @keyframes gentleFloat {
        0%, 100% { 
          transform: translateY(0px); 
        }
        50% { 
          transform: translateY(-5px); 
        }
      }
      
      .fade-in-up { 
        animation: fadeInUp 0.6s ease-out; 
      }
      .slide-in-left { 
        animation: slideInLeft 0.6s ease-out; 
      }
      .slide-in-right { 
        animation: slideInRight 0.6s ease-out; 
      }
      .subtle-pulse { 
        animation: subtlePulse 3s ease-in-out infinite; 
      }
      .gentle-float { 
        animation: gentleFloat 4s ease-in-out infinite; 
      }
      
      .card-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .card-hover:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      }
      
      .input-focus:focus {
        border-color: #2563eb !important;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
      }
      
      .button-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
      }
      
      @media (max-width: 1024px) {
        .main-content-grid {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
        }
        
        .form-section {
          order: 2 !important;
        }
        
        .table-section {
          order: 1 !important;
        }
        
        .divider {
          display: none !important;
        }
      }
      
      @media (max-width: 768px) {
        .stats-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      {/* Main Content Area */}
      <div style={{
        flex: 1,
        marginLeft: '250px',
        background: theme.background,
        minHeight: '100vh',
        padding: '32px 40px',
        position: 'relative'
      }}>
        {/* Header */}
        <div className="fade-in-up" style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: theme.text,
            margin: '0 0 16px 0',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📚 Assignments Hub
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: theme.text,
            opacity: 0.8,
            margin: 0,
            fontWeight: '400'
          }}>
            Manage academic tasks with precision and ease
          </p>
        </div>

        {/* Stats Cards */}
        <div className="slide-in-left stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div className="subtle-pulse card-hover" style={{
            background: theme.card,
            borderRadius: '20px',
            padding: '28px 24px',
            border: `1px solid ${theme.border}`,
            boxShadow: theme.shadow,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}>
              <FaClipboardList size={24} color="white" />
            </div>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: theme.text,
                lineHeight: 1,
                marginBottom: '4px'
              }}>
                {assignments.length}
              </div>
              <div style={{
                fontSize: '1rem',
                color: theme.text,
                opacity: 0.7,
                fontWeight: '500'
              }}>
                Total Assignments
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`
            }} />
          </div>

          <div className="subtle-pulse card-hover" style={{
            background: theme.card,
            borderRadius: '20px',
            padding: '28px 24px',
            border: `1px solid ${theme.border}`,
            boxShadow: theme.shadow,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}>
              <FaClock size={24} color="white" />
            </div>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: theme.text,
                lineHeight: 1,
                marginBottom: '4px'
              }}>
                {assignments.filter(a => getDaysUntilDeadline(a.deadline) <= 3 && getDaysUntilDeadline(a.deadline) >= 0).length}
              </div>
              <div style={{
                fontSize: '1rem',
                color: theme.text,
                opacity: 0.7,
                fontWeight: '500'
              }}>
                Due Soon
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`
            }} />
          </div>

          <div className="subtle-pulse card-hover" style={{
            background: theme.card,
            borderRadius: '20px',
            padding: '28px 24px',
            border: `1px solid ${theme.border}`,
            boxShadow: theme.shadow,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}>
              <FaCheckCircle size={24} color="white" />
            </div>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: theme.text,
                lineHeight: 1,
                marginBottom: '4px'
              }}>
                {assignments.filter(a => getDaysUntilDeadline(a.deadline) > 3).length}
              </div>
              <div style={{
                fontSize: '1rem',
                color: theme.text,
                opacity: 0.7,
                fontWeight: '500'
              }}>
                On Track
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`
            }} />
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2px 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Add Assignment Form */}
          <div className="slide-in-left form-section">
            <div className="card-hover" style={{
              background: theme.card,
              borderRadius: '20px',
              padding: '32px',
              border: `1px solid ${theme.border}`,
              boxShadow: theme.shadow,
              maxWidth: '100%',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)'
                }}>
                  <FaPlus size={20} />
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: theme.text
                }}>
                  Add Assignment
                </h2>
              </div>

              <form onSubmit={handleAddAssignment} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                width: '100%',
                maxWidth: '100%'
              }}>
                <div style={{ width: '100%' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: theme.text,
                    marginBottom: '8px'
                  }}>
                    <FaBook size={16} color={theme.primary} />
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    required
                    className="input-focus"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: `2px solid ${theme.inputBorder}`,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: theme.inputBg,
                      outline: 'none',
                      fontWeight: '600',
                      transition: theme.transition,
                      boxSizing: 'border-box',
                      color: theme.text
                    }}
                  />
                </div>

                <div style={{ width: '100%' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: theme.text,
                    marginBottom: '8px'
                  }}>
                    <FaClipboardList size={16} color={theme.primary} />
                    Description
                  </label>
                  <textarea
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    required
                    rows={4}
                    className="input-focus"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: `2px solid ${theme.inputBorder}`,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: theme.inputBg,
                      outline: 'none',
                      fontWeight: '600',
                      transition: theme.transition,
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      color: theme.text
                    }}
                  />
                </div>

                <div style={{ width: '100%' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: theme.text,
                    marginBottom: '8px'
                  }}>
                    <FaGraduationCap size={16} color={theme.primary} />
                    Grade/Class
                  </label>
                  <input
                    type="text"
                    value={newAssignment.grade}
                    onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
                    required
                    className="input-focus"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: `2px solid ${theme.inputBorder}`,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: theme.inputBg,
                      outline: 'none',
                      fontWeight: '600',
                      transition: theme.transition,
                      boxSizing: 'border-box',
                      color: theme.text
                    }}
                  />
                </div>

                <div style={{ width: '100%' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: theme.text,
                    marginBottom: '8px'
                  }}>
                    <FaCalendarAlt size={16} color={theme.primary} />
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={newAssignment.deadline}
                    onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                    required
                    className="input-focus"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: `2px solid ${theme.inputBorder}`,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      backgroundColor: theme.inputBg,
                      outline: 'none',
                      fontWeight: '600',
                      transition: theme.transition,
                      boxSizing: 'border-box',
                      color: theme.text
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="button-hover"
                  style={{
                    padding: '16px 32px',
                    background: submitting 
                      ? '#9ca3af'
                      : `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '700',
                    transition: theme.transition,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  {submitting ? (
                    <>
                      <FaSpinner size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      Adding...
                    </>
                  ) : (
                    <>
                      <FaPlus size={18} />
                      Add Assignment
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="divider" style={{
            background: `linear-gradient(180deg, transparent, ${theme.border}, transparent)`,
            width: '2px',
            height: '100%'
          }} />

          {/* Assignments List */}
          <div className="slide-in-right table-section">
            <div className="card-hover" style={{
              background: theme.card,
              borderRadius: '20px',
              padding: '32px',
              border: `1px solid ${theme.border}`,
              boxShadow: theme.shadow,
              maxHeight: '600px',
              overflow: 'auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
                }}>
                  <FaClipboardList size={20} />
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: theme.text
                }}>
                  Current Assignments
                </h2>
              </div>

              {loading ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px',
                  color: theme.text,
                  opacity: 0.7
                }}>
                  <FaSpinner size={24} style={{ animation: 'spin 1s linear infinite', marginRight: '12px' }} />
                  Loading assignments...
                </div>
              ) : assignments.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: theme.text,
                  opacity: 0.7
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
                    No assignments yet
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                    Add your first assignment to get started!
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {assignments.map((assignment, index) => {
                    const daysLeft = getDaysUntilDeadline(assignment.deadline);
                    const statusColor = getStatusColor(assignment.deadline);
                    const statusIcon = getStatusIcon(assignment.deadline);
                    
                    return (
                      <div
                        key={assignment.id || assignment._id}
                        className="fade-in-up card-hover"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          background: theme.card,
                          borderRadius: '16px',
                          padding: '24px',
                          border: `1px solid ${theme.border}`,
                          boxShadow: theme.shadow,
                          transition: theme.transition,
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '12px'
                        }}>
                          <h3 style={{
                            margin: 0,
                            fontSize: '1.3rem',
                            fontWeight: '800',
                            color: theme.text,
                            flex: 1
                          }}>
                            {assignment.title}
                          </h3>
                          <div style={{
                            color: statusColor,
                            fontSize: '1.2rem'
                          }}>
                            {statusIcon}
                          </div>
                        </div>
                        
                        <p style={{
                          color: theme.text,
                          opacity: 0.8,
                          margin: '0 0 16px 0',
                          lineHeight: '1.6',
                          fontSize: '0.95rem'
                        }}>
                          {assignment.description}
                        </p>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: theme.primary,
                            fontWeight: '600',
                            fontSize: '0.9rem'
                          }}>
                            <FaGraduationCap size={14} />
                            {assignment.grade}
                          </div>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: statusColor,
                            fontWeight: '600',
                            fontSize: '0.9rem'
                          }}>
                            <FaCalendarAlt size={14} />
                            {formatDate(assignment.deadline)}
                            {daysLeft !== null && (
                              <span style={{
                                background: statusColor,
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: '700'
                              }}>
                                {daysLeft < 0 ? 'Overdue' : daysLeft === 0 ? 'Due Today' : `${daysLeft} days left`}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Assignments;
