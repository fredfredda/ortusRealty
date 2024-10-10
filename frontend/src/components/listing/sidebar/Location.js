"use client";
import Select from "react-select";

const Location = ({filterFunctions}) => {
  const locationOptions = [
    { value: "All Provinces", label: "All Provinces" },
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

  return (
    <Select
      defaultValue={[locationOptions[0]]}
      name="colors"
      styles={customStyles}
      options={locationOptions}
      value={{value:filterFunctions.location,label:filterFunctions.location}}
      
     
      
      
      
      
      className="select-custom filterSelect"
      classNamePrefix="select"
      onChange={(e)=>filterFunctions?.handlelocation(e.value)}
      required
    />
  );
};

export default Location;
