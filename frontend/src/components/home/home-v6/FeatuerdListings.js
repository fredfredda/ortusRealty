"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import formatMoney from "@/utilis/FormatMoney";

const FeaturedListings = () => {
  var [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/properties/featuredproperties");
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          setListings(data.properties);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
        {listings.slice(0, 5).map((listing) => (
          <SwiperSlide key={listing.id}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    className="w-100 h-100 cover"
                    src={listing.images.split(",")[0]}
                    alt="listings"
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
                      <a href="#">
                        <span className="flaticon-bed" /> {listing.num_of_beds}{" "}
                        bed
                      </a>
                      <a href="#">
                        <span className="flaticon-shower" />{" "}
                        {listing.num_of_bathrooms} bath
                      </a>
                      <a href="#">
                        <span className="flaticon-expand" />{" "}
                        {listing.prpty_size} sqft
                      </a>
                    </div>
                  ) : (
                    <div className="list-meta d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-bird-house" />{" "}
                        {listing.category_name}
                      </a>
                      <a href="#">
                        <span className="flaticon-expand" />{" "}
                        {listing.prpty_size} sqft
                      </a>
                    </div>
                  )}
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">{listing.saletype_name}</span>
                    <div className="icons d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-fullscreen" />
                      </a>
                      <a href="#">
                        <span className="flaticon-new-tab" />
                      </a>
                      <a href="#">
                        <span className="flaticon-like" />
                      </a>
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
