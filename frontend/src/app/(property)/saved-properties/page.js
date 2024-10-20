import Footer from "@/components/home/home-v8/footer";
import Header from "@/components/home/home-v8/Header";
import MobileMenu from "@/components/common/mobile-menu";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";
import React from "react";

export const metadata = {
  title: "Ortus Realty",
};

const GridFull3Col = () => {
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
                <h2 className="title">Saved Properties</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <ProperteyFiltering/>
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default GridFull3Col;
