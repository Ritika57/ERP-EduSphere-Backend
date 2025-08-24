import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Email templates
const getStudentWelcomeTemplate = (studentData) => {
  const { name, email, password, registrationNumber, grade } = studentData;
  return {
    subject: 'Welcome to EduSphere - Your Student Account is Ready!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to EduSphere</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .welcome-text {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .credentials-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #4CAF50;
          }
          .credential-item {
            margin: 10px 0;
            padding: 8px;
            background: #f8f9ff;
            border-radius: 4px;
          }
          .features {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .feature-item {
            margin: 10px 0;
            padding: 10px;
            border-left: 4px solid #4CAF50;
            background: #f0f8f0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .important {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🎓 EduSphere</div>
          <h1>Welcome ${name}!</h1>
          <p>Your Student Account is Ready</p>
        </div>
        
        <div class="content">
          <div class="welcome-text">
            <strong>Congratulations!</strong> Your student account has been successfully created in the EduSphere School Management System.
          </div>
          
          <div class="credentials-box">
            <h3>🔐 Your Login Credentials:</h3>
            <div class="credential-item">
              <strong>📧 Email:</strong> ${email}
            </div>
            <div class="credential-item">
              <strong>🔑 Password:</strong> ${password}
            </div>
            <div class="credential-item">
              <strong>📋 Registration Number:</strong> ${registrationNumber}
            </div>
            <div class="credential-item">
              <strong>🎯 Grade:</strong> ${grade}
            </div>
          </div>
          
          <div class="important">
            <strong>⚠️ Important:</strong> Please keep your login credentials safe and secure. We recommend changing your password after your first login.
          </div>
          
          <div class="features">
            <h3>🚀 What you can do as a Student:</h3>
            <div class="feature-item">
              <strong>📚 View Assignments:</strong> Access and submit your assignments
            </div>
            <div class="feature-item">
              <strong>📢 Read Announcements:</strong> Stay updated with school announcements
            </div>
            <div class="feature-item">
              <strong>📊 Check Performance:</strong> View your grades and academic progress
            </div>
            <div class="feature-item">
              <strong>📅 View Schedule:</strong> Check your class schedule and events
            </div>
            <div class="feature-item">
              <strong>📖 Library Access:</strong> Browse library resources and books
            </div>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Log in to your student dashboard using the credentials above</li>
            <li>Complete your profile setup</li>
            <li>Change your password for security</li>
            <li>Explore your assignments and announcements</li>
          </ol>
        </div>
        
        <div class="footer">
          <p>Welcome to EduSphere! We're excited to have you as part of our learning community.</p>
          <p><em>This is an automated message. Please do not reply to this email.</em></p>
          <p>© 2024 EduSphere - School Management System</p>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to EduSphere - ${name}!
      
      Congratulations! Your student account has been successfully created in the EduSphere School Management System.
      
      Your Login Credentials:
      - Email: ${email}
      - Password: ${password}
      - Registration Number: ${registrationNumber}
      - Grade: ${grade}
      
      IMPORTANT: Please keep your login credentials safe and secure. We recommend changing your password after your first login.
      
      What you can do as a Student:
      • View Assignments: Access and submit your assignments
      • Read Announcements: Stay updated with school announcements
      • Check Performance: View your grades and academic progress
      • View Schedule: Check your class schedule and events
      • Library Access: Browse library resources and books
      
      Next Steps:
      1. Log in to your student dashboard using the credentials above
      2. Complete your profile setup
      3. Change your password for security
      4. Explore your assignments and announcements
      
      Welcome to EduSphere! We're excited to have you as part of our learning community.
      
      This is an automated message. Please do not reply to this email.
      © 2024 EduSphere - School Management System
    `
  };
};

const getTeacherWelcomeTemplate = (teacherData) => {
  const { name, email, password, subject } = teacherData;
  return {
    subject: 'Welcome to EduSphere - Your Teacher Account is Ready!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to EduSphere</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .welcome-text {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .credentials-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #FF6B35;
          }
          .credential-item {
            margin: 10px 0;
            padding: 8px;
            background: #fff8f5;
            border-radius: 4px;
          }
          .features {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .feature-item {
            margin: 10px 0;
            padding: 10px;
            border-left: 4px solid #FF6B35;
            background: #fff5f0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .important {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🎓 EduSphere</div>
          <h1>Welcome ${name}!</h1>
          <p>Your Teacher Account is Ready</p>
        </div>
        
        <div class="content">
          <div class="welcome-text">
            <strong>Congratulations!</strong> Your teacher account has been successfully created in the EduSphere School Management System.
          </div>
          
          <div class="credentials-box">
            <h3>🔐 Your Login Credentials:</h3>
            <div class="credential-item">
              <strong>📧 Email:</strong> ${email}
            </div>
            <div class="credential-item">
              <strong>🔑 Password:</strong> ${password}
            </div>
            <div class="credential-item">
              <strong>📚 Subject:</strong> ${subject}
            </div>
          </div>
          
          <div class="important">
            <strong>⚠️ Important:</strong> Please keep your login credentials safe and secure. We recommend changing your password after your first login.
          </div>
          
          <div class="features">
            <h3>🚀 What you can do as a Teacher:</h3>
            <div class="feature-item">
              <strong>📝 Create Assignments:</strong> Create and manage assignments for your students
            </div>
            <div class="feature-item">
              <strong>📢 Post Announcements:</strong> Share important updates with your classes
            </div>
            <div class="feature-item">
              <strong>📊 Track Performance:</strong> Monitor student progress and grades
            </div>
            <div class="feature-item">
              <strong>✅ Manage Attendance:</strong> Mark and track student attendance
            </div>
            <div class="feature-item">
              <strong>📅 Schedule Classes:</strong> Organize your class schedule and events
            </div>
            <div class="feature-item">
              <strong>📖 Access Library:</strong> Manage library resources for your subject
            </div>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Log in to your teacher dashboard using the credentials above</li>
            <li>Complete your profile setup</li>
            <li>Change your password for security</li>
            <li>Start creating assignments and announcements</li>
            <li>Explore the teacher tools and features</li>
          </ol>
        </div>
        
        <div class="footer">
          <p>Welcome to EduSphere! We're excited to have you as part of our teaching community.</p>
          <p><em>This is an automated message. Please do not reply to this email.</em></p>
          <p>© 2024 EduSphere - School Management System</p>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to EduSphere - ${name}!
      
      Congratulations! Your teacher account has been successfully created in the EduSphere School Management System.
      
      Your Login Credentials:
      - Email: ${email}
      - Password: ${password}
      - Subject: ${subject}
      
      IMPORTANT: Please keep your login credentials safe and secure. We recommend changing your password after your first login.
      
      What you can do as a Teacher:
      • Create Assignments: Create and manage assignments for your students
      • Post Announcements: Share important updates with your classes
      • Track Performance: Monitor student progress and grades
      • Manage Attendance: Mark and track student attendance
      • Schedule Classes: Organize your class schedule and events
      • Access Library: Manage library resources for your subject
      
      Next Steps:
      1. Log in to your teacher dashboard using the credentials above
      2. Complete your profile setup
      3. Change your password for security
      4. Start creating assignments and announcements
      5. Explore the teacher tools and features
      
      Welcome to EduSphere! We're excited to have you as part of our teaching community.
      
      This is an automated message. Please do not reply to this email.
      © 2024 EduSphere - School Management System
    `
  };
};

const getAdminWelcomeTemplate = (email) => {
  return {
    subject: 'Welcome to EduSphere - Admin Access Granted',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to EduSphere</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .welcome-text {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .features {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .feature-item {
            margin: 10px 0;
            padding: 10px;
            border-left: 4px solid #667eea;
            background: #f8f9ff;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🎓 EduSphere</div>
          <h1>Welcome New Admin!</h1>
        </div>
        
        <div class="content">
          <div class="welcome-text">
            <strong>Congratulations!</strong> Your admin account has been successfully created for EduSphere School Management System.
          </div>
          
          <p><strong>Account Details:</strong></p>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Role:</strong> Administrator</li>
            <li><strong>Access Level:</strong> Full System Access</li>
          </ul>
          
          <div class="features">
            <h3>🚀 What you can do as an Admin:</h3>
            <div class="feature-item">
              <strong>👥 User Management:</strong> Register and manage teachers, students, and staff
            </div>
            <div class="feature-item">
              <strong>📚 Academic Management:</strong> Oversee assignments, announcements, and academic activities
            </div>
            <div class="feature-item">
              <strong>📊 System Analytics:</strong> Access comprehensive reports and system insights
            </div>
            <div class="feature-item">
              <strong>⚙️ System Configuration:</strong> Configure system settings and preferences
            </div>
          </div>
          
          <p>You can now log in to the EduSphere admin panel and start managing your educational institution efficiently.</p>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Log in to your admin dashboard</li>
            <li>Complete your profile setup</li>
            <li>Start adding teachers and students</li>
            <li>Configure your institution settings</li>
          </ol>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing EduSphere!</p>
          <p><em>This is an automated message. Please do not reply to this email.</em></p>
          <p>© 2024 EduSphere - School Management System</p>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to EduSphere - New Admin!
      
      Congratulations! Your admin account has been successfully created for EduSphere School Management System.
      
      Account Details:
      - Email: ${email}
      - Role: Administrator
      - Access Level: Full System Access
      
      What you can do as an Admin:
      • User Management: Register and manage teachers, students, and staff
      • Academic Management: Oversee assignments, announcements, and academic activities
      • System Analytics: Access comprehensive reports and system insights
      • System Configuration: Configure system settings and preferences
      
      You can now log in to the EduSphere admin panel and start managing your educational institution efficiently.
      
      Next Steps:
      1. Log in to your admin dashboard
      2. Complete your profile setup
      3. Start adding teachers and students
      4. Configure your institution settings
      
      Thank you for choosing EduSphere!
      
      This is an automated message. Please do not reply to this email.
      © 2024 EduSphere - School Management System
    `
  };
};

// Send teacher welcome email
export const sendTeacherWelcomeEmail = async (teacherData) => {
  try {
    const transporter = createTransporter();
    const emailTemplate = getTeacherWelcomeTemplate(teacherData);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: teacherData.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Teacher welcome email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending teacher welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Send student welcome email
export const sendStudentWelcomeEmail = async (studentData) => {
  try {
    const transporter = createTransporter();
    const emailTemplate = getStudentWelcomeTemplate(studentData);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: studentData.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Student welcome email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending student welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Send admin welcome email
export const sendAdminWelcomeEmail = async (email) => {
  try {
    const transporter = createTransporter();
    const emailTemplate = getAdminWelcomeTemplate(email);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin welcome email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending admin welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email server connection verified');
    return { success: true };
  } catch (error) {
    console.error('❌ Email server connection failed:', error);
    return { success: false, error: error.message };
  }
};
