"use client";

import Image from "next/image";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";
import formatMoney from "@/utilis/FormatMoney";
import { savedPropertiesStore } from "@/store/savedProperties";

const FeaturedListings = ({ data, colstyle }) => {

  const removeProperty = savedPropertiesStore((state) => state.removeProperty);

  const handleDeleteListing = async (propertyId) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {data.length === 0 ? (
        <h3>No items available.</h3>
      ) : (
        data.map((listing) => (
          <div
            className={` ${
              colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
            }  `}
            key={listing.property_id}
          >
            <div
              className={
                colstyle
                  ? "listing-style1 listCustom listing-type"
                  : "listing-style1"
              }
            >
              <div className="list-thumb">
                <Image
                  width={382}
                  height={248}
                  className="w-100  cover"
                  style={{ height: "230px" }}
                  src={listing.images.split(",")[0]}
                  alt="listings"
                />
                {listing.is_featured === "yes" && (
                  <div className="sale-sticker-wrap">
                    <div className="list-tag fz12">
                      <span className="flaticon-electricity me-2" />
                      FEATURED
                    </div>
                  </div>
                )}

                <button
                  className="tag-del"
                  title="Delete Item"
                  onClick={() => handleDeleteListing(listing.property_id)}
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${listing.property_id}`}
                >
                  <span className="fas fa-trash-can"></span>
                </button>

                <ReactTooltip
                  id={`delete-${listing.property_id}`}
                  place="left"
                  content="Remove"
                />

                <div className="list-price">
                  Bif {formatMoney(listing.prpty_price)}
                  {listing.saletype_name === "renting" && <span>/mo</span>}
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Link href={`/property-details/${listing.property_id}`}>
                    {listing.prpty_name.slice(0, 36)}
                    {listing.prpty_name.length > 36 && "..."}
                  </Link>
                </h6>
                <p className="list-text">{listing.prpty_location}</p>
                {listing.property_type === "home" ? (
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" /> {listing.num_of_beds}{" "}
                      bed
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" />{" "}
                      {listing.num_of_bathrooms} bath
                    </a>
                    <a href="#">
                      <span className="flaticon-expand" /> {listing.prpty_size}{" "}
                      sqft
                    </a>
                  </div>
                ) : (
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bird-house" />{" "}
                      {listing.category_name}
                    </a>
                    <a href="#">
                      <span className="flaticon-expand" /> {listing.prpty_size}{" "}
                      sqft
                    </a>
                  </div>
                )}
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <span className="for-what">{listing.saletype_name}</span>
                  {/* <div className="icons d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a href="#">
                    <span className="flaticon-like" />
                  </a>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FeaturedListings;
