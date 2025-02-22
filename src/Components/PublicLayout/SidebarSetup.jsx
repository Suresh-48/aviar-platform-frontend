import React from "react";
import PublicFooter from "./PublicFooter";
import Adminsidebar from "../Core/Adminsidebar";
import "../../CSS/Global.css"
import StudentDashboard from "../Dashboard/Studentdashboard";
import TeacherCourseList from "../TeacherCourseList/Index";

const SidebarSetup = () => {
    return (
        <>
            <Adminsidebar  />
            <div>
                <div className="card mainView">
                    <div className="card-body">
                        
                        <TeacherCourseList />
                    </div>
                </div>
            </div>
            <div className="footerDiv">
                <PublicFooter />
            </div>

        </>
    )
}

export default SidebarSetup;