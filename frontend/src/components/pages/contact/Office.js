import Image from "next/image";
import React from "react";

const Office = () => {
  const offices = [
    {
      id: 1,
      city: "Gitega",
      icon: "/images/icon/paris.svg",
      address: "Mushasha, Avenue Mushasha, Numero X",
      phoneNumber: "+257 79 98 76 54",
    },
    {
      id: 2,
      city: "Bujumbura",
      icon: "/images/icon/london.svg",
      address: "Gihosha, Avenue Gihosha, Numero X",
      phoneNumber: "+257 76 78 90 12",
    },
    {
      id: 3,
      city: "Mwaro",
      icon: "/images/icon/new-york.svg",
      address: "Nyabihanga, Kibungere, Numero X",
      phoneNumber: "+257 79 12 34 56",
    },
    // Add more office objects here...
  ];

  return (
    <>
      {offices.map((office) => (
        <div className="col-sm-6 col-lg-4" key={office.id}>
          <div className="iconbox-style8 text-center">
            <div className="iconbox-content">
              <h4 className="title">{office.city}</h4>
              <p className="text mb-1">{office.address}</p>
              <h6 className="mb10">{office.phoneNumber}</h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Office;
