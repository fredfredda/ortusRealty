import React from "react";

const accountData = [
  {
    title: "Active",
    balance: "Bif 3,500,000",
    tokenInfo: 
    [
        { rating: "AAA", value: "70" },
        { rating: "AA", value: "70" },
        { rating: "A", value: "70" },
        { rating: "BBB", value: "70" },
        { rating: "BB", value: "70" },
        { rating: "B", value: "70" },
        { rating: "C", value: "70" }
    ],
    projectNum: 10
  },
  {
    title: "Active",
    balance: "Bif 3,500,000",
    tokenInfo: 
    [
        { rating: "AAA", value: "70" },
        { rating: "AA", value: "70" },
        { rating: "A", value: "70" },
        { rating: "BBB", value: "70" },
        { rating: "BB", value: "70" },
        { rating: "B", value: "70" },
        { rating: "C", value: "70" }
    ],
    projectNum: 10
  },
];

const tokensData = [
  {
    propertyName: "Apartment project in Kigobe",
    tokens: [
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "AAA",
      },
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "BBB",
      },
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "CCC",
      },
    ]
  },
  {
    propertyName: "Apartment project in Kigobe",
    tokens: [
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "AAA",
      },
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "BBB",
      },
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "CCC",
      },
    ]
  },
  {
    propertyName: "Apartment project in Kigobe",
    tokens: [
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "AAA",
      },
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "BBB",
      },
      {
        title: "7",
        estimatedReturn: "Bif 3,500,000",
        rating: "CCC",
      },
    ]
  },
];

const TopStateBlock = () => {
  return (
    <>
    <h3 className="text-center">Account Summary</h3>
    <div className="row gap-3 p-0 mb50">
    {accountData.map((data, index) => (
          <div key={index} className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz20">{data.title}</div>
              <div className="title">{data.balance}</div>
                  <p className="text">
                  {data.tokenInfo.map((data, index) => 
                    data.rating + "(" + data.value + ")  "
                  )}
                  </p>
              <p>{data.projectNum} different project(s)</p>
            </div>
          </div>
      ))}
      </div>

    <h3 className="text-center">Active Tokens</h3>
      {tokensData.map((data, index) => (
        <div key={index} className="container p-0"> 
        {/* col-lg-12 */}
          <p className="fz20">{data.propertyName}</p>
          <div className="row gap-3 p-0 mb30">
          {data.tokens.map((data, index) => (
            <div key={index} className="d-flex justify-content-between statistics_funfact">
              <div className="details">
                {/* <div className="text fz25">{data.text}</div> */}
                <div className="title">{data.title}</div>
                <div className="text fz25">Estimated return: <span className="fwb">{data.estimatedReturn}</span></div>
              </div>
              <div className="icon d-flex justify-content-center align-items-center">
                <h4 className="text-center">{data.rating}</h4>
              </div>
            </div>
          ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default TopStateBlock;
