"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const SidebarDashboard = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      href: "/portfolio",
      icon: "flaticon-discovery",
      text: "Portfolio",
    },
    {
      href: "/development-projects",
      icon: "flaticon-chat-1",
      text: "Development Projects",
    },
    {
      href: "/token-orders",
      icon: "flaticon-new-tab",
      text: "My Token Orders",
    },
    {
      href: "/tokens",
      icon: "flaticon-home",
      text: "My Tokens",
    },
    {
      href: "/exchange",
      icon: "flaticon-like",
      text: "Tokens Exchange",
    },
    {
      href: "/tokens-listings",
      icon: "flaticon-search-2",
      text: "My Tokens Listings",
    },
    {
      href: "/received-requests",
      icon: "flaticon-review",
      text: "Received Requests",
    },
    {
      href: "/sent-requests",
      icon: "flaticon-protection",
      text: "Sent Requests",
    },
    {
      href: "/logout",
      icon: "flaticon-user",
      text: "Logout",
    }
  ];

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((item, index) => (
              <div key={index} className="sidebar_list_item">
                <Link
                  href={"/investor-module" + item.href}
                  className={`items-center   ${
                    pathname == "/investor-module" + item.href ? "-is-active" : ""
                  } `}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
      </div>
  );
};

export default SidebarDashboard;
