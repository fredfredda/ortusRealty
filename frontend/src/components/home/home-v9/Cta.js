import Link from "next/link";
import React from "react";

const Cta = () => {
  return (
    <section
      className="our-cta pt90 pb90 pt60-md pb60-md"
      data-aos="fade"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-xl-6">
            <div className="cta-style3">
              <h2 className="cta-title">Become a Real Estate Agent</h2>
              <p className="cta-text mb25">
                We only work with the best companies around the globe to survey
              </p>
              <Link href="/contact" className="ud-btn btn-thm">
                Get In Touch
              </Link>
            </div>
          </div>
          {/* End .col-lg-7 */}
        </div>
      </div>
    </section>
  );
};

export default Cta;
