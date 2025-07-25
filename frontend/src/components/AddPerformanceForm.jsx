import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaUserGraduate, FaEnvelope, FaStar, FaBook, FaCalendarAlt, FaPlus, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

// Animation for form entrance
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animation for feedback messages
const popIn = keyframes`
  0% { transform: scale(0.95); opacity: 0; }
  60% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const FormContainer = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 24px;
  padding: 40px 36px 32px 36px;
  margin-bottom: 48px;
  border: 2.5px solid transparent;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10), 0 1.5px 8px rgba(0,0,0,0.04);
  transition: box-shadow 0.3s, border 0.3s;
  animation: ${fadeInUp} 0.7s cubic-bezier(.4,2,.6,1);
  position: relative;
  z-index: 1;
  border-image: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent}) 1;

  &:hover {
    box-shadow: 0 16px 48px rgba(37,99,235,0.16), 0 2px 12px rgba(0,0,0,0.08);
    border: 2.5px solid ${({ theme }) => theme.primary};
  }
`;

const FormTitle = styled.h3`
  font-size: 2.1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0 0 32px 0;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  letter-spacing: -1px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
    border-radius: 2px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 32px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.1px;
`;

const Input = styled.input`
  padding: 14px 18px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  font-size: 1.05rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.45;
  }
`;

const Select = styled.select`
  padding: 14px 18px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  font-size: 1.05rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;
  }

  option {
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  color: white;
  border: none;
  border-radius: 14px;
  padding: 16px 38px;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 16px rgba(37,99,235,0.13);
  margin-top: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 24px rgba(37,99,235,0.18);
    background: linear-gradient(135deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.primary});
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  padding: 14px 18px;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1.02rem;
  animation: ${popIn} 0.5s cubic-bezier(.4,2,.6,1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: #10b98122;
          color: #10b981;
          border: 1.5px solid #10b98144;
        `;
      case 'error':
        return `
          background: #ef444422;
          color: #ef4444;
          border: 1.5px solid #ef444444;
        `;
      default:
        return `
          background: #3b82f622;
          color: #3b82f6;
          border: 1.5px solid #3b82f644;
        `;
    }
  }}
`;

const LoadingText = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-style: italic;
  font-size: 1.01rem;
`;

// Glassmorphism and animated background
const AnimatedBg = styled.div`
  position: absolute;
  top: -60px;
  left: -60px;
  width: 340px;
  height: 340px;
  z-index: 0;
  filter: blur(60px);
  opacity: 0.7;
  background: radial-gradient(circle at 60% 40%, ${({ theme }) => theme.primary}99 0%, ${({ theme }) => theme.accent}66 60%, transparent 100%);
  animation: floatBg 7s ease-in-out infinite alternate;

  @keyframes floatBg {
    0% { transform: scale(1) translateY(0) translateX(0); }
    100% { transform: scale(1.1) translateY(30px) translateX(40px); }
  }
`;

const GlassFormContainer = styled(FormContainer)`
  background: rgba(255,255,255,0.18);
  box-shadow: 0 8px 40px 0 rgba(37,99,235,0.18), 0 1.5px 8px rgba(0,0,0,0.04);
  backdrop-filter: blur(16px) saturate(1.2);
  border: 2.5px solid rgba(255,255,255,0.22);
  overflow: hidden;
`;

const AnimatedIcon = styled.span`
  display: flex;
  align-items: center;
  animation: iconPop 1.2s cubic-bezier(.4,2,.6,1) infinite alternate;
  @keyframes iconPop {
    0% { transform: scale(1) rotate(-6deg); }
    100% { transform: scale(1.13) rotate(8deg); }
  }
`;

const GlowingButton = styled(SubmitButton)`
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 0 16px 2px ${({ theme }) => theme.primary}55, 0 2px 16px 0 ${({ theme }) => theme.accent}33;
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: box-shadow 0.22s, border 0.22s, background 0.22s;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    border-radius: 16px;
    background: linear-gradient(120deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.accent} 100%);
    filter: blur(8px);
    opacity: 0.7;
    transition: opacity 0.22s;
    animation: glowBtn 2.5s linear infinite alternate;
  }
  @keyframes glowBtn {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  &:hover::before {
    opacity: 1;
  }
`;

const AddPerformanceForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    student: '',
    score: '',
    subject: '',
    date: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch students for dropdown
    fetch('/api/v1/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data.students || []);
        setStudentsLoading(false);
      })
      .catch(() => setStudentsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If student is changed, auto-fill email
    if (name === 'student') {
      const selectedStudent = students.find(s => s._id === value);
      setForm({ ...form, student: value, email: selectedStudent ? selectedStudent.email : '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/v1/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student: form.student,
          score: Number(form.score),
          subject: form.subject,
          date: form.date || undefined,
          email: form.email
        })
      });
      if (!res.ok) throw new Error('Failed to add performance');
      setSuccess(true);
      setForm({ student: '', score: '', subject: '', date: '', email: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormClick = () => {
    // Navigate to the full performance page for more detailed form
    navigate('/admin/performance');
  };

  return (
    <div style={{ position: 'relative' }}>
      <AnimatedBg />
      <GlassFormContainer style={{ cursor: 'pointer' }}>
        <FormTitle>
          <AnimatedIcon><FaPlus size={24} /></AnimatedIcon>
          Add Performance Record
        </FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label>
                <AnimatedIcon><FaUserGraduate size={16} /></AnimatedIcon>
                Student Name
              </Label>
              {studentsLoading ? (
                <LoadingText>Loading students...</LoadingText>
              ) : (
                <Select name="student" value={form.student} onChange={handleChange} required>
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <FormGroup>
              <Label>
                <AnimatedIcon><FaEnvelope size={16} /></AnimatedIcon>
                Email
              </Label>
              <Input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                placeholder="student@email.com"
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <AnimatedIcon><FaStar size={16} /></AnimatedIcon>
                Score
              </Label>
              <Input 
                name="score" 
                type="number" 
                value={form.score} 
                onChange={handleChange} 
                required 
                min="0" 
                max="100"
                placeholder="Enter score (0-100)"
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <AnimatedIcon><FaBook size={16} /></AnimatedIcon>
                Subject
              </Label>
              <Input 
                name="subject" 
                value={form.subject} 
                onChange={handleChange}
                placeholder="e.g., Mathematics, Science"
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <AnimatedIcon><FaCalendarAlt size={16} /></AnimatedIcon>
                Date
              </Label>
              <Input 
                name="date" 
                type="date" 
                value={form.date} 
                onChange={handleChange}
              />
            </FormGroup>
          </FormGrid>
          <GlowingButton type="submit" disabled={loading || studentsLoading}>
            {loading ? (
              <>
                <FaCheck size={18} />
                Adding Performance...
              </>
            ) : (
              <>
                <FaPlus size={18} />
                Add Performance
              </>
            )}
          </GlowingButton>
          {success && (
            <Message type="success">
              <FaCheck size={18} />
              Performance record added successfully!
            </Message>
          )}
          {error && (
            <Message type="error">
              <FaExclamationTriangle size={18} />
              {error}
            </Message>
          )}
        </form>
      </GlassFormContainer>
    </div>
  );
};

export default AddPerformanceForm; 