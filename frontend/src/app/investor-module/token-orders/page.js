import Header from "@/components/home/home-v8/Header";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/investor-module/DboardMobileNavigation";
import Footer from "@/components/property/investor-module/Footer";
import SidebarDashboard from "@/components/property/investor-module/SidebarDashboard";
import TokenOrders from "@/components/property/investor-module/token-orders/TokenOrders";

export const metadata = {
  title: "Ortus Realty - Token Orders",
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
                    <h2>Token Orders</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <TokenOrders />
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