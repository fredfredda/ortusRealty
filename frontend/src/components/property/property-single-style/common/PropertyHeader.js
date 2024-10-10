"use client";
import formatMoney from "@/utilis/FormatMoney";
import React from "react";

const PropertyHeader = ({ property }) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{property.prpty_name}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {property.prpty_location}
            </p>
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              {property.saletype_name}
            </a>
          </div>
            {property.property_type === 'home' ?
              <div className="property-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {property.num_of_beds} bed 
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {property.num_of_bathrooms} bath 
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {formatMoney(property.prpty_size)} sqft 
                </a>
              </div> :
                <div className="property-meta d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-bird-house" /> {property.category_name + ' '}
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" /> {formatMoney(property.prpty_size)} sqft 
                  </a>
                </div>
              }
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-new-tab" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#">
                <span className="flaticon-printer" />
              </a>
            </div>
            <h3 className="price mb-0">Bif {formatMoney(property.prpty_price)}</h3>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
