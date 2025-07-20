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
import { FaBook, FaUser, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaBookOpen, FaGraduationCap, FaClock } from 'react-icons/fa';

const getStats = (books, studentInfo) => {
  if (!books.length) return { total: 0, available: 0, borrowed: 0, myBorrowed: 0 };
  const total = books.length;
  const available = books.filter(book => !book.isBorrowed).length;
  const borrowed = books.filter(book => book.isBorrowed).length;
  const myBorrowed = books.filter(book => book.isBorrowed && book.borrowedBy === studentInfo?.id).length;
  return { total, available, borrowed, myBorrowed };
};

const StatCard = ({ icon, label, value, color, bg }) => (
  <div style={{
    flex: 1,
    minWidth: 140,
    background: bg,
    color: color,
    borderRadius: 16,
    padding: '24px 20px',
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
    fontWeight: 700,
    fontSize: '1rem',
    justifyContent: 'center',
  }}>
    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{label}</div>
  </div>
);

const LibrarySection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/v1/library/getall');
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
      
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      if (!studentInfo || !studentInfo.id) {
        setMessage('Please sign in to borrow books.');
        return;
      }

      const response = await axios.post('/api/v1/library/pick', {
        bookId: bookId,
        studentId: studentInfo.id
      });

      if (response.data.success) {
        setMessage('Book borrowed successfully!');
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
      
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      if (!studentInfo || !studentInfo.id) {
        setMessage('Please sign in to return books.');
        return;
      }

      const response = await axios.post('/api/v1/library/return', {
        bookId: bookId,
        studentId: studentInfo.id
      });

      if (response.data.success) {
        setMessage('Book returned successfully!');
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
  const stats = getStats(books, studentInfo);

  return (
    <LibraryContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        {/* Main Card - Compact Design */}
        <div style={{
          background: 'white',
          borderRadius: 24,
          boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
          padding: '24px',
          margin: '0 auto',
          maxWidth: 1600,
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#6d5ac3', marginBottom: 6, letterSpacing: -0.5 }}>Library</h1>
            <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>
              Browse and manage your book collection
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div style={{ 
              padding: '12px 16px', 
              marginBottom: 24, 
              borderRadius: 12,
              backgroundColor: message.includes('successfully') ? '#dcfce7' : '#fef2f2',
              color: message.includes('successfully') ? '#166534' : '#dc2626',
              border: `1px solid ${message.includes('successfully') ? '#bbf7d0' : '#fecaca'}`,
              fontSize: 14,
              fontWeight: 500
            }}>
              {message}
            </div>
          )}

          {/* Stat Cards - Compact */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <StatCard icon={<FaBook />} label="Total Books" value={stats.total} color="#fff" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
            <StatCard icon={<FaCheckCircle />} label="Available" value={stats.available} color="#fff" bg="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" />
            <StatCard icon={<FaTimesCircle />} label="Borrowed" value={stats.borrowed} color="#fff" bg="linear-gradient(135deg, #f857a6 0%, #ff5858 100%)" />
            <StatCard icon={<FaBookOpen />} label="My Books" value={stats.myBorrowed} color="#fff" bg="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)" />
          </div>

          {/* Books Section */}
          <div style={{
            background: '#f8fafc',
            borderRadius: 16,
            padding: '20px',
            height: 'fit-content'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10
              }}>
                <FaGraduationCap size={18} color="#fff" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#374151', margin: 0 }}>Available Books</h3>
            </div>
            
            {books.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#666',
                background: '#fff',
                borderRadius: 12,
                border: '2px dashed #e2e8f0'
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                  No Books Available
                </div>
                <div style={{ fontSize: 14, color: '#6b7280' }}>
                  Books will appear here once they are added to the library.
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {books.map((book) => {
                  const isBorrowed = book.isBorrowed;
                  const isBorrowedByMe = studentInfo && book.borrowedBy === studentInfo.id;
                  
                  return (
                    <div key={book._id} style={{
                      background: '#fff',
                      borderRadius: 12,
                      padding: '20px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <FaBook size={16} color="#6b7280" />
                          <h4 style={{ 
                            fontSize: 16, 
                            fontWeight: 600, 
                            color: '#374151', 
                            margin: 0 
                          }}>
                            {book.bookname}
                          </h4>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <FaUser size={14} color="#6b7280" />
                          <span style={{ fontSize: 14, color: '#6b7280' }}>
                            {book.author}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: isBorrowed ? '#dc2626' : '#10b981'
                          }}></div>
                          <span style={{ 
                            fontSize: 14, 
                            fontWeight: 500,
                            color: isBorrowed ? '#dc2626' : '#10b981'
                          }}>
                            {isBorrowed ? 'Borrowed' : 'Available'}
                          </span>
                        </div>
                        {isBorrowed && book.borrowedAt && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                            <FaCalendarAlt size={12} color="#6b7280" />
                            <span style={{ fontSize: 12, color: '#6b7280' }}>
                              Borrowed on: {new Date(book.borrowedAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {!isBorrowed ? (
                          <button 
                            onClick={() => handleBorrowBook(book._id)}
                            disabled={loading}
                            style={{
                              padding: '8px 16px',
                              background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 8,
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: loading ? 'not-allowed' : 'pointer',
                              opacity: loading ? 0.6 : 1,
                              transition: 'all 0.2s'
                            }}
                          >
                            {loading ? 'Borrowing...' : 'Borrow'}
                          </button>
                        ) : isBorrowedByMe ? (
                          <button 
                            onClick={() => handleReturnBook(book._id)}
                            disabled={loading}
                            style={{
                              padding: '8px 16px',
                              background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 8,
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: loading ? 'not-allowed' : 'pointer',
                              opacity: loading ? 0.6 : 1,
                              transition: 'all 0.2s'
                            }}
                          >
                            {loading ? 'Returning...' : 'Return'}
                          </button>
                        ) : (
                          <div style={{
                            padding: '8px 16px',
                            background: '#f3f4f6',
                            color: '#6b7280',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            fontSize: 14,
                            fontWeight: 500
                          }}>
                            Borrowed by Another Student
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Content>
    </LibraryContainer>
  );
};

export default LibrarySection;
