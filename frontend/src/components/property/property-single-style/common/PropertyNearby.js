'use client';
import React, { useEffect, useState } from "react";

const PropertyNearby = ({ neighborhoodId }) => {
  const [infrastructures, setInfrastructures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/importantinfrastructure/${neighborhoodId}`
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      } else {
        setInfrastructures(data.importantInfrastructure);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-md-12">
      <div className="navtab-style1">
        <div className="tab-content" id="nav-tabContent">
          {infrastructures.map((item, index) => (
            <div
              key={index}
              className={"tab-pane fade fz15 active show"}
              id={`nav-item${index + 1}`}
              role="tabpanel"
              aria-labelledby={`nav-item${index + 1}-tab`}
            >
              <div
                key={item.id}
                className="nearby d-sm-flex align-items-center mb20"
              >
                <div className="details">
                  <p className="dark-color fw600 mb-0">
                    {item.infrastructure_name}
                  </p>
                  <p className="text mb-0">{item.infrastructure_type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyNearby;