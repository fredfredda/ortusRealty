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
            <div className="listing-style1 listing-type">
              <div className="col-xl-4">
                <p className="text-center fz20 fwb mb0">Project Info</p>
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
                    <p className="list-text">{listing.location}</p>
                    <p className="list-text2">Launching date: 26/03/2025</p>
                    <p className="list-text2">Estimated Finishing date: 26/03/2025</p>
                    <p className="list-text2">Tokens Expiry date: 26/03/2025 23:59:59</p>
                    <Link href="#" className="fwb">View project details {">>"}</Link>
                  </div>
                </div>
              </div>

              <div className="col-xl-7">
                <p className="text-center fz20 fwb mb0">Tokens Info</p>
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">Rating</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Estimated return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <th scope="row">AAA</th>
                      <td>70</td>
                      <td>3,500,000</td>
                      <td>10%</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row">AAA</th>
                      <td>70</td>
                      <td>3,500,000</td>
                      <td>10%</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row">AAA</th>
                      <td>70</td>
                      <td>3,500,000</td>
                      <td>10%</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row">AAA</th>
                      <td>70</td>
                      <td>3,500,000</td>
                      <td>10%</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row">AAA</th>
                      <td>70</td>
                      <td>3,500,000</td>
                      <td>10%</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row">AAA</th>
                      <td>70</td>
                      <td>3,500,000</td>
                      <td>10%</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row">AAA</th>
                      <td>70</td>
                      <td>3,500,000</td>
                      <td>10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        ))
      )}
    </>
  );
};

export default ListingsFavourites;
