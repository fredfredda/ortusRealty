import Header from "@/components/home/home-v8/Header";
import Footer from "@/components/home/home-v8/footer/index";
import MobileMenu from "@/components/common/mobile-menu";
import ComapareTable from "@/components/compare/ComapareTable";

export const metadata = {
  title: "Ortus Realty - Compare Properties",
};

const CompareProperties = ({ params }) => {
  const selectedIds = params.id.split("-");
  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      <section className="breadcumb-section3 p-0">
        <div className="container">
          <h2 className="title mt20">Compare Properties</h2>
        </div>
      </section>

      {selectedIds.length <= 3 && selectedIds.length >= 2 ? (
        <section className="our-compare">
          <div className="container">
            <div className="row wow" >
              <div className="col-lg-12">
                <div className="table-style2 table-responsive">
                  <ComapareTable selectedIds={selectedIds} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h5 className="text-center p50">No properties to compare - The number of properties must be 2 or 3</h5>
      )}

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default CompareProperties;
