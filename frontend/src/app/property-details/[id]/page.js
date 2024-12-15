import Header from "@/components/home/home-v8/Header";
import Footer from "@/components/home/home-v8/footer/index";
import MobileMenu from "@/components/common/mobile-menu";
import Cta from "@/components/home/home-v9/Cta";
import Property from "@/components/property/property-single-style/Property";

export const metadata = {
  title: "Ortus Realty - Property Details",
};

const SingleV8 = ({ params }) => {

  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      <Property id={params.id} />

      {/* Cta Start */}
      <Cta />
      {/* Cta End */}

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default SingleV8;
