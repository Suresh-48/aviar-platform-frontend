

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertFromRaw } from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
import Avatar from "react-avatar";
import Api from "../../Api";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const TeacherPublicProfile = (props) => {
  const [teacherDetail, setTeacherDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const teacherId = location.state?.teacherId;



  useEffect(() => {
    getTeacherDetail();
  }, []);

  const getTeacherDetail = () => {
    Api.get(`api/v1/teacher/${teacherId}`)
      .then((response) => {
        const data = response.data.data.getOne;
        setTeacherDetail(data);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  // ✅ Safe converter with fallback
  const convertFromJSONToHTML = (value) => {
    try {
      if (!value) return { __html: "<p>Yet to be Updated</p>" };
      return { __html: stateToHTML(convertFromRaw(JSON.parse(value))) };
    } catch (exp) {
      return { __html: "<p>Yet to be Updated</p>" };
    }
  };

  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="p-4">
      <Container>
        <Row>
          <Col sm={4} md={3} xs={12}>
            <div className="me-4">
              <div className="d-flex justify-content-center mt-5 teacher-profile-public-alignment">
                {teacherDetail?.imageUrl ? (
                  <img
                    className="profile-image-size"
                    src={teacherDetail?.imageUrl}
                    alt="Teacher Profile"
                  />
                ) : (
                  <Avatar
                    name={`${teacherDetail?.firstName || ""} ${teacherDetail?.lastName || ""}`}
                    size="150"
                    round={true}
                    color="silver"
                  />
                )}
              </div>
              <div className="teacher-profile-public-alignment">
                <p className="user-name justify-content-start mt-5 ">
                  {teacherDetail?.firstName + " " + teacherDetail?.lastName}
                </p>
                {console.log(teacherDetail,"teacher about.....")}
                <p variant="secondary" className="teacher-specality">
                  Email: {teacherDetail?.email || "-"}
                </p>
                <p variant="secondary" className="teacher-specality text-left">
                  Speciality: {teacherDetail?.speciality || "-"}
                </p>
              </div>
            </div>
          </Col>

          <Col md={9} className="ps-5 mt-2">
            <div className="about-me">
              <p className="aboutUs-label-style">About Me :{teacherDetail?.hearAboutUs}</p>
              <div
                dangerouslySetInnerHTML={convertFromJSONToHTML(
                  teacherDetail?.aboutUs
                )}
              />
            </div>

           <div className="mt-4">
  {console.log(teacherDetail, "teacherDetail")}

  <p className="aboutUs-label-style">Speciality Description:</p>
  <div
    dangerouslySetInnerHTML={convertFromJSONToHTML(
      typeof teacherDetail?.specialityDescription === "string"
        ? JSON.parse(teacherDetail?.specialityDescription)
        : teacherDetail?.specialityDescription
    )}
  />
</div>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeacherPublicProfile;
