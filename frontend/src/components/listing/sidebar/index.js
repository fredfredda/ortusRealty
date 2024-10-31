'use client'

import React from "react";
import SearchBox from "./SearchBox";
import ListingStatus from "./ListingStatus";
import PropertyType from "./PropertyType";
import PriceSlider from "./PriceRange";
import Location from "./Location";
import SquareFeet from "./SquareFeet";

const ListingSidebar = ({filterFunctions}) => {
  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper">
        <h6 className="list-title">Find your home</h6>
        <SearchBox filterFunctions={filterFunctions} />
      </div>
      {/* End .widget-wrapper */}
      
      <div className="widget-wrapper advance-feature-modal">
        <h6 className="list-title">Location</h6>
        <div className="form-style2 input-group">
          <Location filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Listing Status</h6>
        <div className="radio-element">
          <ListingStatus filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Property Type</h6>
        <div className="radio-element">
          <PropertyType filterFunctions={filterFunctions} />
        </div>
      </div>
      
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Price Range</h6>
        {/* Range Slider Desktop Version */}
        <div className="radio-element">
          <PriceSlider filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Square Feet</h6>
        <div className="radio-element">
          <SquareFeet filterFunctions={filterFunctions}/>
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="reset-area d-flex align-items-center justify-content-between">
        <div onClick={()=>filterFunctions.resetFilter()} className="reset-button cursor" href="#">
          <span className="flaticon-turn-back" />
          <u>Reset all filters</u>
        </div>
      </div>
    </div>
  );
};

export default ListingSidebar;
