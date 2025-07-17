// StudentAssignments.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AssignmentsContainer,
  SidebarContainer,
  Content,
  AssignmentCard,
  AssignmentTitle,
  AssignmentDescription,
  AssignmentButton,
  AssignmentDoneMessage,
} from '../../styles/AssignmentsStyles'; // Import styled components from AssignmentStyles.js

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]); // Track submitted assignments
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [popupMsg, setPopupMsg] = useState('');

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

  const handleDoAssignment = (id, opinion, assignmentTitle) => {
    // Add to submitted assignments
    setSubmittedAssignments(prev => [
      ...prev,
      { id, opinion, title: assignmentTitle, submittedAt: new Date().toLocaleString() }
    ]);
    setPopupMsg('Assignment submitted');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <AssignmentsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <h1>Assignments</h1>
        {showPopup && (
          <div style={{
            background: '#4caf50',
            color: 'white',
            padding: '10px 20px',
            position: 'fixed',
            top: 20,
            right: 20,
            borderRadius: 5,
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>{popupMsg}</div>
        )}
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id}>
            <AssignmentTitle>{assignment.title}</AssignmentTitle>
            <AssignmentDescription>{assignment.description}</AssignmentDescription>
            {!assignment.done ? (
              <AssignmentForm onDoAssignment={(opinion) => handleDoAssignment(assignment.id, opinion, assignment.title)} />
            ) : (
              <AssignmentDoneMessage>Assignment Done</AssignmentDoneMessage>
            )}
          </AssignmentCard>
        ))}
        {/* Submitted Assignments Section */}
        <div style={{ marginTop: '40px' }}>
          <h2>Submitted Assignments</h2>
          {submittedAssignments.length === 0 ? (
            <p>No assignments submitted yet.</p>
          ) : (
            <ul>
              {submittedAssignments.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '10px', background: '#f9f9f9', padding: '10px', borderRadius: '6px' }}>
                  <strong>{item.title}</strong> <br/>
                  <span style={{ color: '#555' }}>Submitted at: {item.submittedAt}</span><br/>
                  <span>Answer: {item.opinion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Content>
    </AssignmentsContainer>
  );
};

const AssignmentForm = ({ onDoAssignment }) => {
  const [opinion, setOpinion] = useState('');

  const handleInputChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (opinion.trim() !== '') {
      onDoAssignment(opinion);
      setOpinion('');
    } else {
      alert("Please provide your opinion/assignment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={opinion} onChange={handleInputChange} placeholder="Enter your opinion/assignment..." />
      <AssignmentButton type="submit">Submit</AssignmentButton>
    </form>
  );
};

export default StudentAssignments;
