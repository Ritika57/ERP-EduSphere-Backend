import React, { useState } from 'react';
import { AdminRegisterContainer, FormCard, Title, FormContainer, InputField, SubmitButton } from '../styles/AdminRegisterStyles';
import { useFlashMessage } from '../context/FlashMessageContext';
import axios from 'axios'; // Import axios

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useFlashMessage();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:4000/api/v1/register/admin', { email, password });

      if (response.status === 200) {
        showSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/admin-signIn';
        }, 2000);
      } else {
        showError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 'Registration failed. Please try again.';
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
    <AdminRegisterContainer>
      <FormCard>
        <Title>Admin Register</Title>
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
          <SubmitButton onClick={(e) => handleRegister(e)} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </SubmitButton>
        </FormContainer>
      </FormCard>
    </AdminRegisterContainer>
  );
};

export default AdminRegister;
