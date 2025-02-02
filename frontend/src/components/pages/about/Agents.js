"use client";
import { useEffect, useState } from "react";
import ImageKit from "@/components/common/ImageKit";
import Link from "next/link";
import toast from "react-hot-toast";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const Agents = () => {
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/agents`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.error) {
        console.log(data.error);
        toast.error("Failed to fetch agents");
      } else if (data.agents) {
        setAgents([]);
        setAgents(data.agents);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch agents");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".agent_next__active",
          prevEl: ".agent_prev__active",
        }}
        pagination={{
          el: ".agent_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        autoplay={{ delay: 3000 }} // Set the desired delay for autoplay
      >
        {agents.map((agent, index) => (
          <SwiperSlide key={index}>
            <div className="item" key={index}>
              <Link href={`/agent-single/${agent.id}`}>
                <div className="team-style1">
                  <div className="team-img">
                    <ImageKit
                      pathName={
                        !agent.profile_pic
                          ? "OrtusRealty/agents/agent_avatar.png"
                          : agent.profile_pic
                      }
                      className="w-100 h-100 cover"
                      width={217}
                      height={248}
                      transformation={[{ quality: 80 }]}
                      loading="lazy"
                      alt="agent team"
                    />
                  </div>
                  <div className="team-content pt20">
                    <h6 className="name mb-1">
                      {agent.first_name} {agent.last_name}
                    </h6>
                    <p className="text fz15 mb-0">
                      <i className="far fa-envelope pe-1" />
                      {agent.email}
                    </p>
                    <p className="text fz15 mb-0">
                      <i className="far fa-phone pe-1" />
                      {agent.phone_number}
                    </p>
                    <Link
                      href={`/explore?agentId=${agent.id}`}
                      className="text-decoration-underline fw600"
                    >
                      View Listings
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Agents;
