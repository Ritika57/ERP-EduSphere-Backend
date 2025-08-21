// StudentAssignments.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  FaFileAlt, 
  FaCheckCircle, 
  FaClock, 
  FaUserGraduate,
  FaPlus,
  FaTimes,
  FaPaperPlane
} from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

// Styled Components
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const AssignmentsContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 32px 40px;
  margin-left: 250px;
  background: #f8fafc;
  min-height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 700px) {
    margin-left: 0;
    padding: 20px 16px;
  }
`;

const Header = styled.div`
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  margin: 0;
  font-weight: 400;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  font-size: 1.2rem;
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a202c;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
  margin-top: 4px;
`;

const AssignmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;
`;

const AssignmentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.completed ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #667eea, #764ba2)'};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
`;

const AssignmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const AssignmentTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  flex: 1;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.completed ? '#d1fae5' : '#fef3c7'};
  color: ${props => props.completed ? '#065f46' : '#92400e'};
  border: 1px solid ${props => props.completed ? '#a7f3d0' : '#fde68a'};
`;

const AssignmentDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
`;

const AssignmentMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #718096;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AssignmentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TextArea = styled.textarea`
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #f8fafc;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    border-color: #667eea;
    outline: none;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CompletedMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #d1fae5;
  border: 1px solid #a7f3d0;
  border-radius: 12px;
  color: #065f46;
  font-weight: 600;
  font-size: 0.9rem;
`;

const SubmittedSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  animation: ${fadeInUp} 0.6s ease-out 0.3s both;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SubmittedList = styled.div`
  display: grid;
  gap: 16px;
`;

const SubmittedItem = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }
`;

const SubmittedTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px 0;
`;

const SubmittedMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 8px;
`;

