import { sendAdminWelcomeEmail, sendStudentWelcomeEmail, sendTeacherWelcomeEmail, testEmailConnection } from "../utils/emailService.js";

// Test email connection
export const testEmailConfig = async (req, res) => {
  try {
    const result = await testEmailConnection();
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: "Email configuration is working correctly!" 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: "Email configuration failed", 
        error: result.error 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Email test failed", 
      error: error.message 
    });
  }
};

// Test sending welcome email
export const testWelcomeEmail = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "Email address is required" 
    });
  }

  try {
    const result = await sendAdminWelcomeEmail(email);
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: "Test welcome email sent successfully!",
        messageId: result.messageId
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send test email", 
        error: result.error 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Email sending failed", 
      error: error.message 
    });
  }
};

// Test sending student welcome email
export const testStudentWelcomeEmail = async (req, res) => {
  const { name, email, password, registrationNumber, grade } = req.body;
  
  if (!name || !email || !password || !registrationNumber || !grade) {
    return res.status(400).json({ 
      success: false, 
      message: "All student fields are required (name, email, password, registrationNumber, grade)" 
    });
  }

  try {
    const studentData = { name, email, password, registrationNumber, grade };
    const result = await sendStudentWelcomeEmail(studentData);
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: "Test student welcome email sent successfully!",
        messageId: result.messageId
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send test student email", 
        error: result.error 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Student email sending failed", 
      error: error.message 
    });
  }
};

// Test sending teacher welcome email
export const testTeacherWelcomeEmail = async (req, res) => {
  const { name, email, password, subject } = req.body;
  
  if (!name || !email || !password || !subject) {
    return res.status(400).json({ 
      success: false, 
      message: "All teacher fields are required (name, email, password, subject)" 
    });
  }

  try {
    const teacherData = { name, email, password, subject };
    const result = await sendTeacherWelcomeEmail(teacherData);
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: "Test teacher welcome email sent successfully!",
        messageId: result.messageId
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send test teacher email", 
        error: result.error 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Teacher email sending failed", 
      error: error.message 
    });
  }
};
