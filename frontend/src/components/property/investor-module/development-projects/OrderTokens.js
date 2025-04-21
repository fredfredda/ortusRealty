import React, { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select"

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

const OrderTokens = ({projectId, ratings }) => {
    const [showOrderTKsForm, setShowOrderTKsForm] = useState(false);
    const [details, setDetails] = useState({projectId, tokenRatingId: null, numOfTokens: null})
    const [loadingOrder, setLoadingOrder] = useState(false)

    const handleConfirmOrder = async () => {
        setLoadingOrder(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/order-tokens`,
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
            console.error("Error confirming your order: ", data.error);
            toast.error(
              typeof data.error === "string"
                ? data.error
                : "Error confirming your order"
            );
          } else if (data.success) {
            toast.success(data.success);
          }
        } catch (error) {
          console.error("Error confirming your order: ", error);
          toast.error("Error confirming your order");
        } finally {
          setLoadingOrder(false);
          setShowOrderTKsForm(false);
        }
      };
  return (
    <>
      {showOrderTKsForm ? (
        <div className="row mt5">
          <div className="col-6 mb-0">
            <div className="">
              <Select
                name="colors"
                options={ratings}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                onChange={(e) => setDetails ( prev => ({...prev, tokenRatingId: e.value}))
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
              onChange={(e) => setDetails ( prev => ({...prev, numOfTokens: parseInt(e.target.value)}))
            }
              required
            />
          </div>
          <div className="row justify-content-center align-items-center mt5 ">
            <input
              className="col-10 btn btn-dark"
              type="submit"
              value={loadingOrder ? "Confirming..." : "Confirm order"}
              onClick={handleConfirmOrder}
              disabled={loadingOrder}
            />

            <div className="col-5 align-items-center text-center">
              <p
                className="curp text-underline"
                onClick={() => setShowOrderTKsForm(false)}
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
            onClick={() => setShowOrderTKsForm(true)}
          >
            Order TKs
          </button>
        </div>
      )}
    </>
  );
};

export default OrderTokens;
