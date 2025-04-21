"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";

const ListTokensForm = ({ projectId, tokenRatingId }) => {
  const [showListTKsForm, setShowListTKsForm] = useState(false);
  const [listingTokens, setListingTokens] = useState(false);
  const [numOfTokens, setNumOfTokens] = useState(null);

  const handleListTokens = async () => {
    setListingTokens(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/list-tokens`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            tokenRatingId,
            numOfTokens,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error("Error listing your TKs: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "Error listing your TKs"
        );
      } else if (data.success) {
        toast.success(data.success);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error listing your TKs: ", error);
      toast.error("Error listing your TKs");
    } finally {
      setListingTokens(false);
      setShowListTKsForm(false);
    }
  };
  return (
    <>
      {showListTKsForm ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="col-7">
            <input
              type="number"
              className="form-control"
              placeholder="No TKs"
              onChange={(e) => setNumOfTokens(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="row mt5 justify-content-center align-items-center">
            <button
              className="col-6 btn btn-dark"
              onClick={handleListTokens}
              disabled={listingTokens}
            >
              {listingTokens ? "Listing..." : "List"}
            </button>
            <div
              className="col-5 curp align-items-center btn btn-white3"
              onClick={() => setShowListTKsForm(false)}
              disabled={listingTokens}
            >
              Cancel
            </div>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-dark"
          onClick={() => setShowListTKsForm(true)}
          disabled={listingTokens}
        >
          List TKs
        </button>
      )}
    </>
  );
};

export default ListTokensForm;
