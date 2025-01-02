const Mission = () => {
  const missionData = [
    {
      // icon: "flaticon-garden",
      title: "Our Vision",
      description: "To revolutionize the real estate market in Burundi by facilitating international investments and fostering partnerships that drive economic growth and development.",
    },
    {
      // icon: "flaticon-secure-payment",
      title: "Our Mission",
      description: "Nullam sollicitudin blandit Nullam maximus.",
    },
  ];

  return (
    <>
      {missionData.map((item, index) => (
        <div className="col-sm-6" key={index}>
          <div className="why-chose-list style3">
            <div className="list-one mb30">
              <div className="list-content flex-grow-1">
                <h6 className="mb-1">{item.title}</h6>
                <p className="text mb-0 fz14">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Mission;
