"use client";
import ImageKit from "@/components/common/ImageKit";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ExploreCities = () => {
  const cities = [
    {
      id: 1,
      value: 'home',
      name: "Homes",
      image: "listings/img10.jpg",
      number: 12,
    },
    {
      id: 2,
      name: "Land",
      value: 'land',
      image: "listings/img11.jpg",
      number: 8,
    },
    {
      id: 3,
      name: "Construction Sites",
      value: "construction site",
      image: "listings/img12.jpg",
      number: 15,
    },
    {
      id: 4,
      name: "Development Projects",
      value: "development project",
      image: "listings/img13.jpg",
      number: 10,
    }
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".cities_next__active",
          prevEl: ".cities_prev__active",
        }}
        pagination={{
          el: ".cities_pagination__active",
          clickable: true,
        }}
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
        autoplay={{
          delay: 3000, // Set the desired delay for autoplay
          disableOnInteraction: false, // Keep autoplaying even when user interacts with the swiper
        }}
      >
        {cities.map((city) => (
          <SwiperSlide key={city.id}>
            <div className="item">
              <Link href={`/explore?propertyType=${city.value}`}>
                <div className="feature-style2 mb30">
                  <div className="feature-img">
                    <ImageKit 
                    className="w-100 h-100 cover"
                      pathName={city.image}
                      width={279}
                      height={279}
                      alt="city listings"
                    />
                  </div>
                  <div className="feature-content pt20">
                    <h6 className="title mb-1">{city.name}</h6>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ExploreCities;
