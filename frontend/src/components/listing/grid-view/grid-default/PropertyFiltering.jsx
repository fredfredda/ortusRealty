"use client";

import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import { useSearchParams } from "next/navigation";

export default function PropertyFiltering() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const saletype = searchParams.get("saleType");
  const propertyType = searchParams.get("propertyType");
  const price = searchParams.get("priceRange");
  const province = searchParams.get("province");
  const sizeRange = searchParams.get("sizeRange");

  const [listingStatus, setListingStatus] = useState(saletype || "");
  const [propertyTypes, setPropertyTypes] = useState(propertyType || "");
  const [priceRange, setPriceRange] = useState(price || "");
  const [location, setLocation] = useState(province || "All Provinces");
  const [squirefeet, setSquirefeet] = useState(sizeRange || "");
  const [searchQuery, setSearchQuery] = useState(search || "");

  const [filteredData, setFilteredData] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Default");

  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);

  const [pageContentTrac, setPageContentTrac] = useState([]);

  const resetFilter = () => {
    setListingStatus("");
    setPropertyTypes("");
    setPriceRange("");
    setLocation("All Provinces");
    setSquirefeet("");
    setSearchQuery("");
    setCurrentSortingOption("Default");
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });
  };

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre == elm ? "All" : elm));
  };

  const handlepropertyTypes = (elm) => {
    setPropertyTypes((pre) => (pre == elm ? "All" : elm));
  };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };
  const handlelocation = (elm) => {
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };
  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlelocation,
    handlesquirefeet,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,

    location,
    squirefeet,
    setPropertyTypes,
    setSearchQuery,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/properties?search=${searchQuery}&propertyType=${propertyTypes}&saleType=${listingStatus}&province=${
            location === "All Provinces" ? "" : location
          }&priceRange=${
            priceRange === "" ? "50000-1000000000" : priceRange
          }&sizeRange=${squirefeet === "" ? "100-10000" : squirefeet}`
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          setFilteredData(data.properties);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [
    listingStatus,
    propertyTypes,
    location,
    priceRange,
    squirefeet,
    searchQuery,
    searchParams,
  ]);

  
  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 8, pageNumber * 8)
    );
    setPageContentTrac([
      (pageNumber - 1) * 8 + 1,
      pageNumber * 8,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  const sortListings = (listings) => {
    let i = 0;
    while (i < listings.length - 1) {
      for (let j = 0; j < listings.length - 1; j++) {
        let temp = listings[j];
        if (
          Number(listings[j].prpty_price) > Number(listings[j + 1].prpty_price)
        ) {
          listings[j] = listings[j + 1];
          listings[j + 1] = temp;
        }
      }
      i++;
    }
    return listings;
  };

  useEffect(() => {
    let listings = [...filteredData];
    if (currentSortingOption === "Price Low to High") {
      listings = sortListings(listings);
    } else if (currentSortingOption === "Price High to Low") {
      listings = sortListings(listings).reverse();
    }
    setSortedFilteredData(listings);
  }, [currentSortingOption, filteredData]);

  return (
    <section className="pt0 pb90">
      <div className="container">
        <div className="row gx-xl-5">
          <div className="col-lg-4 d-none d-lg-block">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
          {/* End .col-lg-4 */}

          {/* start mobile filter sidebar */}
          <div
            className="offcanvas offcanvas-start p-0"
            tabIndex="-1"
            id="listingSidebarFilter"
            aria-labelledby="listingSidebarFilterLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
                Listing Filter
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body p-0">
              <ListingSidebar filterFunctions={filterFunctions} />
            </div>
          </div>
          {/* End mobile filter sidebar */}

          <div className="col-lg-8">
            <div className="row align-items-center mb20">
              <TopFilterBar
                pageContentTrac={pageContentTrac}
                colstyle={colstyle}
                setColstyle={setColstyle}
                setCurrentSortingOption={setCurrentSortingOption}
              />
            </div>
            {/* End TopFilterBar */}

            <div className="row mt15">
              <FeaturedListings colstyle={colstyle} data={pageItems} />
            </div>
            {/* End .row */}

            <div className="row">
              <PaginationTwo
                pageCapacity={8}
                data={sortedFilteredData}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </div>
            {/* End .row */}
          </div>
          {/* End .col-lg-8 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
