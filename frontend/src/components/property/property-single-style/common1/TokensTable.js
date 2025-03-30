import React from "react";

const PropertyDetails = () => {
  const columns = [
    [
      {
        label: "Property ID",
        value: "RT48",
      },
      {
        label: "Price",
        value: "$252,000",
      },
      {
        label: "Property Size",
        value: "1500 Sq Ft",
      },
      {
        label: "Bathrooms",
        value: "3",
      },
      {
        label: "Bedrooms",
        value: "2",
      },
    ],
    [
      {
        label: "Garage",
        value: "2",
      },
      {
        label: "Garage Size",
        value: "200 SqFt",
      },
      {
        label: "Year Built",
        value: "2022",
      },
      {
        label: "Property Type",
        value: "Apartment",
      },
      {
        label: "Property Status",
        value: "For Sale",
      },
    ],
  ];

  return (
    // <div className="row">
      <table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col">Rating</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Estimated return</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <th scope="row">AAA</th>
            <td>70</td>
            <td>3,500,000</td>
            <td>10%</td>
          </tr>
          <tr className="text-center">
            <th scope="row">AAA</th>
            <td>70</td>
            <td>3,500,000</td>
            <td>10%</td>
          </tr>
          <tr className="text-center">
            <th scope="row">AAA</th>
            <td>70</td>
            <td>3,500,000</td>
            <td>10%</td>
          </tr>
          <tr className="text-center">
            <th scope="row">AAA</th>
            <td>70</td>
            <td>3,500,000</td>
            <td>10%</td>
          </tr>
          <tr className="text-center">
            <th scope="row">AAA</th>
            <td>70</td>
            <td>3,500,000</td>
            <td>10%</td>
          </tr>
          <tr className="text-center">
            <th scope="row">AAA</th>
            <td>70</td>
            <td>3,500,000</td>
            <td>10%</td>
          </tr>
          <tr className="text-center">
            <th scope="row">AAA</th>
            <td>70</td>
            <td>3,500,000</td>
            <td>10%</td>
          </tr>
        </tbody>
      </table>
    // </div>
  );
};

export default PropertyDetails;
