// AdminRegisterStyles.js
import styled, { keyframes } from 'styled-components';

// Entrance animation for the card
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const AdminRegisterContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2563eb 0%, #10b981 50%, #3b82f6 100%);
  font-family: 'Inter', Arial, sans-serif;
`;

export const FormCard = styled.div`
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 12px 40px rgba(37,99,235,0.13), 0 2px 12px rgba(0,0,0,0.06);
  padding: 44px 36px 36px 36px;
  min-width: 320px;
  max-width: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  transition: box-shadow 0.3s, transform 0.18s;
  border: 1.5px solid #e5e7eb;

  &:hover {
    transform: scale(1.015);
    box-shadow: 0 16px 48px rgba(37,99,235,0.18), 0 4px 16px rgba(0,0,0,0.10);
  }

  @media (max-width: 500px) {
    min-width: 0;
    max-width: 95vw;
    padding: 28px 8vw 24px 8vw;
  }
`;

export const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #2563eb, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #e0e7ef;
  border-radius: 12px;
  font-size: 1.05rem;
  background: #f7faff;
  transition: border-color 0.25s, box-shadow 0.25s;
  outline: none;
  box-shadow: 0 0 0 0 rgba(37,99,235,0.10);

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px #2563eb22;
    background: #fff;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 0;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
  color: #fff;
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-top: 14px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: 0 2px 12px rgba(37,99,235,0.10);
  transition: background 0.25s, transform 0.18s, box-shadow 0.18s;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #10b981 100%);
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px) scale(1.04)'};
    box-shadow: 0 8px 24px rgba(37,99,235,0.16);
  }
`;
