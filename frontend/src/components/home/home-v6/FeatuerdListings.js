"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import formatMoney from "@/utilis/FormatMoney";
import { isLoadingStore } from "@/store/isLoading";
import { savedPropertiesStore } from "@/store/savedProperties";
import { toast } from "react-hot-toast";
import ImageKit from "@/components/common/ImageKit";

const FeaturedListings = () => {
  const isLoading = isLoadingStore((state) => state.isLoading);

  const savedProperties = savedPropertiesStore(
    (state) => state.savedProperties
  );
  const appendProperty = savedPropertiesStore((state) => state.appendProperty);
  const removeProperty = savedPropertiesStore((state) => state.removeProperty);

  var [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/featuredproperties`
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          toast.error(
            typeof data.error === "string" ? data.error : "An error occured"
          );
        } else {
          setListings(data.properties);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occured");
      }
    };
    fetchData();
  }, []);

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
          toast.error(
            typeof data.error === "string" ? data.error : "An error occured"
          );
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
          } else {
            toast.error(
              typeof data.error === "string" ? data.error : "An error occured"
            );
          }
        } else {
          appendProperty(propertyId);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured");
    }
  };

  const HandleCopyToClipboard = async (propertyId) => {
    try {
      const link = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/property-details/${propertyId}`;
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link");
    }
  };

  if (isLoading === false)
    return (
      <>
        <Swiper
          className="overflow-visible"
          spaceBetween={30}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".featured-next__active",
            prevEl: ".featured-prev__active",
          }}
          pagination={{
            el: ".featured-pagination__active",
            clickable: true,
          }}
          slidesPerView={1}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {listings.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div className="item">
                <div className="listing-style1">
                  <div className="list-thumb">
                    <ImageKit
                      pathName={listing.images.split(",")[0]}
                      width={382}
                      height={248}
                      loading="lazy"
                      transformation={[{ quality: 80 }]}
                      alt="Listing Image"
                    />
                    <div className="sale-sticker-wrap">
                      <div className="list-tag rounded-0 fz12">
                        <span className="flaticon-electricity" />
                        FEATURED
                      </div>
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
                          <span className="flaticon-bed" />{" "}
                          {listing.num_of_beds} bed
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
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
};

export default FeaturedListings;
