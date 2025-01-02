import React from "react";
import Footer from "@/components/home/home-v8/footer";
import Header from "@/components/home/home-v8/Header";
import MobileMenu from "@/components/common/mobile-menu";
import ChangePasswordForm from "@/components/property/dashboard/dashboard-profile/ChangePasswordForm";
import PersonalInfo from "@/components/property/dashboard/dashboard-profile/PersonalInfo";

export const metadata = {
  title: "Ortus Realty - Profile",
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
                <h2 className="title">My Profile</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <div className="col-lg-12">
              <PersonalInfo />
            </div>
            {/* End PersonalInfo */}
          </div>
          {/* End .ps-widget */}

          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Change password</h4>
            <ChangePasswordForm />
          </div>
          {/* End .ps-widget */}
        </div>
        {/* End .row */}
      </div>
      {/* End .dashboard__content */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default GridFull3Col;