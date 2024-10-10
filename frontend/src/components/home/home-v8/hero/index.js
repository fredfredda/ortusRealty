import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <>
      <div className="col-lg-6 col-xl-6">
        <div className="inner-banner-style8">
          <h6 className="hero-sub-title">#1 REAL ESTATE WEBSITE IN BURUNDI</h6>
          <h2 className="hero-title">Finding <span className="hero-property-text">Property</span> is Simple</h2>
          <p className="hero-text fz15">
            Dicover, rent, and invest in premium properties accross Burundi
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-4">
        <HeroContent />
      </div>

    </>
  );
};

export default Hero;
