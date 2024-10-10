"use client";

import Image from "next/image";
import Link from "next/link";
import formatMoney from "@/utilis/FormatMoney";

const FeaturedListings = ({data,colstyle}) => {
  return (
    <>
      {data.map((listing) => (
        <div className={` ${colstyle ? 'col-sm-12':'col-sm-6 col-lg-6'}  `} key={listing.id}>
          <div className={colstyle ? "listing-style1 listCustom listing-type" : "listing-style1"}    >
            <div className="list-thumb" >
              <Image
                width={382}
                height={248}
                style={{height:'230px'}}
                className="w-100  cover"
                src={listing.images.split(',')[0]}
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {listing.is_featured === 'yes' && (
                  <div className="list-tag rounded-0 fz12">
                    <span className="flaticon-electricity" />
                    FEATURED
                  </div>
                )}
              </div>
              <div className="list-price">
                Bif {formatMoney(listing.prpty_price)} {listing.saletype_name === 'renting' &&  <span>/mo</span>}
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link href={`/property-details/${listing.id}`}>{listing.prpty_name.slice(0,36)}{listing.prpty_name.length > 36 && '...'}</Link>
              </h6>
              <p className="list-text">{listing.prpty_location}</p>
              {listing.property_type === 'home' ?
                <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing.num_of_beds} bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {listing.num_of_bathrooms} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.prpty_size} sqft
                </a>
              </div> :

                <div className="list-meta d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-bird-house" /> {listing.category_name}
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" /> {listing.prpty_size} sqft
                  </a>
                </div>
              }
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
      ))}
    </>
  );
};

export default FeaturedListings;
