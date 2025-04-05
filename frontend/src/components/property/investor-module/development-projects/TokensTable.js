import formatMoney from "@/utilis/FormatMoney";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TokensTable = ({ projectId }) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/tokens/${projectId}`,
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
        console.error("Error Fetching The Tks: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else if (data.tokens) {
        setTokens(data.tokens);
      }
    } catch (error) {
      console.error("Error fetching Tks: ", error);
      toast.error("Error fetching Tks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div className="col-xl-7">
      <p className="text-center fz20 fwb mb0">Tks Info</p>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col">Rating</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Estimated return</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <p className="text-center fz17">A moment please...</p>
          ) : (
            tokens.map((token, index) => (
              <tr key={index} className="text-center">
                <th scope="row">{token.token_rating}</th>
                <td>{token.num_of_tokens}</td>
                <td>Bif {formatMoney(token.token_price)}</td>
                <td>{token.estimated_return}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <p className="fz13"><span className="fwb">N.B: </span>Some of these Tks might have been ordered already, and others might be on the exchange. Please Click on <span className="fwb">view project details</span> to get detailed information.</p>
    </div>
  );
};

export default TokensTable;
