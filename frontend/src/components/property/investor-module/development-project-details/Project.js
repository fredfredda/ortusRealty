"use client";
import React, { useState, useRef, useEffect } from "react";
import PropertyDetails from "./PropertyDetails";
import PropertyHeader from "./PropertyHeader";
import ProperytyDescriptions from "./ProperytyDescriptions";
import PropertyGallery from "./PropertyGallery";
import TokensDescription from "./TokensDescription"
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import TokensTable from "../development-projects/TokensTable";
import RecentActivities from "../portfolio/RecentActivities";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

const Project = ({ projectId }) => {
  const [color, setColor] = useState("#eb6753");

  const [projectInfo, setProjectInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProjectInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/development-project/${projectId}`,
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
        console.error("Error Fething Project Info: ", data.error);
        toast.error(
          typeof data.error === "string"
            ? data.error
            : "Error Fething Project Info"
        );
      } else {
        setProjectInfo(data.dvpDetails);
      }
    } catch (error) {
      console.error("Error Fething Project Info: ", error);
      toast.error("Error Fething Project Info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectInfo();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="mt20 mb20">
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="row">
            <PropertyHeader project={projectInfo} />
          </div>

          <div className="row mb30">
            <PropertyGallery images={projectInfo.images} />
          </div>
          {/* End .row */}

          <div className="row wrap">
            <div className="col-12">
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <ProperytyDescriptions
                  description={projectInfo.prpty_description}
                />
                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                  <PropertyDetails property={projectInfo} />
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb10">TKs Description</h4>
                <TokensDescription
                  description={projectInfo.tokens_description_user}
                  totalTokens={projectInfo.total_tokens}
                  minimunTokensToBuy={projectInfo.minimum_tokens_to_buy}
                />
                {/* End property description */}

                <div className="row flex-column mt30">
                    <TokensTable projectId={projectId} />
                  <p>
                    Minimum TKs to buy:{" "}
                    <span className="fwb">
                      {projectInfo.minimum_tokens_to_buy}
                    </span>
                  </p>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  <RecentActivities projectId={projectId} />
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}
          </div>
          {/* End .row */}
        </>
      )}
    </div>
  );
};

export default Project;
