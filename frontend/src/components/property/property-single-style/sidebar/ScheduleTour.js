'use client';
import React, { use, useState } from "react";
import { sessionStore } from "@/store/session";

const ScheduleTour = ({property}) => {

  const user = sessionStore((state) => state.session);

  const tabs = [
    {
      id: "inperson",
      label: "In Person",
    },
    {
      id: "videochat",
      label: "Video Chat",
    },
  ];

  var [name, setName] = useState("");
  var [phone, setPhone] = useState("");
  var [email, setEmail] = useState("");
  var [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="ps-navtab">

      <div className="tab-content" id="pills-tabContent">
        {tabs.map((tab) => (
          <div
            className={`tab-pane fade${
              tab.id === "inperson" ? " show active" : ""
            }`}
            id={`pills-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`pills-${tab.id}-tab`}
            key={tab.id}
          >
            <form className="form-style1"
            onSubmit={handleFormSubmit}
            >
              <div className="row">

                <div className="col-lg-12">
                  <div className="mb20">
                    <input
                      type="text"
                      className="form-control"
                      value={user?.firstName && user?.firstName + " " + user?.lastName}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="mb20">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-md-12">
                  <div className="mb20">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={user?.email}
                      required
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-md-12">
                  <div className="mb10">
                    <textarea
                      cols={30}
                      rows={4}
                      placeholder="Enter Your Messages"
                      defaultValue={`I am interested in this ${property.property_type} at ${property.prpty_location}`}
                    />
                  </div>
                </div>
                {/* End .col-12 */}

                <div className="col-md-12">
                  <div className="d-grid">
                    <button type="submit" className="ud-btn btn-thm">
                      Send message
                      <i className="fal fa-arrow-right-long" />
                    </button>
                  </div>
                </div>
                {/* End .col-12 */}
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTour;