// "use client";
import Header from "@/components/home/home-v8/Header";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import EnergyClass from "@/components/property/property-single-style/common1/EnergyClass";
import FloorPlans from "@/components/property/property-single-style/common1/FloorPlans";
import HomeValueChart from "@/components/property/property-single-style/common1/HomeValueChart";
import InfoWithForm from "@/components/property/property-single-style/common1/more-info";
import OverView from "@/components/property/property-single-style/common1/OverView";
import PropertyDetails from "@/components/property/property-single-style/common1/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common1/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/common1/PropertyHeader";
import PropertyNearby from "@/components/property/property-single-style/common1/PropertyNearby";
import PropertyVideo from "@/components/property/property-single-style/common1/PropertyVideo";
import PropertyViews from "@/components/property/property-single-style/common1/property-view";
import ProperytyDescriptions from "@/components/property/property-single-style/common1/ProperytyDescriptions";
import ReviewBoxForm from "@/components/property/property-single-style/common1/ReviewBoxForm";
import VirtualTour360 from "@/components/property/property-single-style/common1/VirtualTour360";
import AllReviews from "@/components/property/property-single-style/common1/reviews";
import React from "react";
import MortgageCalculator from "@/components/property/property-single-style/common1/MortgageCalculator";
import WalkScore from "@/components/property/property-single-style/common1/WalkScore";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import TokensDescription from "@/components/property/property-single-style/common1/TokensDescription";
import TokensTable from "@/components/property/property-single-style/common1/TokensTable";

export const metadata = {
  title: "Property Single V1 || Homez - Real Estate NextJS Template",
};

const SingleV1 = ({ params }) => {
  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single V1 */}
      {/* <section className="pt60 pb90 bgc-f7"> */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb10">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Development Project</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="container">
                <div className="row">
                  <PropertyHeader id={params.id} />
                </div>

                <div className="row mb30 mt30">
                  <PropertyGallery id={params.id} />
                </div>
                {/* End .row */}

                <div className="row wrap">
                  <div className="col-12">
                    {/* End .ps-widget */}

                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Property Description</h4>
                      <ProperytyDescriptions />
                      {/* End property description */}

                      <h4 className="title fz17 mb30 mt50">Property Details</h4>
                      <div className="row">
                        <PropertyDetails />
                      </div>
                    </div>

                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Tokens Description</h4>
                      <TokensDescription />
                      {/* End property description */}

                      <h4 className="title fz17 mb30 mt50">Tokens OverView</h4>
                      <div className="row">
                        <TokensTable />
                      </div>
                    </div>
                    {/* End .ps-widget */}

                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <div className="row">
                        <PropertyViews />
                      </div>
                    </div>
                    {/* End .ps-widget */}

                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">
                        Tokens Valuation History
                      </h4>
                      <div className="row">
                        <HomeValueChart />
                      </div>
                    </div>
                    {/* End .ps-widget */}

                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Order Tokens</h4>
                      <InfoWithForm />
                    </div>
                    {/* End .ps-widget */}
                  </div>
                  {/* End .col-8 */}
                </div>
                {/* End .row */}
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleV1;
