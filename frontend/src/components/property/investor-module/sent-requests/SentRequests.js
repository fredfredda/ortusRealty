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
    <>
      {favoriteListings.length === 0 ? (
        <h3>No items available.</h3>
      ) : (
        favoriteListings.map((listing) => (
          <div className="listing-style1 listing-type sent-requests">
            
            <div className="col-xl-12 mb15">
              <p className="text-center fz20 fwb">Listed Tokens Info</p>
              <div className="row">
                <div className="col-xl-5">
                  <div className="row project-info">
                    <div className="list-thumb">
                      <Image
                        width={382}
                        height={248}
                        className="w-100 h-100 cover"
                        src={"/images/listings/g1-2.jpg"}
                        alt="listings"
                      />
                      <div className="sale-sticker-wrap">
                        {!listing.forRent && (
                          <div className="list-tag fz12">
                            <span className="flaticon-electricity me-2" />
                            FEATURED
                          </div>
                        )}
                      </div>
                      <div className="list-price">
                        {listing.price} / <span>mo</span>
                      </div>
                    </div>

                    <div className="list-content">
                      <h6 className="list-title">
                        <Link href={`/single-v4/${listing.id}`}>
                          {listing.title}
                        </Link>
                      </h6>
                      <p className="list-text order-text">{listing.location}</p>
                      <p className="list-text2">Launching date: 26/03/2025</p>
                      <p className="list-text2">
                        Estimated Finishing date: 26/03/2025
                      </p>
                      <Link href="#" className="fwb">
                        View project details {">>"}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-5">
                  <div className="list-content token-order-info">
                    <p className="list-text2">Num of Tokens: 12</p>
                    <p className="list-text2">Tokens Rating: BB</p>
                    <p className="list-text2">
                      Tokens Expiry date: 26/03/2027 23:59:59
                    </p>
                    <p className="list-text2">Total Cost: Bif 36,000,000</p>
                    <p className="list-text2">Estimated Return: 5.7%</p>
                    <p className="list-text2">Date of order: 20/04/2025</p>
                    <p className="list-text2">
                      Order Complete At: 26/04/2025 23:59:59
                    </p>
                    <p className="list-text2">Tokens status: Active</p>
                    <Link href="#" className="fwb">
                      View Tokens History {">>"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
            <p className="text-center fz20 fwb">Proposed Tokens Info</p>
              <div className="row">
                <div className="col-xl-5">
                  <div className="row project-info">
                    <div className="list-thumb">
                      <Image
                        width={382}
                        height={248}
                        className="w-100 h-100 cover"
                        src={"/images/listings/g1-2.jpg"}
                        alt="listings"
                      />
                      <div className="sale-sticker-wrap">
                        {!listing.forRent && (
                          <div className="list-tag fz12">
                            <span className="flaticon-electricity me-2" />
                            FEATURED
                          </div>
                        )}
                      </div>
                      <div className="list-price">
                        {listing.price} / <span>mo</span>
                      </div>
                    </div>

                    <div className="list-content">
                      <h6 className="list-title">
                        <Link href={`/single-v4/${listing.id}`}>
                          {listing.title}
                        </Link>
                      </h6>
                      <p className="list-text order-text">{listing.location}</p>
                      <p className="list-text2">Launching date: 26/03/2025</p>
                      <p className="list-text2">
                        Estimated Finishing date: 26/03/2025
                      </p>
                      <Link href="#" className="fwb">
                        View project details {">>"}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-5">
                  <div className="list-content token-order-info">
                    <p className="list-text2">Num of Tokens: 12</p>
                    <p className="list-text2">Tokens Rating: BB</p>
                    <p className="list-text2">
                      Tokens Expiry date: 26/03/2027 23:59:59
                    </p>
                    <p className="list-text2">Total Cost: Bif 36,000,000</p>
                    <p className="list-text2">Estimated Return: 5.7%</p>
                    <p className="list-text2">Date of order: 20/04/2025</p>
                    <p className="list-text2">
                      Order Complete At: 26/04/2025 23:59:59
                    </p>
                    <p className="list-text2">Tokens status: Active</p>
                    <Link href="#" className="fwb">
                      View Tokens History {">>"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ListingsFavourites;
