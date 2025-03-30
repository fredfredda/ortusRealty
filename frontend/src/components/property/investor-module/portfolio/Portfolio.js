import RecentActivities from "@/components/property/investor-module/portfolio/RecentActivities";
import TopStateBlock from "@/components/property/investor-module/portfolio/TopStateBlock";
import PropertyViews from "@/components/property/investor-module/portfolio/property-view";

const DashboardHome = () => {
  return (
    <>
      <div className="row">
        <TopStateBlock />
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <div className="row">
              <PropertyViews />
            </div>
          </div>
        </div>
        {/* End col-xl-8 */}

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb25">Recent Activities</h4>
            <RecentActivities />
          </div>
        </div>
        {/* End col-xl-4 */}
      </div>
    </>
  );
};

export default DashboardHome;
