// LibrarySection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  LibraryContainer,
  SidebarContainer,
  Content,
  LibraryHeader,
  BookList,
  BookItem,
  BookTitle,
  BorrowButton,
} from '../../styles/LibraryStyles';

const LibrarySection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/library/getall');
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
      setMessage('Error fetching books. Please try again.');
    }
  };

  const handleBorrowBook = async (bookId) => {
    try {
      setLoading(true);
      setMessage('');
      
      // Get student info from localStorage
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      if (!studentInfo || !studentInfo.id) {
        setMessage('Please sign in to borrow books.');
        return;
      }

      const response = await axios.post('http://localhost:4000/api/v1/library/pick', {
        bookId: bookId,
        studentId: studentInfo.id
      });

      if (response.data.success) {
        setMessage('Book borrowed successfully!');
        // Refresh the book list to show updated status
        fetchBooks();
      } else {
        setMessage(response.data.message || 'Failed to borrow book.');
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      setMessage(error.response?.data?.message || 'Error borrowing book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (bookId) => {
    try {
      setLoading(true);
      setMessage('');
      
      // Get student info from localStorage
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      if (!studentInfo || !studentInfo.id) {
        setMessage('Please sign in to return books.');
        return;
      }

      const response = await axios.post('http://localhost:4000/api/v1/library/return', {
        bookId: bookId,
        studentId: studentInfo.id
      });

      if (response.data.success) {
        setMessage('Book returned successfully!');
        // Refresh the book list to show updated status
        fetchBooks();
      } else {
        setMessage(response.data.message || 'Failed to return book.');
      }
    } catch (error) {
      console.error('Error returning book:', error);
      setMessage(error.response?.data?.message || 'Error returning book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStudentInfo = () => {
    try {
      return JSON.parse(localStorage.getItem('studentInfo'));
    } catch (error) {
      return null;
    }
  };

  const studentInfo = getStudentInfo();

  return (
    <LibraryContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <LibraryHeader>Library</LibraryHeader>
        {message && (
          <div style={{ 
            padding: '10px', 
            margin: '10px 0', 
            borderRadius: '5px',
            backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
            color: message.includes('successfully') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}
        <BookList>
          {books.map((book) => {
            const isBorrowed = book.isBorrowed;
            const isBorrowedByMe = studentInfo && book.borrowedBy === studentInfo.id;
            
            return (
              <BookItem key={book._id}>
                <BookTitle>{book.bookname}</BookTitle>
                <p>Author: {book.author}</p>
                <p style={{ 
                  color: isBorrowed ? '#dc3545' : '#28a745',
                  fontWeight: 'bold'
                }}>
                  Status: {isBorrowed ? 'Borrowed' : 'Available'}
                </p>
                {isBorrowed && book.borrowedAt && (
                  <p style={{ fontSize: '0.9em', color: '#6c757d' }}>
                    Borrowed on: {new Date(book.borrowedAt).toLocaleDateString()}
                  </p>
                )}
                {!isBorrowed ? (
                  <BorrowButton 
                    onClick={() => handleBorrowBook(book._id)}
                    disabled={loading}
                    style={{ opacity: loading ? 0.6 : 1 }}
                  >
                    {loading ? 'Borrowing...' : 'Borrow'}
                  </BorrowButton>
                ) : isBorrowedByMe ? (
                  <BorrowButton 
                    onClick={() => handleReturnBook(book._id)}
                    disabled={loading}
                    style={{ 
                      opacity: loading ? 0.6 : 1,
                      backgroundColor: '#dc3545',
                      borderColor: '#dc3545'
                    }}
                  >
                    {loading ? 'Returning...' : 'Return'}
                  </BorrowButton>
                ) : (
                  <BorrowButton 
                    disabled
                    style={{ 
                      opacity: 0.5,
                      backgroundColor: '#6c757d',
                      borderColor: '#6c757d',
                      cursor: 'not-allowed'
                    }}
                  >
                    Borrowed by Another Student
                  </BorrowButton>
                )}
              </BookItem>
            );
          })}
        </BookList>
      </Content>
    </LibraryContainer>
  );
};

export default LibrarySection;
