import Header from "@/components/home/home-v8/Header";
import Footer from "@/components/home/home-v8/footer/index";
import MobileMenu from "@/components/common/mobile-menu";
import React from "react";
import PropertyFiltering from "@/components/listing/grid-view/grid-default/PropertyFiltering";
import Cta from "@/components/home/home-v9/Cta";

export const metadata = {
  title: "Ortus Realty - Explore",
};

const GridDefault = () => {
  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcumb Sections */}
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Explore</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <PropertyFiltering />
      {/* Property Filtering */}

      {/* Start Cta */}
      <Cta />
      {/* End Cta */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default GridDefault;
