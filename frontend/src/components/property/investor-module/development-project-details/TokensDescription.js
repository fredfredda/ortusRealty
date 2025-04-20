import React, { useState} from "react";

const ProperytyDescriptions = ({ description }) => {
  const textLength = description.split("|").length;
  const introText = description.split("|")[0];
  const bodyText = description.split("|").slice(1, textLength);
    const [showMore, setShowMore] = useState(true);
    const handleShowMore = () => {
      setShowMore(!showMore);
    }
  return (
    <>
      <p className="text mb10">{introText}</p>
      <div className="agent-single-accordion">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
              style={{}}
            >
              <div className="accordion-body p-0">
                {bodyText.map((text, index) => (
                  <p key={index} className="text mb-0">{text}</p>
                ))}
              </div>
            </div>
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button p-0 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
                onClick={handleShowMore}
              >
                {showMore ? "Show more" : "Show less"}
              </button>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProperytyDescriptions;
