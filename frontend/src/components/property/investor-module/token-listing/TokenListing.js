"use client";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import listings from "@/data/listings";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const ListingsFavourites = () => {
  const [favoriteListings, setFavoriteListings] = useState(
    listings.slice(0, 8)
  );

  const handleDeleteListing = (id) => {
    const updatedListings = favoriteListings.filter(
      (listing) => listing.id !== id
    );
    setFavoriteListings(updatedListings);
  };

  return (
    <div className="listing-style1 listing-type">
      <div className="col-xl-5 mb15">
        <p className="fz20 fwb mb5">Project Info</p>
        <div className="row project-info mb15">
          <div className="list-thumb">
            <Image
              width={382}
              height={248}
              className="w-100 h-100 cover"
              src={"/images/listings/g1-2.jpg"}
              alt="listings"
            />
            <div className="sale-sticker-wrap">
                <div className="list-tag fz12">
                  <span className="flaticon-electricity me-2" />
                  FEATURED
                </div>
            </div>
            <div className="list-price">
              24,000 / <span>mo</span>
            </div>
          </div>

          <div className="list-content">
            <h6 className="list-title">
              <Link href={`/single-v4/1}`}>Project in Kigobe</Link>
            </h6>
            <p className="list-text order-text">
              Bujumbura, Kigobe, Avenue 1, Numero 1
            </p>
            <p className="list-text2">Launching date: 26/03/2025</p>
            <p className="list-text2">Estimated Finishing date: 26/03/2025</p>
            <Link href="#" className="fwb">
              View project details {">>"}
            </Link>
          </div>
        </div>
      </div>

      <div className="col-xl-5">
        <p className="fz20 fwb mb0">Tokens Info</p>
        <div className="list-content token-order-info">
          <p className="list-text2">Num of Tokens: 12</p>
          <p className="list-text2">Tokens Rating: BB</p>
          <p className="list-text2">Tokens Expiry date: 26/03/2027 23:59:59</p>
          <p className="list-text2">Total Cost: Bif 36,000,000</p>
          <p className="list-text2">Estimated Return: 5.7%</p>
          <p className="list-text2">Date of order: 20/04/2025</p>
          <p className="list-text2">Order Complete At: 26/04/2025 23:59:59</p>
          <p className="list-text2">Tokens status: Active</p>
          <Link href="#" className="fwb">
            View Tokens History {">>"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingsFavourites;
