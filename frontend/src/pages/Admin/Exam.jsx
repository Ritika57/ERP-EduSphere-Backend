// Exam.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaPlus, FaListAlt, FaSpinner, FaGraduationCap, FaChartBar, FaUserGraduate, FaEnvelope, FaBook, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import bgImg from '../../assets/bg.png';
import {
  ExamContainer,
  Content
} from '../../styles/ExamStyles';

// Add CSS animations
const addAnimations = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0, -30px, 0);
      }
      70% {
        transform: translate3d(0, -15px, 0);
      }
      90% {
        transform: translate3d(0, -4px, 0);
      }
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
      }
      50% {
        box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);
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
    
    .pulse {
      animation: pulse 2s infinite;
    }
    
    .bounce {
      animation: bounce 1s;
    }
    
    .float {
      animation: float 3s ease-in-out infinite;
    }
    
    .glow {
      animation: glow 2s ease-in-out infinite;
    }
    
    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      background-size: 200px 100%;
      animation: shimmer 1.5s infinite;
    }
    
    .stagger-animation {
      animation: fadeInUp 0.6s ease-out;
      animation-fill-mode: both;
    }
    
    .stagger-animation:nth-child(1) { animation-delay: 0.1s; }
    .stagger-animation:nth-child(2) { animation-delay: 0.2s; }
    .stagger-animation:nth-child(3) { animation-delay: 0.3s; }
    .stagger-animation:nth-child(4) { animation-delay: 0.4s; }
    .stagger-animation:nth-child(5) { animation-delay: 0.5s; }
    
    .card-hover {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .card-hover:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
    }
    
    .button-hover {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .button-hover:hover {
      transform: translateY(-2px) scale(1.05);
    }
    
    .input-focus {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .input-focus:focus {
      transform: scale(1.02);
      box-shadow: 0 8px 28px rgba(102, 126, 234, 0.25);
    }
    
    .ripple {
      position: relative;
      overflow: hidden;
    }
    
    .ripple::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    .ripple:active::after {
      width: 300px;
      height: 300px;
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
};

const Exam = () => {
  const [examData, setExamData] = useState([]);
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [className, setClassName] = useState('');
  const [marks, setMarks] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    addAnimations();
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/v1/exam/getall');
      if (Array.isArray(response.data.exams)) {
        setExamData(response.data.exams);
      } else {
        setExamData([]);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
      setExamData([]);
      setError('Failed to load exam data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);
    setMessage(null);
    setError(null);
    
    const newExam = { name, registrationNumber, className, marks: parseInt(marks), email };
    try {
      const response = await axios.post('http://localhost:4000/api/v1/exam', newExam);
      if (response.data && response.data.exam) {
        setExamData([...examData, response.data.exam]);
        setName('');
        setRegistrationNumber('');
        setClassName('');
        setMarks('');
        setEmail('');
        setMessage('Exam added successfully!');
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error adding exam:', error);
      setError('Failed to add exam. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateTotalMarks = () => {
    return examData.reduce((total, exam) => total + exam.marks, 0);
  };

  const calculateAverageMarks = () => {
    if (examData.length === 0) return 0;
    return Math.round(calculateTotalMarks() / examData.length);
  };

  const clearMessages = () => {
    setMessage(null);
    setError(null);
  };

  return (
    <ExamContainer>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 0,
        opacity: 0.18,
        filter: 'blur(2.5px) brightness(1.08)',
        pointerEvents: 'none',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
      <Sidebar />
      <Content>
        <div style={{ 
          maxWidth: 1200, 
          margin: '40px auto', 
          padding: '0 24px' 
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
            borderRadius: '36px',
            padding: '48px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.4)',
            backdropFilter: 'blur(25px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated Decorative Elements */}
            <div className="float" style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: '240px',
              height: '240px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              opacity: 0.08,
              filter: 'blur(50px)'
            }} />
            <div className="float" style={{
              position: 'absolute',
              bottom: -40,
              left: -40,
              width: '180px',
              height: '180px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '50%',
              opacity: 0.08,
              filter: 'blur(40px)',
              animationDelay: '1s'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Header */}
              <div className="fade-in-up" style={{
                textAlign: 'center',
                marginBottom: '48px'
              }}>
                <h1 style={{
                  fontSize: '3.5rem',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0 0 12px 0',
                  textShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  letterSpacing: '-1px'
                }}>
                  Exam Management
                </h1>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#666',
                  margin: 0,
                  fontWeight: '600',
                  opacity: 0.8
                }}>
                  Manage student exam records and performance tracking
                </p>
              </div>

              {loading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '80px 20px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    border: '6px solid #f3f3f3',
                    borderTop: '6px solid #667eea',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                </div>
              ) : (
                <>
                  {/* Messages */}
                  {message && (
                    <div className="slide-in-right" style={{
                      padding: '20px 28px',
                      background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
                      color: 'white',
                      borderRadius: '20px',
                      marginBottom: '32px',
                      fontWeight: '700',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 12px 32px rgba(0, 184, 148, 0.4)',
                      fontSize: '1.1rem'
                    }} onClick={clearMessages}>
                      <FaCheckCircle size={20} style={{ marginRight: '10px' }} />
                      {message}
                    </div>
                  )}
                  {error && (
                    <div className="slide-in-right" style={{
                      padding: '20px 28px',
                      background: 'linear-gradient(135deg, #e17055 0%, #d63031 100%)',
                      color: 'white',
                      borderRadius: '20px',
                      marginBottom: '32px',
                      fontWeight: '700',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 12px 32px rgba(225, 112, 85, 0.4)',
                      fontSize: '1.1rem'
                    }} onClick={clearMessages}>
                      <FaTimesCircle size={20} style={{ marginRight: '10px' }} />
                      {error}
                    </div>
                  )}

                  {/* Stats Cards */}
                  <div className="slide-in-left stats-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px'
                  }}>
                    <div className="card-hover" style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '24px',
                      padding: '32px',
                      color: 'white',
                      textAlign: 'center',
                      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)'
                    }}>
                      <FaGraduationCap size={40} style={{ marginBottom: '16px' }} />
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', fontWeight: '800' }}>
                        {examData.length}
                      </h3>
                      <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>
                        Total Exams
                      </p>
                    </div>
                    
                    <div className="card-hover" style={{
                      background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
                      borderRadius: '24px',
                      padding: '32px',
                      color: 'white',
                      textAlign: 'center',
                      boxShadow: '0 12px 40px rgba(0, 184, 148, 0.3)'
                    }}>
                      <FaChartBar size={40} style={{ marginBottom: '16px' }} />
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', fontWeight: '800' }}>
                        {calculateTotalMarks()}
                      </h3>
                      <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>
                        Total Marks
                      </p>
                    </div>
                    
                    <div className="card-hover" style={{
                      background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
                      borderRadius: '24px',
                      padding: '32px',
                      color: 'white',
                      textAlign: 'center',
                      boxShadow: '0 12px 40px rgba(253, 203, 110, 0.3)'
                    }}>
                      <FaUserGraduate size={40} style={{ marginBottom: '16px' }} />
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', fontWeight: '800' }}>
                        {calculateAverageMarks()}
                      </h3>
                      <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>
                        Average Marks
                      </p>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="main-content-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2px 1fr',
                    gap: '40px',
                    alignItems: 'start'
                  }}>
                    {/* Add Exam Form */}
                    <div className="slide-in-left form-section">
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        borderRadius: '24px',
                        padding: '32px',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
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
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                          }}>
                            <FaPlus size={20} />
                          </div>
                          <h2 style={{
                            margin: 0,
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            color: '#333'
                          }}>
                            Add Exam Record
                          </h2>
                        </div>

                        <form onSubmit={handleAddExam} style={{ 
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
                              color: '#333',
                              marginBottom: '8px'
                            }}>
                              <FaBook size={16} color="#667eea" />
                              Subject
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="input-focus"
                              style={{
                                width: '100%',
                                padding: '16px 20px',
                                border: '2px solid #e1e8ed',
                                borderRadius: '16px',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                outline: 'none',
                                fontWeight: '600',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 8px 28px rgba(102, 126, 234, 0.25)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = '#e1e8ed';
                                e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
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
                              color: '#333',
                              marginBottom: '8px'
                            }}>
                              <FaUserGraduate size={16} color="#667eea" />
                              Registration Number
                            </label>
                            <input
                              type="text"
                              value={registrationNumber}
                              onChange={(e) => setRegistrationNumber(e.target.value)}
                              required
                              className="input-focus"
                              style={{
                                width: '100%',
                                padding: '16px 20px',
                                border: '2px solid #e1e8ed',
                                borderRadius: '16px',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                outline: 'none',
                                fontWeight: '600',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 8px 28px rgba(102, 126, 234, 0.25)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = '#e1e8ed';
                                e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
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
                              color: '#333',
                              marginBottom: '8px'
                            }}>
                              <FaGraduationCap size={16} color="#667eea" />
                              Class
                            </label>
                            <input
                              type="text"
                              value={className}
                              onChange={(e) => setClassName(e.target.value)}
                              required
                              className="input-focus"
                              style={{
                                width: '100%',
                                padding: '16px 20px',
                                border: '2px solid #e1e8ed',
                                borderRadius: '16px',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                outline: 'none',
                                fontWeight: '600',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 8px 28px rgba(102, 126, 234, 0.25)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = '#e1e8ed';
                                e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
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
                              color: '#333',
                              marginBottom: '8px'
                            }}>
                              <FaChartBar size={16} color="#667eea" />
                              Marks
                            </label>
                            <input
                              type="number"
                              value={marks}
                              onChange={(e) => setMarks(e.target.value)}
                              required
                              className="input-focus"
                              style={{
                                width: '100%',
                                padding: '16px 20px',
                                border: '2px solid #e1e8ed',
                                borderRadius: '16px',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                outline: 'none',
                                fontWeight: '600',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 8px 28px rgba(102, 126, 234, 0.25)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = '#e1e8ed';
                                e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
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
                              color: '#333',
                              marginBottom: '8px'
                            }}>
                              <FaEnvelope size={16} color="#667eea" />
                              Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="input-focus"
                              style={{
                                width: '100%',
                                padding: '16px 20px',
                                border: '2px solid #e1e8ed',
                                borderRadius: '16px',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                                outline: 'none',
                                fontWeight: '600',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 8px 28px rgba(102, 126, 234, 0.25)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = '#e1e8ed';
                                e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
                              }}
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={submitting}
                            className={`button-hover ripple ${submitting ? '' : 'glow'}`}
                            style={{
                              padding: '18px 32px',
                              background: submitting 
                                ? 'linear-gradient(135deg, #b2bec3 0%, #95a5a6 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '20px',
                              cursor: submitting ? 'not-allowed' : 'pointer',
                              fontSize: '1.1rem',
                              fontWeight: '800',
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: submitting 
                                ? '0 6px 20px rgba(0,0,0,0.1)'
                                : '0 12px 40px rgba(102, 126, 234, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '12px',
                              letterSpacing: '0.5px',
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
                                Add Exam Record
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="divider" style={{
                      background: 'linear-gradient(180deg, transparent, #e1e8ed, transparent)',
                      width: '2px',
                      height: '100%'
                    }} />

                    {/* Exam Details */}
                    <div className="slide-in-right table-section">
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 160, 133, 0.1) 100%)',
                        borderRadius: '24px',
                        padding: '32px',
                        border: '1px solid rgba(0, 184, 148, 0.2)'
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
                            background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 8px 24px rgba(0, 184, 148, 0.3)'
                          }}>
                            <FaListAlt size={20} />
                          </div>
                          <h2 style={{
                            margin: 0,
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            color: '#333'
                          }}>
                            Exam Records
                          </h2>
                        </div>

                        {examData.length === 0 ? (
                          <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: '#666'
                          }}>
                            <FaListAlt size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <p style={{ fontSize: '1.1rem', margin: 0 }}>
                              No exam records found. Add your first exam record above.
                            </p>
                          </div>
                        ) : (
                          <div style={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                            borderRadius: '16px',
                            background: 'rgba(255,255,255,0.5)',
                            padding: '8px'
                          }}>
                            <table style={{
                              width: '100%',
                              borderCollapse: 'collapse'
                            }}>
                              <thead>
                                <tr style={{
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  color: 'white'
                                }}>
                                  <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    fontSize: '0.95rem',
                                    borderRadius: '12px 0 0 0'
                                  }}>
                                    Subject
                                  </th>
                                  <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    fontSize: '0.95rem'
                                  }}>
                                    Reg. Number
                                  </th>
                                  <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    fontSize: '0.95rem'
                                  }}>
                                    Class
                                  </th>
                                  <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    fontSize: '0.95rem'
                                  }}>
                                    Marks
                                  </th>
                                  <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    fontSize: '0.95rem',
                                    borderRadius: '0 12px 0 0'
                                  }}>
                                    Email
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {examData.map((exam, index) => (
                                  <tr
                                    key={index}
                                    className="stagger-animation"
                                    style={{
                                      background: index % 2 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)',
                                      transition: 'all 0.3s ease',
                                      animationDelay: `${index * 0.1}s`
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                                      e.currentTarget.style.transform = 'scale(1.01)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = index % 2 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)';
                                      e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                  >
                                    <td style={{
                                      padding: '16px 12px',
                                      fontWeight: '600',
                                      color: '#333'
                                    }}>
                                      {exam.name}
                                    </td>
                                    <td style={{
                                      padding: '16px 12px',
                                      fontWeight: '600',
                                      color: '#667eea'
                                    }}>
                                      {exam.registrationNumber}
                                    </td>
                                    <td style={{
                                      padding: '16px 12px',
                                      fontWeight: '600',
                                      color: '#333'
                                    }}>
                                      {exam.className}
                                    </td>
                                    <td style={{
                                      padding: '16px 12px',
                                      fontWeight: '800',
                                      color: '#00b894',
                                      fontSize: '1.1rem'
                                    }}>
                                      {exam.marks}
                                    </td>
                                    <td style={{
                                      padding: '16px 12px',
                                      fontWeight: '600',
                                      color: '#667eea',
                                      fontSize: '0.9rem'
                                    }}>
                                      {exam.email}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Content>
    </ExamContainer>
  );
};

export default Exam;
