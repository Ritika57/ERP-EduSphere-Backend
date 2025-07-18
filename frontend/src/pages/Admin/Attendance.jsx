// Attendance.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import bgImg from '../../assets/bg.png';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceList,
  AttendanceItem,
  StudentName,
  CheckboxLabel,
  Divider,
  SubmitButton,
  StatusGroup,
  StatusRadio,
  StatusLabel,
  Card,
  LoadingSpinner,
  MessageBox,
  AnimatedCheck,
  AnimatedCard,
  BackgroundImage,
  AttendanceDate
} from '../../styles/AttendanceStyles';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
      initializeAttendanceData(response.data.students);
      setLoading(false);
    } catch (error) {
      setError('Error fetching students');
      setLoading(false);
    }
  };

  const initializeAttendanceData = (students) => {
    const initialAttendanceData = students.map((student) => ({
      id: student._id,
      name: student.name,
      status: 'Present',
    }));
    setAttendanceData(initialAttendanceData);
  };

  const handleStatusChange = (id, status) => {
    const updatedData = attendanceData.map((student) => {
      if (student.id === id) {
        return { ...student, status };
      }
      return student;
    });
    setAttendanceData(updatedData);
  };

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);
    try {
      const formattedData = attendanceData.map(({ id, status }) => {
        const studentObj = students.find(s => s._id === id);
        if (studentObj && studentObj.email) {
          return {
            student: id,
            status,
            email: studentObj.email
          };
        }
        return null;
      }).filter(Boolean);
      await axios.post('http://localhost:4000/api/v1/attendance', { attendanceData: formattedData });
      setMessage('Attendance submitted successfully!');
    } catch (error) {
      setError('Error submitting attendance data');
    }
  };

  return (
    <AttendanceContainer>
      <BackgroundImage src={bgImg} alt="background" />
      <Sidebar />
      <Content>
        <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 12px' }}>
          <Card style={{ padding: '38px 36px 32px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}>
            <AttendanceContent>
              <AttendanceHeader>Attendance</AttendanceHeader>
              {/* Example: <AttendanceDate>{new Date().toLocaleDateString()}</AttendanceDate> */}
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {message && <MessageBox success>{message}</MessageBox>}
                  {error && <MessageBox>{error}</MessageBox>}
                  <AttendanceList>
                    {students.map((student, index) => (
                      <React.Fragment key={student._id}>
                        <AttendanceItem>
                          <StudentName>{student.name}</StudentName>
                          <StatusGroup>
                            {['Present', 'Absent', 'Absent with apology'].map((status) => (
                              <StatusLabel
                                key={status}
                                status={status}
                              >
                                <StatusRadio
                                  type="radio"
                                  name={`status-${student._id}`}
                                  checked={attendanceData[index]?.status === status}
                                  onChange={() => handleStatusChange(student._id, status)}
                                />
                                {status}
                                {attendanceData[index]?.status === status && (
                                  <AnimatedCheck>
                                    <FaCheckCircle color="#28a745" size={20} />
                                  </AnimatedCheck>
                                )}
                              </StatusLabel>
                            ))}
                          </StatusGroup>
                        </AttendanceItem>
                        {index !== students.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </AttendanceList>
                  <SubmitButton onClick={handleSubmit}>Submit Attendance</SubmitButton>
                </>
              )}
            </AttendanceContent>
          </Card>
        </div>
      </Content>
    </AttendanceContainer>
  );
};

export default Attendance;
