import Wrapper from "./layout-wrapper/wrapper";
import MobileMenu from "@/components/common/mobile-menu";
import Hero from "@/components/home/home-v8/hero";
import Blog from "@/components/common/Blog";
import Footer from "@/components/home/home-v8/footer";
import Header from "@/components/home/home-v8/Header";
import FindHomeBlock from "@/components/home/home-v6/FindHomeBlock";
import Testimonial from "@/components/home/home-v6/Testimonial";
import ExploreCities from "@/components/home/home-v8/ExploreCities";
import Service from "@/components/home/home-v8/Service";
import FeaturedListings from "@/components/home/home-v6/FeatuerdListings";
import Cta from "@/components/home/home-v9/Cta";
import Link from "next/link";

export const metadata = {
  title: "Ortus Realty",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <>
        {/* Main Header Nav */}
        {/* <Header /> */}
        {/* End Main Header Nav */}

        {/* Mobile Nav  */}
        {/* <MobileMenu /> */}
        {/* End Mobile Nav  */}

        {/* Home Banner Style V1 */}
        <section className="home-banner-style8 p0">
          <div className="home-style8">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <Hero />
              </div>
            </div>
            {/* End .container */}
          </div>
        </section>
        {/* End Home Banner Style V4 */}

        {/* How it works */}
        <section className="pb90 pb30-md">
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
                <div className="about-box2">
                  <h4 className="title">
                    The Easiest Method to Find{" "}
                    <br className="d-none d-xl-block" />
                    Property
                  </h4>
                  <p className="text fz15">
                    Find and invest in homes, land, construsction sites, and
                    development projects in 4 simple steps
                    <br className="d-none d-xl-block" />
                  </p>
                  <Link
                    href="/explore?showFilter=true"
                    className="ud-btn btn-thm"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              {/* End .col-6 */}

              <div className="col-xl-6">
                <div className="row">
                  <FindHomeBlock />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* How it works */}

        {/* Featured Listings */}
        <section className="pt0 pb80 pb30-md">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <div className="main-title">
                  <h2 className="title">Discover Our Featured Listings</h2>
                </div>
              </div>
              {/* End header */}

              <div className="col-auto mb30">
                <div className="row align-items-center justify-content-center">
                  <div className="col-auto">
                    <button className="featured-prev__active swiper_button">
                      <i className="far fa-arrow-left-long" />
                    </button>
                  </div>
                  {/* End prev */}

                  <div className="col-auto">
                    <div className="pagination swiper--pagination featured-pagination__active" />
                  </div>
                  {/* End pagination */}

                  <div className="col-auto">
                    <button className="featured-next__active swiper_button">
                      <i className="far fa-arrow-right-long" />
                    </button>
                  </div>
                  {/* End Next */}
                </div>
                {/* End .col for navigation and pagination */}
              </div>
              {/* End .col for navigation and pagination */}
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-lg-12">
                <div className="feature-listing-slider">
                  <FeaturedListings />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Featured Listings */}

        {/* Property Cities */}
        <section className="pt0 pb90 pb30-md">
          <div className="container">
            <div className="row  justify-content-between align-items-center">
              <div className="col-auto">
                <div className="main-title">
                  <h2 className="title">Explore Categories</h2>
                </div>
              </div>
              {/* End header */}

              <div className="col-auto mb30">
                <div className="row align-items-center justify-content-center">
                  <div className="col-auto">
                    <button className="cities_prev__active swiper_button">
                      <i className="far fa-arrow-left-long" />
                    </button>
                  </div>
                  {/* End prev */}

                  <div className="col-auto">
                    <div className="pagination swiper--pagination cities_pagination__active" />
                  </div>
                  {/* End pagination */}

                  <div className="col-auto">
                    <button className="cities_next__active swiper_button">
                      <i className="far fa-arrow-right-long" />
                    </button>
                  </div>
                  {/* End Next */}
                </div>
              </div>
              {/* End .col for navigation and pagination */}
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-lg-12">
                <div className="property-city-slider">
                  <ExploreCities />
                </div>
              </div>
            </div>
            {/* End .row */}
          </div>
        </section>
        {/* End property cities */}

        {/* CTA Banner */}
        <section className="pt0 pb30-md">
          <div className="cta-banner5 bgc-f7 ms-auto maxw1850 pt100 pt60-lg pb90 pb30-lg position-relative overflow-hidden mx20-lg">
            <div className="container">
              <div className="row">
                <div className="col-md-11 wow">
                  <div className="main-title">
                    <h2 className="title text-capitalize">
                      Let&apos;s find the right selling{" "}
                      <br className="d-none d-md-block" /> option for you
                    </h2>
                    <p className="text">
                      We are all you need to own your next property
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <Service />
              </div>
            </div>
          </div>
        </section>
        {/* End CTA Banner */}

        {/* Explore Blog */}
        <section className="pt0 mb0-md pb50 pb30-md mt50">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="main-title text-start text-md-center">
                  <h2 className="title">From Our Blog</h2>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row">
              <Blog />
            </div>
            {/* End .row */}
          </div>
        </section>
        {/* End Explore Blog */}

        {/* Our Testimonials */}
        <section className="pt0 our-testimonial">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="main-title text-center">
                  <h2>Testimonials</h2>
                  <p className="paragraph">
                    10,000+ happy clients trust us with their real estate needs
                  </p>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="testimonial-style2">
                  <Testimonial />
                </div>
              </div>
            </div>
            {/* End .row */}
          </div>
        </section>

        {/* Our CTA */}
        <Cta />
        {/* Our End CTA */}

        {/* Start Our Footer */}
        <section className="footer-style1 pt60 pb-0">
          <Footer />
        </section>
        {/* End Our Footer */}
      </>
    </Wrapper>
  );
}
