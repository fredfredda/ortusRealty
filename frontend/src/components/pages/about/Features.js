const Features = () => {
  // Define an array of feature objects
  const features = [
    {
      icon: "flaticon-security",
      title: "Verified Properties",
      description:
        "All properties are thoroughly reviewed for legal compliance and ownership clarity.",
    },
    {
      icon: "flaticon-keywording",
      title: "Expert Guidance",
      description:
        "We provide investors with professional advice and assist them through every step of the legal process.",
    },
    {
      icon: "flaticon-investment",
      title: "Global Reach",
      description:
        "We help agents and developers access international investors, maximizing their profit potential.",
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div className="list-one d-flex align-items-start mb30" key={index}>
          <span className={`list-icon flex-shrink-0 ${feature.icon}`} />
          <div className="list-content flex-grow-1 ml20">
            <h6 className="mb-1">{feature.title}</h6>
            <p className="text mb-0 fz15">{feature.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Features;
