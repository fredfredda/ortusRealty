import React from "react";

const PropertyAddress = ({address}) => {
  const addresses = [
    {
      address: address,
    },
  ];

  return (
    <>
      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${addresses[0].address.split(',')[0]+' Burundi'}&t=m&z=14&output=embed&iwloc=near`}
          title={addresses[0].address}
          aria-label={addresses[0].address}
        />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;