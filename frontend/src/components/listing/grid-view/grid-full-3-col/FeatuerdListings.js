"use client";

import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";
import formatMoney from "@/utilis/FormatMoney";
import { savedPropertiesStore } from "@/store/savedProperties";
import ImageKit from "@/components/common/ImageKit";
import toast from "react-hot-toast";

const FeaturedListings = ({ data, colstyle, selectedIds, setSelectedIds }) => {
  const removeProperty = savedPropertiesStore((state) => state.removeProperty);

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      let newIds = selectedIds.filter((selectedId) => selectedId != id);
      setSelectedIds(newIds);
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const UnsaveProperties = async () => {
    for (let id of selectedIds) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/unsaveproperty/${id}`,
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
          removeProperty(id);
        }
      } catch (error) {
        console.log(error);        
        toast.error("An error occured");
      }
    }
    window.location.reload();
  };

  return (
    <>
      {data.length === 0 ? (
        <h3>No items available.</h3>
      ) : (
        <>
          <div className="d-md-flex align-items-center justify-content-xxl-end mb20">
            {selectedIds.length >= 2 && selectedIds.length <= 3 && (
              <div className="mr20">
                <Link
                  href={`compare/${selectedIds.join("-")}`}
                  className="ud-btn btn-thm"
                >
                  {" "}
                  Compare{" "}
                </Link>
              </div>
            )}

            {selectedIds.length >= 1 && (
              <div className="">
                <button className="ud-btn btn-thm" onClick={UnsaveProperties}>
                  {" "}
                  Unsave{" "}
                </button>
              </div>
            )}
          </div>
          {data.map((listing) => (
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
                  <ImageKit
                    width={382}
                    height={248}
                    className="w-100  cover"
                    transformation={[{ quality: 80 }]}
                    pathName={listing.images.split(",")[0]}
                    loading="lazy"
                    alt="listings"
                  />

                  {listing.is_featured === true && (
                    <div className="sale-sticker-wrap">
                      <div className="list-tag fz12">
                        <span className="flaticon-electricity me-2" />
                        FEATURED
                      </div>
                    </div>
                  )}

                  <button
                    className="tag-del"
                    title="Select Item"
                    onClick={() => handleSelect(listing.property_id)}
                    style={{ border: "none" }}
                    data-tooltip-id={`select-${listing.property_id}`}
                  >
                    {selectedIds.includes(listing.property_id) ? (
                      <span className="fas fa-square-check fa-2xl"></span>
                    ) : (
                      <span className="far fa-square-check fa-2xl"></span>
                    )}
                  </button>

                  <ReactTooltip
                    id={`select-${listing.property_id}`}
                    place="left"
                    content="Select"
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
                      <p>
                        <span className="flaticon-bed" /> {listing.num_of_beds}{" "}
                        bed
                      </p>
                      <p className="ml20">
                        <span className="flaticon-shower" />{" "}
                        {listing.num_of_bathrooms} bath
                      </p>
                      <p className="ml20">
                        <span className="flaticon-expand" />{" "}
                        {listing.prpty_size} sqft
                      </p>
                    </div>
                  ) : (
                    <div className="list-meta d-flex align-items-center">
                      <p>
                        <span className="flaticon-bird-house" />{" "}
                        {listing.category_name}
                      </p>
                      <p className="ml20">
                        <span className="flaticon-expand" />{" "}
                        {listing.prpty_size} sqft
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default FeaturedListings;
