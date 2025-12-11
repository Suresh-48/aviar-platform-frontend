import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { FormControl, Form, Container, Modal, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Api - you'll need to create this or adjust the path
import Api from "../../Api";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//css - you'll need to create this or adjust the path
// import "../../css/CourseCreation.scss";

// Components - you'll need to create these or adjust the paths
import Loader from "../core/Loader";
import CourseSideMenu from "../CourseSideMenu";
import Label from "../core/Label";
import { customStyles } from "../core/Selector";

// Validation
const SignInSchema = Yup.object().shape({
  type: Yup.string().required("Type Name Is Required"),
  category: Yup.object().required("Category Name Is Required"),
  courseName: Yup.string().required("Course Name Is Required"),
  // courseImage: Yup.mixed().required("Image Is Required"),
  duration: Yup.object().required("Duration is Required").nullable(),
});

// React Quill modules configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'align',
  'link', 'image'
];

const EditCourses = (props) => {
  const [courseId, setCourseId] = useState(props?.match?.params?.id);
  const [aliasName, setAliasName] = useState(props?.location?.aliasName);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("");
  const [typeId, setTypeId] = useState("");
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [date, setDate] = useState("");
  const [isFuture, setIsFuture] = useState(false);
  const [imagePreview, setImagePreview] = useState(undefined);
  const [isSubmit, setIsSubmit] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [imageType, setImageType] = useState("image");
  const [description, setDescription] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  // For React Router v6 compatibility
  const params = new URLSearchParams(window.location.search);
  const pathSegments = window.location.pathname.split('/');
  const idFromUrl = pathSegments[pathSegments.length - 1];

  // Use the ID from URL if no props provided (React Router v6)
  React.useEffect(() => {
    if (!courseId && idFromUrl && idFromUrl !== 'edit') {
      setCourseId(idFromUrl);
    }
  }, [courseId, idFromUrl]);

  //logout
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      // For React Router v6, you might need to use useNavigate hook
      if (props.history) {
        props.history.push("/kharpi");
      } else {
        window.location.href = "/kharpi";
      }
      window.location.reload();
    }, 2000);
  };

  // Get Course Data
  const getCourseData = () => {
    const userId = localStorage.getItem("userId");
    if (!courseId) return;

    Api.get(`api/v1/course/${courseId}`, { headers: { userId: userId } })
      .then((response) => {
        const data = response.data.data;
        let descriptionContent = "";

        try {
          const draftContent = JSON.parse(data.description);
          descriptionContent = draftContent.blocks?.map(block => block.text).join('\n') || data.description;
        } catch (e) {

          descriptionContent = data.description || "";
        }

        setCourseData(data);
        setCategory({ value: data?.category?._id, label: data?.category?.name });
        setType({ value: data.submitType, label: data.submitType });
        setIsFuture(data.isFuture);
        setCategoryId(data?.category?._id);
        setImagePreview(data.imageUrl);
        setTypeId(data.submitType);
        setDuration({ value: data.duration, label: data.duration });
        setDurationValue(data.duration);
        setIsLoading(false);
        setDescription(descriptionContent);
        setDescriptionValue(descriptionContent);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const onChangeDescription = (value) => {
    setDescription(value);
    setDescriptionValue(value);
  };

  useEffect(() => {
    getCategory();
    if (courseId) {
      getCourseData();
    }
  }, [courseId]);

  // Get category
  const getCategory = () => {
    const userId = localStorage.getItem("userId");
    Api.get("api/v1/category", {
      headers: {
        userId: userId,
      },
    })
      .then((res) => {
        const option = res.data.data.data;
        setOptions(option);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const handleModal = () => {
    setShow(!show);
  };

  // Submit form
  const submitForm = (values) => {
    // With react-quill, we can send the HTML content directly
    const descriptionContent = description;
    const userId = localStorage.getItem("userId");
    setIsSubmit(true);

    Api.patch("api/v1/course/" + courseId, {
      id: courseId,
      category: categoryId,
      name: values.courseName,
      description: descriptionContent, // Send the HTML content directly
      type: typeId,
      isFuture: isFuture,
      duration: durationValue,
      userId: userId,
    })
      .then((response) => {
        const status = response.status;
        const image = imagePreview;

        if (status === 201) {
          if (image) {
            if (image === courseData.imageUrl) {
              Api.patch("api/v1/course/image/update/" + courseId, {
                imageUrl: image,
                userId: userId,
              })
                .then((res) => {
                  toast.success("Updated");
                  setIsSubmit(false);
                })
                .catch((error) => {
                  const errorStatus = error?.response?.status;
                  if (errorStatus === 401) {
                    logout();
                    toast.error("Session Timeout");
                  }
                });
            } else {
              Api.patch("api/v1/course/image/upload", {
                courseId: courseId,
                image: imagePreview,
                userId: userId,
              })
                .then((res) => {
                  toast.success("Updated");
                  setIsSubmit(false);
                })
                .catch((error) => {
                  const errorStatus = error?.response?.status;
                  if (errorStatus === 401) {
                    logout();
                    toast.error("Session Timeout");
                  }
                });
            }
          } else {
            Api.patch("api/v1/course/image/update/" + courseId, {
              imageUrl: null,
              userId: userId,
            })
              .then((res) => {
                console.log("res", res);
                toast.success("Updated");
                setIsSubmit(false);
              })
              .catch((error) => {
                const errorStatus = error?.response?.status;
                if (errorStatus === 401) {
                  logout();
                  toast.error("Session Timeout");
                }
              });
          }
        } else {
          setIsSubmit(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          setIsSubmit(false);
        }
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  // Create Category
  const createCategory = () => {
    const userId = localStorage.getItem("userId");
    setIsSubmit(true);
    Api.post("api/v1/category", {
      name: selectCategory,
      userId: userId,
    })
      .then((response) => {
        const status = response.status;
        const data = response.data.data;
        if (status === 201) {
          setCategory({
            id: data.createCategory.id,
            label: data.createCategory.name,
          });
          setCategoryId(data.createCategory.id);
          setSelectCategory("");
          handleModal();
          getCategory();
          getCourseData();
          setIsSubmit(false);
        } else {
          toast.error(response.data.message);
          setIsSubmit(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          setIsSubmit(false);
        }
      });
  };

  // Select Image
  const selectFile = async (event, { setFieldValue }) => {
    const file = event.target.files[0];
    const type = file?.type?.split("/")[0];
    const base64 = await convertBase64(file);
    setImagePreview(base64);
    setImageType(type);
    setFieldValue("courseImage", base64);
  };

  // Convert Image to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const closePreview = (setFieldValue) => {
    setImagePreview(undefined);
    setFieldValue("courseImage", "");
  };

  return (
    <Container className="mt-1">
      <CourseSideMenu courseId={courseId} aliasName={aliasName} />
      <div className="row edit-course-lesson-style mt-4 mx-0">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="mt-3 mt-1">
              <h4>Edit Course </h4>
            </div>
            <div className="col-sm-12">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  category: category,
                  courseName: courseData.name || "",
                  description: description,
                  descriptionValue: descriptionValue,
                  type: type?.value || "",
                  duration: duration,
                  courseImage: imagePreview,
                }}
                validationSchema={SignInSchema}
                onSubmit={(values) => submitForm(values)}
              >
                {(formik) => {
                  const { values, handleChange, handleSubmit, handleBlur, isValid, setFieldValue } = formik;
                  return (
                    <Row>
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12} sm={12} md={7}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Category</Label>

                              <Select
                                styles={customStyles}
                                value={values.category}
                                placeholder="Select Category"
                                name="category"
                                isOptionDisabled={(options) => options.isdisabled}
                                onChange={(e) => {
                                  if (e.value === "create new") {
                                    setShow(!show);
                                    getCategory();
                                    getCourseData();
                                  } else {
                                    setFieldValue("category", e);
                                    setCategory(e);
                                    setCategoryId(e.value);
                                    getCategory();
                                    getCourseData();
                                  }
                                }}
                                options={[
                                  {
                                    value: "create new",
                                    label: "Create New Category",
                                    isdisabled: true,
                                  },
                                  {
                                    options: options?.map((list) => ({
                                      value: list.id,
                                      label: list.name,
                                      isdisabled: true,
                                    })),
                                  },
                                ]}
                              />
                              <ErrorMessage
                                name="category"
                                component="span"
                                className="error text-danger error-message"
                              />
                            </Form.Group>
                            <Form.Group className="form-row mb-3" controlId="courseName">
                              <Label notify={true}>Course Name</Label>
                              <FormControl
                                type="type"
                                name="courseName"
                                id="courseName"
                                placeholder="Enter Course Name"
                                value={values.courseName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-styles"
                              />
                              <ErrorMessage
                                name="courseName"
                                component="span"
                                className="error text-danger error-message"
                              />
                            </Form.Group>
                            <div className="mb-3">
                              <Label notify={true}>Description</Label>
                              <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={onChangeDescription}
                                modules={quillModules}
                                formats={quillFormats}
                                style={{ height: "200px", marginBottom: "50px" }}
                              />
                              {(!descriptionValue || descriptionValue === "<p><br></p>" || descriptionValue.trim() === "") && (
                                <p className="error text-danger">Description Is Required</p>
                              )}
                            </div>

                            <div className="row mb-3">
                              <Col xs={12} sm={6} md={6}>
                                <Form.Group className="form-row" style={{ marginRight: 20, width: "100%" }}>
                                  <Label notify={true}>Status</Label>
                                  <br />
                                  <FormControl
                                    value={values.type}
                                    styles={customStyles}
                                    placeholder="Select Status"
                                    name="type"
                                    onChange={handleChange}
                                    disabled
                                  />
                                  <ErrorMessage
                                    name="type"
                                    component="span"
                                    className="error text-danger error-message"
                                  />
                                </Form.Group>
                              </Col>
                              <Col xs={12} sm={6} md={6}>
                                <Form.Group className="form-row">
                                  <Label notify={true}>Durations</Label>
                                  <Select
                                    name="duration"
                                    styles={customStyles}
                                    value={values.duration}
                                    onChange={(e) => {
                                      setFieldValue("duration", e);
                                      setDuration(e.value);
                                    }}
                                    options={[
                                      {
                                        value: "1 hour",
                                        label: "1 hour",
                                      },
                                      // Add more duration options as needed
                                      {
                                        value: "2 hours",
                                        label: "2 hours",
                                      },
                                      {
                                        value: "3 hours",
                                        label: "3 hours",
                                      },
                                      {
                                        value: "4 hours",
                                        label: "4 hours",
                                      },
                                    ]}
                                  />
                                  <ErrorMessage name="duration" component="span" className="error text-danger" />
                                </Form.Group>
                              </Col>
                            </div>
                            <div>
                              <Col className="d-flex justify-content-start align-items-center">
                                <Form.Group className="form-row">
                                  <Form.Check
                                    className="checkbox-style mt-0"
                                    type="checkbox"
                                    label="Display In Landing Page"
                                    checked={isFuture}
                                    onChange={(e) => {
                                      setIsFuture(!isFuture);
                                    }}
                                  />
                                </Form.Group>
                              </Col>
                            </div>
                          </Col>
                          {/* <Col xs={12} sm={12} md={5}>
                            <Row>
                              <div className="d-flex justify-content-center  ">
                                <label className="file-upload">
                                  <input
                                    type="file"
                                    name="courseImage"
                                    accept="image/*"
                                    className="fileToUpload"
                                    id="fileToUpload"
                                    onChange={(e) => {
                                      selectFile(e, { setFieldValue });
                                    }}
                                  />
                                  {imagePreview ? "Change Image" : "Upload Image"}
                                </label>
                              </div>
                              <div>
                                {imagePreview ? (
                                  <div>
                                    <div className="d-flex justify-content-center mt-4">
                                      <img className="image-preview-size" src={imagePreview} alt="" />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mt-3">
                                      {imageType !== "image" ? (
                                        <p className="d-flex justify-content-center error text-danger fs-6">
                                          Please Select A Image File
                                        </p>
                                      ) : (
                                        <p
                                          style={{
                                            color: "red",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            closePreview(setFieldValue);
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            size="lg"
                                            color="#bf1000"
                                            className="delete-icon"
                                          />
                                          Remove Image
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <Row className="d-flex justify-content-center">
                                    <Row>
                                      <img
                                        className="image-preview-size"
                                        src="https://thumbs.dreamstime.com/b/arrow-upload-icon-logo-design-template-117344870.jpg"
                                        alt=" "
                                      />
                                    </Row>
                                    <Row>
                                      {imagePreview === undefined && (
                                        <p className="image-validation"> Image Is Required</p>
                                      )}
                                    </Row>
                                  </Row>
                                )}
                              </div>
                            </Row>
                          </Col> */}
                          <Row className=" mb-4 mt-3">
                            <Col className="d-flex justify-content-end ">
                              <button
                                type="submit"
                                disabled={!isValid || isSubmit || !descriptionValue || descriptionValue === "<p><br></p>" || descriptionValue.trim() === ""}
                                variant="contained"
                                className={`${!isValid || isSubmit || !descriptionValue || descriptionValue === "<p><br></p>" || descriptionValue.trim() === ""
                                    ? "save-changes-disable font-weight-bold py-2 px-3"
                                    : "save-changes-active font-weight-bold py-2 px-3"
                                  }`}
                              >
                                SAVE CHANGES
                              </button>
                            </Col>
                          </Row>
                        </Row>
                      </Form>
                    </Row>
                  );
                }}
              </Formik>
              <Modal show={show} centered onHide={handleModal}>
                <Modal.Body id="contained-modal-title-vcenter">
                  <div className="container py-3">
                    <div className="row flex-direction-row">
                      <h3 className=" d-flex justify-content-center align-self-center ">Create Course Category</h3>
                    </div>
                    <div className="mt-3">
                      <Row>
                        <Form className="category-form-style">
                          <Form.Group className="form-row mb-3" style={{ width: "100%" }}>
                            <Label notify={true}>Category Name</Label>
                            <FormControl
                              type="text"
                              name="selectCategory"
                              id="selectCategory"
                              placeholder="Enter Category Name"
                              value={selectCategory}
                              onChange={(e) => setSelectCategory(e.target.value)}
                              className="form-styles"
                            />
                          </Form.Group>
                        </Form>
                      </Row>
                    </div>
                    <Row className="mb-3 mt-3">
                      <Col className="d-flex justify-content-start ">
                        <button
                          disabled={!selectCategory}
                          onClick={() => {
                            createCategory();
                          }}
                          className={`${!selectCategory
                              ? "create-disable font-weight-bold py-2 px-3"
                              : "create-active font-weight-bold py-2 px-3"
                            }`}
                        >
                          CREATE
                        </button>
                      </Col>
                      <Col className="d-flex justify-content-end ">
                        <button onClick={handleModal} className="cancel font-weight-bold py-2 px-3">
                          CANCEL
                        </button>
                      </Col>
                    </Row>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default EditCourses;