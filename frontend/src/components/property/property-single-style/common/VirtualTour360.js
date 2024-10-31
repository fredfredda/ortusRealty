import ImageKit from "@/components/common/ImageKit";
import Image from "next/image";
import React from "react";

const VirtualTour360 = () => {
  return (
    <>
      <div className="col-md-12">
        <ImageKit
          width={736}
          height={373}
          pathName="listings/listing-single-7.jpg"
          alt="virtual image"
          className="w-100 bdrs12 h-100 cover"
        />
      </div>
    </>
  );
};

export default VirtualTour360;