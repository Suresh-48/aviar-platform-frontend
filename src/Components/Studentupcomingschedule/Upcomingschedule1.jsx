import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';

const rows = [
  {
    sno: 1,
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    courseName: 'Mathematics',
    teacherName: 'John Doe',
    amount: '$50',
  },
  {
    sno: 2,
    day: 'Tuesday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    courseName: 'Physics',
    teacherName: 'Jane Smith',
    amount: '$60',
  },
  {
    sno: 3,
    day: 'Wednesday',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    courseName: 'Chemistry',
    teacherName: 'Alice Johnson',
    amount: '$55',
  },
  {
    sno: 4,
    day: 'Thursday',
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    courseName: 'Biology',
    teacherName: 'Bob Brown',
    amount: '$45',
  },
  {
    sno: 5,
    day: 'Friday',
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    courseName: 'History',
    teacherName: 'Charlie Davis',
    amount: '$40',
  },
];

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Course History</h1>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Teacher Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => (
              <TableRow key={row.sno}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.day}</TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.endTime}</TableCell>
                <TableCell>{row.courseName}</TableCell>
                <TableCell>{row.teacherName}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell> */}
                  {/* <Button variant="contained" color="primary"> */}
                    {/* Edit
                  </Button>
                  <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
                    Delete
                  </Button> */}
                {/* </TableCell> */}
              {/* </TableRow> */}
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;