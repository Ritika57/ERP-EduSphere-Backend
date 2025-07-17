// styles.js
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 36px;
  background: linear-gradient(135deg, #2563eb 0%, #10b981 50%, #3b82f6 100%);
  color: #fff;
  font-family: 'Inter', Arial, sans-serif;
  box-shadow: 0 4px 20px rgba(37,99,235,0.15);
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.1);

  @media screen and (max-width: 900px) {
    flex-direction: column;
    padding: 10px 8px;
  }
`;

export const Logo = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  border: 2px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }
`;

export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  @media screen and (max-width: 900px) {
    margin-top: 10px;
    gap: 12px;
  }
`;

export const NavLink = styled.a`
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 600;
  position: relative;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #fff;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover {
    color: #fff;
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
    
    &::after {
      width: 80%;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 0;
  @media screen and (max-width: 900px) {
    margin-top: 10px;
    gap: 8px;
  }
`;

export const LoginButton = styled.button`
  background: rgba(255,255,255,0.9);
  color: #2563eb;
  border: 2px solid rgba(255,255,255,0.3);
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 1.08rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: #fff;
    color: #1d4ed8;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    border-color: rgba(255,255,255,0.5);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const GuestButton = styled.button`
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: 2px solid rgba(255,255,255,0.3);
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 1.08rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
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
    transition: left 0.6s ease;
  }

  &:hover {
    background: rgba(255,255,255,0.2);
    color: #fff;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    border-color: rgba(255,255,255,0.5);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: linear-gradient(120deg, #f3f4f8 0%, #e0e7ff 100%);
  padding: 64px 48px 48px 48px;
  border-radius: 36px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.08);
  margin: 48px auto 0 auto;
  max-width: 1100px;
  gap: 0;
  position: relative;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    padding: 32px 8px 24px 8px;
    border-radius: 18px;
    margin: 24px 0 0 0;
    min-height: unset;
    box-shadow: 0 2px 8px rgba(37,99,235,0.06);
  }
`;

// Optional: vertical divider/accent
export const HeroDivider = styled.div`
  width: 2px;
  height: 320px;
  background: linear-gradient(180deg, #2563eb 0%, #10b981 100%);
  margin: 0 36px;
  border-radius: 2px;
  opacity: 0.12;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

// Animations
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: none; }
`;

export const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: none; }
`;

export const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
`;

export const SchoolInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 320px;
  max-width: 520px;
  margin-right: 0;
  background: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0 0 0 0;
  @media screen and (max-width: 900px) {
    align-items: center;
    min-width: unset;
    max-width: 100%;
    padding: 0;
  }
`;

export const SchoolImage = styled.img`
  flex: 1;
  width: 400px;
  max-width: 90vw;
  height: auto;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10);
  margin-left: 32px;
  background: #fff;
  animation: ${fadeInRight} 1s cubic-bezier(.4,0,.2,1);
  transition: transform 0.25s, box-shadow 0.25s;
  &:hover {
    transform: scale(1.03) translateY(-6px);
    box-shadow: 0 16px 48px rgba(37,99,235,0.18);
  }
  @media screen and (max-width: 900px) {
    margin-left: 0;
    margin-top: 32px;
    width: 90vw;
    border-radius: 18px;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 18px;
  letter-spacing: -1px;
  animation: ${fadeInUp} 1.1s cubic-bezier(.4,0,.2,1);
  @media screen and (max-width: 900px) {
    font-size: 2.1rem;
    text-align: center;
  }
`;

export const LoremTextContainer = styled.div`
  max-width: 600px;
  font-size: 1.18rem;
  color: #444;
  text-align: left;
  margin-bottom: 32px;
  animation: ${fadeInUp} 1.3s cubic-bezier(.4,0,.2,1);
  @media screen and (max-width: 900px) {
    font-size: 1rem;
    text-align: center;
    margin-bottom: 24px;
  }
`;

export const AdminRegisterLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, #10b981 60%, #2563eb 100%);
  color: #fff;
  font-size: 1.08rem;
  font-weight: 700;
  text-decoration: none;
  margin-top: 18px;
  padding: 12px 32px;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(16,185,129,0.10);
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  animation: ${fadeInUp} 1.7s cubic-bezier(.4,0,.2,1);
  &:hover {
    background: linear-gradient(90deg, #059669 60%, #1d4ed8 100%);
    transform: translateY(-2px) scale(1.07);
    box-shadow: 0 6px 18px rgba(16,185,129,0.16);
  }
  @media screen and (max-width: 900px) {
    font-size: 1rem;
    padding: 10px 24px;
  }
`;
  // margin-left: 8px;

export const ThemeToggleButton = styled.button`
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;

  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255,255,255,0.2);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;
