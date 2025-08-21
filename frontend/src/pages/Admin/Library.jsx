// Library.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaBook, FaPlus, FaSearch, FaFilter, FaUser, FaPen, FaEye, FaTrash } from 'react-icons/fa';
import { useFlashMessage } from '../../context/FlashMessageContext';
import styled, { keyframes } from 'styled-components';

// Modern styled components with theme support
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const LibraryContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 32px 40px;
  margin-left: 250px;
  background: #f3f4f8;
  min-height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 700px) {
    margin-left: 0;
    padding: 20px 16px;
  }
`;

const LibraryContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 32px;
  background: linear-gradient(135deg, #2563eb15 0%, #10b98115 100%);
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  animation: ${fadeInUp} 0.6s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #222;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #2563eb, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: #222;
  opacity: 0.8;
  margin: 0;
  font-weight: 400;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  color: #222;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);

  &:hover {
    background: #2563eb;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(37,99,235,0.2);
  }
`;

const AddBookCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: ${slideInLeft} 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddBookForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  align-items: end;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #f9fafb;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #fff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FilterButton = styled.button`
  padding: 12px 16px;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
  }
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const BookCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
`;

const BookHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const BookIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.2);
`;

const BookInfo = styled.div`
  flex: 1;
`;

const BookTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 4px 0;
`;

const BookAuthor = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BookStatus = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 8px;
`;

const BookStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
`;

const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #2563eb;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 16px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeInUp} 0.3s;
`;

const ModalCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: ${fadeInUp} 0.4s;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useFlashMessage();
  const [modalBook, setModalBook] = useState(null);
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/library/getall');
      setBooks(response.data.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      showError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (e) => {
    e.preventDefault();
    if (newBook.title.trim() !== '' && newBook.author.trim() !== '') {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:4000/api/v1/library/books', {
          bookname: newBook.title,
          author: newBook.author,
        });
        
        // If the response includes the created book, add it to the list
        if (response.data.book) {
          setBooks([...books, response.data.book]);
        } else {
          // Otherwise fetch the updated list
          await fetchBooks();
        }
        
        setNewBook({ title: '', author: '' });
        showSuccess('Book added successfully!');
      } catch (error) {
        console.error('Error adding book:', error);
        const errorMsg = error.response?.data?.message || 'Failed to add book';
        showError(errorMsg);
      } finally {
        setLoading(false);
      }
    } else {
      showError('Please fill in all fields');
    }
  };

  const handleBookPick = async (bookId, studentId) => {
    try {
      await axios.post('http://localhost:4000/api/v1/library/pick', {
        bookId,
        studentId
      });
      fetchBooks(); // Refresh books
      showSuccess('Book picked successfully!');
    } catch (err) {
      console.error(err);
      showError('Failed to pick book');
    }
  };
  
  const handleBookReturn = async (bookId, studentId) => {
    try {
      await axios.post('http://localhost:4000/api/v1/library/return', {
        bookId,
        studentId
      });
      fetchBooks(); // Refresh books
      showSuccess('Book returned successfully!');
    } catch (err) {
      console.error(err);
      showError('Failed to return book');
    }
  };

  const filteredBooks = books.filter(book =>
    (book.bookname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.author || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRandomStats = (index) => ({
    copies: 1 + (index % 3),
    borrowed: index % 2 === 0 ? 1 : 0,
    available: index % 2 === 0 ? 0 : 1
  });

  return (
    <LibraryContainer>
      <Sidebar />
      <Content>
        <LibraryContent>
          <HeaderSection>
            <div>
              <HeaderTitle>Library Management</HeaderTitle>
              <HeaderSubtitle>Curating knowledge through comprehensive book collections</HeaderSubtitle>
            </div>
            <QuickActions>
              <ActionButton onClick={() => document.getElementById('addBookForm')?.scrollIntoView({ behavior: 'smooth' })}>
                <FaPlus size={16} />
                Add Book
              </ActionButton>
            </QuickActions>
          </HeaderSection>

          <AddBookCard id="addBookForm">
            <CardTitle>
              <FaBook />
              Add New Book
            </CardTitle>
            <AddBookForm onSubmit={addBook}>
              <FormGroup>
                <Label>
                  <FaBook size={14} />
                  Book Title
                </Label>
                <Input
                  type="text"
                  placeholder="Enter book title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  <FaUser size={14} />
                  Author Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter author name"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
              </SubmitButton>
            </AddBookForm>
          </AddBookCard>

          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterButton>
              <FaFilter size={14} />
              Filter
            </FilterButton>
          </SearchBar>

          {loading && books.length === 0 ? (
            <LoadingSpinner>
              <FaBook style={{ marginRight: '8px' }} />
              Loading books...
            </LoadingSpinner>
          ) : filteredBooks.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <FaBook />
              </EmptyStateIcon>
              <h3>No books found</h3>
              <p>Try adjusting your search criteria or add a new book.</p>
            </EmptyState>
          ) : (
            <BooksGrid>
              {filteredBooks.map((book, idx) => {
                const stats = getRandomStats(idx);
                return (
                  <BookCard
                    key={book._id || book.id || idx}
                    onClick={() => setModalBook({ ...book, ...stats })}
                  >
                    <BookHeader>
                      <BookIcon>
                        <FaBook />
                      </BookIcon>
                      <BookInfo>
                        <BookTitle>{book.bookname || 'Untitled Book'}</BookTitle>
                        <BookAuthor>
                          <FaUser size={12} />
                          {book.author || 'Unknown Author'}
                        </BookAuthor>
                        <BookStatus>
                          {stats.borrowed > 0 ? 'Borrowed' : 'Available'}
                        </BookStatus>
                      </BookInfo>
                    </BookHeader>
                    {/* <BookStats>
                      <Stat>
                        <StatNumber>{stats.copies}</StatNumber>
                        <StatLabel>Copies</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.borrowed}</StatNumber>
                        <StatLabel>Borrowed</StatLabel>
                      </Stat>
                      <Stat>
                        <StatNumber>{stats.available}</StatNumber>
                        <StatLabel>Available</StatLabel>
                      </Stat>
                    </BookStats> */}
                  </BookCard>
                );
              })}
            </BooksGrid>
          )}

          {modalBook && (
            <ModalOverlay onClick={() => setModalBook(null)}>
              <ModalCard onClick={e => e.stopPropagation()}>
                <ModalClose onClick={() => setModalBook(null)}>&times;</ModalClose>
                <BookHeader>
                  <BookIcon style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                    <FaBook />
                  </BookIcon>
                  <BookInfo>
                    <BookTitle style={{ fontSize: '1.5rem' }}>{modalBook.bookname || 'Untitled Book'}</BookTitle>
                    <BookAuthor style={{ fontSize: '1rem' }}>
                      <FaUser size={14} />
                      {modalBook.author || 'Unknown Author'}
                    </BookAuthor>
                    <BookStatus style={{ marginTop: '12px' }}>
                      {modalBook.borrowed > 0 ? 'Borrowed' : 'Available'}
                    </BookStatus>
                  </BookInfo>
                </BookHeader>
                <BookStats style={{ marginTop: '24px' }}>
                  <Stat>
                    <StatNumber>{modalBook.copies}</StatNumber>
                    <StatLabel>Total Copies</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalBook.borrowed}</StatNumber>
                    <StatLabel>Currently Borrowed</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{modalBook.available}</StatNumber>
                    <StatLabel>Available for Borrow</StatLabel>
                  </Stat>
                </BookStats>
              </ModalCard>
            </ModalOverlay>
          )}
        </LibraryContent>
      </Content>
    </LibraryContainer>
  );
};

export default Library;
