"use client";
import React, { useEffect, useState, useRef } from "react";
import ImageKit from "@/components/common/ImageKit";
import Link from "next/link";
import toast from "react-hot-toast";
import formatMoney from "@/utilis/FormatMoney";
import TokensTable from "./TokensTable";
import OrderTokens from "./OrderTokens";

const DevelopmentProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const dataLength = 4;
  const [page, setPage] = useState(1);
  const fetchProjectsRef = useRef(false);

  const [ratings, setRatings] = useState([]);

  const fetchProjects = async () => {
    if (fetchProjectsRef.current === true) return;
    setLoadingProjects(true);
    fetchProjectsRef.current = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/investor/development-projects?dataLength=${dataLength}&page=${page}`,
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
        console.error("Error fetching projects: ", data.error);
        toast.error(
          typeof data.error === "string" ? data.error : "An error occured"
        );
      } else if (data.dvpProjects) {
        setProjects((prev) => [...prev, ...data.dvpProjects]);
      }
    } catch (error) {
      console.log("Error fetching projects: ", error);
      toast.error("Error fetching projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchProjectsRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {projects.length === 0 ? (
        <p className="text-center fz20">No items available.</p>
      ) : (
        <>
          {projects.map((project) => (
            <div className="listing-style1 listing-type">
              <div className="col-xl-4">
                <div className="row project-info mb15">
                  <div className="list-thumb">
                    <ImageKit
                      width={382}
                      height={248}
                      className="w-100 h-100 cover"
                      pathName={project.images.split(",")[0]}
                      transformation={[{ quality: 80 }]}
                      loading="lazy"
                      alt="listings"
                    />
                    <div className="sale-sticker-wrap">
                      {project.is_featured && (
                        <div className="list-tag fz12">
                          <span className="flaticon-electricity me-2" />
                          FEATURED
                        </div>
                      )}
                    </div>
                    <div className="list-price">
                      Value: Bif {formatMoney(project.prpty_price)}
                    </div>
                  </div>

                  <div className="list-content">
                    <h6 className="list-title">
                      <Link
                        href={`/investor-module/development-project/${project.id}`}
                      >
                        {project.prpty_name}
                      </Link>
                    </h6>
                    <p className="list-text">{project.prpty_location}</p>
                    <p className="list-text2">
                      Launching date: {project.launching_date.split("T")[0]}
                    </p>
                    <p className="list-text2">
                      Estimated Finishing date:{" "}
                      {project.estimated_finishing_date.split("T")[0]}
                    </p>
                    <p className="list-text2">
                      Total TKs: {project.total_tokens}
                    </p>

                    <Link
                      href={`/investor-module/development-project/${project.id}`}
                      className="fwb"
                    >
                      View project details {">>"}
                    </Link>

                    <OrderTokens
                      projectId={project.id}
                      ratings={ratings}
                    />
                  </div>
                </div>
              </div>

              <TokensTable projectId={project.id} setRatings={setRatings} />
            </div>
          ))}

          {loadingProjects && (
            <p className="text-center fz20">A moment please...</p>
          )}
        </>
      )}
    </>
  );
};

export default DevelopmentProjects;
