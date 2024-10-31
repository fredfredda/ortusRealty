"use client";

import React, { useState, useEffect } from "react";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import { savedPropertiesStore } from "@/store/savedProperties";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

export default function ProperteyFiltering() {

  const savedProperties_ = savedPropertiesStore((state) => state.savedProperties);

  const [savedProperties, setSavedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);

  let [color, setColor] = useState("#eb6753");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/savedpropertiesdetails`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          setSavedProperties(data);
        }
      } catch (error) {
        console.error(error);
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
            <FeaturedListings colstyle={colstyle} data={savedProperties} />
          </div>
        )}

        <div className="row">
          <PaginationTwo
            pageCapacity={9}
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
