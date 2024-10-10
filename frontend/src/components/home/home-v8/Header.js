"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getSession, handleLogout } from "@/utilis/auth";
import { usePathname } from "next/navigation";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [session, setSession] = useState({});

  const pathname = usePathname();
  const menuItems = [
    {
      title: "MAIN",
      items: [
        {
          icon: "flaticon-discovery",
          text: "Dashboard",
          href: "/dashboard-home",
        },
        {
          icon: "flaticon-chat-1",
          text: "Message",
          href: "/dashboard-message",
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          icon: "flaticon-new-tab",
          text: "Add New Property",
          href: "/dashboard-add-property",
        },
        {
          icon: "flaticon-home",
          text: "My Properties",
          href: "/dashboard-my-properties",
        },
        {
          icon: "flaticon-like",
          text: "My Favorites",
          href: "/dashboard-my-favourites",
        },
        {
          icon: "flaticon-search-2",
          text: "Saved Search",
          href: "/dashboard-saved-search",
        },
        { icon: "flaticon-review", text: "Reviews", href: "/dashboard-review" },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          icon: "flaticon-protection",
          text: "My Package",
          href: "/dashboard-my-package",
        },
        {
          icon: "flaticon-user",
          text: "My Profile",
          href: "/dashboard-my-profile",
        },
      ],
    },
  ];

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const handleSessionChange = async () => {
    setSession(await getSession());
  };

  const handleLogout_ = async () => {
    handleLogout();
    setSession(await getSession());
  };

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="/images/ortus_realty_logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="/images/ortus_realty_logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}
              {!session.user ? (
                <div className="col-auto">
                  <div className="d-flex align-items-center">
                    <a
                      href="#"
                      className="login-info d-flex align-items-cente"
                      data-bs-toggle="modal"
                      data-bs-target="#loginSignupModal"
                      role="button"
                    >
                      <i className="far fa-user-circle fz16 me-2" />{" "}
                      <span className="d-none d-xl-block">
                        Login / Register
                      </span>
                    </a>
                    <Link
                      className="ud-btn btn-white add-property bdrs60 ms-4"
                      href="/contact"
                    >
                      Contact us
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="col-6 col-lg-auto">
                  <div className="text-center text-lg-end header_right_widgets">
                    <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                      <li className="d-none d-sm-block">
                        <Link className="text-center mr15" href="/login">
                          <span className="flaticon-email" />
                        </Link>
                      </li>

                      <li className="d-none d-sm-block">
                        <a className="text-center mr20 notif" href="#">
                          <span className="flaticon-bell" />
                        </a>
                      </li>

                      <li className=" user_setting">
                        <div className="dropdown">
                          <a className="btn" href="#" data-bs-toggle="dropdown">
                            <Image
                              width={44}
                              height={44}
                              src="/images/resource/user.png"
                              alt="user.png"
                            />
                          </a>
                          <div className="dropdown-menu">
                            <div className="user_setting_content">
                              {menuItems.map((section, sectionIndex) => (
                                <div key={sectionIndex}>
                                  <p
                                    className={`fz15 fw400 ff-heading ${
                                      sectionIndex === 0 ? "mb20" : "mt30"
                                    }`}
                                  >
                                    {section.title}
                                  </p>
                                  {section.items.map((item, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      className={`dropdown-item ${
                                        pathname == item.href
                                          ? "-is-active"
                                          : ""
                                      } `}
                                      href={item.href}
                                    >
                                      <i className={`${item.icon} mr10`} />
                                      {item.text}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              <div>
                                <button
                                  className="dropdown-item"
                                  onClick={handleLogout_}
                                >
                                  <i className={`"flaticon-exit mr10`} />
                                  Logout
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="signup-modal">
                <div
                  className="modal fade"
                  id="loginSignupModal"
                  tabIndex={-1}
                  aria-labelledby="loginSignupModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
                    <LoginSignupModal
                      handleSessionChange={handleSessionChange}
                    />
                  </div>
                </div>
              </div>

              {/* DesktopSidebarMenu */}
              <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="SidebarPanel"
                aria-labelledby="SidebarPanelLabel"
              >
                <SidebarPanel />
              </div>
              {/* Sidebar Panel End */}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
