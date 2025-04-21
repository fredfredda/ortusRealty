"use client";
import React, { useState, useEffect } from "react";
import ImageKit from "@/components/common/ImageKit";
import Link from "next/link";
import toast from "react-hot-toast";
import formatMoney from "@/utilis/FormatMoney";
import PaginationTwo from "@/components/listing/PaginationTwo";
import ListTokensForm from "./ListTokensForm";

const MyTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [numOfItems, setNumOfItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageItems, setPageItems] = useState([]);
  const itemsPerPage = 5;

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
    setPageItems(
      tokens.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
    );
  }, [pageNumber, tokens]);

  return (
    <>
      <table className="table-style1 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Num Of TKs</th>
            <th scope="col">Rating</th>
            <th scope="col">Projected Revenue</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="t-body">
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center fz17">
                A moment please...
              </td>
            </tr>
          ) : pageItems.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center fz17">
                No data to display
              </td>
            </tr>
          ) : (
            pageItems.map((token, index) => (
              <tr key={index}>
                <th scope="row">
                  <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                    <div className="list-thumb">
                      <ImageKit
                        width={110}
                        height={94}
                        className="w-100"
                        pathName={token.images.split(",")[0]}
                        transformation={[{ quality: 60 }]}
                        loading="lazy"
                        alt="token"
                      />
                    </div>
                    <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                      <div className="h6 list-title">
                        <Link
                          href={`/investor-module/development-project/${token.development_project_id}`}
                        >
                          {token.prpty_name.slice(0, 36)}
                          {token.prpty_name.length > 36 && "..."}
                        </Link>
                      </div>
                      <p className="list-text mb-0">{token.prpty_location}</p>
                      <p className="mb-0">
                        Launching date: {token.launching_date.split("T")[0]}
                      </p>
                      <p>
                        Estimated Finishing Date:{" "}
                        {token.estimated_finishing_date.split("T")[0]}
                      </p>
                    </div>
                  </div>
                </th>
                <td className="vam">
                  <h5>{token.num_of_tokens}</h5>
                </td>
                <td className="vam">
                  <h5>{token.token_rating}</h5>
                </td>
                <td className="vam">
                  Bif{" "}
                  {formatMoney(token.estimated_return * token.num_of_tokens)}
                </td>
                <td className="vam">{token.token_status}</td>
                <td className="vam">
                  {token.token_status === "active" && (
                    <ListTokensForm
                      projectId={token.development_project_id}
                      tokenRatingId={token.token_rating_id}
                    />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt30">
        <PaginationTwo
          pageCapacity={itemsPerPage}
          data={tokens}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </>
  );
};

export default MyTokens;
