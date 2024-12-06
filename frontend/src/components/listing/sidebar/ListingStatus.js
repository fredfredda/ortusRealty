'use client'

import React from "react";

const ListingStatus = ({filterFunctions}) => {
  const options = [
    { id: "flexRadioDefault0", label: "" , defaultChecked: true },
    { id: "flexRadioDefault1", label: "for sale" },
    { id: "flexRadioDefault2", label: "renting" },
    { id: "flexRadioDefault3", label: "investing" },

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
            checked={filterFunctions?.listingStatus == option.label}            
            onChange={()=>filterFunctions.handlelistingStatus(option.label)}
           
            
   
            
          />
          <label className="form-check-label" htmlFor={option.id} style={{textTransform: "capitalize"}} >
            {option.label === "" ? "All" : option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
