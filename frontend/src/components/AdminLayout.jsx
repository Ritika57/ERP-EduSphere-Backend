import React, { useState } from 'react';
import Sidebar from '../pages/Admin/Sidebar';
import styled from 'styled-components';

const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  padding: 32px 20px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
  overflow-y: auto;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.25s ease;
  
  @media (max-width: 700px) {
    margin-left: ${({ isOpen }) => (isOpen ? '160px' : '0')};
    padding: 20px 12px;
  }
  
  @media (max-width: 480px) {
    margin-left: 0;
    padding: 16px 8px;
  }
`;

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AdminLayoutContainer>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Content isOpen={sidebarOpen}>
        {children}
      </Content>
    </AdminLayoutContainer>
  );
};

export default AdminLayout; 