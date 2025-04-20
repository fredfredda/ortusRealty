"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const SidebarDashboard = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      href: "/portfolio",
      icon: "far fa-file-invoice-dollar",
      text: "Portfolio",
    },
    {
      href: "/development-projects",
      icon: "far fa-chart-tree-map",
      text: "Projects",
    },
    {
      href: "/token-orders",
      icon: "far fa-money-check-pen",
      text: "My TKs Orders",
    },
    {
      href: "/tokens",
      icon: "far fa-coin",
      text: "My TKs",
    },
    {
      href: "/exchange",
      icon: "far fa-coins",
      text: "TKs Exchange",
    },
    {
      href: "/tokens-listings",
      icon: "far fa-money-check-dollar-pen",
      text: "My TKs Listings",
    },
    {
      href: "/received-requests",
      icon: "flaticon-review",
      text: "Received Requests",
    },
    {
      href: "/sent-requests",
      icon: "far fa-money-check-dollar",
      text: "Sent Requests",
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
