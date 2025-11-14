import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import "../../css/Forum.css";
import Avatar from "react-avatar";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment-timezone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import Api from "../../Api";
import { getColorCode } from "../../utils/helper";
import Loader from "../core/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate, useLocation } from "react-router-dom";

function ForumComments() {
  const location = useLocation();
  const commentsData = location.state?.commentsData || {};
  const [data, setData] = useState(commentsData);
  const [questionData, setQuestionData] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [answerId, setAnswerId] = useState("");
  const [answer, setAnswer] = useState("");
  const [editText, setEditText] = useState("");
  const [user, setUser] = useState("");
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Quill modules configuration - FIXED
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const quillFormats = [
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align'
  ];

  // Helper function to get plain text from HTML for validation
  const getPlainText = (html) => {
    if (!html) return '';
    // Remove HTML tags and trim whitespace
    const plainText = html.replace(/<[^>]*>/g, '').trim();
    return plainText;
  };

  // Helper function to check if content is empty
  const isContentEmpty = (html) => {
    const plainText = getPlainText(html);
    return plainText.length === 0;
  };

  //logout
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    Api.get("/api/v1/forum/conversation", {
      params: {
        questionId: data.id,
        userId: userId,
      },
    })
      .then((response) => {
        const questionData = response?.data?.conversationList;
        setQuestionData(questionData);
        const colorLists = getForumColor(questionData);
        setColorList(colorLists);
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

  const getRecentComments = () => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    Api.get("/api/v1/forum/conversation", {
      params: {
        questionId: data.id,
        userId: userId,
      },
    })
      .then((response) => {
        const questionData = response?.data?.conversationList;
        setQuestionData(questionData);
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

  const getForumColor = (userData) => {
    let userIds = [];

    userData?.forEach((list) => {
      const userId = list?.userId._id;
      if (userIds.indexOf(userId) < 0) {
        userIds.push(userId);
      }
    });

    let forumUserColors = [];
    userIds.forEach((userId) => {
      forumUserColors.push({
        userId: userId,
        color: getColorCode(),
      });
    });

    return forumUserColors;
  };

  const getUserColorCode = (colors, userId) => {
    const userColor = colors.find(userColor => userColor.userId === userId);
    return userColor ? userColor.color : "";
  };

  const deleteMessage = (replyId) => {
    Api.delete("/api/v1/forum/conversation/delete/comment", {
      params: { id: replyId, userId: userId },
    })
      .then((response) => {
        toast.success("Comments Deleted Successfully");
        getComments();
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const updateData = () => {
    if (isContentEmpty(editText)) {
      toast.error("Please enter some content");
      return;
    }

    const userId = localStorage.getItem("userId");
    let tempDate = new Date();
    let date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    const newdate = moment(date).format("MMMM Do YYYY, h:mm:ss a");

    Api.patch("/api/v1/forum/conversation/edit", {
      question: data.id,
      answer: editText,
      createdAt: newdate,
      user: userId,
      answerId: answerId,
      userId: userId,
    })
      .then((response) => {
        toast.success("Comments Updated Successfully");
        setShow(false);
        getComments();
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const submitForm = (values, { resetForm }) => {
    if (isContentEmpty(answer)) {
      toast.error("Please enter some content");
      return;
    }

    const userId = localStorage.getItem("userId");
    let tempDate = new Date();
    let date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    const newdate = moment(date).format("MMMM Do YYYY, h:mm:ss a");
console.log("Submitting answer:", answer)
    Api.post("/api/v1/forum/conversation", {
      question: data.id,
      user: userId,
      answer: answer,
      createdAt: newdate,
      course: data.course,
      userId: userId,
    })
      .then((response) => {
        const status = response.status;
        if (status === 201) {
          setAnswer("");
          resetForm();
          toast.success("Comment posted successfully");
          getRecentComments();
        }
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  // FIXED: Proper content rendering function
  const renderContent = (content) => {
    if (!content) return '';
    
    // Check if it's Draft.js JSON format
    try {
      const parsed = JSON.parse(content);
      if (parsed.blocks && Array.isArray(parsed.blocks)) {
        // This is Draft.js content - convert to HTML
        const htmlContent = parsed.blocks.map(block => {
          if (block.text.trim() === '') return '';
          return `<p>${block.text}</p>`;
        }).join('');
        return htmlContent || '<p></p>';
      }
    } catch (e) {
      // If it's not JSON, return as HTML
      return content;
    }
    
    return content;
  };

  // FIXED: Validation schema
  const postSchema = Yup.object().shape({
    answerValue: Yup.string()
      .test('not-empty', 'Comments Is Required', function(value) {
        return !isContentEmpty(answer);
      })
  });

  const renderAvatar = (userData) => {
    if (!userData?.userId) return null;

    if (userData?.userId?.studentId) {
      return userData?.userId?.studentId?.imageUrl ? (
        <Avatar
          src={userData?.userId?.studentId?.imageUrl}
          round={true}
          size="55"
          color="#1c1364"
          style={{ minWidth: "fit-content" }}
        />
      ) : (
        <Avatar
          name={`${userData?.userId?.firstName} ${userData?.userId?.lastName}`}
          size="45"
          round={true}
          color="#1c1364"
        />
      );
    } else if (userData?.userId?.parentId) {
      return userData?.userId?.parentId?.imageUrl ? (
        <Avatar
          src={userData?.userId?.parentId?.imageUrl}
          round={true}
          size="55"
          color="#1c1364"
          style={{ minWidth: "fit-content" }}
        />
      ) : (
        <Avatar
          name={`${userData?.userId?.firstName} ${userData?.userId?.lastName}`}
          size="45"
          round={true}
          color="#1c1364"
        />
      );
    } else {
      return userData?.userId?.teacherId?.imageUrl ? (
        <Avatar
          src={userData?.userId?.teacherId?.imageUrl}
          round={true}
          size="55"
          color="#1c1364"
          style={{ minWidth: "fit-content" }}
        />
      ) : (
        <Avatar
          name={`${userData?.userId?.firstName} ${userData?.userId?.lastName}`}
          size="45"
          round={true}
          color="#1c1364"
        />
      );
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Col>
              <Stack direction="row" spacing={2} className="mt-2">
                {renderAvatar(data)}
                <div className="content-width mb-2">
                  <b>
                    {data?.userId?.firstName} {data?.userId?.lastName}{" "}
                  </b>
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: renderContent(data.question) 
                    }}
                  ></div>
                  <div className="forum-created-at">{data.createdAt}</div>
                </div>
              </Stack>
              <hr className="forum-padding" />
              {questionData?.length > 0 ? (
                questionData?.map((list, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={2}
                    className="forum-text-comments"
                  >
                    {list?.userId?.role === "student" ? (
                      list?.userId?.studentId?.imageUrl ? (
                        <Avatar
                          src={list?.userId?.studentId?.imageUrl}
                          size="45"
                          style={{ minWidth: "fit-content" }}
                          round={true}
                        />
                      ) : (
                        <Avatar
                          name={`${list?.userId?.firstName} ${list?.userId?.lastName}`}
                          size="45"
                          round={true}
                          color={`${getUserColorCode(
                            colorList,
                            list.userId._id
                          )}`}
                        />
                      )
                    ) : list?.userId?.role === "parent" ? (
                      list?.userId?.parentId?.imageUrl ? (
                        <Avatar
                          src={list?.userId?.parentId?.imageUrl}
                          size="45"
                          round={true}
                          style={{ minWidth: "fit-content" }}
                        />
                      ) : (
                        <Avatar
                          name={`${list?.userId?.firstName} ${list?.userId?.lastName}`}
                          size="45"
                          round={true}
                          color={`${getUserColorCode(
                            colorList,
                            list?.userId?._id
                          )}`}
                        />
                      )
                    ) : list?.userId?.teacherId?.imageUrl ? (
                      <Avatar
                        src={list?.userId?.teacherId?.imageUrl}
                        size="45"
                        round={true}
                        style={{ minWidth: "fit-content" }}
                      />
                    ) : (
                      <Avatar
                        name={`${list?.userId?.firstName} ${list?.userId?.lastName}`}
                        size="45"
                        round={true}
                        color={`${getUserColorCode(
                          colorList,
                          list?.userId?._id
                        )}`}
                      />
                    )}
                    <div style={{ width: "100%" }}>
                      <div className="d-flex align-items-center">
                        <b>
                          {list?.userId?.firstName} {list?.userId?.lastName}
                        </b>
                        {list?.userId?._id === userId ? (
                          <div className="d-flex justify-content-center mx-5">
                            <Tooltip title="Edit">
                              <IconButton>
                                <ModeEditOutlineIcon
                                  onClick={() => {
                                    setShow(true);
                                    // FIXED: Don't use renderContent for edit text
                                    setEditText(list.answer);
                                    setUser(list);
                                    setAnswerId(list.id);
                                  }}
                                  color="success"
                                  style={{ fontSize: "20px" }}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton>
                                <DeleteIcon
                                  color="error"
                                  style={{ fontSize: "20px" }}
                                  onClick={() => deleteMessage(list.id)}
                                />
                              </IconButton>
                            </Tooltip>
                          </div>
                        ) : null}
                      </div>

                      <div
                        dangerouslySetInnerHTML={{ 
                          __html: renderContent(list.answer) 
                        }}
                      ></div>
                      <div className="forum-page">
                        <div
                          style={{ fontSize: "small", display: "contents" }}
                        >
                          {" "}
                          {list.createdAt}
                        </div>{" "}
                      </div>
                    </div>
                  </Stack>
                ))
              ) : (
                <div className="d-flex justify-content-center">
                  <p className="mt-5 mb-3">No Comments ... !</p>
                </div>
              )}
              {/* FIXED: Formik section */}
              <Formik
                initialValues={{
                  answerValue: "",
                }}
                validationSchema={postSchema}
                onSubmit={submitForm}
                enableReinitialize
              >
                {(formik) => {
                  const { handleSubmit, errors, touched } = formik;

                  return (
                    <div>
                      <Form onSubmit={handleSubmit} className="mx-4 mt-5 ">
                        <Form.Group className="mr-2">
                          <Form.Label>
                            Comments <b className="text-danger">*</b>{" "}
                          </Form.Label>
                          <div className="teacher-description px-3 ">
                            <ReactQuill
                              theme="snow"
                              value={answer}
                              onChange={(value) => {
                                setAnswer(value);
                                // Update formik value for validation
                                formik.setFieldValue("answerValue", getPlainText(value));
                              }}
                              modules={quillModules}
                              formats={quillFormats}
                              style={{ 
                                minHeight: "120px",
                                marginBottom: "50px" 
                              }}
                              placeholder="Enter your comments..."
                            />
                          </div>
                          {/* FIXED: Error message condition */}
                          {errors.answerValue && touched.answerValue && (
                            <div className="error text-danger">
                              {errors.answerValue}
                            </div>
                          )}
                        </Form.Group>
                        <Row className="my-4">
                          <div className="d-flex justify-content-end ">
                            <Button
                              className="me-3 px-3"
                              type="button"
                              variant="outline-secondary"
                              onClick={() => navigate(-1)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="px-4 Kharpi-save-btn"
                              disabled={isContentEmpty(answer)}
                            >
                              Post
                            </Button>
                          </div>
                        </Row>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
            </Col>
            <Modal show={show} size="lg" centered onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                {renderAvatar(user)}
                <strong className="mx-1 mt-1 ">
                  {" "}
                  {user?.userId?.firstName} {user?.userId?.lastName}{" "}
                </strong>
              </Modal.Header>
              <Modal.Body>
                <div className="teacher-description px-3 ">
                  <ReactQuill
                    theme="snow"
                    value={editText}
                    onChange={setEditText}
                    modules={quillModules}
                    formats={quillFormats}
                    style={{ 
                      minHeight: "200px",
                      marginBottom: "50px" 
                    }}
                    placeholder="Edit your comment..."
                  />
                </div>
              </Modal.Body>

              <div className="d-flex justify-content-end mb-3 me-3">
                <Button
                  className="me-3 px-3"
                  variant="outline-secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="px-4 Kharpi-save-btn"
                  type="button"
                  onClick={updateData}
                  disabled={isContentEmpty(editText)}
                >
                  Save Changes
                </Button>
              </div>
            </Modal>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ForumComments;