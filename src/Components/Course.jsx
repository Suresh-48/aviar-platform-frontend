import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
const Course = () => {
  return (
    <div>
     <div> <Navbar/></div>
    <h3>  Course</h3>
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // full page height
  }}
>
  <div style={{ flex: 1 }}>
    {/* Your main content here */}
  </div>

  <div
    style={{
      // backgroundColor: "#f8f9fa",
      padding: "15px",
      textAlign: "center",
      // borderTop: "1px solid #ddd",
    }}
  >
    <Footer />
  </div>
</div>

      </div>
  )
}

export default Course