// StudentSignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormCard, IconContainer, Title, StudentSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/StudentSignInStyles';
import { FaUserGraduate } from 'react-icons/fa';
import { useRef, useEffect } from 'react';

const StudentSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/student/signin', {
        email,
        password
      });
      
      if (response.data.success && response.data.student) {
        localStorage.setItem('studentInfo', JSON.stringify(response.data.student));
        navigate('/student/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Sign in failed');
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
    <StudentSignInContainer style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
          }}>Student Log In</h2>
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
              <FaUserGraduate size={28} color="#fff" />
            </IconContainer>
            <Title>Student Log In</Title>
            <FormContainer onSubmit={handleSignIn}>
              {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
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
              <SubmitButton type="submit">{error === 'Loging In...' ? 'Loging In...' : 'Log In'}</SubmitButton>
            </FormContainer>
          </FormCard>
        </div>
      </div>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
