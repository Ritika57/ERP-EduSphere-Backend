import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* Outer container with gradient */
export const OuterDiv = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f9ff, #d6e6f2);

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: #cce3f7;
    opacity: 0.3;
    z-index: 0;
  }

  &::before {
    width: 400px;
    height: 400px;
    top: -150px;
    left: -150px;
  }

  &::after {
    width: 600px;
    height: 600px;
    bottom: -200px;
    right: -200px;
  }
    
`;


/* Page title */
export const PageTitle = styled.h1`
  font-size: 40px;
  color: #003366;
  margin-bottom: 10px;
`;

/* Subtitle text */
export const Subtitle = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 40px;
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
  width: 250px;
  background: linear-gradient(145deg, #ffffff, #f7faff);
  border-radius: 16px;
  padding: 30px 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.15), 0 0 20px rgba(0, 51, 102, 0.1);
    border: 2px solid #00336620;
  }
`;


/* Card title */
export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #003366;
`;

/* Logo image */
export const Adminlogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 50%;
  border: 3px solid #003366;
`;

/* Button link */
export const Button = styled(Link)`
  background-color: rgb(255, 166, 0);
  color: white;
  border: none;
  padding: 12px 24px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(230, 150, 0);
  }
`;

/* Footer text */
export const Footer = styled.footer`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;
