import React from "react";

const PropertyFeaturesAminites = ({internalFeatures, externalFeatures}) => {
  const featuresAmenitiesData = [
    internalFeatures.split(','),
    externalFeatures.split(','),
  ];

  return (
    <>
      <h4 className="title fz17 mt15">
        Internal Features
      </h4>
      {featuresAmenitiesData.map((row, rowIndex) => (
        <div key={rowIndex} className="col-sm-6 col-md-4">
          <div className="pd-list">
            {row.map((item, index) => (
              <p key={index} className="text mb10">
                <i className="fas fa-circle fz6 align-middle pe-2" />
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
      <h4 className="title fz17 mt15">
        External Features
      </h4>
      {featuresAmenitiesData.map((row, rowIndex) => (
        <div key={rowIndex} className="col-sm-6 col-md-4">
          <div className="pd-list">
            {row.map((item, index) => (
              <p key={index} className="text mb10">
                <i className="fas fa-circle fz6 align-middle pe-2" />
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertyFeaturesAminites;