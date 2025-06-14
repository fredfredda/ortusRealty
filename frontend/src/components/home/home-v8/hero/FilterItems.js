"use client";
import Select from "react-select";
import { useEffect } from "react";

const FilterItems = ({filterFunctions}) => {

  const catOptions = [
    { value: "land", label: "Lands" },
    { value: "home", label: "Homes" },
    { value: "construction site", label: "Construction sites" },
  ];
  const locationOptions = [
    { value: "Bujumbura Mairie", label: "Bujumbura Mairie" },
    { value: "Gitega", label: "Gitega" },
    { value: "Ngozi", label: "Ngozi" },
    { value: "Muramvya", label: "Muramvya" },
    { value: "Mwaro", label: "Mwaro" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  useEffect(() => {
    if (filterFunctions.activeTab === 'investing') {
      filterFunctions.handlepropertyTypes("development project");
    }
  }, [filterFunctions.activeTab]);

  return (
    <>
    {
      filterFunctions.activeTab !== 'investing' &&
      <div className="col-md-12">
        <div className="bootselect-multiselect mb20">
          <Select
            defaultValue={[catOptions[1]]}
            name="colors"
            options={catOptions}
            styles={customStyles}
            className="text-start with_border"
            classNamePrefix="select"
            onChange={(e)=>filterFunctions?.handlepropertyTypes(e.value)}
            required
            isSearchable={false}
            />
        </div>
      </div>
    }
      {/* End .col-12 */}

      {/* End .col-12 */}
      <div className="col-md-12">
        <div className="bootselect-multiselect mb15">
          <Select
            defaultValue={[locationOptions[0]]}
            name="colors"
            options={locationOptions}
            styles={customStyles}
            className="text-start with_border"
            classNamePrefix="select"
            onChange={(e)=>filterFunctions?.handlelocation(e.value)}
            required
            isSearchable={false}
          />
        </div>
      </div>{" "}
      {/* End .col-12 */}
    </>
  );
};

export default FilterItems;
