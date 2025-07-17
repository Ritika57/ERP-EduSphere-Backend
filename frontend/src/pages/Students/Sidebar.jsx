import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Link, useLocation } from 'react-router-dom'; 
import { BsGraphUp, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots } from 'react-icons/bs';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '220px' : '68px')};
  height: 100%;
  background: ${({ theme }) => theme.sidebar};
  color: ${({ theme }) => theme.sidebarText};
  box-shadow: 2px 0 12px 0 rgba(0,0,0,0.04);
  border-right: 1.5px solid ${({ theme }) => theme.border};
  overflow-y: auto;
  padding-top: 32px;
  transition: width 0.25s ${({ theme }) => theme.transition}, background 0.2s;
  z-index: 100;
  @media (max-width: 700px) {
    width: ${({ isOpen }) => (isOpen ? '160px' : '0')};
    min-width: 0;
    padding-top: 16px;
  }
`;

const SidebarHeader = styled.div`
  padding: 12px 0 18px 0;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  letter-spacing: -1px;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  font-size: 1.08rem;
  border-radius: 10px;
  margin: 0 10px 6px 10px;
  cursor: pointer;
  background: ${({ active, theme }) => (active ? theme.sidebarActive + '22' : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.primary : theme.sidebarText)};
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: ${({ theme }) => theme.sidebarActive + '18'};
    color: ${({ theme }) => theme.primary};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-left: 12px;
  flex: 1;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.18s;
`;

const SidebarIcon = styled.div`
  margin-right: 10px;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 44px;
  height: auto;
  margin-bottom: 8px;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 18px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.inputBg};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid ${({ theme }) => theme.inputBorder};
  z-index: 2;
`;

const ToggleIcon = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s;
`;

const navLinks = [
  { to: '/student/dashboard', icon: <BsGraphUp />, label: 'Dashboard' },
  { to: '/student/assignments', icon: <BsFileText />, label: 'Assignments' },
  { to: '/student/exams', icon: <BsBook />, label: 'Exams' },
  { to: '/student/performance', icon: <BsGraphDown />, label: 'Performance' },
  { to: '/student/attendance', icon: <BsCalendar />, label: 'Attendance' },
  { to: '/student/library', icon: <BsBook />, label: 'Library' },
  { to: '/student/communication', icon: <BsChatDots />, label: 'Announcement' },
  { to: '/student/settings', icon: <BsGear />, label: 'Profile' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useTheme();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <SidebarContainer isOpen={isOpen} theme={theme}>
      <SidebarHeader>
        <Logo src={"../assets/bg1.png"} alt="Logo" />
        {isOpen && 'Student'}
      </SidebarHeader>
      <SidebarNav>
        {navLinks.map(link => (
          <SidebarNavItem
            key={link.to}
            active={location.pathname === link.to}
            theme={theme}
            isOpen={isOpen}
          >
            <SidebarIcon>{link.icon}</SidebarIcon>
            {isOpen && <StyledLink to={link.to}>{link.label}</StyledLink>}
          </SidebarNavItem>
        ))}
      </SidebarNav>
      <ToggleButton onClick={toggleSidebar} theme={theme}>
        <ToggleIcon isOpen={isOpen} theme={theme}>{isOpen ? '◀' : '▶'}</ToggleIcon>
      </ToggleButton>

    </SidebarContainer>
  );
};

export default Sidebar;
