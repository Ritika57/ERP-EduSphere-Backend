import React, { createContext, useContext, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Styled components for flash messages
const FlashMessageContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
`;

const FlashMessage = styled.div`
  padding: 16px 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${props => props.show ? slideIn : slideOut} 0.3s ease-in-out;
  opacity: ${props => props.show ? 1 : 0};
  transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 0.3s ease-in-out;
  
  ${props => {
    switch (props.type) {
      case 'success':
        return `
          background: #10b981;
          color: white;
          border-left: 4px solid #059669;
        `;
      case 'error':
        return `
          background: #ef4444;
          color: white;
          border-left: 4px solid #dc2626;
        `;
      case 'warning':
        return `
          background: #f59e0b;
          color: white;
          border-left: 4px solid #d97706;
        `;
      case 'info':
        return `
          background: #3b82f6;
          color: white;
          border-left: 4px solid #2563eb;
        `;
      default:
        return `
          background: #6b7280;
          color: white;
          border-left: 4px solid #4b5563;
        `;
    }
  }}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  margin-left: 12px;
  opacity: 0.8;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const MessageContent = styled.div`
  flex: 1;
`;

// Context
const FlashMessageContext = createContext();

// Hook to use flash messages
export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (!context) {
    throw new Error('useFlashMessage must be used within a FlashMessageProvider');
  }
  return context;
};

// Provider component
export const FlashMessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((type, message, duration = 5000) => {
    const id = Date.now() + Math.random();
    const newMessage = { id, type, message, show: true };
    
    setMessages(prev => [...prev, newMessage]);

    // Auto dismiss after duration
    setTimeout(() => {
      dismissMessage(id);
    }, duration);

    return id;
  }, []);

  const dismissMessage = useCallback((id) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, show: false } : msg
      )
    );

    // Remove from DOM after animation
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }, 300);
  }, []);

  const showSuccess = useCallback((message, duration) => {
    return addMessage('success', message, duration);
  }, [addMessage]);

  const showError = useCallback((message, duration) => {
    return addMessage('error', message, duration);
  }, [addMessage]);

  const showWarning = useCallback((message, duration) => {
    return addMessage('warning', message, duration);
  }, [addMessage]);

  const showInfo = useCallback((message, duration) => {
    return addMessage('info', message, duration);
  }, [addMessage]);

  const clearAllMessages = useCallback(() => {
    setMessages(prev => prev.map(msg => ({ ...msg, show: false })));
    setTimeout(() => {
      setMessages([]);
    }, 300);
  }, []);

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissMessage,
    clearAllMessages,
    messages
  };

  return (
    <FlashMessageContext.Provider value={value}>
      {children}
      <FlashMessageContainer>
        {messages.map((message) => (
          <FlashMessage
            key={message.id}
            type={message.type}
            show={message.show}
          >
            <MessageContent>{message.message}</MessageContent>
            <CloseButton onClick={() => dismissMessage(message.id)}>
              ×
            </CloseButton>
          </FlashMessage>
        ))}
      </FlashMessageContainer>
    </FlashMessageContext.Provider>
  );
}; 