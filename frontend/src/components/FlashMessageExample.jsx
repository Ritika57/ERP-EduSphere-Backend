import React from 'react';
import { useFlashMessage } from '../context/FlashMessageContext';
import styled from 'styled-components';

const ExampleContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const SuccessButton = styled(Button)`
  background-color: #10b981;
  color: white;
  
  &:hover {
    background-color: #059669;
  }
`;

const ErrorButton = styled(Button)`
  background-color: #ef4444;
  color: white;
  
  &:hover {
    background-color: #dc2626;
  }
`;

const WarningButton = styled(Button)`
  background-color: #f59e0b;
  color: white;
  
  &:hover {
    background-color: #d97706;
  }
`;

const InfoButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const FlashMessageExample = () => {
  const { showSuccess, showError, showWarning, showInfo, clearAllMessages } = useFlashMessage();

  return (
    <ExampleContainer>
      <h2>Flash Message Examples</h2>
      <p>Click the buttons below to see different types of flash messages in action:</p>
      
      <ButtonGroup>
        <SuccessButton onClick={() => showSuccess('This is a success message!')}>
          Show Success
        </SuccessButton>
        
        <ErrorButton onClick={() => showError('This is an error message!')}>
          Show Error
        </ErrorButton>
        
        <WarningButton onClick={() => showWarning('This is a warning message!')}>
          Show Warning
        </WarningButton>
        
        <InfoButton onClick={() => showInfo('This is an info message!')}>
          Show Info
        </InfoButton>
      </ButtonGroup>
      
      <ButtonGroup>
        <Button onClick={() => showSuccess('Custom duration message (3 seconds)', 3000)}>
          Success (3s)
        </Button>
        
        <Button onClick={() => showError('Long error message that will stay for 10 seconds', 10000)}>
          Error (10s)
        </Button>
        
        <Button onClick={clearAllMessages}>
          Clear All Messages
        </Button>
      </ButtonGroup>
      
      <div style={{ marginTop: '30px' }}>
        <h3>Usage Instructions:</h3>
        <ul>
          <li><strong>showSuccess(message, duration?)</strong> - Shows a green success message</li>
          <li><strong>showError(message, duration?)</strong> - Shows a red error message</li>
          <li><strong>showWarning(message, duration?)</strong> - Shows an orange warning message</li>
          <li><strong>showInfo(message, duration?)</strong> - Shows a blue info message</li>
          <li><strong>clearAllMessages()</strong> - Clears all active messages</li>
        </ul>
        
        <p><strong>Note:</strong> Duration is optional and defaults to 5 seconds. Messages auto-dismiss after the specified duration.</p>
      </div>
    </ExampleContainer>
  );
};

export default FlashMessageExample; 