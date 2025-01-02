const Faq1 = () => {
  const faqItems = [
    {
      id: "headingOne",
      question: "What is Ortus Realty?",
      answer:
        "Ortus Realty is a company that connects foreign investors and the Burundian diaspora with professional real estate developers and agents. We provide safe and transparent investment opportunities in properties like homes, lands, construction sites, and development projects.",
    },
    {
      id: "headingTwo",
      question: "How does Ortus Realty ensure transparency in investments?",
      answer:
        "We focus on providing investors with detailed property information, historical data, analytics, and professional advice. Additionally, all listed properties are verified for legal compliance, and we assist in navigating the sale and legal proceedings.",
    },
    {
      id: "headingThree",
      question: " How can I partner with Ortus Realty as an agent or developer?",
      answer:
        "You can contact us through our website or visit our office nearest to you. We will guide you through the partnership process and provide you with the necessary tools and resources to list your properties on our platform.",
    },
    {
      id: "headingFour",
      question: "What types of properties can agents or developers list on the platform?",
      answer:
        " You can list homes, land, construction sites, and development projects, provided they are legally owned, conflict-free, and have no ongoing court cases.",
    },
    {
      id: "headingFive",
      question: "Are agents and developers employees of Ortus Realty?",
      answer:
        "No, agents and developers operate independently and are not employees of the company.",
    },
    {
      id: "headingFive",
      question: "Can I list my property on the platform provided I am not a real estate professional?",
      answer:
        "In that case, you can contact us through our website or visit our office nearest to you to submit your property. We will handle the listing ourselves and provide you with the necessary tools and resources to navigate the sale and legal proceedings.",
    },
    {
      id: "headingSix",
      question: "What services does Ortus Realty offer to investors?",
      answer:
        "We provide access to verified property listings, market insights, property analytics, and professional guidance from negotiations to legal proceedings.",
    },
    {
      id: "headingSeven",
      question: "Do you interfere in negotiations between investors and agents?",
      answer:
        "No, negotiations occur directly between the investor and the agent. However, investors can request our professional advice and guidance during this process.",
    },
  ];

  return (
    <div className="accordion" id="accordionExample">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 2 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index + 1}`}
              aria-expanded={index === 2 ? "true" : "false"}
              aria-controls={`collapse${index + 1}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapse${index + 1}`}
            className={`accordion-collapse collapse ${
              index === 2 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq1;
