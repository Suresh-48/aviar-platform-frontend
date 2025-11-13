// src/core/Label.jsx
import React from "react";
import PropTypes from "prop-types";
import { Label as BootstrapLabel } from "reactstrap";

const LabelComponent = ({ id, children, notify, className }) => {
  return (
    <BootstrapLabel htmlFor={id} className={className}>
      {children}
      {notify && <span className="text-danger ms-1">*</span>}
    </BootstrapLabel>
  );
};

LabelComponent.propTypes = {
  id: PropTypes.string,
  notify: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};

export default LabelComponent;
