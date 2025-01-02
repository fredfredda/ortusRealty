"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import formatMoney from "@/utilis/FormatMoney";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

const ComapareTable = ({ selectedIds }) => {
  const [color, setColor] = useState("#eb6753");
  const [loading, setLoading] = useState(true);

  const [properties, setProperties] = useState([]);

  const [uniqueProperties, setUniqueProperties] = useState([]);

  const [internalFeatures, setInternalFeatures] = useState([]);
  const [externalFeatures, setExternalFeatures] = useState([]);

  const getHomeFeatures = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/homefeatures`
      );
      const data = await response.json();

      if (data.error) {
        console.error(data.error);
        toast.error(
          typeof data.error === "string"
            ? data.error
            : "An error occured"
        );
      } else {
        setInternalFeatures(
          data.internalFeatures.map((feature) => feature.internal_feature)
        );
        setExternalFeatures(
          data.externalFeatures.map((feature) => feature.external_feature)
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured");
    }
  };

  const getProperty_ = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/getproperty/${id}`
      );
      const data = await response.json();

      if (data.error) {
        console.error(data.error);
        toast.error(
          typeof data.error === "string"
            ? data.error
            : "An error occured"
        );
      } else {
        setProperties((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured");
    }
  };

  useEffect(() => {
    setLoading(true);
    selectedIds.forEach((id) => getProperty_(id));
    getHomeFeatures();
    setLoading(false);
  }, []);

  useEffect(() => {
    setUniqueProperties(
      properties.filter(
        (item, index, self) =>
          index == self.findIndex((obj) => obj.id == item.id)
      )
    );
  }, [properties]);

  return (
    <>
      {loading === true ? (
        <div className="mt20 mb20">
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <table className="table table-borderless mb-0">
          <thead className="t-head">
            <tr>
              <th scope="col" />
              {uniqueProperties.map((property) => (
                <th scope="col" key={property.id}>
                  {property.prpty_name}
                </th>
              ))}
            </tr>
          </thead>
          {/* End thead */}

          <tbody className="t-body">
            <tr>
              <th className="text-start" scope="row">
                Price
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>
                  Bif {formatMoney(property.prpty_price)}{" "}
                  {property.saletype_name === "renting" && "/mo"}
                </td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Category
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.category_name}</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Type
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.property_type}</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Sale Type
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.saletype_name}</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Neighborhood
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.nbhd_name}</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Province
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.prvc_name}</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Address
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.prpty_location}</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Size
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.prpty_size} sqft</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Bedrooms
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.num_of_beds || ""}</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Bathrooms{" "}
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.num_of_bathrooms || ""}</td>
              ))}
            </tr>
            {/* End tr */}

            <tr>
              <th className="text-start" scope="row">
                Home Category
              </th>
              {uniqueProperties.map((property) => (
                <td key={property.id}>{property.home_category || ""}</td>
              ))}
            </tr>
            {/* End tr */}

            {internalFeatures.map((feature, index) => (
              <tr key={index}>
                <th className="text-start" scope="row">
                  {feature}
                </th>
                {uniqueProperties.map((property) => (
                  <td key={property.id}>
                    {property.internal_features &&
                      (property.internal_features?.includes(feature) ? (
                        <div className="check_circle">
                          <span className="fas fa-check" />
                        </div>
                      ) : (
                        <div className="check_circle_close">
                          <span className="fas fa-xmark" />
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}

            {externalFeatures.map((feature, index) => (
              <tr key={index}>
                <th className="text-start" scope="row">
                  {feature}
                </th>
                {uniqueProperties.map((property) => (
                  <td key={property.id}>
                    {property.external_features &&
                      (property.external_features?.includes(feature) ? (
                        <div className="check_circle">
                          <span className="fas fa-check" />
                        </div>
                      ) : (
                        <div className="check_circle_close">
                          <span className="fas fa-xmark" />
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* End tbody */}
        </table>
      )}
    </>
  );
};

export default ComapareTable;