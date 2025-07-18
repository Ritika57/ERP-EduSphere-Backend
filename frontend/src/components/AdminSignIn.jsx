import React, { useState } from 'react';
import { AdminSignInContainer, FormCard, Title, FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';
import { useFlashMessage } from '../context/FlashMessageContext';
import axios from 'axios';
import { useRef, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useFlashMessage();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // ✅ ✅ ✅ CORRECT ENDPOINT: it must match your backend route
      const response = await axios.post('http://localhost:4000/api/v1/register/signin', { email, password });

      if (response.status === 200 && response.data.token && response.data.admin) {
        // Store token and admin info in localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));

        showSuccess('Sign in successful! Redirecting to dashboard...');
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1500);
      } else {
        showError('Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 'Invalid credentials. Please try again.';
        showError(errorMessage);
      } else if (error.request) {
        // Network error
        showError('Network error. Please check your connection and try again.');
      } else {
        // Other errors
        showError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
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
    <AdminSignInContainer style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
          }}>Admin Log In</h2>
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
              boxShadow: '0 4px 16px #10b98155, 0 4px 16px rgba(37,99,235,0.18)',
              margin: '0 auto 18px auto',
              border: '3px solid #fff',
            }}>
              <FaLock size={28} color="#fff" />
            </div>
            <Title>Admin Log In</Title>
            <FormContainer>
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
              <SubmitButton onClick={handleSignIn} disabled={isLoading}>
                {isLoading ? 'Loging In...' : 'Log In'}
              </SubmitButton>
            </FormContainer>
          </FormCard>
        </div>
      </div>
    </AdminSignInContainer>
  );
};

export default AdminSignIn;
