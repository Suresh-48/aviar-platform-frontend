import React from "react";
import { Outlet } from "react-router-dom";
import Allsidebar from "../Core/Allsidebar"      // Your existing sidebar component
import HeaderNavbar from "../Core/HeaderNavbar";
import PublicFooter from "../PublicLayout/PublicFooter";
import ChatBotConversation from "../ChatBotConversation/ChatBotConversation";
const PublicLayout = ({ open, onClick }) => {
 
  return (
    <div>
    <div>
    {/* <HeaderNavbar/> */}
    </div>
    <div>
      {/* Fixed Sidebar */}
      <Allsidebar  />
    
      {/* Main Content */}
      <div
        style={{
          bottom:"-70px",
          marginLeft: open ? "250px" : "60px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        <Outlet /> 
      
      </div>
  
    </div>
 
<div>
 <footer className="Publicfooter" style={{marginTop:"800px"}}>
      <PublicFooter/>
      </footer>
      </div>
    </div>
  
  );
};

export default PublicLayout;


