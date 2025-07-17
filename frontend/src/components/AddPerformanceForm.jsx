import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUserGraduate, FaEnvelope, FaStar, FaBook, FaCalendarAlt, FaPlus, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const FormContainer = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 40px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
    border-radius: 2px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
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
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(37,99,235,0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37,99,235,0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: #10b98120;
          color: #10b981;
          border: 1px solid #10b98140;
        `;
      case 'error':
        return `
          background: #ef444420;
          color: #ef4444;
          border: 1px solid #ef444440;
        `;
      default:
        return `
          background: #3b82f620;
          color: #3b82f6;
          border: 1px solid #3b82f640;
        `;
    }
  }}
`;

const LoadingText = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-style: italic;
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

  return (
    <FormContainer>
      <FormTitle>
        <FaPlus size={20} />
        Add Performance Record
      </FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label>
              <FaUserGraduate size={14} />
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
              <FaEnvelope size={14} />
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
              <FaStar size={14} />
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
              <FaBook size={14} />
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
              <FaCalendarAlt size={14} />
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

        <SubmitButton type="submit" disabled={loading || studentsLoading}>
          {loading ? (
            <>
              <FaCheck size={16} />
              Adding Performance...
            </>
          ) : (
            <>
              <FaPlus size={16} />
              Add Performance
            </>
          )}
        </SubmitButton>

        {success && (
          <Message type="success">
            <FaCheck size={16} />
            Performance record added successfully!
          </Message>
        )}
        
        {error && (
          <Message type="error">
            <FaExclamationTriangle size={16} />
            {error}
          </Message>
        )}
      </form>
    </FormContainer>
  );
};

export default AddPerformanceForm; 