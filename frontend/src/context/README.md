# Flash Message Context

A reusable React context for displaying flash messages (notifications) throughout the application.

## Features

- ✅ Four message types: Success, Error, Warning, Info
- ✅ Auto-dismiss with customizable duration
- ✅ Manual dismiss with close button
- ✅ Smooth slide-in/slide-out animations
- ✅ Multiple messages can be displayed simultaneously
- ✅ Responsive design
- ✅ TypeScript-friendly

## Setup

The `FlashMessageProvider` is already wrapped around your app in `App.jsx`. No additional setup required.

## Usage

### Basic Usage

```jsx
import { useFlashMessage } from '../context/FlashMessageContext';

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useFlashMessage();

  const handleSuccess = () => {
    showSuccess('Operation completed successfully!');
  };

  const handleError = () => {
    showError('Something went wrong!');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};
```

### Advanced Usage

```jsx
const { 
  showSuccess, 
  showError, 
  showWarning, 
  showInfo, 
  clearAllMessages,
  dismissMessage 
} = useFlashMessage();

// Custom duration (in milliseconds)
showSuccess('Custom duration message', 3000); // 3 seconds

// Clear all messages
clearAllMessages();

// Dismiss specific message (returns message ID)
const messageId = showError('This will be dismissed manually');
dismissMessage(messageId);
```

## API Reference

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `showSuccess(message, duration?)` | `message: string, duration?: number` | Shows a green success message |
| `showError(message, duration?)` | `message: string, duration?: number` | Shows a red error message |
| `showWarning(message, duration?)` | `message: string, duration?: number` | Shows an orange warning message |
| `showInfo(message, duration?)` | `message: string, duration?: number` | Shows a blue info message |
| `clearAllMessages()` | None | Clears all active messages |
| `dismissMessage(id)` | `id: string` | Dismisses a specific message by ID |

### Parameters

- **message** (string): The text to display
- **duration** (number, optional): How long to show the message in milliseconds. Defaults to 5000ms (5 seconds)

## Message Types

| Type | Color | Use Case |
|------|-------|----------|
| Success | Green (#10b981) | Successful operations, confirmations |
| Error | Red (#ef4444) | Errors, failures, validation issues |
| Warning | Orange (#f59e0b) | Warnings, important notices |
| Info | Blue (#3b82f6) | General information, tips |

## Styling

Messages appear in the top-right corner of the screen with:
- Smooth slide-in animation from the right
- Auto-dismiss after specified duration
- Manual close button (×)
- Responsive design
- Box shadow for depth
- Color-coded by message type

## Examples in Your App

### Admin Registration
```jsx
// In AdminRegister.jsx
const handleRegister = async (e) => {
  e.preventDefault();
  
  if (!email || !password) {
    showError('Please fill in all fields');
    return;
  }

  try {
    const response = await axios.post('/api/register/admin', { email, password });
    showSuccess('Registration successful! Redirecting...');
    // Redirect after success
  } catch (error) {
    showError('Registration failed. Please try again.');
  }
};
```

### Admin Sign In
```jsx
// In AdminSignIn.jsx
const handleSignIn = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post('/api/signin', { email, password });
    showSuccess('Sign in successful! Redirecting to dashboard...');
    // Redirect after success
  } catch (error) {
    showError('Invalid credentials. Please try again.');
  }
};
```

## Best Practices

1. **Be specific**: Use clear, actionable error messages
2. **Keep it short**: Messages should be concise and readable
3. **Use appropriate types**: Match the message type to the situation
4. **Handle loading states**: Show loading indicators during async operations
5. **Provide feedback**: Always give users feedback for their actions

## Customization

To customize the styling, edit the styled components in `FlashMessageContext.jsx`:

- `FlashMessageContainer`: Controls positioning and layout
- `FlashMessage`: Controls individual message appearance
- `CloseButton`: Controls the close button styling
- Animation keyframes: `slideIn` and `slideOut` 