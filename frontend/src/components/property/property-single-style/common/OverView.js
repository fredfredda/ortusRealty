import listings from "@/data/listings";
import formatMoney from "@/utilis/FormatMoney";
import PropTypes from "prop-types";
import React from "react";


const OverView = ({property}) => {
  const overviewData = property.property_type === 'home' ? [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: property.num_of_beds,
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: property.num_of_bathrooms,
    },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value: formatMoney(property.prpty_size),
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: property.property_type,
    },
  ] :
  [
    {
      icon: "flaticon-bird-house",
      label: "Category",
      value: property.category_name,
    },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value: formatMoney(property.prpty_size),
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: property.property_type,
    },
  ];
  
 
  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
