import React, { useState, useEffect } from 'react';

const AddPerformanceForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    student: '',
    score: '',
    subject: '',
    date: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);

  useEffect(() => {
    // Fetch students for dropdown
    fetch('/api/v1/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data.students || []);
        setStudentsLoading(false);
      })
      .catch(() => setStudentsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If student is changed, auto-fill email
    if (name === 'student') {
      const selectedStudent = students.find(s => s._id === value);
      setForm({ ...form, student: value, email: selectedStudent ? selectedStudent.email : '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/v1/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student: form.student,
          score: Number(form.score),
          subject: form.subject,
          date: form.date || undefined,
          email: form.email
        })
      });
      if (!res.ok) throw new Error('Failed to add performance');
      setSuccess(true);
      setForm({ student: '', score: '', subject: '', date: '', email: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
      <h3>Add Performance Record</h3>
      <div>
        <label>Student Name:</label>
        {studentsLoading ? (
          <span>Loading students...</span>
        ) : (
          <select name="student" value={form.student} onChange={handleChange} required>
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <label>Email:</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required  />
      </div>
      <div>
        <label>Score:</label>
        <input name="score" type="number" value={form.score} onChange={handleChange} required min="0" max="100" />
      </div>
      <div>
        <label>Subject:</label>
        <input name="subject" value={form.subject} onChange={handleChange} />
      </div>
      <div>
        <label>Date:</label>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
      </div>
      <button type="submit" disabled={loading || studentsLoading}>{loading ? 'Adding...' : 'Add Performance'}</button>
      {success && <div style={{ color: 'green' }}>Performance added!</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default AddPerformanceForm; 