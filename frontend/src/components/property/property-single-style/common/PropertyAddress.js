import React from "react";

const PropertyAddress = ({latitude, longitude}) => {

  return (
      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=m&z=14&output=embed&iwloc=near`}
          title={`${latitude}-${longitude}`}
          aria-label={`${latitude}-${longitude}`}
        />
      </div>
  );
};

export default PropertyAddress;