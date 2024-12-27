import React from "react";

const ContactMeta = () => {
  const contactInfoList = [
    {
      title: "Free Customer Care",
      phone: "+257 79 87 65 43",
      phoneLink: "tel:+25779876543", // Change this to use "tel" URI scheme
    },
    {
      title: "Need Live Support?",
      mail: "ortusrealty@ortus.com",
      mailLink: "mailto:ortusrealty@ortus.com",
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title">{contact.title}</p>
            {contact.phone && (
              <h6 className="info-phone">
                <a href={contact.phoneLink}>{contact.phone}</a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a href={contact.mailLink}>{contact.mail}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
