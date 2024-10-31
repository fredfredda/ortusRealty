import Header from "@/components/home/home-v8/Header";
import Footer from "@/components/home/home-v8/footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import Office from "@/components/pages/contact/Office";
import Image from "next/image";
import Cta from "@/components/home/home-v9/Cta";
import ImageKit from "@/components/common/ImageKit";

export const metadata = {
  title: "Ortus Realty - Contact",
};

const Contact = () => {
  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Our Contact With Map */}
      <section className="p-0">
        <ImageKit
          className="home8-map contact-page"
          height={600}
          width={1920}
          pathName="contact/img23.jpg"
          title="contact"
          alt="contact"
        />
      </section>
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section>
        <div className="container">
          <div className="row d-flex align-items-end">
            <div className="col-lg-5 position-relative">
              <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                <h4 className="form-title mb25">
                  Have questions? Get in touch!
                </h4>
                <Form />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-5 offset-lg-2">
              <h2 className="mb30 text-capitalize">
                We’d love to hear <br className="d-none d-lg-block" />
                from you.
              </h2>
              <p className="text">
                We are here to answer any question you may have. As a partner of
                corporates, realton has more than 9,000 offices of all sizes and
                all potential of session.
              </p>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form */}

      {/* Visit our Office */}
      <section className="pt0 pb90 pb10-md">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto"
            >
              <div className="main-title text-center">
                <h2 className="title">Visit Our Office</h2>
                <p className="paragraph">
                  Ortus Realty has more than 9,000 offices of all sizes and all
                  potential of session.
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row" >
            <Office />
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Visit our Office */}

      {/* Cta start */}
       <Cta />
      {/* Cta end */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Contact;