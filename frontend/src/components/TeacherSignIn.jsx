// TeacherSignIn.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  TeacherSignInContainer,
  FormContainer,
  InputField,
  SubmitButton,
} from '../styles/TeacherSignInStyles';

const TeacherSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/teachers/signin',
        { email, password }
      );

      if (response.data.success) {
        alert('Teacher signed in successfully!');
        window.location.href = '/teacher/dashboard';
      }
    } catch (error) {
      console.error('Error during teacher sign-in:', error);
      alert('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <TeacherSignInContainer>
      <h2>Teacher Sign In</h2>
      <FormContainer onSubmit={handleSignIn}>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Sign In</SubmitButton>
      </FormContainer>
    </TeacherSignInContainer>
  );
};

export default TeacherSignIn;
