// StudentSignInStyles.js
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const StudentSignInContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
  font-family: 'Inter', Arial, sans-serif;
`;

export const FormCard = styled.div`
  background: rgba(255,255,255,0.98);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10), 0 1.5px 8px rgba(0,0,0,0.04);
  padding: 40px 32px 32px 32px;
  min-width: 320px;
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  transition: box-shadow 0.3s;
  position: relative;
  overflow: hidden;

  @media (max-width: 500px) {
    min-width: 0;
    max-width: 95vw;
    padding: 28px 8vw 24px 8vw;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
  box-shadow: 0 4px 16px #10b98155, 0 4px 16px rgba(37,99,235,0.18);
  margin: 0 auto 18px auto;
  border: 3px solid #fff;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
  text-align: center;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #e0e7ef;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7faff;
  transition: border-color 0.25s, box-shadow 0.25s;
  outline: none;
  box-shadow: 0 0 0 0 rgba(37,99,235,0.10);

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #2563eb22;
    background: #fff;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #2563eb 0%, #43e97b 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
  transition: background 0.25s, transform 0.18s, box-shadow 0.18s;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    background: linear-gradient(90deg, #1d4ed8 0%, #38f9d7 100%);
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px) scale(1.03)'};
    box-shadow: 0 6px 18px rgba(37,99,235,0.12);
  }
`;
