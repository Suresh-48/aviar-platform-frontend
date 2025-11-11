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
    const [description, setDescription] = useState("");
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

                // Parse teacher details
                const teacherData = teacherRes?.data?.data?.getOne || {};
                const parsedSkills = teacherData.skills
                    ? JSON.parse(teacherData.skills)
                    : [];


                setData(teacherData);
                setSkills(parsedSkills);
                setDescription(teacherData?.specialityDescription || "");
                setAboutUs(teacherData?.aboutUs || "");

                // Parse experience + education
                const expData = experienceRes?.data?.getTeacherApplication || {};
                setTraining(expData?.education || []);
                setExperience(expData?.experience || []);
            } catch (error) {
                console.error("Error fetching teacher details:", error);
            } finally {
                // Always turn off loading
                setIsLoading(false);
            }
        };

        fetchData();
    }, [teacherId, userId]);

    if (isLoading) return <Loading />;



    return (
        <div className="px-3 pb-3 m-0">
            <Card className="p-3 mt-4">
                <Row>
                    <Col md={3} className="d-flex justify-content-center align-items-center">
                        {data?.imageUrl ? (
                            <Avatar
                                alt="Teacher"
                                className="teacher-profile-avatar-image"
                                src={data.imageUrl}
                                size="180"
                                round={true}
                            />
                        ) : (
                            <Avatar
                                name={`${data?.firstName || ""} ${data?.lastName || ""}`}
                                size="180"
                                round={true}
                                color="#007bff"
                            />
                        )}
                    </Col>

                    <Col md={9}>
                        <Row>
                            <Col className="teacher-edit-profile">
                                <div className="mt-4">
                                    <h5 className="teacher-edit-profile-color">
                                        {data?.firstName} {data?.lastName}
                                    </h5>
                                    <p>{data?.email}</p>
                                </div>
                            </Col>
                            <Col className="teacher-edit-profile-last text-end">
                                <Button
                                    variant="primary"
                                    className="edit-profile-btn m-2"

                                >
                                    <BsFillPersonPlusFill size={25} color="white" /> Edit Profile
                                </Button>
                            </Col>
                        </Row>
                        <hr className="pt-1 mb-2" />
                        <p>{aboutUs || "About Me:"}</p>
                    </Col>
                </Row>
            </Card>

            {/* Biography */}
            <Row>
                <Col md={8} className="mt-3">
                    <Card className="p-3 shadow bg-white teacher-card">
                        <h5 className="teacher-edit-profile-color">
                            <FontAwesomeIcon icon={faIdCard} className="me-2" /> Biography
                        </h5>
                        <Row>
                            <Col>
                                <div className="teacher-profile-screen mt-2">
                                    <text className="teacher-profile-width-text">First Name</text>
                                    <text className="teacher-profile-width-bold">
                                        {" "}
                                        {data?.firstName}
                                    </text>
                                </div>
                                <div className="teacher-profile-screen mt-2">
                                    <text className="teacher-profile-width-text">Last Name</text>
                                    <text className="teacher-profile-width-bold">
                                        {" "}
                                        {data?.lastName}
                                    </text>
                                </div>
                                <div className="teacher-profile-screen mt-2">
                                    <text className="teacher-profile-width-text">Country</text>
                                    <text className="teacher-profile-width-bold">
                                        {" "}
                                        {data?.country || "-"}
                                    </text>
                                </div>
                            </Col>
                            <Col>
                                <div className="teacher-profile-screen mt-2">
                                    <text className="teacher-prf-width-text">Email</text>
                                    <text className="teacher-prf-width-bold"> {data?.email}</text>
                                </div>
                                <div className="teacher-profile-screen mt-2">
                                    <text className="teacher-prf-width-text">Phone</text>
                                    <text className="teacher-prf-width-bold"> {data?.phone}</text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Skills */}
                <Col md={4} className="mt-3">
                    <Card className="p-3 shadow bg-white teacher-card">
                        <h5 className="teacher-edit-profile-color">
                            <FontAwesomeIcon icon={faBrain} className="me-2" /> Skills
                        </h5>
                        {skills.length > 0 ? (
                            <ul>{skills.map((s, i) => <li key={i}>{s.label}</li>)}</ul>
                        ) : (
                            <p>No skills listed</p>
                        )}
                    </Card>
                </Col>
            </Row>

            {/* Education & Experience */}
            <Row>
                <Col className="mt-3">
                    <Card className="p-3 shadow bg-white teacher-card">
                        <h5 className="teacher-edit-profile-color">
                            <FontAwesomeIcon icon={faGraduationCap} className="me-2" /> Educational Information
                        </h5>
                        {training.length > 0 ? (
                            training.map((t, i) => (
                                <Accordion key={i} className="mb-2">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>{t?.institution}</Accordion.Header>
                                        <Accordion.Body>
                                            <p><b>Year Of Passing:</b> {t?.yearOfPassing || "-"}</p>
                                            <p><b>Subject:</b> {t?.degree || "-"}</p>
                                            <p><b>Country:</b> {t?.country || "-"}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))
                        ) : (
                            <p>No education details available.</p>
                        )}
                    </Card>
                </Col>

                <Col className="mt-3">
                    <Card className="p-3 shadow bg-white teacher-card">
                        <h5 className="teacher-edit-profile-color">
                            <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Experience
                        </h5>
                        {experience.length > 0 ? (
                            experience.map((exp, i) => (
                                <Accordion key={i} className="mb-2">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>{exp?.workInstitution}</Accordion.Header>
                                        <Accordion.Body>
                                            <p><b>Role:</b> {exp?.role || "-"}</p>
                                            <p><b>Date:</b> {exp?.roleStartDate} - {exp?.roleEndDate}</p>
                                            <p><b>Country:</b> {exp?.country || "-"}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))
                        ) : (
                            <p>No experience details available.</p>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default TeacherProfile;
