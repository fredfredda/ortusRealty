"use client";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";

const imagekitURL = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

const PropertyGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <div className="ps-v6-slider nav_none mt30">
        <Gallery>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 position-relative sp-img-content"
          >
            {images.split(',').map((item, i) => (
              <SwiperSlide key={i}>
                <Item
                  original={`${imagekitURL}/${item}?tr=w-1206,h-671,f-webp,q-80`}
                  thumbnail={`${imagekitURL}/${item}?tr=w-1206,h-671,f-webp,q-60`}
                  width={1206}
                  height={671}
                >
                  {({ ref, open }) => (
                    <Image
                      width={1206}
                      height={671}
                      ref={ref}
                      onClick={open}
                      src={`${imagekitURL}/${item}?tr=w-1206,h-671,f-webp,q-80`}
                      alt="gallery"
                      className="w-100 h-auto bdrs12 pointer"
                    />
                  )}
                </Item>

                <button className="all-tag popup-img border-0 pe-none">
                  See All {images.split(',').length} photos
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </Gallery>

        <div className="row">
          <div className="col-lg-5 col-md-7">
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt20"
            >
              {images.split(',').map((item, i) => (
                <SwiperSlide key={i}>
                  <Image
                    height={90}
                    width={83}
                    src={`${imagekitURL}/${item}?tr=w-83,h-90,f-webp,q-60`}
                    alt="image"
                    className="w-100 bdrs12 cover pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyGallery;