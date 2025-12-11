import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

// Component
import CourseCard from "../../components/core/CourseCard";
import Loader from "../core/Loader";

// Api
import Api from "../../Api";

const FavouriteCourse = () => {
  const [favouriteCourseList, setFavouriteCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  // Logout
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    getFavouriteList();
  }, []);

  const getFavouriteList = () => {
    const userId = localStorage.getItem("userId");

    Api.get(`api/v1/favouriteCourse/user`, {
      params: {
        userId: userId,
      },
    })
      .then((response) => {
        const list = response.data.data.favouriteCourseList;
        console.log("favourite course list", list);
        setFavouriteCourseList(list);
        setIsLoading(false);
        setSpinner(false);
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
        }

        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }

        toast.error(error?.response?.data?.message);
      });
  };

  const spinnerLoader = () => {
    setSpinner(!spinner);
  };

  return (
    <Container fluid className="px-2 px-sm-3 px-md-4">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <Loader />
        </div>
      ) : (
        <div className="pb-4 pb-md-5">
          {/* Header Section */}
          <div className="px-2 px-md-0">
            <h3 className="mt-3 mt-md-4 mb-2">Favourite Courses</h3>
            {favouriteCourseList?.length > 0 && (
              <p className="text-muted mb-3 mb-md-4">
                {favouriteCourseList.length} course{favouriteCourseList.length !== 1 ? 's' : ''} in your favourites
              </p>
            )}
          </div>

          {/* Courses Grid */}
          {favouriteCourseList?.length > 0 ? (
            <>
              <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3 g-md-4">
                {favouriteCourseList?.map((course, index) => (
                  <Col key={`course-${course.courseId?.id || index}`}>
                    <div className="h-100">
                      <CourseCard
                        course={course.courseId}
                        onClick={spinnerLoader}
                        reload={getFavouriteList}
                      />
                    </div>
                  </Col>
                ))}
              </Row>

              {/* Optional: Add load more button if paginated */}
              {favouriteCourseList.length >= 6 && (
                <div className="text-center mt-4 mt-md-5">
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="px-4"
                  // onClick={loadMoreFunction} // Add if you have pagination
                  >
                    Load More Courses
                  </Button>
                </div>
              )}

              {spinner && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50 z-3">
                  <div className="d-flex flex-column flex-md-row align-items-center bg-white rounded-3 p-4">
                    <Spinner animation="border" variant="primary" className="me-0 me-md-3 mb-2 mb-md-0" />
                    <h5 className="mb-0">Loading courses...</h5>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center py-5 py-md-6">
              <div className="text-center mb-4">
                <div className="mb-4">
                  <i className="bi bi-heart text-muted" style={{ fontSize: "4rem", opacity: 0.3 }}></i>
                </div>
                <h4 className="mb-3">No favourite courses yet</h4>
                <p className="text-muted mb-4 col-12 col-md-8 col-lg-6 mx-auto">
                  Courses you mark as favourite will appear here for easy access
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="px-4"
                // onClick={navigateToCourses} // Add navigation function if needed
                >
                  Browse Courses
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default FavouriteCourse;
