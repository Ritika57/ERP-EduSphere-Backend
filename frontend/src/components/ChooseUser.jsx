// ChooseUser.js
import React from 'react';
import { 
  OuterDiv, 
  PageTitle, 
  Subtitle, 
  ChooseUserContainer, 
  UserSection, 
  Title, 
  Button, 
  Footer 
} from '../styles/ChooseUserStyles';
import { FaUserShield, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

const ChooseUser = () => {
  return (
    <OuterDiv>
      <PageTitle>Welcome! Choose Your Role</PageTitle>
      <Subtitle>Please select your role to continue to the portal.</Subtitle>
      
      <ChooseUserContainer>
        <UserSection>
          <Title>Admin</Title>
          <FaUserShield size={60} color="#2563eb" />
          <Button to="/admin-signIn">Login as Admin</Button>
        </UserSection>
        
        <UserSection>
          <Title>Student</Title>
          <FaUserGraduate size={60} color="#10b981" />
          <Button to="/student-signIn">Login as Student</Button>
        </UserSection>
        
        <UserSection>
          <Title>Teacher</Title>
          <FaChalkboardTeacher size={60} color="#2563eb" />
          <Button to="/teacher-signIn">Login as Teacher</Button>
        </UserSection>
      </ChooseUserContainer>
      
      <Footer>© 2025 Ritika Negi. All rights reserved.</Footer>
    </OuterDiv>
  );
};

export default ChooseUser;
