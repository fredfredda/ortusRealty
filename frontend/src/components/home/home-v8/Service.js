import React from "react";

const services = [
  {
    icon: "flaticon-security",
    title: "Property Listings",
    text: "We provide detailed property listings to help you find the best properties",
  },
  {
    icon: "flaticon-keywording",
    title: "Investment Opportunitites",
    text: "We connect you with lucrative investment opportunities in your prefered location",
  },
  {
    icon: "flaticon-investment",
    title: "Brokerage Services",
    text: "We provide personalized advice and insights to help you make strategic decisions",
  },
];

const Service = () => {
  return (
    <>
      {services.map((service, index) => (
        <div key={index} className="col-sm-6 col-lg-4">
          <div className="iconbox-style9 default-box-shadow1 bgc-white p40 bdrs12 position-relative mb30">
            <span className={`icon fz40 ${service.icon}`} />
            <h4 className="iconbox-title mt20">{service.title}</h4>
            <p className="text mb-0">{service.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Service;
