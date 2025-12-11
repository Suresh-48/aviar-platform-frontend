import React, { useEffect, useState, useContext, useCallback, memo } from "react";
import { FormContext } from "./FormContext";
import { Col, Container, Row, Form, FormControl } from "react-bootstrap";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Label from "../../core/Label.jsx";
import countries from "../../../components/core/Countries.jsx";
import { customStyles } from "../../core/Selector.js";
import Api from "../../../Api";

const Experience = () => {
  const [value] = useContext(FormContext);
  const { experienceData } = value;

  return (
    <Container className="mt-4">
      <Row>
        {experienceData.map((item, idx) => (
          <MemoizedExperienceItem key={idx} index={idx} inputField={item} />
        ))}
      </Row>
    </Container>
  );
};

// 🧠 Schema Validation
export const experienceSchema = (event) => {
  const experience = event.experienceData || [];
  return experience.every(
    (v) =>
      v.workInstitution &&
      v.experience &&
      v.role &&
      v.startDate &&
      v.classSize &&
      v.ageRangeFrom &&
      v.ageRangeTo &&
      v.workAddress1 &&
      v.workState &&
      v.workCity &&
      v.workCountry &&
      v.workZipCode
  );
};

// 💼 Individual Experience Item
const ExperienceItem = ({ index, inputField }) => {
  const [value, setValue] = useContext(FormContext);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const { experienceData } = value;

  const logout = useCallback(() => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }, [navigate]);

  const getCategory = useCallback(async () => {
    try {
      const { data } = await Api.get("api/v1/category");
      setCategory(data?.data?.data || []);
    } catch {
      toast.error("Failed to fetch categories");
    }
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const handleInputChange = useCallback(
    (e, name, valueOverride) => {
      const { name: n, value: v } = e?.target || {};
      const fieldName = name || n;
      const fieldValue = valueOverride ?? v;

      setValue((prev) => {
        const updated = [...prev.experienceData];
        updated[index] = { ...updated[index], [fieldName]: fieldValue };
        return { ...prev, experienceData: updated };
      });
    },
    [index, setValue]
  );

  const handleAdd = useCallback(() => {
    setValue((prev) => ({
      ...prev,
      experienceData: [
        ...prev.experienceData,
        {
          workInstitution: "",
          subjectTaught: [],
          experience: "",
          role: "",
          startDate: "",
          endDate: "",
          classSize: "",
          ageRangeFrom: "",
          ageRangeTo: "",
          workAddress1: "",
          workAddress2: "",
          workState: "",
          workCity: "",
          workCountry: "",
          workZipCode: "",
          workInsWebsite: "",
        },
      ],
    }));
  }, [setValue]);

  const handleRemove = useCallback(() => {
    setValue((prev) => ({
      ...prev,
      experienceData: prev.experienceData.filter((_, i) => i !== index),
    }));
  }, [index, setValue]);

  const options = [
    { value: "Teacher", label: "Teacher" },
    { value: "Teaching Assistant", label: "Teaching Assistant" },
    { value: "Admin", label: "Admin" },
    { value: "Volunteer", label: "Volunteer" },
    { value: "Personal", label: "Personal" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="p-4 border rounded-3 shadow-sm mb-4 bg-white">
      <Row>
        <Col md={6}>
          <Form.Group>
            <Label notify>Work Institution Name</Label>
            <FormControl
              name="workInstitution"
              value={inputField.workInstitution}
              onChange={handleInputChange}
              placeholder="Institution Name"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Label>Subjects Taught</Label>
            <Select
              isMulti
              styles={customStyles}
              value={inputField.subjectTaught}
              name="subjectTaught"
              placeholder="Choose Subjects..."
              onChange={(val) => handleInputChange(null, "subjectTaught", val)}
              options={category.map((c) => ({ value: c.name, label: c.name }))}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group>
            <Label notify>Experience</Label>
            <FormControl
              name="experience"
              value={inputField.experience}
              onChange={handleInputChange}
              placeholder="Years of Experience"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Label notify>Role</Label>
            <Select
              value={inputField.role}
              styles={customStyles}
              onChange={(val) => handleInputChange(null, "role", val)}
              options={options}
              placeholder="Select Role"
            />
          </Form.Group>
        </Col>
      </Row>

      {/* 🗓️ Simplified Native Date Inputs */}
      <Row>
        <Col md={6}>
          <Form.Group>
            <Label notify>Role Start Date</Label>
            <FormControl
              type="date"
              name="startDate"
              value={inputField.startDate || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Label>Role End Date</Label>
            <FormControl
              type="date"
              name="endDate"
              value={inputField.endDate || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group>
            <Label notify>Class Size</Label>
            <FormControl
              name="classSize"
              value={inputField.classSize}
              onChange={handleInputChange}
              placeholder="Number of Students"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Label notify>Age Range From</Label>
            <FormControl
              name="ageRangeFrom"
              value={inputField.ageRangeFrom}
              onChange={handleInputChange}
              placeholder="From"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Label notify>Age Range To</Label>
            <FormControl
              name="ageRangeTo"
              value={inputField.ageRangeTo}
              onChange={handleInputChange}
              placeholder="To"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group>
            <Label notify>Institution Address 1</Label>
            <FormControl
              name="workAddress1"
              value={inputField.workAddress1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Label>Institution Address 2</Label>
            <FormControl
              name="workAddress2"
              value={inputField.workAddress2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group>
            <Label notify>City</Label>
            <FormControl
              name="workCity"
              value={inputField.workCity}
              onChange={handleInputChange}
              placeholder="City"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Label notify>State</Label>
            <FormControl
              name="workState"
              value={inputField.workState}
              onChange={handleInputChange}
              placeholder="State"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Label notify>Country</Label>
            <Select
              styles={customStyles}
              value={inputField.workCountry}
              onChange={(val) => handleInputChange(null, "workCountry", val)}
              options={countries.map((c) => ({ label: c, value: c }))}
              placeholder="Select Country"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group>
            <Label notify>Zip Code</Label>
            <FormControl
              name="workZipCode"
              value={inputField.workZipCode}
              maxLength={6}
              onChange={handleInputChange}
              placeholder="Enter Zip Code"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Label>Website</Label>
            <FormControl
              name="workInsWebsite"
              value={inputField.workInsWebsite}
              onChange={handleInputChange}
              placeholder="Institution Website"
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-start gap-2 mt-3">
        {experienceData.length > 1 && (
          <Button variant="contained" color="secondary" onClick={handleRemove}>
            Remove
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add More
        </Button>
      </div>
    </div>
  );
};

const MemoizedExperienceItem = memo(ExperienceItem);
export default Experience;
