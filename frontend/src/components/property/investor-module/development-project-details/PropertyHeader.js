"use client";
import React from "react";
import formatMoney from "@/utilis/FormatMoney";

const PropertyHeader = ({ project }) => {
  return (
    <>
      <div className="col-lg-12">
        <div className="single-property-content mb30-md">
          <h4 className="sp-lg-title">{project.prpty_name}</h4>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="fz15 mb-0 pr10">
              {project.prpty_location}
            </p>
          </div>
          <div className="property-meta d-flex align-items-center">
            <p className="fz15">
              <span className="flaticon-bird-house" /> {project.category_name}
            </p>
            <p className="fz15 ml20">
              <span className="flaticon-expand" />{" "}
              {formatMoney(project.prpty_size)} sqft
            </p>
          </div>

          <p className="fz15">
            Property Value:{" "}
            <span className="fz15 fwb">
              {" "}
              Bif {formatMoney(project.prpty_price)}{" "}
              {project.saletype_name === "renting" && "/mo"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;
