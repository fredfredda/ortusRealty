"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/home/home-v8/Header";
import Footer from "@/components/home/home-v8/footer/index";
import MobileMenu from "@/components/common/mobile-menu";
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
import HomeValueChart from "@/components/property/property-single-style/common/HomeValueChart";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import VirtualTour360 from "@/components/property/property-single-style/common/VirtualTour360";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v8/PropertyGallery";
import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import ClipLoader from "react-spinners/ClipLoader";
import Cta from "@/components/home/home-v9/Cta";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

const SingleV8 = ({ params }) => {
  let [isLoading, setIsLoading] = useState(true);
  var [propertyInfo, setPropertyInfo] = useState({});
  let [color, setColor] = useState("#eb6753");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/properties/getproperty/${params.id}`
        );
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          setPropertyInfo((propertyInfo) => ({ ...propertyInfo, ...data }));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

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

                  {propertyInfo.property_type === "home" && (
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Floor Plans</h4>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="accordion-style1 style2">
                            <FloorPlans />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                    <h4 className="title fz17 mb30">Video</h4>
                    <div className="row">
                      <PropertyVideo />
                    </div>
                  </div>

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">360° Virtual Tour</h4>
                    <div className="row">
                      <VirtualTour360 />
                    </div>
                  </div>

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                    <div className="row">
                      <PropertyNearby
                        neighborhoodId={propertyInfo.prpty_nbhd_id}
                      />
                    </div>
                  </div>

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Mortgage Calculator</h4>
                    <div className="row">
                      <MortgageCalculator />
                    </div>
                  </div>

                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Property Value</h4>
                    <div className="row">
                      <HomeValueChart />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="column">
                    <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                      <h4 className="form-title mb5">Inquire About Property</h4>
                      <p className="text"></p>
                      <ScheduleTour property={propertyInfo} />
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
                    <NearbySimilarProperty neighborhoodId={propertyInfo.prpty_nbhd_id} propertyId={propertyInfo.id} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Cta Start */}
      <Cta />
      {/* Cta End */}

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default SingleV8;