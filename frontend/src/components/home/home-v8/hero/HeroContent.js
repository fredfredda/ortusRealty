"use client";
import React, { useState } from "react";
import FilterItems from "./FilterItems";
import { useRouter } from "next/navigation";

const HeroContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("for sale");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "for sale", label: "Buy" },
    { id: "renting", label: "Rent" },
    { id: "investing", label: "Invest" },
  ];

  const [propertyTypes, setPropertyTypes] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState("All Provinces");
  const [squirefeet, setSquirefeet] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handlepropertyTypes = (elm) => {
    setPropertyTypes(elm);
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
    activeTab,
    handlepropertyTypes,
    handlepriceRange,
    handlelocation,
    handlesquirefeet,
    priceRange,
    propertyTypes,
    resetFilter,

    location,
    squirefeet,
    setPropertyTypes,
    setSearchQuery,
  };

  return (
    <div className="advance-search-tab mt60 mt30-lg mx-auto">
      <ul className="nav nav-tabs p-0 m-0 border-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
            key={tab.id}
          >
            <div className="advance-content-style1 at-home8">
              <div className="row">
                <FilterItems filterFunctions={filterFunctions}/>

                <div className="col-md-12">
                  <div className="d-grid">
                    <button
                      className="ud-btn btn-dark"
                      type="button"
                      onClick={() => router.push(`/explore?search=${searchQuery}&propertyType=${propertyTypes}&saleType=${activeTab}&province=${location}&priceRange=${priceRange}&sizeRange=${squirefeet}`)}
                    >
                      <span className="flaticon-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
