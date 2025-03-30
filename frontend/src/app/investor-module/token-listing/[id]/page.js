import Header from "@/components/home/home-v8/Header";
import MobileMenu from "@/components/common/mobile-menu";
import HomeValueChart from "@/components/property/property-single-style/common1/HomeValueChart";
import PropertyViews from "@/components/investor/dashboard-home/property-view";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import TokenListing from "@/components/property/dashboard/dashboard-profile/TokenListing";
import RequestTokensForm from "@/components/property/dashboard/dashboard-profile/RequestTokensForm";

export const metadata = {
  title: "Dashboard My Favourites || Homez - Real Estate NextJS Template",
};

const DashboardMyFavourites = () => {
  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
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
                    <h2>Token Listing Details</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <TokenListing />

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Request Tokens</h4>
                      <RequestTokensForm />
                    </div>

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <div className="row">
                    <PropertyViews />
                  </div>
                </div>
                {/* End .ps-widget */}

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Tokens Valuation History</h4>
                  <div className="row">
                    <HomeValueChart />
                  </div>
                </div>
                
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMyFavourites;
