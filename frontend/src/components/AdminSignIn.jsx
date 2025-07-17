import React, { useState } from 'react';
import { AdminSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';
import { useFlashMessage } from '../context/FlashMessageContext';
import axios from 'axios';

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

  return (
    <AdminSignInContainer>
      <h2>Admin Sign In</h2>
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
          {isLoading ? 'Signing In...' : 'Sign In'}
        </SubmitButton>
      </FormContainer>
    </AdminSignInContainer>
  );
};

export default AdminSignIn;
