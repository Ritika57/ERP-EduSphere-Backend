// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, AdminRegisterLink, ThemeToggleButton, HeroDivider } 
from '../styles/styles'
import { LoremIpsum } from 'lorem-ipsum';
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import schoolimg from "../assets/schoolimg.jpg";
import { Link, useNavigate } from 'react-router-dom'; 
import { useTheme } from '../App';

const lorem = new LoremIpsum();

const erpFacts = [
  "🚀 Boost productivity: Our ERP system automates routine tasks, freeing your staff to focus on what matters most.",
  "📊 Real-time insights: Make smarter decisions with instant access to all your school’s data in one place.",
  "🔒 Secure & reliable: Protect sensitive student and staff information with enterprise-grade security.",
  "🌐 Access anywhere: Cloud-based ERP means you can manage your school from any device, anytime.",
  "🤝 Seamless collaboration: Teachers, students, and parents stay connected through integrated communication tools.",
  "💡 Customizable dashboards: Track attendance, grades, and performance with beautiful, interactive dashboards.",
  "📈 Scalable for growth: Our ERP grows with your institution, from small schools to large universities.",
  "⏱️ Save time: Automated attendance, grading, and scheduling reduce manual work and errors.",
  "🎯 All-in-one solution: Manage academics, administration, library, exams, and more from a single platform.",
  "🏆 Improve outcomes: Data-driven insights help educators personalize learning and boost student success."
];

const Home = () => {
  const [factIndex, setFactIndex] = React.useState(0);
  const [fade, setFade] = React.useState(true);
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useTheme();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % erpFacts.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <>
      <Navbar>
        <Logo src={schoolimg} alt="Logo" />
        <NavigationLinks>
          <NavLink href="#">About Us</NavLink>
          <NavLink href="#">Products</NavLink>
          <NavLink href="#">Contact Us</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <ThemeToggleButton themeMode={themeMode} onClick={toggleTheme} aria-label="Toggle theme">
            {themeMode === 'dark' ? '🌙' : '☀️'}
          </ThemeToggleButton>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
        </ButtonsContainer>
      </Navbar>
      <HomeContainer>
        <SchoolInfo>
          <Title>EduSphere -A Digital School Ecosystem</Title>
          <LoremTextContainer>
            <p style={{
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.4s',
              minHeight: 48,
              fontWeight: 500,
              fontSize: '1.15rem',
              color: '#2563eb',
              letterSpacing: 0.2,
              textShadow: '0 2px 8px rgba(37,99,235,0.08)'
            }}>{erpFacts[factIndex]}</p>
          </LoremTextContainer>
          <AdminRegisterLink to="/admin/register">Admin Register</AdminRegisterLink>
        </SchoolInfo>
        <HeroDivider />
        <SchoolImage src={bg} alt="pupils" />
      </HomeContainer>
    </>
  );
};

export default Home;
