// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, AdminRegisterLink } 
from '../styles/styles'
import { LoremIpsum } from 'lorem-ipsum';
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import { Link, useNavigate } from 'react-router-dom'; 
import { useTheme } from '../App';

const lorem = new LoremIpsum();

const Home = () => {
  const navigate = useNavigate();
  const loremText = lorem.generateParagraphs(1);
  const { themeMode, toggleTheme } = useTheme();

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <>
      <Navbar>
        <Logo src={bg1} alt="Logo" />
        <NavigationLinks>
          <NavLink href="#">About Us</NavLink>
          <NavLink href="#">Products</NavLink>
          <NavLink href="#">Contact Us</NavLink>
        </NavigationLinks>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ButtonsContainer>
            <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
            <GuestButton onClick={handleLoginClick}>Guest Mode</GuestButton>
          </ButtonsContainer>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              borderRadius: '20px',
              padding: '6px 18px',
              fontSize: '1rem',
              cursor: 'pointer',
              color: themeMode === 'dark' ? '#fff' : '#222',
              backgroundColor: themeMode === 'dark' ? '#222' : '#fff',
              transition: 'all 0.2s',
              marginLeft: '12px',
            }}
            aria-label="Toggle theme"
          >
            {themeMode === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </Navbar>
      <HomeContainer>
        <SchoolInfo>
          <Title>School Management System</Title>
          <LoremTextContainer>
            <p>{loremText}</p>
          </LoremTextContainer>
          <AdminRegisterLink to="/admin/register">Admin Register</AdminRegisterLink>
        </SchoolInfo>
        <SchoolImage src={bg} alt="pupils" />
      </HomeContainer>
    </>
  );
};

export default Home;
