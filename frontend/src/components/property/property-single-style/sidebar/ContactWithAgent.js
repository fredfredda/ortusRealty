import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactWithAgent = () => {
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-contant ml20 ml0-xs">
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              (920) 012-3421
            </a>
          </div>
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid">
        <Link href="/agent-single/3" className="ud-btn btn-white2">
          Contact Us
          <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    </>
  );
};

export default ContactWithAgent;
