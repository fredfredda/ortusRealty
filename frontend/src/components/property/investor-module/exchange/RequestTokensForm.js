import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    };
  },
};

const RequestTokensForm = ({ listingId }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [details, setDetails] = useState({
    listingId,
    projectId: null,
    proposedNumOfTokens: null,
    tokenRatingId: null,
  });
  const [loadingRequest, setLoadingRequest] = useState(false);

  const fetchTokens = async () => {
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
        setTokens(() =>
          data.tokens.map((token) => ({
            value: `${token.development_project_id}-${token.token_rating_id}`,
            label: `${token.token_rating} | ${token.prpty_name.slice(
              0,
              32
            )}.. | ${token.num_of_tokens}`,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching Tks: ", error);
      toast.error("Error fetching Tks: ", error);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleRequestTokens = async () => {
    setLoadingRequest(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/request-tokens`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error("Error sending your bid: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "Error sending your bid"
        );
      } else if (data.success) {
        toast.success(data.success);
      }
    } catch (error) {
      console.error("Error sending your bid: ", error);
      toast.error("Error sending your bid");
    } finally {
      setLoadingRequest(false);
      setShowRequestForm(false);
    }
  };
  return (
    <>
      {showRequestForm ? (
        <div className="row mt5">
          <div className="col-6 mb-0">
            <div className="">
              <Select
                name="colors"
                options={tokens}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    projectId: parseInt(e.value.split("-")[0]),
                    tokenRatingId: parseInt(e.value.split("-")[1]),
                  }))
                }
                required
              />
            </div>
          </div>
          <div className="col-5 mb-0">
            <input
              type="number"
              className="form-control"
              placeholder="No TKs"
              onChange={(e) =>
                setDetails((prev) => ({
                  ...prev,
                  proposedNumOfTokens: parseInt(e.target.value),
                }))
              }
              required
            />
          </div>
          <div className="row justify-content-center align-items-center mt5 ">
            <input
              className="col-10 btn btn-dark"
              type="submit"
              value={loadingRequest ? "Bidding..." : "Bid"}
              onClick={handleRequestTokens}
              disabled={loadingRequest}
            />

            <div className="col-5 align-items-center text-center">
              <p
                className="curp text-underline"
                onClick={() => setShowRequestForm(false)}
                disabled={loadingRequest}
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt5">
          <button
            className="btn btn-dark"
            onClick={() => setShowRequestForm(true)}
            disabled={loadingRequest}
          >
            Bid For TKs
          </button>
        </div>
      )}
    </>
  );
};

export default RequestTokensForm;
