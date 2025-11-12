import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink,useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { FormControl, Form, Container, Modal, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw, convertFromRaw } from "draft-js";
import "react-quill"
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import ReactQuill from "react-quill";
// Api
import Api from "../../Api";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//css
import "../../CSS/CourseCreation.css";

// Component
import Loader from "../core/Loader";
import CourseSideMenu from "../CourseSideMenu/Index.jsx";
import Label from "../Core/Label";
import { customStyles } from "../Core/Selector";
// import { Api } from "@mui/icons-material";

// Validation
const SignInSchema = Yup.object().shape({
  type: Yup.string().required("Type Name Is Required"),
  category: Yup.object().required("Category Name Is Required"),
  courseName: Yup.string().required("Course Name Is Required"),
  // courseImage: Yup.mixed().required("Image Is Required"),
  duration: Yup.object().required("Duration is Required").nullable(),
});

const EditCourses = (props) => {
  const { courseID } = useParams();
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
  const [courseName, setCourseName] = useState("");
  const [submitType, setSubmitType] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [imageType, setImageType] = useState("image");
  // const [description, setDescription] = useState(EditorState.createEmpty());
  const [descriptionValue, setDescriptionValue] = useState("");

  //logout
  // const logout = () => {
  //   setTimeout(() => {
  //     localStorage.clear(props.history.push("/kharpi"));
  //     window.location.reload();
  //   }, 2000);
  // };

  // Get Course Data
  console.log("courseID1234567", courseID);
  const getCourseData = () => {
    const userId = localStorage.getItem("userId");
   
    Api.get(`api/v1/course/${courseID}`, { headers: { userId: userId } })
      .then((response) => {
         setCourseName(response.data.data.name);
                 setDescriptionValue(response.data.data.description);
           const categoryData = response.data.data.category;

             const categoryOption = {
      // value: categoryData,
      label: categoryData.name,
    };
    
        setCategory(categoryOption);           
    // setCategoryId(categoryData);         
    // setFieldValue("category", categoryData);

      const typeData = response.data.data.submitType; // e.g., "draft" or "published"

 
    const typeOption = {
      value: typeData,
      label: typeData.charAt(0).toUpperCase() + typeData.slice(1),
    };
   
    setSubmitType(typeOption); 
    setType(typeOption); 
    // setFieldValue(typeOption); 
  

           const durationData = response.data.data.duration; // e.g., "6 months"


    const durationOption = {
      value: durationData,
      label: durationData,
    };

 
    setDuration(durationOption);

    setFieldValue("duration", durationOption.value);
    


        // setCategory(response.data.data.category.name)
          
       
       
     
        const data = response.data.data;
        const contentState = convertFromRaw(JSON.parse(data.description));
        const editorState = EditorState.createWithContent(contentState);
        const editedText = convertToRaw(editorState.getCurrentContent());
        setCourseData(data);
        // setCategory({ value: data?.category?._id, label: data?.category?.name });
        setType({ value: data.submitType, label: data.submitType });
        setIsFuture(data.isFuture);
        setCategoryId(data?.category?._id);
        setImagePreview(data.imageUrl);
        setTypeId(data.submitType);
        setDuration({ value: data.duration, label: data.duration });
        setDurationValue(data.duration);
        setIsLoading(false);
        setDescription(editorState);
        setDescriptionValue(editedText.blocks[0].text);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  // const getCourseData = () => {
  //     const userId = localStorage.getItem("userId");  
  //     console.log("course id");
  //     Api.get(`api/v1/course/${courseId}`, { headers: { userId: userId } })
  //   .then((response) => {
  //         const data = response;
  //         console.log("course data", data);
  //   })
  // }
  const onChangeDescription = (setFieldValue, e) => {
    const editedText = convertToRaw(e.getCurrentContent());
    setDescriptionValue(editedText.blocks[0].text);
  };

  useEffect(() => {
    getCategory();
    getCourseData();
  }, []);

  // Get category
  const getCategory = () => {
    const userId = localStorage.getItem("userId");
    Api.get("/api/v1/category/", { headers: { userId: userId } })
      .then((res) => {
        const option = res.data.data;
        console.log("category option", option);
        setOptions(option);
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

  // const getCategory = () => {
  //     const userId = localStorage.getItem("userId");
  //     Api.get("api/v1/category", {
  //       headers: { userId: userId },
  //     }   
  //     )
  //     .then((res) => {

  //         const option = res.data.data;
  //          console.log("category data", option);
  //         setOptions(option);
  //       }
  //     )
  //   }
  const handleModal = () => {
    setShow(!show);
  };

  // Submit form
  const submitForm = (values) => {
    const convertedData = JSON.stringify(convertToRaw(description.getCurrentContent()));
    const userId = localStorage.getItem("userId");
    setIsSubmit(true);
    Api.patch("api/v1/course/" + courseId, {
      id: courseId,
      category: categoryId,
      name: values.courseName,
      description: convertedData,
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
    setIsSubmit(true);
    const userId = localStorage.getItem("userId");

    Api.post("api/v1/category/", {
      name: selectCategory,
      createdBy: userId,
      userId: userId,
    })
      .then((response) => {
        const status = response.status;
        const data = response.data.data;
        const categoryImage = categoryImagePreview;
        if (status === 201) {
          if (categoryImage) {
            const categoryId = response.data.data.createCategory.id;
            Api.patch("api/v1/category/image/upload", {
              categoryId: categoryId,
              image: categoryImagePreview,
              userId: userId,
            }).then((res) => {
              getCategory();
              setIsSubmit(false);
            });
          } else {
            history.goBack();
            setIsSubmit(false);
          }
          setCategory({
            id: data?.createCategory?.id,
            label: data?.createCategory?.name,
          });
          setCategoryId(data?.createCategory?.id);
          setSelectCategory("");
          handleModal();
          getCategory();
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
        {/* {isLoading ? (
          <Loader /> */}
        {/* ) : ( */}
        <div>
          <div className="mt-3 mt-1">
            <h4>Edit Course </h4>
          </div>
          <div className="col-sm-12">
            <Formik
              enableReinitialize={true}
              initialValues={{
                category: category,
                courseName: courseData.name,
                description: "",
                descriptionValue: descriptionValue,
              submitType: submitType,
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
                        <Col md={7}>
                          <Form.Group className="form-row mb-3">
                            <Label notify={true}>Category</Label>
                            <Select
                              value={category}
                              styles={customStyles}
                              placeholder="Select Category"
                              name="category"
                              onChange={(e) => {
                                if (e.value === "create new") {
                                  handleModal();
                                } else {
                                  setFieldValue("category", e);
                                  setCategory(e);
                                  setCategoryId(e.value);
                                }
                              }}
                              options={[
                                {
                                  value: "create new",
                                  label: "Create New Category",
                                },
                                {
                                  options: options?.map((list) => ({
                                    value: list.id,
                                    label: list.name,
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
                          <Form.Group className="form-row mb-3">
                            <Label notify={true}>Course Name</Label>
                            <FormControl
                              type="type"
                              name="courseName"
                              id="courseName"
                              placeholder="Enter Course Name"
                              value={courseName}
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
                            {/* <div className="description"> */}
                            <ReactQuill
                              theme="snow"
                              value={values.descriptionValue}
                              onChange={(content) => {
                                setFieldValue("descriptionValue", content);
                              }}
                            />
                            {/* </div> */}
                            <ErrorMessage
                              name="descriptionValue"
                              component="span"
                              className="error text-danger"
                            />
                          </div>


                          <div className="row mb-3">
                            <Col xs={12} sm={6} md={6}>
                              <Form.Group
                                className="form-row"
                                style={{ marginRight: 20, width: "100%" }}
                              >
                                <Label notify={true}>Status</Label>
                                <br />
                                <Select
                                  value={submitType}
                                  styles={customStyles}
                                  placeholder="Select Status"
                                  onChange={(e) => {
                                    setFieldValue("type", e);
                                    setType(e.value);
                                  }}
                                  
                                  options={[{ value: "Draft", label: "Draft" }]}
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
                                <Label notify={true}>Duration</Label>
                                <Select
                                  name="duration"
                                  styles={customStyles}
                                  placeholder="Select Duration"
                                  value={values.duration}
                                  onChange={(e) => {
                                    setFieldValue("duration", e);
                                    setDuration(e.value);
                                  }}
                                  options={[
                                    {
                                      value: "1 ",
                                      label: "1 Hour",
                                    },
                                  ]}
                                />
                                <ErrorMessage
                                  name="duration"
                                  component="span"
                                  className="error text-danger error-message"
                                />
                              </Form.Group>
                            </Col>
                          </div>
                          <div>
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              className="d-flex justify-content-start align-items-center"
                            >
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
                              disabled={!isValid || isSubmit || descriptionValue === ""}
                              variant="contained"
                              className={`${!isValid || isSubmit || descriptionValue === ""
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
                    <Col>
                      <Button
                        variant="contained"
                        onClick={() => createCategory()}
                        disabled={!selectCategory}
                        style={{
                          backgroundColor: !selectCategory ? "gray" : "#1d1464",
                          color: "#fff",
                          borderRadius: "4px",
                        }}
                        className="create-category-button-style"
                      >
                        CREATE
                      </Button>

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
        {/* )} */}
      </div>
    </Container>
  );
};

export default EditCourses;
