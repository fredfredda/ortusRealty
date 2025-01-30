"use client";

import React, { useState, useEffect } from "react";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import { savedPropertiesStore } from "@/store/savedProperties";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

export default function ProperteyFiltering() {
  const savedProperties_ = savedPropertiesStore(
    (state) => state.savedProperties
  );

  const [selectedIds, setSelectedIds] = useState([]);

  const [savedProperties, setSavedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const itemsPerPage = 6;

  const [color, setColor] = useState("#eb6753");

    useEffect(() => {
      setPageItems(
        savedProperties.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
      );
    }, [pageNumber, savedProperties]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/savedpropertiesdetails`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          toast.error(typeof data.error === "string" ? data.error : "An error occured");          
        } else {
          setSavedProperties(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occured");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [savedProperties_]);

  return (
    <section className="pt0 pb90">
      <div className="container">
        {isLoading ? (
          <div className="mt20 mb20">
            <ClipLoader
              color={color}
              loading={isLoading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="row">
            <FeaturedListings
              colstyle={colstyle}
              data={pageItems}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>
        )}

        <div className="row">
          <PaginationTwo
            pageCapacity={itemsPerPage}
            data={savedProperties}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
