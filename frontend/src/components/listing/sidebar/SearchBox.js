
'use client'

import React, { useState } from "react";

const SearchBox = ({filterFunctions}) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="search_area">
      <input
        type="text"
        className="form-control"
        placeholder="What are you looking for?"
        onChange={(e)=> filterFunctions?.setSearchQuery(e.target.value)}
      />
      <label>
          <span className="flaticon-search" />
      </label>

    </div>
  );
};

export default SearchBox;
