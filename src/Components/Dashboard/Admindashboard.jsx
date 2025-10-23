import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './css/Admindashboard.css';

// components/AdminDashboard.js
import  { useState, useEffect } from 'react';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockTeachers = [
          { 
            id: 1, 
            name: 'Dr. John Smith', 
            email: 'john.smith@email.com', 
            status: 'approved', 
            subject: 'MERN Stack', 
            joinDate: '2024-01-15',
            phone: '+1 (555) 123-4567',
            experience: '5 years',
            rating: 4.8
          },
          { 
            id: 2, 
            name: 'Prof. Sarah Johnson', 
            email: 'sarah.j@email.com', 
            status: 'pending', 
            subject: 'MERN Stack', 
            joinDate: '2024-02-01',
            phone: '+1 (555) 234-5678',
            experience: '3 years',
            rating: 4.5
          },
          { 
            id: 3, 
            name: 'Mike Wilson', 
            email: 'mike.wilson@email.com', 
            status: 'approved', 
            subject: 'MERN Stack', 
            joinDate: '2024-01-20',
            phone: '+1 (555) 345-6789',
            experience: '7 years',
            rating: 4.9
          },
          { 
            id: 4, 
            name: 'Emily Davis', 
            email: 'emily.davis@email.com', 
            status: 'pending', 
            subject: 'MERN Stack', 
            joinDate: '2024-02-10',
            phone: '+1 (555) 456-7890',
            experience: '2 years',
            rating: 4.3
          },
          { 
            id: 5, 
            name: 'Robert Brown', 
            email: 'robert.b@email.com', 
            status: 'approved', 
            subject: 'MERN Stack', 
            joinDate: '2024-01-25',
            phone: '+1 (555) 567-8901',
            experience: '6 years',
            rating: 4.7
          }
        ];

        const mockStudents = [
          { 
            id: 1, 
            name: 'Alice Brown', 
            email: 'alice.b@student.com', 
            grade: '10th Grade', 
            joinDate: '2024-01-10',
            phone: '+1 (555) 678-9012',
            courses: ['MERN Stack']
          },
          { 
            id: 2, 
            name: 'Bob Miller', 
            email: 'bob.m@student.com', 
            grade: '11th Grade', 
            joinDate: '2024-01-12',
            phone: '+1 (555) 789-0123',
          courses: ['MERN Stack']
          },
          { 
            id: 3, 
            name: 'Carol White', 
            email: 'carol.w@student.com', 
            grade: '9th Grade', 
            joinDate: '2024-01-18',
            phone: '+1 (555) 890-1234',
           courses: ['MERN Stack']
          },
          { 
            id: 4, 
            name: 'David Wilson', 
            email: 'david.w@student.com', 
            grade: '12th Grade', 
            joinDate: '2024-01-22',
            phone: '+1 (555) 901-2345',
            courses: ['MERN Stack']
          }
        ];

        const mockPayments = [
          { 
            id: 1, 
            teacherName: 'John Smith', 
            teacherId: 1,
            amount: 1500, 
            date: '2024-02-01', 
            status: 'completed',
            method: 'Bank Transfer',
            transactionId: 'TXN001'
          },
          { 
            id: 2, 
            teacherName: 'Mike Wilson', 
            teacherId: 3,
            amount: 1200, 
            date: '2024-02-01', 
            status: 'completed',
            method: 'PayPal',
            transactionId: 'TXN002'
          },
          { 
            id: 3, 
            teacherName: 'Sarah Johnson', 
            teacherId: 2,
            amount: 1000, 
            date: '2024-02-15', 
            status: 'pending',
            method: 'Bank Transfer',
            transactionId: 'TXN003'
          },
          { 
            id: 4, 
            teacherName: 'Robert Brown', 
            teacherId: 5,
            amount: 1800, 
            date: '2024-02-10', 
            status: 'completed',
            method: 'Stripe',
            transactionId: 'TXN004'
          }
        ];

        setTeachers(mockTeachers);
        setStudents(mockStudents);
        setPayments(mockPayments);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Filtered data
  const approvedTeachers = teachers.filter(teacher => teacher.status === 'approved');
  const pendingTeachers = teachers.filter(teacher => teacher.status === 'pending');
  const totalAmount = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = payments.filter(payment =>
    payment.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Actions
  const approveTeacher = (teacherId) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === teacherId ? { ...teacher, status: 'approved' } : teacher
    ));
  };

  const rejectTeacher = (teacherId) => {
    setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
  };

  const removeStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const completePayment = (paymentId) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: 'completed' } : payment
    ));
  };

  // Search and Filter Component
  const SearchAndFilter = () => (
    <div className="search-filter-bar">
      <div className="search-box">
        <i className="search-icon">🔍</i>
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {activeTab === 'teachers' && (
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
      )}
      {activeTab === 'payments' && (
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      )}
    </div>
  );

  // Overview Tab
  const renderOverview = () => (
    <div className="overview">
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h3>Total Teachers</h3>
            <div className="stat-number">{teachers.length}</div>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Approved Teachers</h3>
            <div className="stat-number">{approvedTeachers.length}</div>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Pending Teachers</h3>
            <div className="stat-number">{pendingTeachers.length}</div>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-info">
            <h3>Total Students</h3>
            <div className="stat-number">{students.length}</div>
          </div>
        </div>
        
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Amount Received</h3>
            <div className="stat-number">${totalAmount}</div>
          </div>
        </div>
        
        <div className="stat-card pending-revenue">
          <div className="stat-icon">💳</div>
          <div className="stat-info">
            <h3>Pending Amount</h3>
            <div className="stat-number">${pendingAmount}</div>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <div className="activity-section">
          <h3>Recent Teacher Applications</h3>
          <div className="activity-list">
            {pendingTeachers.slice(0, 3).map(teacher => (
              <div key={teacher.id} className="activity-item">
                <div className="activity-avatar">👨‍🏫</div>
                <div className="activity-content">
                  <p><strong>{teacher.name}</strong> applied for {teacher.subject}</p>
                  <span className="activity-time">{teacher.joinDate}</span>
                </div>
                <div className="activity-actions">
                  <button className="btn btn-sm btn-success" onClick={() => approveTeacher(teacher.id)}>
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h3>Recent Payments</h3>
          <div className="activity-list">
            {payments.slice(0, 3).map(payment => (
              <div key={payment.id} className="activity-item">
                <div className="activity-avatar">💰</div>
                <div className="activity-content">
                  <p><strong>${payment.amount}</strong> from {payment.teacherName}</p>
                  <span className={`status-badge ${payment.status}`}>{payment.status}</span>
                </div>
                <div className="activity-time">{payment.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Teachers Tab
  const renderTeachers = () => (
    <div className="teachers-section">
      <SearchAndFilter />
      
      <div className="section">
        <h3>Pending Teachers ({pendingTeachers.length})</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Experience</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.filter(t => t.status === 'pending').map(teacher => (
                <tr key={teacher.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">👨‍🏫</div>
                      <div>
                        <div className="user-name">{teacher.name}</div>
                        <div className="user-email">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{teacher.phone}</td>
                  <td>
                    <span className="subject-badge">{teacher.subject}</span>
                  </td>
                  <td>{teacher.experience}</td>
                  <td>{teacher.joinDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-success btn-sm" onClick={() => approveTeacher(teacher.id)}>
                        Approve
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => rejectTeacher(teacher.id)}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <h3>Approved Teachers ({approvedTeachers.length})</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Rating</th>
                <th>Experience</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.filter(t => t.status === 'approved').map(teacher => (
                <tr key={teacher.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">👨‍🏫</div>
                      <div>
                        <div className="user-name">{teacher.name}</div>
                        <div className="user-email">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{teacher.phone}</td>
                  <td>
                    <span className="subject-badge">{teacher.subject}</span>
                  </td>
                  <td>
                    <div className="rating">
                      <span className="rating-stars">⭐</span>
                      {teacher.rating}
                    </div>
                  </td>
                  <td>{teacher.experience}</td>
                  <td>{teacher.joinDate}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => rejectTeacher(teacher.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Students Tab
  const renderStudents = () => (
    <div className="students-section">
      <SearchAndFilter />
      
      <div className="section">
        <h3>All Students ({students.length})</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact</th>
                <th>Grade</th>
                <th>Courses</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">👨‍🎓</div>
                      <div>
                        <div className="user-name">{student.name}</div>
                        <div className="user-email">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{student.phone}</td>
                  <td>
                    <span className="grade-badge">{student.grade}</span>
                  </td>
                  <td>
                    <div className="courses-list">
                      {student.courses.map((course, index) => (
                        <span key={index} className="course-tag">{course}</span>
                      ))}
                    </div>
                  </td>
                  <td>{student.joinDate}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeStudent(student.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Payments Tab
  const renderPayments = () => (
    <div className="payments-section">
      <SearchAndFilter />
      
      <div className="section">
        <h3>Payment History</h3>
        <div className="payment-stats">
          <div className="payment-stat">
            <span className="stat-label">Total Received:</span>
            <span className="stat-value">${totalAmount}</span>
          </div>
          <div className="payment-stat">
            <span className="stat-label">Pending Payments:</span>
            <span className="stat-value">${pendingAmount}</span>
          </div>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Teacher</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td className="transaction-id">{payment.transactionId}</td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">👨‍🏫</div>
                      <div className="user-name">{payment.teacherName}</div>
                    </div>
                  </td>
                  <td className="amount">${payment.amount}</td>
                  <td>{payment.method}</td>
                  <td>{payment.date}</td>
                  <td>
                    <span className={`status-badge ${payment.status}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    {payment.status === 'pending' && (
                      <button className="btn btn-success btn-sm" onClick={() => completePayment(payment.id)}>
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1> Admin Dashboard</h1>
          <div className="header-actions">
            <div className="admin-info">
              <span>Welcome, Admin</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`nav-btn ${activeTab === 'teachers' ? 'active' : ''}`}
          onClick={() => setActiveTab('teachers')}
        >
          👨‍🏫 Teachers
        </button>
        <button 
          className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          👨‍🎓 Students
        </button>
        <button 
          className={`nav-btn ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          💰 Payments
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'teachers' && renderTeachers()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'payments' && renderPayments()}
      </main>
    </div>
  );
};

export default AdminDashboard;