"use client";

import React from "react";

const PropertyType = ({ filterFunctions }) => {
  const options = [
    { id: "flexRadioDefault0", label: "", defaultChecked: true },
    { id: "flexRadioDefault1", label: "land" },
    { id: "flexRadioDefault2", label: "home" },
    { id: "flexRadioDefault3", label: "construction site" },
    { id: "flexRadioDefault4", label: "development project" },
  ];

  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions?.propertyTypes == option.label}
            onChange={() => filterFunctions.handlepropertyTypes(option.label)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label === "" ? "All" : option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default PropertyType;
