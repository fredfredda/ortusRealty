"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import ImageKit from "@/components/common/ImageKit";
import PaginationTwo from "@/components/listing/PaginationTwo";
import formatMoney from "@/utilis/FormatMoney";

const TokenOrders = () => {
  const [tokenOrders, setTokenOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = useRef(false);

  const [numOfItems, setNumOfItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageItems, setPageItems] = useState([]);
  const itemsPerPage = 5;

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
        setNumOfItems(data.orders.length);
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

  useEffect(() => {
    setPageItems(
      tokenOrders.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
      )
    );
  }, [pageNumber, tokenOrders]);

  return (
    <>
      <table className="table-style1 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Num Of TKs</th>
            <th scope="col">Rating</th>
            <th scope="col">Date of Order</th>
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
            pageItems.map((order) => (
              <tr key={order.id}>
                <th scope="row">
                  <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                    <div className="list-thumb">
                      <ImageKit
                        width={110}
                        height={94}
                        className="w-100"
                        pathName={order.images.split(",")[0]}
                        transformation={[{ quality: 60 }]}
                        loading="lazy"
                        alt="order"
                      />
                    </div>
                    <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                      <div className="h6 list-title">
                        <Link
                          href={`/investor-module/development-project/${order.id}`}
                        >
                          {order.prpty_name.slice(0, 36)}
                          {order.prpty_name.length > 36 && "..."}
                        </Link>
                      </div>
                      <p className="list-text mb-0">{order.prpty_location}</p>
                      <p className="mb-0">
                        Launching date: {order.launching_date.split("T")[0]}
                      </p>
                      <p>
                        Estimated Finishing Date:{" "}
                        {order.estimated_finishing_date.split("T")[0]}
                      </p>
                    </div>
                  </div>
                </th>
                <td className="vam">
                  <h5>{order.num_of_tokens}</h5>
                </td>
                <td className="vam">
                  <h5>{order.token_rating}</h5>
                </td>
                <td className="vam">{order.created_at.split("T")[0]}</td>
                <td className="vam">{order.token_order_status}</td>
                <td className="vam">
                  {order.token_order_status !== "completed" && (
                    <button className="btn btn-white2">cancel</button>
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
          data={tokenOrders}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </>
  );
};

export default TokenOrders;
