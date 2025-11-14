import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import "../../css/Forum.css";
import Avatar from "react-avatar";
import { Formik } from "formik";
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

  // Quill configuration
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const quillFormats = ["bold", "italic", "underline", "list", "bullet", "align"];

  // Remove HTML and extract plain text
  const getPlainText = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").trim();
  };

  const isContentEmpty = (html) => {
    return getPlainText(html).length === 0;
  };

  // Logout function
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
      params: { questionId: data.id, userId },
    })
      .then((response) => {
        const questionData = response?.data?.conversationList;
        setQuestionData(questionData);
        setColorList(getForumColor(questionData));
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const getRecentComments = () => {
    Api.get("/api/v1/forum/conversation", {
      params: { questionId: data.id, userId },
    })
      .then((response) => {
        setQuestionData(response?.data?.conversationList);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          logout();
        }
      });
  };

  const getForumColor = (userData) => {
    let userIds = [];
    userData?.forEach((list) => {
      const uid = list?.userId._id;
      if (!userIds.includes(uid)) userIds.push(uid);
    });

    return userIds.map((uid) => ({
      userId: uid,
      color: getColorCode(),
    }));
  };

  const getUserColorCode = (colors, userId) => {
    const match = colors.find((c) => c.userId === userId);
    return match ? match.color : "";
  };

  const deleteMessage = (replyId) => {
    Api.delete("/api/v1/forum/conversation/delete/comment", {
      params: { id: replyId, userId },
    })
      .then(() => {
        toast.success("Comments Deleted Successfully");
        getComments();
      })
      .catch((error) => {
        if (error?.response?.status === 401) logout();
      });
  };

  const updateData = () => {
    if (isContentEmpty(editText)) {
      toast.error("Please enter some content");
      return;
    }

    const userId = localStorage.getItem("userId");

    const newdate = moment().format("MMMM Do YYYY, h:mm:ss a");

    Api.patch("/api/v1/forum/conversation/edit", {
      question: data.id,
      answer: editText,
      createdAt: newdate,
      user: userId,
      answerId,
      userId,
    })
      .then(() => {
        toast.success("Comments Updated Successfully");
        setShow(false);
        getComments();
      })
      .catch((error) => {
        if (error?.response?.status === 401) logout();
      });
  };

  const submitForm = (values, { resetForm }) => {
    if (isContentEmpty(answer)) {
      toast.error("Please enter some content");
      return;
    }

    const userId = localStorage.getItem("userId");
    const newdate = moment().format("MMMM Do YYYY, h:mm:ss a");

    Api.post("/api/v1/forum/conversation", {
      question: data.id,
      user: userId,
      answer,
      createdAt: newdate,
      course: data.course,
      userId,
    })
      .then(() => {
        setAnswer("");
        resetForm();
        toast.success("Comment posted successfully");
        getRecentComments();
      })
      .catch((error) => {
        if (error?.response?.status === 401) logout();
      });
  };

  const postSchema = Yup.object().shape({
    answerValue: Yup.string().test(
      "not-empty",
      "Comments Is Required",
      () => !isContentEmpty(answer)
    ),
  });

  const renderAvatar = (userData) => {
    if (!userData?.userId) return null;

    const { userId } = userData;

    const image =
      userId?.studentId?.imageUrl ||
      userId?.parentId?.imageUrl ||
      userId?.teacherId?.imageUrl;

    return image ? (
      <Avatar src={image} round size="55" />
    ) : (
      <Avatar
        name={`${userId?.firstName} ${userId?.lastName}`}
        size="45"
        round
        color="#1c1364"
      />
    );
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Col>
              {/* Question section */}
              <Stack direction="row" spacing={2} className="mt-2">
                {renderAvatar(data)}
                <div className="content-width mb-2">
                  <b>
                    {data?.userId?.firstName} {data?.userId?.lastName}
                  </b>
                  <div dangerouslySetInnerHTML={{ __html: data.question }}></div>
                  <div className="forum-created-at">{data.createdAt}</div>
                </div>
              </Stack>
              <hr />

              {/* Comments list */}
              {questionData?.length > 0 ? (
                questionData?.map((list, i) => (
                  <Stack key={i} direction="row" spacing={2} className="forum-text-comments">
                    {renderAvatar(list)}

                    <div style={{ width: "100%" }}>
                      <div className="d-flex align-items-center">
                        <b>
                          {list?.userId?.firstName} {list?.userId?.lastName}
                        </b>

                        {list?.userId?._id === userId && (
                          <div className="d-flex ms-4">
                            <Tooltip title="Edit">
                              <IconButton>
                                <ModeEditOutlineIcon
                                  onClick={() => {
                                    setShow(true);
                                    setEditText(list.answer);
                                    setUser(list);
                                    setAnswerId(list.id);
                                  }}
                                  color="success"
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
                              <IconButton>
                                <DeleteIcon
                                  color="error"
                                  onClick={() => deleteMessage(list.id)}
                                />
                              </IconButton>
                            </Tooltip>
                          </div>
                        )}
                      </div>

                      <div dangerouslySetInnerHTML={{ __html: list.answer }}></div>

                      <div className="forum-page">
                        <small>{list.createdAt}</small>
                      </div>
                    </div>
                  </Stack>
                ))
              ) : (
                <div className="text-center mt-5">No Comments ... !</div>
              )}

              {/* Comment Posting Section */}
              <Formik
                initialValues={{ answerValue: "" }}
                validationSchema={postSchema}
                onSubmit={submitForm}
                enableReinitialize
              >
                {(formik) => {
                  const { handleSubmit, errors, touched } = formik;

                  return (
                    <Form onSubmit={handleSubmit} className="mx-4 mt-5">
                      <Form.Group>
                        <Form.Label>
                          Comments <span className="text-danger">*</span>
                        </Form.Label>

                        <ReactQuill
                          theme="snow"
                          value={answer}
                          onChange={(value) => {
                            setAnswer(value);
                            formik.setFieldValue("answerValue", getPlainText(value));
                          }}
                          modules={quillModules}
                          formats={quillFormats}
                          style={{ minHeight: "120px" }}
                          placeholder="Enter your comments..."
                        />

                        {errors.answerValue && touched.answerValue && (
                          <div className="text-danger">{errors.answerValue}</div>
                        )}
                      </Form.Group>

                      <div className="d-flex justify-content-end my-4">
                        <Button
                          type="button"
                          variant="outline-secondary"
                          className="me-3"
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </Button>

                        <Button type="submit" disabled={isContentEmpty(answer)} className="Kharpi-save-btn">
                          Post
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Col>

            {/* Edit Modal */}
            <Modal show={show} onHide={() => setShow(false)} centered size="lg">
              <Modal.Header closeButton>
                {renderAvatar(user)}
                <b className="ms-2">
                  {user?.userId?.firstName} {user?.userId?.lastName}
                </b>
              </Modal.Header>

              <Modal.Body>
                <ReactQuill
                  theme="snow"
                  value={editText}
                  onChange={setEditText}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ minHeight: "200px" }}
                />
              </Modal.Body>

              <div className="d-flex justify-content-end mb-3 me-3">
                <Button variant="outline-secondary" className="me-3" onClick={() => setShow(false)}>
                  Cancel
                </Button>

                <Button
                  className="Kharpi-save-btn"
                  disabled={isContentEmpty(editText)}
                  onClick={updateData}
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
