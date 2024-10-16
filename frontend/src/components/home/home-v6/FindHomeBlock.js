import React from "react";

const FindHomeBlock = () => {
  const blocks = [
    {
      icon: "flaticon-search-1",
      number: "01",
      subtitle: "Explore Listings",
      text: "Use our search tools to browse through properties",
    },
    {
      icon: "flaticon-chat",
      number: "02",
      subtitle: "Choose Your Property",
      text: "Narrow down results based on your preferences",
    },
    {
      icon: "flaticon-bird-house",
      number: "03",
      subtitle: "Inquire",
      text: "Contact us to ask questions or arrange property viewings",
    },
    {
      icon: "flaticon-house-1",
      number: "04",
      subtitle: "Close The Deal",
      text: "Negotiate terms and close deals seamlessly",
    },
  ];

  return (
    <>
      {blocks.map((block, index) => (
        <div className="col-sm-6" key={index}>
          <div className="iconbox-style6">
            <span className={`icon ${block.icon}`} />
            <h3 className="title mb-1">{block.number}</h3>
            <h6 className="subtitle">{block.subtitle}</h6>
            <p className="iconbox-text">{block.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default FindHomeBlock;
