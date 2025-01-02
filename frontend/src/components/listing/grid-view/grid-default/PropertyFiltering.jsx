"use client";

import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import { useSearchParams } from "next/navigation";
import sortListings from "@/utilis/SortListings";
import { ClipLoader } from "react-spinners";

export default function PropertyFiltering() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const saletype = searchParams.get("saleType");
  const propertyType = searchParams.get("propertyType");
  const price = searchParams.get("priceRange");
  const province = searchParams.get("province");
  const sizeRange = searchParams.get("sizeRange");
  const showFilter = searchParams.get("showFilter") || "false";
  const agentId = searchParams.get("agentId");

  const [listingStatus, setListingStatus] = useState(saletype || "");
  const [propertyTypes, setPropertyTypes] = useState(propertyType || "");
  const [priceRange, setPriceRange] = useState(price || "");
  const [location, setLocation] = useState(province || "All Provinces");
  const [squirefeet, setSquirefeet] = useState(sizeRange || "");
  const [searchQuery, setSearchQuery] = useState(search || "");

  const [properties, setProperties] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Default");

  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);

  const [pageContentTrac, setPageContentTrac] = useState([]);

  const itemsPerPage = 6;

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
          `${
            process.env.NEXT_PUBLIC_BACKEND_ENDPOINT
          }/api/properties?search=${searchQuery}&propertyType=${propertyTypes}&saleType=${listingStatus}&province=${
            location === "All Provinces" ? "" : location
          }&priceRange=${
            priceRange === "" ? "0-1000000000" : priceRange
          }&sizeRange=${squirefeet === "" ? "0-10000" : squirefeet}${
            agentId === null || agentId === undefined || agentId === ""
              ? ""
              : `&agentId=${agentId}`
          }`
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          toast.error(
            typeof data.error === "string" ? data.error : "An error occured"
          );
        } else {
          setProperties(data.properties);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occured");
      }
    };
    fetchData();
  }, []);

  const filterProperties = (
    allProperties,
    propertyType,
    saleType,
    province,
    priceRange,
    sizeRange,
    search
  ) => {
    // filter by search input
    let propertiesByName = allProperties.filter((property) =>
      property["prpty_name"].toLowerCase().includes(search.toLowerCase() || "")
    );
    // filter by property type
    let propertiesByType = propertiesByName.filter((property) =>
      property["property_type"].includes(propertyType || "")
    );
    // filter by sale type
    let propertiesBySaleType = propertiesByType.filter((property) =>
      property["saletype_name"].includes(saleType || "")
    );
    // filter by province
    let propertiesByProvince = propertiesBySaleType.filter((property) =>
      property["prvc_name"].includes(
        province === "All Provinces" ? "" : province || ""
      )
    );
    // price and size formatting
    let priceRange_ = !priceRange ? "0-1000000000" : priceRange;
    let sizeRange_ = !sizeRange ? "0-10000" : sizeRange;
    let minPrice = priceRange_.split("-")[0];
    let maxPrice = priceRange_.split("-")[1];
    let minSize = sizeRange_.split("-")[0];
    let maxSize = sizeRange_.split("-")[1];
    // filter by price
    let propertiesByPrice = propertiesByProvince.filter(
      (property) =>
        Number(property["prpty_price"]) >= Number(minPrice) &&
        Number(property["prpty_price"]) <= Number(maxPrice)
    );
    // filter by size
    let propertiesBySize = propertiesByPrice.filter(
      (property) =>
        Number(property["prpty_size"]) >= Number(minSize) &&
        Number(property["prpty_size"]) <= Number(maxSize)
    );

    return propertiesBySize;
  };

  useEffect(() => {
    let data = filterProperties(
      properties,
      propertyTypes,
      listingStatus,
      location,
      priceRange,
      squirefeet,
      searchQuery
    );
    setFilteredData(data);
    setPageNumber(1);
  }, [
    properties,
    listingStatus,
    propertyTypes,
    priceRange,
    location,
    squirefeet,
    searchQuery,
  ]);

  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
      )
    );
    setPageContentTrac([
      (pageNumber - 1) * itemsPerPage + 1,
      pageNumber * itemsPerPage,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  useEffect(() => {
    let listings = [...filteredData];
    if (currentSortingOption === "Price Low to High") {
      listings = sortListings(listings, "prpty_price");
    } else if (currentSortingOption === "Price High to Low") {
      listings = sortListings(listings, "prpty_price").reverse();
    }
    setSortedFilteredData(listings);
  }, [currentSortingOption, filteredData]);

  return (
      <section className="pt0 pb90">
        <div className="container">
          <div className="row gx-xl-5">
            {showFilter === "true" && (
              <>
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
                    <h5
                      className="offcanvas-title"
                      id="listingSidebarFilterLabel"
                    >
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
              </>
            )}

            <div className={showFilter === "true" ? "col-lg-8" : "col-lg-12"}>
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
                <FeaturedListings
                  colstyle={colstyle}
                  data={pageItems}
                  showFilter={showFilter || "false"}
                />
              </div>
              {/* End .row */}

              <div className="row">
                <PaginationTwo
                  pageCapacity={itemsPerPage}
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
