// TeacherSignIn.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  FormCard,
  IconContainer,
  Title,
  TeacherSignInContainer,
  FormContainer,
  InputField,
  SubmitButton,
} from '../styles/TeacherSignInStyles';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useRef, useEffect } from 'react';

const TeacherSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Sign in attempt with:', { email, password });

    try {
      console.log('Making API call to:', 'http://localhost:4000/api/v1/teachers/signin');
      const response = await axios.post(
        'http://localhost:4000/api/v1/teachers/signin',
        { email, password }
      );

      console.log('API response:', response.data);

      if (response.data.success && response.data.token) {
        localStorage.setItem('teacherToken', response.data.token);
        alert('Teacher signed in successfully!');
        window.location.href = '/teacher/dashboard';
      } else {
        alert('Sign in failed: No token received.');
      }
    } catch (error) {
      console.error('Error during teacher sign-in:', error);
      alert('Sign in failed. Please check your credentials.');
    }
  };

  const textRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.opacity = 0;
      textRef.current.style.transform = 'translateY(40px)';
      setTimeout(() => {
        textRef.current.style.transition = 'all 0.7s cubic-bezier(.4,0,.2,1)';
        textRef.current.style.opacity = 1;
        textRef.current.style.transform = 'translateY(0)';
      }, 100);
    }
    if (cardRef.current) {
      cardRef.current.style.opacity = 0;
      cardRef.current.style.transform = 'scale(0.96) translateY(40px)';
      setTimeout(() => {
        cardRef.current.style.transition = 'all 0.8s cubic-bezier(.4,0,.2,1)';
        cardRef.current.style.opacity = 1;
        cardRef.current.style.transform = 'scale(1) translateY(0)';
      }, 350);
    }
  }, []);

  return (
    <TeacherSignInContainer style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 420,
      }}>
        <div
          ref={textRef}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 18,
            opacity: 0,
            transform: 'translateY(40px)'
          }}
        >
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            color: '#fff',
            margin: 0,
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}>Teacher Log In</h2>
          <div style={{
            fontSize: '1.1rem',
            color: '#fff',
            marginTop: 12,
            marginBottom: 0,
            textAlign: 'center',
            fontWeight: 400
          }}>
            Welcome back! Please enter your credentials.
          </div>
        </div>
        <div ref={cardRef} style={{opacity: 0, transform: 'scale(0.96) translateY(40px)', width: '100%'}}>
          <FormCard>
            <IconContainer>
              <FaChalkboardTeacher size={28} color="#fff" />
            </IconContainer>
            <Title>Teacher Log In</Title>
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
              <SubmitButton type="submit">Log In</SubmitButton>
            </FormContainer>
          </FormCard>
        </div>
      </div>
    </TeacherSignInContainer>
  );
};

export default TeacherSignIn;
