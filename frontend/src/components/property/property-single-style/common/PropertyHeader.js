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
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/unsaveproperty/${propertyId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          toast.error(typeof data.error === 'string' ? data.error.toString() : "An error occurred");
        } else {
          removeProperty(propertyId);
        }
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/saveproperty/${propertyId}`,
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
          } else{
            toast.error(typeof data.error === 'string' ? data.error.toString() : "An error occurred");
          }
        } else {
          appendProperty(propertyId);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const HandleCopyToClipboard = async (propertyId) => {
    try {
      const link = `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/property-details/${propertyId}`;
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link");
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
            <p
              className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm mt10"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              {property.saletype_name}
            </p>
          </div>
          {property.property_type === "home" ? (
            <div className="property-meta d-flex align-items-center">
              <p>
                <span className="flaticon-bed" /> {`${property.num_of_beds} bedrooms`}
              </p>
              <p className="ml20">
                <span className="flaticon-shower" /> {`${property.num_of_bathrooms} bathrooms`}
              </p>
              <p className="ml20">
                <span className="flaticon-expand" />
                {`${formatMoney(property.prpty_size)} sqft `}
              </p>
            </div>
          ) : (
            <div className="property-meta d-flex align-items-center">
              <p>
              <span className="flaticon-bird-house" />
              {property.category_name}
              </p>
              <p className="ml20">
                <span className="flaticon-expand" />{" "}
                {formatMoney(property.prpty_size)} sqft
              </p>
            </div>
          )}
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <button
                className="property-card-btn"
                onClick={() => HandleCopyToClipboard(property.id)}
              >
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
              Bif {formatMoney(property.prpty_price)} {property.saletype_name === 'renting' && '/mo'}
            </h3>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
