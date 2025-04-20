import formatMoney from "@/utilis/FormatMoney";
import React from "react";

const PropertyDetails = ({ property }) => {
  const columns = [
    [
      {
        label: "Price",
        value: `Bif ${formatMoney(property.prpty_price)} ${
          property.saletype_name === "renting" ? "/mo" : ""
        }`,
      },
      {
        label: "Size",
        value: formatMoney(property.prpty_size) + " sqft",
      },
      {
        label: "Category",
        value: property.category_name,
      },
      {
        label: "Launching Date",
        value: property.launching_date.split('T')[0],
      },
      {
        label: "Estimated Finishing Date",
        value: property.estimated_finishing_date.split('T')[0],
      },
      {
        label: "Status",
        value: property.development_project_status,
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-lg-12${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
          {column.map((detail, index) => ( 
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
