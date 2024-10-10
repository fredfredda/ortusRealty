"use client";

import formatMoney from "@/utilis/FormatMoney";
import React from "react";

const SquareFeet = ({ filterFunctions }) => {
  const options = [
    { id: "flexRadioDefault0", label: "", defaultChecked: true },
    { id: "flexRadioDefault1", label: "100-1300" },
    { id: "flexRadioDefault2", label: "1300-3000" },
    { id: "flexRadioDefault3", label: "3000-6000" },
    { id: "flexRadioDefault4", label: "6000-10000" },
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
            checked={filterFunctions?.squirefeet == option.label}
            onChange={() => filterFunctions.handlesquirefeet(option.label)}
          />
          <label className="form-check-label" htmlFor={option.id}>
          {option.label === "" ? "Any" : formatMoney(option.label.split('-')[0])+' - '+formatMoney(option.label.split('-')[1])}
          </label>
        </div>
      ))}
    </>
  );
};

export default SquareFeet;