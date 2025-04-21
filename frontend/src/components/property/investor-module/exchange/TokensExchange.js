"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import ImageKit from "@/components/common/ImageKit";
import { useEffect, useRef, useState } from "react";
import formatMoney from "@/utilis/FormatMoney";
import RequestTokensForm from "./RequestTokensForm";
import { sessionStore } from "@/store/session";

const TokensExchange = () => {
  const session = sessionStore((state) => state.session);
  const userId = session?.userId;

  const [tokens, setTokens] = useState([]);
  const [loadingTokens, setLoadingTokens] = useState(true);
  const dataLength = 6;
  const [page, setPage] = useState(1);
  const fetchTokensRef = useRef(false);
  const [numOfItems, setNumOfItems] = useState(dataLength);

  const fetchTokensFunc = async () => {
    if (fetchTokensRef.current === true) return;
    setLoadingTokens(true);
    fetchTokensRef.current = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/token-listings?dataLength=${dataLength}&page=${page}`,
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
        console.error("Error fetching auctions: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else if (data.listings) {
        setTokens((prev) => [...prev, ...data.listings]);
        setNumOfItems(data.listings.length);
      }
    } catch (error) {
      console.log("Error fetching auctions: ", error);
      toast.error("Error fetching auctions");
    } finally {
      setLoadingTokens(false);
    }
  };

  useEffect(() => {
    fetchTokensFunc();
  }, [page]);

  const handleScroll = () => {
    if (numOfItems < dataLength) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchTokensRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="row">
      {loadingTokens ? (
        <p className="text-center fz20">A moment please... </p>
      ) : tokens.length === 0 ? (
        <p className="text-center fz20">No items available.</p>
      ) : (
        tokens.map((token) => (
          <div className="col-sm-12 col-lg-6" key={token.id}>
            <div className="listing-style1">
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

                <div className="list-tokens">{token.num_of_tokens} TKs</div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Link
                    href={`/investor-module/development-project/${token.development_project_id}`}
                  >
                    {token.prpty_name}
                  </Link>
                </h6>
                <p className="list-text">{token.prpty_location}</p>
                <p className="list-text2 mb-0">
                  Launching Date: {token.launching_date.split("T")[0]}
                </p>
                <p className="list-text2 mb-0">
                  Estimated Finishing Date:{" "}
                  {token.estimated_finishing_date.split("T")[0]}
                </p>
                <p className="list-text2 mb-0">
                  TKs Projected Revenue: Bif{" "}
                  {formatMoney(token.projected_revenue)}
                </p>
                <p className="list-text2">
                  Property Value: Bif {formatMoney(token.prpty_price)}
                </p>
                {userId !== token.listed_by_id && (
                  <RequestTokensForm listingId={token.id} />
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TokensExchange;
