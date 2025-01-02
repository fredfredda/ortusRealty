const Faq2 = () => {
  const faqItems = [
    {
      id: "headingOne",
      question: "What happens after a sale agreement is reached?",
      answer:
        "The agent records the sale on our platform. We review it to ensure it adheres to our terms. Once approved, we guide the investor through the legal proceedings from start to finish.",
    },
    {
      id: "headingTwo",
      question: "Does Ortus Realty reject sales?",
      answer:
        "Yes, but only if a sale does not adhere to our terms or involves unresolved ownership or legal issues.",
    },
    {
      id: "headingThree",
      question: "What type of guidance does Ortus Realty offer during legal proceedings?",
      answer:
        "We provide expert advice and ensure all necessary legal steps are completed to finalize the transaction and protect both parties.",
    },
    {
      id: "headingFour",
      question: "How do I know the properties listed are legitimate?",
      answer:
        "All properties submitted by agents and developers undergo a rigorous review process. They must have valid legal documents and no ownership conflicts or court cases.",
    },
    {
      id: "headingFive",
      question: "Can Ortus Realty help me with legal proceedings after a purchase?",
      answer:
        "Yes. After a sale agreement is reached, we guide investors through all legal proceedings to ensure the transaction is completed without any issues.",
    },
  ];

  return (
    <div className="accordion" id="accordionExample2">
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
            data-parent="#accordionExample2"
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

export default Faq2;
