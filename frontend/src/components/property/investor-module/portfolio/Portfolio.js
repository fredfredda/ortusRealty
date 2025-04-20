import RecentActivities from "@/components/property/investor-module/portfolio/RecentActivities";
import TopStateBlock from "@/components/property/investor-module/portfolio/TopStateBlock";
import PropertyViews from "@/components/property/investor-module/portfolio/property-view";

const DashboardHome = () => {
  return (
    <>
      <div className="row mb50">
        <TopStateBlock />
      </div>
      {/* End .row */}

      <div className="row">
        <h4 className="title fz20 mb5 text-center">Recent Activities</h4>
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <RecentActivities />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
