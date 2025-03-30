"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// const accountData = [
//   {
//     title: "Active Investments",
//     balance: "Bif 3,500,000",
//     tokenInfo:
//     [
//         { rating: "AAA", value: "70" },
//         { rating: "AA", value: "70" },
//         { rating: "A", value: "70" },
//         { rating: "BBB", value: "70" },
//         { rating: "BB", value: "70" },
//         { rating: "B", value: "70" },
//         { rating: "C", value: "70" }
//     ],
//     styleClass: "active-investment",
//     description: "Estimated return of all your active tokens combined",
//   },
//   {
//     title: "Ready For Payout",
//     balance: "Bif 3,500,000",
//     tokenInfo:
//     [
//         { rating: "AAA", value: "70" },
//         { rating: "AA", value: "70" },
//         { rating: "A", value: "70" },
//         { rating: "BBB", value: "70" },
//         { rating: "BB", value: "70" },
//         { rating: "B", value: "70" },
//         { rating: "C", value: "70" }
//     ],
//     styleClass: "ready-for-payout",
//     description: "Return on your investments ready for payout",
//   },
// ];

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
    ],
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
    ],
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
    ],
  },
];

const TopStateBlock = () => {
  const [activeInvestments, setActiveInvestments] = useState({});
  const [readyForPayout, setReadyForPayout] = useState({});

  const fetchAccountData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.error) {
        console.error("Error fetching account data:", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occurred"
        );
      } else {
        setActiveInvestments(data.activeInvestments);
        setReadyForPayout(data.readyForPayout);
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
      toast.error("Error fetching account data");
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  useEffect(() => {
    console.log("Active Investments:", activeInvestments);
    console.log("Ready For Payout:", readyForPayout);
  }, [activeInvestments, readyForPayout]);

  return (
    <>
      <h3 className="text-center">Account Summary</h3>
      <div className="row gap-3 p-0 mb50">
        <div
          className={`d-flex justify-content-between statistics_funfact active-investment`}
        >
          <div className="details">
            <div className={`text fz20`}>Active Investments</div>
            <div className={`title`}>{activeInvestments.balance || "0"}</div>
            <p className="text">
              {activeInvestments?.tokenInfo &&
                activeInvestments.tokenInfo.map(
                  (data, index) => data.rating + "(" + data.value + ")  "
                )}
            </p>
            <p>Estimated return of all your active tokens combined</p>
          </div>
        </div>

        <div
          className={`d-flex justify-content-between statistics_funfact ready-for-payout`}
        >
          <div className="details">
            <div className={`text fz20`}>Ready For Payout</div>
            <div className={`title`}>{readyForPayout.balance || "0"}</div>
            <p className="text">
              {readyForPayout?.tokenInfo &&
                readyForPayout.tokenInfo.map(
                  (data, index) => data.rating + "(" + data.value + ")  "
                )}
            </p>
            <p>Estimated return of all your active tokens combined</p>
          </div>
        </div>
      </div>

      <h3 className="text-center">Active Tokens</h3>
      {tokensData.map((data, index) => (
        <div key={index} className="container p-0">
          {/* col-lg-12 */}
          <p className="fz20">{data.propertyName}</p>
          <div className="row gap-3 p-0 mb30">
            {data.tokens.map((data, index) => (
              <div
                key={index}
                className="d-flex justify-content-between statistics_funfact"
              >
                <div className="details">
                  {/* <div className="text fz25">{data.text}</div> */}
                  <div className="title">{data.title}</div>
                  <div className="text fz25">
                    Estimated return:{" "}
                    <span className="fwb">{data.estimatedReturn}</span>
                  </div>
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
