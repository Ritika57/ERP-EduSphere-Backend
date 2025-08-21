import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { BsGraphUp, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsBoxArrowRight } from 'react-icons/bs';
import avatarImg from '../../assets/bg1.png';
import StudentLogin from '../../assets/Student.jpg'

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  height: 100%;
  background: ${({ theme }) => theme.sidebar};
  color: ${({ theme }) => theme.sidebarText};
  box-shadow: 2px 0 12px 0 rgba(0,0,0,0.04);
  border-right: 1.5px solid ${({ theme }) => theme.border};
  overflow-y: auto;
  padding-top: 0;
  transition: width 0.25s ${({ theme }) => theme.transition}, background 0.2s;
  z-index: 100;
  display: flex;
  flex-direction: column;
  /* Hide scrollbar but keep scroll functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Webkit */
  }
  @media (max-width: 700px) {
    width: ${({ isOpen }) => (isOpen ? '160px' : '0')};
    min-width: 0;
    z-index: 1000;
  }
  
  @media (max-width: 480px) {
    width: ${({ isOpen }) => (isOpen ? '140px' : '0')};
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 18px 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: padding 0.25s;
  margin-top: 0;
  
  @media (max-width: 700px) {
    padding: 16px 12px 12px 12px;
    gap: 6px;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.card};
  border: 2px solid ${({ theme }) => theme.primary};
  
  @media (max-width: 700px) {
    width: 36px;
    height: 36px;
  }
`;

const ProfileInfo = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  text-align: center;
`;

const ProfileName = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #3b82f6;
`;

const ProfileRole = styled.div`
  font-size: 0.95rem;
  color: #374151;
  font-weight: 500;
`;

const SidebarHeader = styled.div`
  display: none;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
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
  box-shadow: ${({ active, theme }) => (active ? `4px 0 0 0 ${theme.primary}` : 'none')};
  position: relative;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  overflow: hidden;
  &:hover {
    background: ${({ theme }) => theme.sidebarActive + '18'};
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 700px) {
    padding: 10px 12px;
    margin: 0 6px 4px 6px;
    font-size: 1rem;
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
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const SidebarIcon = styled.div`
  margin-right: ${({ isOpen }) => (isOpen ? '10px' : '0')};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Tooltip = styled.div`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 6px;
  padding: 4px 12px;
  position: absolute;
  left: 48px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 0.98rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.18s;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
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
  font-size: 1rem;
`;

const LogoutButton = styled.button`
  width: calc(100% - 20px);
  margin: 18px 10px 18px 10px;
  padding: 10px 0;
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;

const navLinks = [
  { to: '/student/dashboard', icon: <BsGraphUp />, label: 'Dashboard' },
  // { to: '/student/classes', icon: <BsBook />, label: 'Classes' },
  { to: '/student/assignments', icon: <BsFileText />, label: 'Assignments' },
  { to: '/student/exams', icon: <BsBook />, label: 'Exams' },
  { to: '/student/performance', icon: <BsGraphDown />, label: 'Performance' },
  { to: '/student/attendance', icon: <BsCalendar />, label: 'Attendance' },
  { to: '/student/library', icon: <BsBook />, label: 'Library' },
  { to: '/student/communication', icon: <BsChatDots />, label: 'Announcement' },
  { to: '/student/settings', icon: <BsGear />, label: 'Profile' },
];

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [tooltip, setTooltip] = useState('');
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Dummy profile info (replace with real student info if available)
  const profile = {
    name: 'Student',
    role: 'Student',
    avatar: StudentLogin,
  };

  // Sync initial state with parent
  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/choose-user');
  };

  return (
    <SidebarContainer isOpen={isOpen} theme={theme}>
      <ToggleButton onClick={toggleSidebar} theme={theme}>
        <ToggleIcon isOpen={isOpen} theme={theme}>{isOpen ? '◀' : '▶'}</ToggleIcon>
      </ToggleButton>
      <ProfileSection>
        <Avatar src={profile.avatar} alt="Avatar" />
        <ProfileInfo isOpen={isOpen}>
          <ProfileName>{profile.name}</ProfileName>
       
        </ProfileInfo>
      </ProfileSection>
      <SidebarNav>
        {navLinks.map(link => (
          <SidebarNavItem
            key={link.to}
            active={location.pathname === link.to}
            theme={theme}
            isOpen={isOpen}
            onMouseEnter={() => !isOpen && setTooltip(link.label)}
            onMouseLeave={() => setTooltip('')}
          >
            <SidebarIcon isOpen={isOpen}>
              {link.icon}
              {!isOpen && tooltip === link.label && (
                <Tooltip show>{link.label}</Tooltip>
              )}
            </SidebarIcon>
            <StyledLink to={link.to} isOpen={isOpen}>{link.label}</StyledLink>
          </SidebarNavItem>
        ))}
      </SidebarNav>
      <div style={{ marginTop: 'auto' }}>
        <LogoutButton theme={theme} onClick={handleLogout}>
          <BsBoxArrowRight size={20} />
          {isOpen && 'Logout'}
        </LogoutButton>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
