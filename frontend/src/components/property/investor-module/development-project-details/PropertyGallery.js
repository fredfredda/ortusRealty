"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

const PropertyGallery = ({ images }) => {
  const imagesLength = images.split(",").length;
  const firstImage = images.split(",")[0];
  const secondToLastImages = images.split(",").slice(1, imagesLength);
  return (
    <>
      <Gallery>
        <div className="col-sm-6">
          <div className="sp-img-content mb15-md">
            <div className="popup-img preview-img-1 sp-img">
              <Item
                original={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${firstImage}`}
                thumbnail={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${firstImage}`}
                width={610}
                height={510}
              >
                {({ ref, open }) => (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${firstImage}`}
                    width={591}
                    height={558}
                    ref={ref}
                    onClick={open}
                    alt="image"
                    role="button"
                    className="w-100 h-100 cover"
                  />
                )}
              </Item>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6">
          <div className="row">
            {secondToLastImages.map((image, index) => (
              <div className="col-6 ps-sm-0" key={index}>
                <div className="sp-img-content">
                  <div
                    className={`popup-img preview-img-${index + 2} sp-img mb10`}
                  >
                    <Item
                      original={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${image}`}
                      thumbnail={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${image}`}
                      width={610}
                      height={510}
                    >
                      {({ ref, open }) => (
                        <Image
                          width={270}
                          height={250}
                          className="w-100 h-100 cover"
                          ref={ref}
                          onClick={open}
                          role="button"
                          src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${image}`}
                          alt={"project image"}
                        />
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Gallery>
    </>
  );
};

export default PropertyGallery;
