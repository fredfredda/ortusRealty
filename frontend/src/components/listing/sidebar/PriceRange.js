"use client";

import React from "react";
import formatMoney from "@/utilis/FormatMoney";

const PriceRange = ({ filterFunctions }) => {
  const options = [
    { id: "flexRadioDefault0", label: "", defaultChecked: true },
    { id: "flexRadioDefault1", label: "50000-1000000" },
    { id: "flexRadioDefault2", label: "1000000-10000000" },
    { id: "flexRadioDefault3", label: "10000000-100000000" },
    { id: "flexRadioDefault4", label: "100000000-1000000000" },
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
            checked={filterFunctions?.priceRange == option.label}
            onChange={() => filterFunctions.handlepriceRange(option.label)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label === "" ? "Any" : formatMoney(option.label.split('-')[0])+' - '+formatMoney(option.label.split('-')[1])}
          </label>
        </div>
      ))}
    </>
  );
};

export default PriceRange;