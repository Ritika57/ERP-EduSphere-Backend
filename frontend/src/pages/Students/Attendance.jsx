// AttendanceSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { AttendanceContainer, SidebarContainer, Content, AttendanceHeader, AttendanceList, AttendanceItem, AttendanceDate, AttendanceStatus } from '../../styles/AttendanceStyles'; 

const AttendanceSection = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
        console.log('studentInfo from localStorage:', studentInfo); // <-- log studentInfo
        if (!studentInfo || !studentInfo.id) {
          setAttendance([]);
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:4000/api/v1/attendance/getall');
        const allRecords = response.data.attendanceRecords || [];
        console.log('Fetched attendance records:', allRecords); // <-- log all records
        console.log('studentInfo.email:', studentInfo.email);
        console.log('attendance record emails:', allRecords.map(r => r.email));
        // Filter for this student by email
        const studentRecords = allRecords.filter(
          record => record.email && record.email.trim().toLowerCase() === studentInfo.email.trim().toLowerCase()
        );
        console.log('Filtered student records:', studentRecords); // <-- log filtered records
        setAttendance(studentRecords);
      } catch (err) {
        setError('Failed to fetch attendance data.');
        setAttendance([]);
      }
      setLoading(false);
    };
    fetchAttendance();
  }, []);

  return (
    <AttendanceContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <AttendanceHeader>Attendance</AttendanceHeader>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : attendance.length === 0 ? (
          <div>No attendance records found.</div>
        ) : (
          <AttendanceList>
            {attendance.map((record) => (
              <AttendanceItem key={record._id}>
                <AttendanceDate>{record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}</AttendanceDate>
                <AttendanceStatus present={record.status === 'Present'}>{record.status}</AttendanceStatus>
              </AttendanceItem>
            ))}
          </AttendanceList>
        )}
      </Content>
    </AttendanceContainer>
  );
};

export default AttendanceSection;
