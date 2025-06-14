"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import ImageKit from "@/components/common/ImageKit";
import Link from "next/link";
import formatMoney from "@/utilis/FormatMoney";
import { savedPropertiesStore } from "@/store/savedProperties";
import { toast } from "react-hot-toast";
import { sessionStore } from "@/store/session";

const FeaturedListings = ({ data, colstyle, showFilter }) => {
  const session = sessionStore((state) => state.session);
  const savedProperties = savedPropertiesStore(
    (state) => state.savedProperties
  );
  const appendProperty = savedPropertiesStore((state) => state.appendProperty);
  const removeProperty = savedPropertiesStore((state) => state.removeProperty);

  const handleSaveUnsave = async (propertyId) => {
    if (!session?.userId){
      toast.error("Login to save/unsave properties");
      return;
    }
    try {
      if (savedProperties.includes(propertyId)) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/unsaveproperty/${propertyId}`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          toast.error(typeof data.error === "string" ? data.error : "An error occured");
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
              authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          if (data.error === "Unauthorized") {
            toast.error("Please login to save properties");
          } else {
            toast.error(typeof data.error === "string" ? data.error : "An error occured");            
          }
        } else {
          appendProperty(propertyId);
        }
      }
    } catch (error) {
      console.log(error);      
      toast.error("An error occured");
    }
  };

  const HandleCopyToClipboard = async (propertyId) => {
    try {
      const link = `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/property-details/${propertyId}`;
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.log("Failed to copy: ", err);
      toast.error("Failed to copy link");
    }
  };

  return (
    <>
      {data.map((listing) => (
        <div
          className={` ${
            colstyle
              ? "col-sm-12"
              : `col-sm-6 ${showFilter === "true" ? "col-lg-6" : "col-lg-4"}`
          }`}
          key={listing.id}
        >
          <div
            className={
              colstyle
                ? "listing-style1 listCustom listing-type"
                : "listing-style1"
            }
          >
            <div className="list-thumb">
              <ImageKit
                width={382}
                height={248}
                className="w-100  cover"
                pathName={listing.images.split(",")[0]}
                transformation={[{ quality: 80 }]}
                loading="lazy"
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {listing.is_featured === true && (
                  <div className="list-tag rounded-0 fz12">
                    <span className="flaticon-electricity" />
                    FEATURED
                  </div>
                )}
              </div>
              <div className="list-price">
                Bif {formatMoney(listing.prpty_price)}{" "}
                {listing.saletype_name === "renting" && <span>/mo</span>}
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link href={`/property-details/${listing.id}`}>
                  {listing.prpty_name.slice(0, 36)}
                  {listing.prpty_name.length > 36 && "..."}
                </Link>
              </h6>
              <p className="list-text">{listing.prpty_location}</p>
              {listing.property_type === "home" ? (
                <div className="list-meta d-flex align-items-center">
                  <p>
                    <span className="flaticon-bed" /> {listing.num_of_beds} bed
                  </p>
                  <p className="ml20">
                    <span className="flaticon-shower" />
                    {listing.num_of_bathrooms} bath
                  </p>
                  <p className="ml20">
                    <span className="flaticon-expand" /> {listing.prpty_size}{" "}
                    sqft
                  </p>
                </div>
              ) : (
                <div className="list-meta d-flex align-items-center">
                  <p>
                    <span className="flaticon-bird-house" />{" "}
                    {listing.category_name}
                  </p>
                  <p className="ml20">
                    <span className="flaticon-expand" /> {listing.prpty_size}{" "}
                    sqft
                  </p>
                </div>
              )}
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span
                  className="for-what"
                  style={{ textTransform: "capitalize" }}
                >
                  {listing.saletype_name}
                </span>
                <div className="icons d-flex align-items-center">
                  <button
                    className="property-card-btn"
                    onClick={() => HandleCopyToClipboard(listing.id)}
                  >
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      style={{ color: "#eb6753" }}
                      size="lg"
                    />
                  </button>
                  <button
                    className="property-card-btn"
                    onClick={() => handleSaveUnsave(listing.id)}
                  >
                    <FontAwesomeIcon
                      icon={
                        savedProperties.includes(listing.id)
                          ? faSolidHeart
                          : faRegularHeart
                      }
                      style={{ color: "#eb6753" }}
                      size="lg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
