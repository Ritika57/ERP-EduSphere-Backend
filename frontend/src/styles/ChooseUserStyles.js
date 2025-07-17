import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Entrance animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

/* Outer container with gradient */
export const OuterDiv = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
  font-family: 'Inter', Arial, sans-serif;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 0;
  }

  &::before {
    width: 400px;
    height: 400px;
    top: -150px;
    left: -150px;
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    width: 600px;
    height: 600px;
    bottom: -200px;
    right: -200px;
    animation: ${float} 8s ease-in-out infinite reverse;
  }
`;

/* Page title */
export const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

/* Subtitle text */
export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 50px;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  font-weight: 400;
`;

/* Horizontal container for cards */
export const ChooseUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 40px;
  z-index: 1;
  position: relative;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

/* Each card */
export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeInScale} 0.8s ease-out 0.4s both;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    border-color: rgba(37, 99, 235, 0.3);
  }

  &:nth-child(1) {
    animation-delay: 0.4s;
  }
  &:nth-child(2) {
    animation-delay: 0.6s;
  }
  &:nth-child(3) {
    animation-delay: 0.8s;
  }
`;

/* Card title */
export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #222;
  text-align: center;
`;

/* Logo image */
export const Adminlogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 25px;
  border-radius: 50%;
  border: 3px solid #2563eb;
  background: linear-gradient(135deg, #2563eb, #10b981);
  padding: 8px;
  transition: transform 0.3s ease;

  ${UserSection}:hover & {
    transform: scale(1.1);
  }
`;

/* Button link */
export const Button = styled(Link)`
  background: linear-gradient(135deg, #2563eb, #10b981);
  color: white;
  border: none;
  padding: 14px 28px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
  display: inline-block;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

/* Footer text */
export const Footer = styled.footer`
  margin-top: 40px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out 1s both;
`;
