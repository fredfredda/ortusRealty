'use client'

import React from "react";

const TopFilterBar = ({setCurrentSortingOption,setColstyle,colstyle,pageContentTrac}) => {
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            Showing {pageContentTrac[0]}–{pageContentTrac[2] < pageContentTrac[1] ? pageContentTrac[2] : pageContentTrac[1]} of {pageContentTrac[2]} results
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select className="form-select"  onChange={(e)=>setCurrentSortingOption && setCurrentSortingOption(e.target.value)} >
              <option value="Default" >Default</option>
              <option value="Price Low to High" >Price Low to High</option>
              <option value="Price High to Low" >Price High to Low</option>
            </select>
          </div>
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
