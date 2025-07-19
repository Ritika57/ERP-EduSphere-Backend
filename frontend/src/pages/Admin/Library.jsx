// Library.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  LibraryContainer,
  Content,
  Title,
  AddBookForm,
  FormGroup,
  Label,
  Input,
  Button,
  BookList,
  BookItem,
  BookTitle,
  BookAuthor,
  ActionButton,
} from '../../styles/LibraryStyles';
import { FaBook, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const 
Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/library/getall');
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/library/books', {
        bookname: book.title,
        author: book.author,
      });
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleBookPick = async (bookId, studentId) => {
    try {
      await axios.post('http://localhost:4000/api/v1/library/pick', {
        bookId,
        studentId
      });
      fetchBooks(); // Refresh books
      alert('Book picked!');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleBookReturn = async (bookId, studentId) => {
    try {
      await axios.post('http://localhost:4000/api/v1/library/return', {
        bookId,
        studentId
      });
      fetchBooks(); // Refresh books
      alert('Book returned!');
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <LibraryContainer>
      <Sidebar />
      <Content>
          {/* Subtle pattern overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.13,
            backgroundImage: 'repeating-linear-gradient(135deg, #b3d1ff 0 2px, transparent 2px 40px)',
            borderRadius: 'inherit'
          }} />
        {/* Add Book Card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(33,147,176,0.10)',
          borderLeft: '6px solid #1976d2',
          padding: '28px 28px 18px 28px',
          maxWidth: '480px',
          margin: '0 auto 36px auto',
          animation: 'fadeInCard 0.7s cubic-bezier(0.23, 1, 0.32, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <FaBook style={{ color: '#1976d2', fontSize: '2rem' }} />
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', margin: 0, color: '#1976d2', letterSpacing: 1 }}>Add New Book</h2>
          </div>
          <AddBookForm
            style={{ boxShadow: 'none', borderLeft: 'none', margin: 0, padding: 0, background: 'none' }}
            onSubmit={(e) => {
              e.preventDefault();
              const book = {
                id: Math.random().toString(36).substr(2, 9),
                title: e.target.title.value,
                author: e.target.author.value,
              };
              addBook(book);
              e.target.reset();
            }}
          >
            <FormGroup>
              <Label htmlFor="title">Title:</Label>
              <Input type="text" id="title" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="author">Author:</Label>
              <Input type="text" id="author" required />
            </FormGroup>
            <Button type="submit">Add Book</Button>
          </AddBookForm>
        </div>

        {/* Book Table Card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(33,147,176,0.10)',
          borderLeft: '6px solid #1976d2',
          padding: '0 0 18px 0',
          margin: '0 auto',
          marginBottom: '36px',
          maxWidth: '900px',
          animation: 'fadeInCard 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s',
          animationFillMode: 'both',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#f0faff', color: '#1976d2', fontWeight: 700, fontSize: 15 }}>
                <th style={{ padding: '16px 8px', textAlign: 'left', borderBottom: '2px solid #e3f0ff' }}>S NO</th>
                <th style={{ padding: '16px 8px', textAlign: 'left', borderBottom: '2px solid #e3f0ff' }}>Title</th>
                <th style={{ padding: '16px 8px', textAlign: 'left', borderBottom: '2px solid #e3f0ff' }}>Author</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, idx) => (
                <tr key={book._id} style={{ background: idx % 2 === 0 ? '#f7faff' : '#fff', transition: 'background 0.18s' }}>
                  <td style={{ padding: '14px 8px', fontWeight: 600, color: '#1976d2' }}>{String(idx + 1).padStart(2, '0')}</td>
                  <td style={{ padding: '14px 8px', fontWeight: 600 }}>{book.bookname}</td>
                  <td style={{ padding: '14px 8px', color: '#555' }}>{book.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <style>{`
          @keyframes fadeInCard {
            0% { opacity: 0; transform: translateY(30px) scale(0.97); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </Content>
    </LibraryContainer>
  );
};

export default Library;
