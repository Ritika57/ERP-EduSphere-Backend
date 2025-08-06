// LibraryStyles.js
import styled from 'styled-components';

export const LibraryContainer = styled.div`

`;

export const Content = styled.div`
  flex: 1;
  padding: 48px 40px 40px 48px;
  margin-left: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 10px;
    padding-top: 24px;
    margin-left: 0;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const AddBookForm = styled.form`
  margin-bottom: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  padding: 28px 28px 18px 28px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(33,147,176,0.10);
  border-left: 6px solid #1976d2;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 420px;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const BookList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const BookItem = styled.li`
  background: #f7faff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(33,147,176,0.08);
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 18px;
  animation: fadeInBookItem 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  transition: box-shadow 0.22s, transform 0.18s;
  &:hover {
    box-shadow: 0 8px 24px rgba(33,147,176,0.13);
    transform: translateY(-2px) scale(1.01);
  }
  @keyframes fadeInBookItem {
    0% { opacity: 0; transform: translateY(30px) scale(0.97); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export const BookTitle = styled.span`
  font-weight: bold;
  font-size: 1.13rem;
  color: #1976d2;
`;

export const BookAuthor = styled.span`
  margin-left: 10px;
  color: #555;
  font-size: 1.01rem;
`;

export const ActionButton = styled.button`
  margin-left: 10px;
  padding: 6px 16px;
  font-size: 15px;
  background-color: #43a047;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(67,160,71,0.08);
  transition: background 0.18s, transform 0.14s;
  &:hover {
    background-color: #1976d2;
    transform: translateY(-2px) scale(1.04);
  }
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */
`;

export const LibraryHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const BorrowButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
