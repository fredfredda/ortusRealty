import Header from "@/components/home/home-v8/Header";
import Footer from "@/components/home/home-v8/footer/index";
import Cta from "@/components/home/home-v9/Cta";
import Partner from "@/components/common/Partner";
import MobileMenu from "@/components/common/mobile-menu";
import Agents from "@/components/pages/about/Agents";
import Features from "@/components/pages/about/Features";
import Mission from "@/components/pages/about/Mission";

export const metadata = {
  title: "Ortus Realty - About",
};

const About = () => {
  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      <section className="breadcumb-section2 p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h1 className="title">About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}

      {/* Our About Area */}
      <section className="our-about pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="mb5"> Who we are </h2>
              <p className="text mb25 fz16">
                <span>Ortus Realty</span> is a trusted bridge connecting foreign
                investors and the Burundian diaspora with professional real
                estate developers and agents. We aim to create a safe,
                transparent, and efficient environment for real estate
                investments in Burundi. We believe in empowering our clients
                with data-driven insights, professional guidance, and unmatched
                access to lucrative investment opportunities.
              </p>
              <h2 className="mb5"> Our Vision </h2>
              <p className="text mb25 fz16">
                To revolutionize the real estate market in Burundi by
                facilitating international investments and fostering
                partnerships that drive economic growth and development.
              </p>
              <h2 className="mb5"> Our Mission </h2>
              <p className="text mb10 fz16">
                <i className="far fa-arrow-right" /> To enable agents and
                developers to expand their reach and increase profitability
                through international exposure.
              </p>
              <p className="text mb10 fz16">
                <i className="far fa-arrow-right" /> To provide investors with
                secure and profitable real estate opportunities.
              </p>
              <p className="text mb25 fz16">
                <i className="far fa-arrow-right" /> To ensure transparency and
                trust by maintaining rigorous legal compliance for all property
                listings.
              </p>
              {/* <div className="row">
                <Mission />
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* End Our About Area */}

      {/* Exclusive Agents */}
      <section className="pb90">
        <div className="container">
          <div className="row  justify-content-center">
            <div className="col-auto">
              <div className="main-title">
                <h2 className="title">Our Exclusive Agents</h2>
              </div>
            </div>
            {/* End header */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <Agents />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Exclusive Agents */}

      {/* Abut intro */}
      <section className="pt30 pb-0">
        <div className="cta-banner3 bgc-f7 mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-5 pl30-md pl15-xs">
                <div className="mb30">
                  <h2 className="title text-capitalize">
                    Why choose Ortus Realty?
                  </h2>
                </div>
                <div className="why-chose-list style2">
                  <Features />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abut intro */}

      {/* Our Partners */}
      <section className="our-partners mt40 mb40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-title text-center">
                <h6>Trusted by the world&apos;s best</h6>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div className="dots_none nav_none">
                <Partner />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Partners */}

      {/* Our CTA */}
      <Cta />
      {/* Our End CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default About;
