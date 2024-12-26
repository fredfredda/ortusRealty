"use client";
import React, { useEffect, useState } from "react";
import { sessionStore } from "@/store/session";
import toast from "react-hot-toast";

const ScheduleTour = ({ property, agentEmail }) => {
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

  const defaultMessage = `I am interested in this ${property.property_type} at ${property.prpty_location}`;

  const [inquiry, setInquiry] = useState({
    name: user.firstName + " " + user.lastName || "",
    email: user.email || "",
    phone: "",
    message: defaultMessage || "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !inquiry.name ||
      !inquiry.email ||
      !inquiry.phone ||
      !inquiry.message ||
      !agentEmail
    ) {
      toast.error("Missing required fields");
      return;
    }

    // formData.append("access_key", "54f5dd17-07a1-446e-bcd9-7530017a1a73");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: JSON.stringify({
        ...inquiry,
        agent: agentEmail,
        access_key: "54f5dd17-07a1-446e-bcd9-7530017a1a73"
      }),
    });

    const data = await response.json();

    if (data.success) {
      e.target.reset();
      toast.success(data.message);
    } else {
      console.error("Error", data);
      toast.error(typeof data === "string" ? data : "An error occured");
    }
  };

  return (
    <div className="ps-navtab">
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-inperson"
          role="tabpanel"
          aria-labelledby="pills-inperson-tab"
        >
          <form className="form-style1" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb20">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      user?.firstName && user?.firstName + " " + user?.lastName
                    }
                    disabled={user?.firstName && user?.firstName ? true : false}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    placeholder="Full Name"
                    name="name"
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
                    onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                    placeholder="Phone"
                    name="phone"
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
                    disabled={user?.email ? true : false}
                    onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                    name="email"
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
                    defaultValue={defaultMessage}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    name="message"
                    required
                  />
                </div>
              </div>
              {/* End .col-12 */}

              <div className="col-md-12">
                <div className="d-grid">
                  <button type="submit" className="ud-btn btn-thm">
                    Send message
                  </button>
                </div>
              </div>
              {/* End .col-12 */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTour;