const SubmittedAnswer = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  background: white;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  z-index: 1000;
  animation: ${slideInRight} 0.3s ease-out;
  background: ${props => props.success ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
`;

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignments();
    fetchSubmittedAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      // Get student info from localStorage to get their grade
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      console.log(studentInfo);
      
      if (!studentInfo || !studentInfo.grade) {
        console.error('Student grade not found in localStorage');
        showNotification('Unable to fetch assignments: Student grade not found', false);
        return;
      }

      // Fetch all assignments from backend
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      const allAssignments = response.data.assignments || [];
      
      // Filter assignments locally based on student's grade
      const gradeFilteredAssignments = allAssignments.filter(assignment => {
        // Handle different grade formats (e.g., "10", "Grade 10", "10th")
        const assignmentGrade = assignment.grade?.toString().toLowerCase();
        const studentGrade = studentInfo.grade?.toString().toLowerCase();
        
        if (!assignmentGrade || !studentGrade) return false;
        
        // Direct match
        if (assignmentGrade === studentGrade) return true;
        
        // Extract numbers for comparison
        const assignmentGradeNum = assignmentGrade.match(/\d+/)?.[0];
        const studentGradeNum = studentGrade.match(/\d+/)?.[0];
        
        return assignmentGradeNum && studentGradeNum && assignmentGradeNum === studentGradeNum;
      });
      
      console.log('All assignments:', allAssignments.length);
      console.log('Filtered assignments for grade', studentInfo.grade + ':', gradeFilteredAssignments.length);
      setAssignments(gradeFilteredAssignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      showNotification('Error fetching assignments', false);
    }
  };

  const fetchSubmittedAssignments = async () => {
    try {
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      if (!studentInfo || !studentInfo.id) {
        return;
      }

      const response = await axios.get(`http://localhost:4000/api/v1/assignments/submissions/${studentInfo.id}`);
      if (response.data.success) {
        const submissions = response.data.submissions.map(sub => ({
          id: sub.assignmentId._id,
          title: sub.assignmentId.title,
          answer: sub.answer,
          submittedAt: new Date(sub.submittedAt).toLocaleString()
        }));
        setSubmittedAssignments(submissions);
      }
    } catch (error) {
      console.error('Error fetching submitted assignments:', error);
    }
  };

  const handleSubmitAssignment = async (assignmentId, answer) => {
    try {
      setLoading(true);
      
      // Get student info from localStorage
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      console.log('Student info from localStorage:', studentInfo);
      
      if (!studentInfo || !studentInfo.id) {
        showNotification('Please sign in to submit assignments', false);
        return;
      }

      // Debug logging
      console.log('Submitting assignment with data:', {
        assignmentId,
        studentId: studentInfo.id,
        answer,
        studentInfo
      });

      // Validate data before sending
      if (!assignmentId || !answer.trim()) {
        showNotification('Please provide an answer for the assignment', false);
        return;
      }

      // Validate assignmentId format (should be a valid MongoDB ObjectId)
      if (!assignmentId.match(/^[0-9a-fA-F]{24}$/)) {
        console.error('Invalid assignment ID format:', assignmentId);
        showNotification('Invalid assignment ID format', false);
        return;
      }

      // Validate studentId format
      if (!studentInfo.id.match(/^[0-9a-fA-F]{24}$/)) {
        console.error('Invalid student ID format:', studentInfo.id);
        showNotification('Invalid student ID format', false);
        return;
      }

      // Call backend API to submit assignment
      const response = await axios.post('http://localhost:4000/api/v1/assignments/submit', {
        assignmentId: assignmentId,
        studentId: studentInfo.id,
        answer: answer.trim()
      });

      console.log('Backend response:', response.data);

      if (response.data.success) {
        showNotification('Assignment submitted successfully!', true);
        
        // Clear the specific form
        const form = document.querySelector(`form[data-assignment-id="${assignmentId}"]`);
        if (form) {
          form.reset();
        }

        // Refresh submitted assignments from backend
        await fetchSubmittedAssignments();
      } else {
        showNotification(response.data.message || 'Failed to submit assignment', false);
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      console.error('Error response:', error.response?.data);
      showNotification(error.response?.data?.message || 'Error submitting assignment', false);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, success) => {
    setNotification({ message, success });
    setTimeout(() => setNotification(null), 3000);
  };

  const isAssignmentSubmitted = (assignmentId) => {
    return submittedAssignments.some(sub => sub.id === assignmentId);
  };

  const getSubmittedAssignment = (assignmentId) => {
    return submittedAssignments.find(sub => sub.id === assignmentId);
  };

  const totalAssignments = assignments.length;
  const completedAssignments = submittedAssignments.length;
  const pendingAssignments = totalAssignments - completedAssignments;

  return (
    <AssignmentsContainer>
        <Sidebar />
      <Content>
        <Header>
          <Title>Assignments</Title>
          <Subtitle>Complete your assignments and track your progress</Subtitle>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
              <FaFileAlt />
            </StatIcon>
            <StatInfo>
              <StatNumber>{totalAssignments}</StatNumber>
              <StatLabel>Total Assignments</StatLabel>
            </StatInfo>
          </StatCard>
          
          <StatCard>
            <StatIcon background="linear-gradient(135deg, #10b981 0%, #059669 100%)">
              <FaCheckCircle />
            </StatIcon>
            <StatInfo>
              <StatNumber>{completedAssignments}</StatNumber>
              <StatLabel>Completed</StatLabel>
            </StatInfo>
          </StatCard>
          
          <StatCard>
            <StatIcon background="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)">
              <FaClock />
            </StatIcon>
            <StatInfo>
              <StatNumber>{pendingAssignments}</StatNumber>
              <StatLabel>Pending</StatLabel>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        <AssignmentsGrid>
          {assignments.map((assignment) => {
            const isSubmitted = isAssignmentSubmitted(assignment._id);
            const submittedAssignment = getSubmittedAssignment(assignment._id);
            
            console.log('Rendering assignment:', {
              assignment,
              id: assignment._id,
              isSubmitted,
              submittedAssignment
            });
            
            return (
              <AssignmentCard key={assignment._id} completed={isSubmitted}>
                <AssignmentHeader>
            <AssignmentTitle>{assignment.title}</AssignmentTitle>
                  <StatusBadge completed={isSubmitted}>
                    {isSubmitted ? 'Completed' : 'Pending'}
                  </StatusBadge>
                </AssignmentHeader>
                
            <AssignmentDescription>{assignment.description}</AssignmentDescription>
                
                <AssignmentMeta>
                  <MetaItem>
                    <FaUserGraduate />
                    <span>Student Assignment</span>
                  </MetaItem>
                  <MetaItem>
                    <FaClock />
                    <span>Due: {assignment.deadline || 'No deadline'}</span>
                  </MetaItem>
                </AssignmentMeta>

                {isSubmitted ? (
                  <CompletedMessage>
                    <FaCheckCircle />
                    Assignment submitted on {submittedAssignment.submittedAt}
                  </CompletedMessage>
                ) : (
                  <AssignmentForm 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const answer = formData.get('answer');
                      if (answer.trim()) {
                        handleSubmitAssignment(assignment._id, answer);
                      }
                    }}
                    data-assignment-id={assignment._id}
                  >
                    <TextArea
                      name="answer"
                      placeholder="Enter your answer here..."
                      required
                    />
                    <SubmitButton type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <FaClock />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Submit Assignment
                        </>
                      )}
                    </SubmitButton>
                  </AssignmentForm>
            )}
          </AssignmentCard>
            );
          })}
        </AssignmentsGrid>

        {submittedAssignments.length > 0 && (
          <SubmittedSection>
            <SectionTitle>
              <FaCheckCircle />
              Submitted Assignments
            </SectionTitle>
            <SubmittedList>
              {submittedAssignments.map((submission, index) => (
                <SubmittedItem key={index}>
                  <SubmittedTitle>{submission.title}</SubmittedTitle>
                  <SubmittedMeta>
                    <span>Submitted: {submission.submittedAt}</span>
                  </SubmittedMeta>
                  <SubmittedAnswer>{submission.answer}</SubmittedAnswer>
                </SubmittedItem>
              ))}
            </SubmittedList>
          </SubmittedSection>
        )}

        {notification && (
          <Notification success={notification.success}>
            {notification.message}
          </Notification>
        )}
      </Content>
    </AssignmentsContainer>
  );
};

export default StudentAssignments;
