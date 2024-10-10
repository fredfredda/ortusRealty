import formatMoney from "@/utilis/FormatMoney";
import React from "react";

const PropertyDetails = ({property}) => {
  const columns = property.property_type === 'home' ? [
    [
      {
        label: "Price",
        value: 'Bif ' + formatMoney(property.prpty_price),
      },
      {
        label: "Size",
        value: formatMoney(property.prpty_size) + ' sqft',
      },
      {
        label: "Bathrooms",
        value: property.num_of_bathrooms,
      },
      {
        label: "Bedrooms",
        value: property.num_of_beds,
      },
      {
        label: "Type",
        value: property.property_type,
      },
      {
        label: "Status",
        value: property.saletype_name,
      },
    ],
  ] :
  [[
    {
      label: "Price",
      value: 'Bif ' + formatMoney(property.prpty_price),
    },
    {
      label: "Size",
      value: formatMoney(property.prpty_size),
    },
    {
      label: "Category",
      value: property.category_name,
    },
    {
      label: "Type",
      value: property.property_type,
    },
    {
      label: "Status",
      value: property.saletype_name,
    },
  ]];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
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
