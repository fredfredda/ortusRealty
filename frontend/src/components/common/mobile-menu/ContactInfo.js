import React from "react";

const ContactInfo = () => {
  const contactInfo = [
      {
        id: 1,
        title: "Free Customer Care",
        phone: "+257 79 87 65 43",
        phoneHref: "tel:+25779876543", // Change this to use "tel" URI scheme
      },
      {
        id: 2,
        title: "Need Live Support?",
        email: "ortusrealty@ortus.com",
        emailHref: "mailto:ortusrealty@ortus.com",
      },
  ];

  return (
    <>
      {contactInfo.map((info) => (
        <div className="col-auto" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            {info.phone && (
              <h6 className="info-phone dark-color">
                <a href={info.phoneHref}>{info.phone}</a>
              </h6>
            )}
            {info.email && (
              <h6 className="info-mail dark-color">
                <a href={info.emailHref}>{info.email}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
