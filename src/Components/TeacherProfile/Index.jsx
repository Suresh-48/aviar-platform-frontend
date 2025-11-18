import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBrain,
    faBriefcase,
    faGraduationCap,
    faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Api from "../../Api";
import Loading from "../../Loading";
import "../CSS/EditTeacher.css";

function TeacherProfile() {
    const { id: teacherId } = useParams();

    const [data, setData] = useState({});
    const [aboutUs, setAboutUs] = useState("");
    const [skills, setSkills] = useState([]);
    const [training, setTraining] = useState([]);
    const [experience, setExperience] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Fetch both in parallel
                const [teacherRes, experienceRes] = await Promise.all([
                    Api.get(`api/v1/teacher/${teacherId}`),
                    Api.get(`/api/v1/teacherApplication/${teacherId}`, {
                        headers: { userId },
                    }),
                ]);

                // Teacher Data
                const teacherData = teacherRes?.data?.data?.getOne || {};

                setData(teacherData);
                setAboutUs(teacherData?.aboutUs || "");
                setSkills(teacherData.skills ? JSON.parse(teacherData.skills) : []);

                // Experience & Education
                const expData = experienceRes?.data?.getTeacherApplication || {};
                setTraining(expData?.education || []);
                setExperience(expData?.experience || []);
            } catch (error) {
                console.error("Error fetching teacher details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [teacherId]);

    if (isLoading) return <Loading />;

    return (
        <div className="teacher-profile-container px-2 px-md-3 pb-4">
            {/* TOP CARD */}
            <Card className="p-3 p-md-4 mt-3 teacher-profile-card">
                <Row className="align-items-center">

                    {/* INFO SECTION - LEFT ON DESKTOP | BELOW AVATAR ON MOBILE */}
                    <Col
                        xs={12}
                        md={9}
                        className="order-2 order-md-1 mt-3 mt-md-0"
                    >
                        <Row className="align-items-center">
                            <Col>
                                <h4 className="teacher-name m-0">
                                    {data?.firstName} {data?.lastName}
                                </h4>
                                <p className="teacher-email mb-2">{data?.email}</p>
                            </Col>

                            {/* Desktop edit button */}
                            <Col className="text-end d-none d-md-block">
                                <Button variant="primary" className="edit-profile-btn">
                                    <BsFillPersonPlusFill size={18} /> Edit Profile
                                </Button>
                            </Col>
                        </Row>

                        <hr className="my-2" />

                        <p className="teacher-about-text mb-0">
                            {aboutUs || "No biography available."}
                        </p>

                        {/* Mobile edit button */}
                        <div className="text-center d-md-none mt-3">
                            <Button variant="primary" className="edit-profile-btn w-100">
                                <BsFillPersonPlusFill size={18} /> Edit Profile
                            </Button>
                        </div>
                    </Col>

                    {/* AVATAR SECTION - RIGHT ON DESKTOP | TOP ON MOBILE */}
                    <Col
                        xs={12}
                        md={3}
                        className="order-1 order-md-2 d-flex justify-content-center"
                    >
                        {data?.imageUrl ? (
                            <Avatar
                                src={data.imageUrl}
                                size="150"
                                round={true}
                                className="profile-avatar responsive-avatar"
                            />
                        ) : (
                            <Avatar
                                name={`${data?.firstName || ""} ${data?.lastName || ""}`}
                                size="150"
                                round={true}
                                color="#007bff"
                                className="profile-avatar responsive-avatar"
                            />
                        )}
                    </Col>

                </Row>
            </Card>


            {/* Biography + Skills */}
            <Row className="mt-3 gy-3">
                <Col md={8}>
                    <Card className="p-3 shadow-sm teacher-card">
                        <h5 className="section-title">
                            <FontAwesomeIcon icon={faIdCard} className="me-2" />
                            Biography
                        </h5>

                        <Row className="mt-2">
                            <Col>
                                <p><b>First Name:</b> {data?.firstName}</p>
                                <p><b>Last Name:</b> {data?.lastName}</p>
                                <p><b>Country:</b> {data?.country || "-"}</p>
                            </Col>
                            <Col>
                                <p><b>Email:</b> {data?.email}</p>
                                <p><b>Phone:</b> {data?.phone}</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="p-3 shadow-sm teacher-card">
                        <h5 className="section-title">
                            <FontAwesomeIcon icon={faBrain} className="me-2" /> Skills
                        </h5>
                        {skills.length > 0 ? (
                            <ul className="skills-list">
                                {skills.map((s, i) => (
                                    <li key={i}>{s.label}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No skills provided.</p>
                        )}
                    </Card>
                </Col>
            </Row>

            {/* Education & Experience */}
            <Row className="mt-3 gy-3">
                <Col md={6}>
                    <Card className="p-3 shadow-sm teacher-card">
                        <h5 className="section-title">
                            <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                            Educational Information
                        </h5>

                        {training.length > 0 ? (
                            training.map((t, i) => (
                                <Accordion key={i} className="mt-2">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>{t?.institution}</Accordion.Header>
                                        <Accordion.Body>
                                            <p><b>Year:</b> {t?.yearOfPassing}</p>
                                            <p><b>Degree:</b> {t?.degree}</p>
                                            <p><b>Country:</b> {t?.country}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))
                        ) : (
                            <p>No education entries.</p>
                        )}
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="p-3 shadow-sm teacher-card">
                        <h5 className="section-title">
                            <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                            Experience
                        </h5>

                        {experience.length > 0 ? (
                            experience.map((exp, i) => (
                                <Accordion key={i} className="mt-2">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>{exp?.workInstitution}</Accordion.Header>
                                        <Accordion.Body>
                                            <p><b>Role:</b> {exp?.role}</p>
                                            <p>
                                                <b>Duration:</b> {exp?.roleStartDate} - {exp?.roleEndDate}
                                            </p>
                                            <p><b>Country:</b> {exp?.country}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))
                        ) : (
                            <p>No experience entries.</p>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default TeacherProfile;
