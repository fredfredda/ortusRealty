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

  const [propertyTypes, setPropertyTypes] = useState('home');
  const [location, setLocation] = useState("Bujumbura Mairie");

  const handlepropertyTypes = (elm) => {
    setPropertyTypes(elm);
  };
  const handlelocation = (elm) => {
    setLocation(elm);
  };

  const filterFunctions = {
    activeTab,
    handlepropertyTypes,
    handlelocation,
    propertyTypes,

    location,
    setPropertyTypes,
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
                      onClick={() => router.push(`/explore?propertyType=${propertyTypes}&saleType=${activeTab}&province=${location}`)}
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
