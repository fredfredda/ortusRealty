"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import ImageKit from "@/components/common/ImageKit";
import PaginationTwo from "@/components/listing/PaginationTwo";
import formatMoney from "@/utilis/FormatMoney";

const TokenOrders = () => {
  const [tokenListings, setTokenListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchListings = useRef(false);

  const [numOfItems, setNumOfItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageItems, setPageItems] = useState([]);
  const itemsPerPage = 5;

  const [removingListing, setRemovingListing] = useState(false);

  const fetchTokenListings = async () => {
    if (fetchListings.current === true) return;
    setLoading(true);
    fetchListings.current = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/investor-token-listings`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error("Error Fetching Tks Orders: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else if (data.listings) {
        setTokenListings((prev) => [...prev, ...data.listings]);
        setNumOfItems(data.listings.length);
      }
    } catch (error) {
      console.error("Error fetching Tks orders: ", error);
      toast.error("Error fetching Tks orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenListings();
  }, []);

  useEffect(() => {
    setPageItems(
      tokenListings.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
      )
    );
  }, [pageNumber, tokenListings]);

  const handleRemoveListing = async (listingId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this auction?"
    );
    if (userConfirmed) {
      setRemovingListing(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/delete-token-listing/${listingId}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.error) {
          console.error("Error removing auction: ", data.error);
          toast.error(
            typeof data.error === "string"
              ? data.error
              : "Error removing auction: "
          );
        } else if (data.success) {
          toast.success(data.success);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error removing auction: ", error);
        toast.error("Error removing auction");
      } finally {
        setRemovingListing(false);
      }
    }
  };

  return (
    <>
      <table className="table-style1 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Num Of TKs</th>
            <th scope="col">Rating</th>
            <th scope="col">Project Revenue</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="t-body">
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center fz17">
                A moment please...
              </td>
            </tr>
          ) : pageItems.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center fz17">
                No data to display
              </td>
            </tr>
          ) : (
            pageItems.map((listing) => (
              <tr key={listing.id}>
                <th scope="row">
                  <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                    <div className="list-thumb">
                      <ImageKit
                        width={110}
                        height={94}
                        className="w-100"
                        pathName={listing.images.split(",")[0]}
                        transformation={[{ quality: 80 }]}
                        loading="lazy"
                        alt="listing"
                      />
                    </div>
                    <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                      <div className="h6 list-title">
                        <Link
                          href={`/investor-module/development-project/${listing.development_project_id}`}
                        >
                          {listing.prpty_name.slice(0, 36)}
                          {listing.prpty_name.length > 36 && "..."}
                        </Link>
                      </div>
                      <p className="list-text mb-0">{listing.prpty_location}</p>
                      <p className="mb-0">
                        Launching date: {listing.launching_date.split("T")[0]}
                      </p>
                      <p>
                        Estimated Finishing Date:{" "}
                        {listing.estimated_finishing_date.split("T")[0]}
                      </p>
                    </div>
                  </div>
                </th>
                <td className="vam">
                  <h5>{listing.num_of_tokens}</h5>
                </td>
                <td className="vam">
                  <h5>{listing.token_rating}</h5>
                </td>
                <td className="vam">Bif {formatMoney(listing.estimated_return * listing.num_of_tokens)}</td>
                <td className="vam">
                    <button
                      className="btn btn-white2"
                      onClick={() => handleRemoveListing(listing.id)}
                      disabled={removingListing}
                    >
                      {removingListing ? "Removing..." : "Remove"}
                    </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt30">
        <PaginationTwo
          pageCapacity={itemsPerPage}
          data={tokenListings}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </>
  );
};

export default TokenOrders;
