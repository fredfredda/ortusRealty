"use client";
import formatMoney from "@/utilis/FormatMoney";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

const RecentActivities = () => {
  const [valuationHistory, setValuationHistory] = useState([]);
  const [loadingValuation, setLoadingValuation] = useState(true);
  const [valuationFetchOffset, setValuationFetchOffset] = useState(0);
  const [moreValuation, setMoreValuation] = useState(false);

  const [priceHistory, setPriceHistory] = useState([]);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [priceFetchOffset, setPriceFetchOffset] = useState(0);
  const [morePrice, setMorePrice] = useState(false);

  const dataLength = 5;
  const fetchValuation = useRef(false);
  const fetchPrice = useRef(false);

  const fetchValuationHistory = async () => {
    if (fetchValuation.current === true) return;
    setLoadingValuation(true);
    fetchValuation.current = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/tokens-valuation-history?offset=${valuationFetchOffset}&dataLength=${dataLength}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.error) {
        console.log("Error fecthing Tks valuation history: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else if (data.valuationHistory) {
        if (data.valuationHistory.length >= dataLength) setMoreValuation(true);
        else setMoreValuation(false);
        setValuationHistory((prev) => [...prev, ...data.valuationHistory]);
        setValuationFetchOffset(valuationFetchOffset + dataLength);
      }
    } catch (error) {
      console.log("Error fetching Tks valuation history: ", error);
      toast.error("Error fetching valuation history");
    } finally {
      setLoadingValuation(false);
    }
  };

  const fetchPriceHistory = async () => {
    if (fetchPrice.current === true) return;
    setLoadingPrice(true);
    fetchPrice.current = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/tokens-price-history?offset=${priceFetchOffset}&dataLength=${dataLength}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.error) {
        console.log("Error fecthing tokens price history: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else if (data.priceHistory) {
        if (data.priceHistory.length >= dataLength) setMorePrice(true);
        else setMorePrice(false);
        setPriceHistory((prev) => [...prev, ...data.priceHistory]);
        setPriceFetchOffset(priceFetchOffset + dataLength);
      }
    } catch (error) {
      console.log("Error fetching tokens price history: ", error);
      toast.error("Error fetching price history");
    } finally {
      setLoadingPrice(false);
    }
  };

  useEffect(() => {
    fetchValuationHistory();
    fetchPriceHistory();
  }, []);

  const handleViewMoreValuation = () => {
    fetchValuation.current = false;
    fetchValuationHistory();
  };

  const handleViewMorePrice = () => {
    fetchPrice.current = false;
    fetchPriceHistory();
  };

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-xl-5 mb15">
        <p className="fz17 fwb">TKs Valuation</p>
        {valuationHistory.map((valuation, index) => (
          <div
            key={index}
            className="recent-activity d-sm-flex align-items-center mb5"
          >
            <i className={`icon me-3 ${valuation.previous_estimated_return < valuation.current_estimated_return ? "fa-solid fa-arrow-up green-bg" : "fa-solid fa-arrow-down"}  flex-shrink-0`}></i>
            <p className="text mb-0 flex-grow-1">
              <Link
                href={`/development-project/${valuation.development_project_id}`}
              >
                {!valuation.previous_estimated_return ? (
                  <>
                    {`${valuation.prpty_name} - ${valuation.token_rating} Tks initiated at `}
                    <span className="fwb">
                      Bif {formatMoney(valuation.current_estimated_return)}
                    </span>
                    {" valuation"}
                  </>
                ) : (
                  <>
                    {`${valuation.prpty_name} ${valuation.token_rating} Tks from `}
                    <span className="fwb">
                      Bif{" "}
                      {formatMoney(valuation.previous_estimated_return || 0)}
                    </span>
                    {" to "}
                    <span className="fwb">
                      Bif {formatMoney(valuation.current_estimated_return)}
                    </span>
                    {" valuation"}
                  </>
                )}
              </Link>
            </p>
          </div>
        ))}

        {loadingValuation && <p className="fz20">A moment please...</p>}

        {moreValuation && (
          <div
            className="d-grid fwb view-more"
            onClick={handleViewMoreValuation}
          >
            View More {">>"}
          </div>
        )}
        {/* )} */}
      </div>

      <div className="col-xl-5 mb15">
        <p className="fz17 fwb">TKs Prices</p>

        {priceHistory.map((price, index) => (
          <div
            key={index}
            className="recent-activity d-sm-flex align-items-center mb5"
          >
            <i className={`icon me-3 ${price.previous_price < price.current_price ? "fa-solid fa-arrow-up" : "fa-solid fa-arrow-down green-bg"}  flex-shrink-0`}></i>
            <p className="text mb-0 flex-grow-1">
              <Link
                href={`development-project/${price.development_project_id}`}
              >
                {!price.previous_price ? (
                  <>
                    {`${price.prpty_name} - ${price.token_rating} Tks initiated at `}
                    <span className="fwb">
                      Bif {formatMoney(price.current_price)}
                    </span>
                  </>
                ) : (
                  <>
                    {`${price.prpty_name} ${price.token_rating} Tks from `}
                    <span className="fwb">
                      Bif {formatMoney(price.previous_price || 0)}
                    </span>
                    {" to "}
                    <span className="fwb">
                      Bif {formatMoney(price.current_price)}
                    </span>
                  </>
                )}
              </Link>
            </p>
          </div>
        ))}

        {loadingPrice && <p className="fz20">A moment please...</p>}

        {morePrice && (
          <div className="d-grid fwb view-more" onClick={handleViewMorePrice}>
            View More {">>"}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
