import React, { useMemo, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Home from '../src/components/Home.jsx';
import ChooseUser from '../src/components/ChooseUser';
import AdminSignIn from '../src/components/AdminSignIn';
import AdminRegister from './components/AdminRegister.jsx';
import StudentSignIn from '../src/components/StudentSignIn';
import TeacherSignIn from '../src/components/TeacherSignIn';
import AdminDashboard from '../src/pages/Admin/Dashboard';
import StudentDashboard from '../src/pages/Students/Dashboard';
import TeacherDashboard from '../src/pages/Teachers/Dashboard';
import Classes from '../src/pages/Admin/Classes';
import Exam from '../src/pages/Admin/Exam';
import Attendance from '../src/pages/Admin/Attendance';
import Performance from '../src/pages/Admin/Performance';
import Teachers from '../src/pages/Admin/Teachers';
import Students from '../src/pages/Admin/Students';
import Assignments from '../src/pages/Admin/Assignments';
import Library from '../src/pages/Admin/Library';
import EventCalender from '../src/pages/Admin/EventCalender';
import SettingsProfile from '../src/pages/Admin/SettingsProfile';
import Announcement from '../src/pages/Admin/Announcement';
import StudentAssignments from '../src/pages/Students/Assignments';
import ExamSection from '../src/pages/Students/Exams';
import PerformanceSection from '../src/pages/Students/Performance';
import AttendanceSection from '../src/pages/Students/Attendance';
import LibrarySection from '../src/pages/Students/Library';
import AnnouncementSection from '../src/pages/Students/Announcement';
import ProfileSection from '../src/pages/Students/Profile';
import ClassSection from '../src/pages/Teachers/Classes';
import StudentSection from '../src/pages/Teachers/Students';
import TeacherSection from '../src/pages/Teachers/Teachers';
import CheckPerformanceSection from '../src/pages/Teachers/Performance';
import EventSection from '../src/pages/Teachers/Events';
import TeacherProfileSection from '../src/pages/Teachers/Profile';
import CheckAnnouncementSection from '../src/pages/Teachers/Announcement';
import AssignmentSection from '../src/pages/Teachers/Assignments';
import CheckAttendanceSection from '../src/pages/Teachers/Attendance';
import CheckExamSection from '../src/pages/Teachers/Exams';

// Theme setup
const lightTheme = {
  background: '#f3f4f8', // slightly darker for contrast
  card: '#fff',
  text: '#222',
  primary: '#2563eb', // blue
  accent: '#10b981', // green
  border: '#e5e7eb',
  sidebar: '#23272f',
  sidebarText: '#fff',
  sidebarActive: '#2563eb',
  buttonBg: '#2563eb',
  buttonText: '#fff',
  buttonHover: '#1d4ed8',
  inputBg: '#f3f4f6',
  inputBorder: '#e5e7eb',
  shadow: '0 2px 8px rgba(0,0,0,0.04)',
  transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
};
const darkTheme = {
  background: '#18191a',
  card: '#23272f',
  text: '#f5f6fa',
  primary: '#2563eb',
  accent: '#10b981',
  border: '#23272f',
  sidebar: '#18191a',
  sidebarText: '#fff',
  sidebarActive: '#2563eb',
  buttonBg: '#2563eb',
  buttonText: '#fff',
  buttonHover: '#1d4ed8',
  inputBg: '#23272f',
  inputBorder: '#23272f',
  shadow: '0 2px 8px rgba(0,0,0,0.16)',
  transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
};

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s, color 0.3s;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: none; }
  }
`;

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme') || 'light');
  const theme = useMemo(() => (themeMode === 'dark' ? darkTheme : lightTheme), [themeMode]);
  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/choose-user" element={<ChooseUser />} />
            {/* All the sign-in pages/routes */}
            <Route exact path="/admin-signIn" element={<AdminSignIn />} />
            <Route exact path="/admin/register" element={<AdminRegister />} />
            <Route exact path="/student-signIn" element={<StudentSignIn />} />
            <Route exact path="/teacher-signIn" element={<TeacherSignIn />} />
            {/* All the dashboard routes */}
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
            <Route exact path="/teacher/dashboard" element={<TeacherDashboard />} />        
            <Route exact path="/student/dashboard" element={<StudentDashboard />} />
            {/* Admin section here */}
            <Route exact path="/admin/classes" element={<Classes />} />
            <Route exact path="/admin/exams" element={<Exam />} />
            <Route exact path="/admin/attendance" element={<Attendance />} />
            <Route exact path="/admin/performance" element={<Performance />} />
            <Route exact path="/admin/teachers" element={<Teachers />} />
            <Route exact path="/admin/students" element={<Students />} />
            <Route exact path="/admin/assignments" element={<Assignments />} />
            <Route exact path="/admin/library" element={<Library />} />
            <Route exact path="/admin/communication" element={<Announcement />} />
            <Route exact path="/admin/events" element={<EventCalender />} />
            <Route exact path="/admin/settings" element={<SettingsProfile />} />
            {/* Students sections here  */}
            <Route exact path="/student/assignments" element={<StudentAssignments />} />
            <Route exact path="/student/exams" element={<ExamSection />} />
            <Route exact path="/student/performance" element={<PerformanceSection />} />
            <Route exact path="/student/attendance" element={<AttendanceSection />} />
            <Route exact path="/student/library" element={<LibrarySection />} />
            <Route exact path="/student/communication" element={<AnnouncementSection/>} />
            <Route exact path="/student/settings" element={<ProfileSection />} />
            {/* Teachers sections here */}
            <Route exact path="/teacher/classes" element={<ClassSection />} />
            <Route exact path="/teacher/students" element={<StudentSection />} />
            <Route exact path="/teacher/teachers" element={<TeacherSection />} />
            <Route exact path="/teacher/assignments" element={<AssignmentSection />} />
            <Route exact path="/teacher/exams" element={<CheckExamSection />} />
            <Route exact path="/teacher/performance" element={<CheckPerformanceSection />} />
            <Route exact path="/teacher/attendance" element={<CheckAttendanceSection />} />
            <Route exact path="/teacher/communication" element={<CheckAnnouncementSection />} />
            <Route exact path="/teacher/events" element={<EventSection />} />
            <Route exact path="/teacher/settings" element={<TeacherProfileSection/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;



