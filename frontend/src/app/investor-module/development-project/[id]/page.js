import MobileMenu from "@/components/common/mobile-menu";
import Header from "@/components/home/home-v8/Header";
import DboardMobileNavigation from "@/components/property/investor-module/DboardMobileNavigation";
import Project from "@/components/property/investor-module/development-project-details/Project";
import Footer from "@/components/property/investor-module/Footer";
import SidebarDashboard from "@/components/property/investor-module/SidebarDashboard";

export const metadata = {
  title: "Ortus Realty - Development Project Details",
};

const SingleV1 = ({ params }) => {
  return (
    <>
      <Header />
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

              <Project projectId={params.id} />
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleV1;
