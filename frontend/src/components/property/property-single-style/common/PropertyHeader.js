"use client";
import React from "react";
import formatMoney from "@/utilis/FormatMoney";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { savedPropertiesStore } from "@/store/savedProperties";
import { toast } from "react-hot-toast";

const PropertyHeader = ({ property }) => {
  const savedProperties = savedPropertiesStore(
    (state) => state.savedProperties
  );
  const appendProperty = savedPropertiesStore((state) => state.appendProperty);
  const removeProperty = savedPropertiesStore((state) => state.removeProperty);

  const handleSaveUnsave = async (propertyId) => {
    try {
      if (savedProperties.includes(propertyId)) {
        const response = await fetch(
          `http://localhost:3001/api/properties/unsaveproperty/${propertyId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          removeProperty(propertyId);
        }
      } else {
        const response = await fetch(
          `http://localhost:3001/api/properties/saveproperty/${propertyId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          if (data.error === "Unauthorized") {
            toast.error("Please login to save properties");
          }
        } else {
          appendProperty(propertyId);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          {property.property_type === "home" ? (
            <div className="property-meta d-flex align-items-center">
              <a href="#">
                <span className="flaticon-bed" /> {property.num_of_beds} bed
              </a>
              <a href="#">
                <span className="flaticon-shower" /> {property.num_of_bathrooms}{" "}
                bath
              </a>
              <a href="#">
                <span className="flaticon-expand" />{" "}
                {formatMoney(property.prpty_size)} sqft
              </a>
            </div>
          ) : (
            <div className="property-meta d-flex align-items-center">
              <a href="#">
                <span className="flaticon-bird-house" />{" "}
                {property.category_name + " "}
              </a>
              <a href="#">
                <span className="flaticon-expand" />{" "}
                {formatMoney(property.prpty_size)} sqft
              </a>
            </div>
          )}
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <button className="property-card-btn">
                <FontAwesomeIcon
                  icon={faShareNodes}
                  style={{ color: "#eb6753" }}
                  size="lg"
                />
              </button>
              <button
                className="property-card-btn"
                onClick={() => handleSaveUnsave(property.id)}
              >
                <FontAwesomeIcon
                  icon={
                    savedProperties.includes(property.id)
                      ? faSolidHeart
                      : faRegularHeart
                  }
                  style={{ color: "#eb6753" }}
                  size="lg"
                />
              </button>
            </div>
            <h3 className="price mb-0">
              Bif {formatMoney(property.prpty_price)}
            </h3>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
