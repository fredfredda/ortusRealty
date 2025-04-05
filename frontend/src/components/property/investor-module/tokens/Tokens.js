"use client";
import React, { useState, useEffect } from "react";
import ImageKit from "@/components/common/ImageKit";
import Link from "next/link";
import toast from "react-hot-toast";
import formatMoney from "@/utilis/FormatMoney";

const MyTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/tokens`,
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
        console.error("Error fetching Tks: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else if (data.tokens) {
        setTokens(data.tokens);
      }
    } catch (error) {
      console.error("Error fetching Tks: ", error);
      toast.error("Error fetching Tks: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    console.log(tokens);
  }, [tokens]);

  return (
    <>
      {loading ? (
        <p className="fz17 text-center">A moment please...</p>
      ) : tokens.length === 0 ? (
        <p className="fz17 text-center">No items available</p>
      ) : (
        tokens.map((token, index) => (
          <div key={index} className="listing-style1 listing-type">
            <div className="col-xl-5 mb15">
              <p className="fz20 fwb mb5">Project Info</p>
              <div className="row project-info mb15">
                <div className="list-thumb">
                  <ImageKit
                    width={382}
                    height={248}
                    className="w-100 h-100 cover"
                    pathName={token.images.split(",")[0]}
                    transformation={[{ quality: 80 }]}
                    loading="lazy"
                    alt="listings"
                  />
                  <div className="sale-sticker-wrap">
                    {token.is_featured && (
                      <div className="list-tag fz12">
                        <span className="flaticon-electricity me-2" />
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="list-price">
                    Value: Bif {formatMoney(token.prpty_price)}
                  </div>
                </div>

                <div className="list-content">
                  <h6 className="list-title">
                    <Link
                      href={`/development-project/${token.development_project_id}`}
                    >
                      {token.prpty_name}
                    </Link>
                  </h6>
                  <p className="list-text">{token.prpty_location}</p>
                  <p className="list-text2">
                    Launching date: {token.launching_date.split("T")[0]}
                  </p>
                  <p className="list-text2">
                    Estimated Finishing date:{" "}
                    {token.estimated_finishing_date.split("T")[0]}
                  </p>
                  <p className="list-text2">Total TKs: {token.total_tokens}</p>
                  <Link
                    href={`/development-project/${token.development_project_id}`}
                    className="fwb"
                  >
                    View project details {">>"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-5">
              <p className="fz20 fwb mb0">Tks Info</p>
              <div className="list-content token-order-info">
                <p className="list-text2">
                  Num of Tokens: {token.num_of_tokens}
                </p>
                <p className="list-text2">
                  Tokens Rating: {token.token_rating}
                </p>
                <p className="list-text2">
                  Estimated Return(in cash): Bif{" "}
                  {formatMoney(token.num_of_tokens * token.estimated_return)}
                </p>
                <p className="list-text2">
                  Tks status: {token.token_status}
                </p>
                <button className="btn btn-dark mt10">List Tks on Exchange</button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default MyTokens;
