import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaClipboardList, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import {
  AssignmentsContainer,
  Content,
  AssignmentsContent,
  AssignmentsHeader,
  AssignmentList,
  AssignmentItem,
  AddAssignmentForm,
  AddAssignmentInput,
  AddAssignmentTextArea,
  AddAssignmentButton,
  AssignmentBanner,
  BannerIcon,
  BannerText,
  BannerTitle,
  BannerSubtitle,
  Card,
  AssignmentListCard,
  AssignmentTitle,
  AssignmentDescription,
  AssignmentMeta,
  MetaItem,
  GradeBadge,
  DeadlineBadge,
} from '../../styles/AssignmentsStyles';

const Assignments = () => {
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.title.trim() !== '' && newAssignment.description.trim() !== '' && newAssignment.grade.trim() !== '' && newAssignment.deadline.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/assignments', newAssignment);
        // Display success toast message
        toast.success('Assignment added successfully');
        // Add the new assignment to the list
        setAssignments([...assignments, response.data.assignment]);
        // Clear the form
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
        // Display error toast message
        toast.error('Error adding assignment');
      }
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

  return (
    <AssignmentsContainer>
      <ToastContainer />
      <Sidebar />
      <Content>
        <AssignmentsContent>
          <AssignmentsHeader>Assignments</AssignmentsHeader>
          
          <AssignmentBanner>
            <BannerIcon><FaClipboardList /></BannerIcon>
            <BannerText>
              <BannerTitle>Task Management Hub</BannerTitle>
              <BannerSubtitle>"Organize, track, and manage academic assignments with precision and ease."</BannerSubtitle>
            </BannerText>
          </AssignmentBanner>

          <Card>
            <AddAssignmentForm onSubmit={handleAddAssignment}>
              <AddAssignmentInput
                type="text"
                placeholder="Enter assignment title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
              />
              <AddAssignmentTextArea
                placeholder="Enter assignment description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
              />
              <AddAssignmentInput
                type="text"
                placeholder="Enter assignment grade"
                value={newAssignment.grade}
                onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
              />
              <AddAssignmentInput
                type="date"
                placeholder="Enter assignment deadline"
                value={newAssignment.deadline}
                onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
              />
              <AddAssignmentButton type="submit">Add Assignment</AddAssignmentButton>
            </AddAssignmentForm>
          </Card>

          <AssignmentListCard>
            <div style={{
              fontWeight: 700,
              color: '#667eea',
              fontSize: '1.1rem',
              marginBottom: 16,
              letterSpacing: 0.5
            }}>
              Current Assignments
            </div>
            <AssignmentList>
              {assignments.map((assignment, index) => (
                <AssignmentItem key={assignment.id || assignment._id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <AssignmentTitle>{assignment.title}</AssignmentTitle>
                  <AssignmentDescription>{assignment.description}</AssignmentDescription>
                  <AssignmentMeta>
                    <MetaItem>
                      <FaGraduationCap />
                      <GradeBadge>{assignment.grade}</GradeBadge>
                    </MetaItem>
                    <MetaItem>
                      <FaCalendarAlt />
                      <DeadlineBadge>{formatDate(assignment.deadline)}</DeadlineBadge>
                    </MetaItem>
                  </AssignmentMeta>
                </AssignmentItem>
              ))}
            </AssignmentList>
          </AssignmentListCard>
        </AssignmentsContent>
      </Content>
    </AssignmentsContainer>
  );
};

export default Assignments;
