import ImageKit from "@/components/common/ImageKit";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#eb6753",
};

const ContactWithAgent = ({ agentId, setAgentEmail }) => {
  const [agent, setAgent] = useState({});
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#eb6753");

  const fetchAgent = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/agent/${agentId}`
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        toast.error("Failed to fetch agent details");
      } else if (data.agent) {
        setAgent(data.agent);
        setAgentEmail(data.agent.email);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch agent details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, [])
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        {loading === true ? (
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
            <div className="single-img mb30-sm">
              <ImageKit
                width={90}
                height={90}
                transformation={[{ quality: 60 }]}
                className="w90"
                pathName={!agent.profile_pic ? "OrtusRealty/agents/agent_avatar.png" : agent.profile_pic}
                style={{ borderRadius: "20%" }}
                alt="agent image"
              />
            </div>
            <div className="single-contant ml20 ml0-xs">
              <h6 className="title mb-1">{agent.last_name} {agent.first_name}</h6>
              <div className="agent-meta d-md-flex align-items-center">
                <p className="text fz15">
                  <i className="far fa-envelope pe-1" />
                  {agent.email}
                </p>
              </div>
              <div className="agent-meta d-md-flex align-items-center">
                <p className="text fz15">
                  <i className="far fa-phone pe-1" />
                  {agent.phone_number}
                </p>
              </div>
              <Link
                href={`/explore?agentId=${agent.id}`}
                className="text-decoration-underline fw600"
              >
                View Listings
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContactWithAgent;
