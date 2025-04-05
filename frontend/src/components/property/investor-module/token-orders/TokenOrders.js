"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import ImageKit from "@/components/common/ImageKit";
import formatMoney from "@/utilis/FormatMoney";

const TokenOrders = () => {
  const [tokenOrders, setTokenOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = useRef(false);

  const fetchTokenOrders = async () => {
    if (fetchOrders.current === true) return;
    setLoading(true);
    fetchOrders.current = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/token-orders`,
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
        console.error("Error Fetching Tks Orders: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else if (data.orders) {
        setTokenOrders((prev) => [...prev, ...data.orders]);
      }
    } catch (error) {
      console.error("Error fetching Tks orders: ", error);
      toast.error("Error fetching Tks orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenOrders();
  }, []);

  return (
    <>
      {tokenOrders.length === 0 ? (
        <p className="text-center fz20">No items available.</p>
      ) : (
        <>
          {tokenOrders.map((order, index) => (
            <div key={index} className="listing-style1 listing-type">
              <div className="col-xl-5 mb15">
                <p className="fz20 fwb mb5">Project Info</p>
                <div className="row project-info mb15">
                  <div className="list-thumb">
                    <ImageKit
                      width={382}
                      height={248}
                      className="w-100 h-100 cover"
                      pathName={order.images.split(",")[0]}
                      transformation={[{ quality: 80 }]}
                      loading="lazy"
                      alt="listings"
                    />
                    <div className="sale-sticker-wrap">
                      {order.is_featured && (
                        <div className="list-tag fz12">
                          <span className="flaticon-electricity me-2" />
                          FEATURED
                        </div>
                      )}
                    </div>
                    <div className="list-price">
                      Value: Bif {formatMoney(order.prpty_price)}
                    </div>
                  </div>

                  <div className="list-content">
                    <h6 className="list-title">
                      <Link href={`/development-project/${order.development_project_id}`}>
                        {order.prpty_name}
                      </Link>
                    </h6>
                    <p className="list-text">{order.prpty_location}</p>
                    <p className="list-text2">
                      Launching date: {order.launching_date.split("T")[0]}
                    </p>
                    <p className="list-text2">
                      Estimated Finishing date:{" "}
                      {order.estimated_finishing_date.split("T")[0]}
                    </p>
                    <p className="list-text2">
                      Total TKs: {order.total_tokens}
                    </p>
                    <Link
                      href={`/development-project/${order.development_project_id}`}
                      className="fwb"
                    >
                      View project details {">>"}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-xl-5">
                <p className="fz20 fwb mb0">Order Info</p>
                <div className="list-content token-order-info">
                  <p className="list-text2">
                    Num of Tks: {order.num_of_tokens}
                  </p>
                  <p className="list-text2">
                    Tokens Rating: {order.token_rating}
                  </p>
                  <p className="list-text2">
                    Date of order: {order.created_at.split("T")[0]}
                  </p>
                  <p className="list-text2">
                    Order status: {order.token_order_status}
                  </p>
                </div>
                {/* </div> */}
              </div>
            </div>
          ))}

          {loading && <p className="text-center fz17">A moment please...</p>}
        </>
      )}
    </>
  );
};

export default TokenOrders;
