"use client";
import React, { useEffect, useState } from "react";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v8/PropertyGallery";
import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
import ClipLoader from "react-spinners/ClipLoader";
import PropertyAddress from "./common/PropertyAddress";
import toast from "react-hot-toast";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

const Property = ({ id }) => {
  let [isLoading, setIsLoading] = useState(true);
  const [propertyInfo, setPropertyInfo] = useState({});
  let [color, setColor] = useState("#eb6753");
  const [agentEmail, setAgentEmail] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/getproperty/${id}`
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          toast.error(typeof data.error === 'string' ? data.error.toString() : "An error occurred");
        } else {
          setPropertyInfo((prev) => ({ ...prev, ...data }));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="mt20 mb20">
          <ClipLoader
            color={color}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <section className="pt60 pb60">
            <div className="container">
              <div className="row">
                <PropertyHeader property={propertyInfo} />
              </div>

              <PropertyGallery images={propertyInfo.images} />
            </div>
          </section>

          <section className="pt30 pb90 bgc-white">
            <div className="container">
              <div className="row wrap">
                <div className="col-lg-8">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Overview</h4>
                    <div className="row">
                      <OverView property={propertyInfo} />
                    </div>
                  </div>

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Property Description</h4>
                    <ProperytyDescriptions
                      description={propertyInfo.prpty_description}
                    />

                    <h4 className="title fz17 mb30 mt50">Property Details</h4>
                    <div className="row">
                      <PropertyDetails property={propertyInfo} />
                    </div>
                  </div>

                  {propertyInfo.property_type === "home" && (
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">
                        Features &amp; Amenities
                      </h4>
                      <div className="row">
                        <PropertyFeaturesAminites
                          internalFeatures={propertyInfo.internal_features}
                          externalFeatures={propertyInfo.external_features}
                        />
                      </div>
                    </div>
                  )}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb10">View on map</h4>
                    <div className="row">
                      <PropertyAddress latitude={propertyInfo.prpty_latitude} longitude={propertyInfo.prpty_longitude} />
                    </div>
                  </div>
                  {/* End .ps-widget */}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                    <div className="row">
                      <PropertyNearby
                        neighborhoodId={propertyInfo.prpty_nbhd_id}
                      />
                    </div>
                  </div>

                  {/* End .ps-widget */}
                </div>

                <div className="col-lg-4">
                  <div className="column">
                    <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                      <h4 className="form-title mb5">Inquire About Property</h4>
                      <p className="text"></p>
                      {agentEmail && (
                        <ScheduleTour
                          property={propertyInfo}
                          agentEmail={agentEmail}
                        />
                      )}
                    </div>

                    <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                      <div className="widget-wrapper mb-0">
                        <h6 className="title fz17 mb30">Agent Information</h6>
                        <ContactWithAgent
                          agentId={propertyInfo.agent_id}
                          setAgentEmail={setAgentEmail}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt30 align-items-center justify-content-between">
                <div className="col-auto">
                  <div className="main-title">
                    <h2 className="title">Discover Properties Nearby</h2>
                  </div>
                </div>

                <div className="col-auto mb30">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-auto">
                      <button className="featured-prev__active swiper_button">
                        <i className="far fa-arrow-left-long" />
                      </button>
                    </div>

                    <div className="col-auto">
                      <div className="pagination swiper--pagination featured-pagination__active" />
                    </div>

                    <div className="col-auto">
                      <button className="featured-next__active swiper_button">
                        <i className="far fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="property-city-slider">
                    <NearbySimilarProperty
                      neighborhoodId={propertyInfo.prpty_nbhd_id}
                      propertyId={propertyInfo.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Property;
