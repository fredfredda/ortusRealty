"use client";

import MainMenu from "@/components/common/MainMenu";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sessionStore } from "@/store/session";
import { isLoadingStore } from "@/store/isLoading";
import toast from "react-hot-toast";

const menuItems = {
  items: [
    {
      icon: "flaticon-user",
      text: "My Profile",
      href: "/profile",
    },
    {
      icon: "flaticon-home",
      text: "Saved Properties",
      href: "/saved-properties",
    },
  ],
};

const Header = () => {
  const isLoading = isLoadingStore((state) => state.isLoading);
  const [navbar, setNavbar] = useState(false);
  const session = sessionStore((state) => state.session);
  const deleteSession = sessionStore((state) => state.deleteSession);

  const router = useRouter();

  const pathname = usePathname();

  const protectRoutes = ["/profile", "/saved-properties"];

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeBackground);
      return () => {
        window.removeEventListener("scroll", changeBackground);
      };
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        if (data.error === "Unauthorized") {
          toast.error("Unauthorized");
        } else {
          toast.error(
            typeof data.error === "string" ? data.error : "An error occured"
          );
        }
      } else if (data.success) {
        localStorage.removeItem("session");
        localStorage.removeItem("token");
        deleteSession();
        toast.success("Logged out successfully");
        if (protectRoutes.includes(pathname)) {
          router.replace("/");
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading === false)
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
                          layout="responsive"
                          width={138}
                          height={44}
                          src="/images/ortus_realty_logo.png"
                          alt="Header Logo"
                        />
                      </Link>
                      <Link className="header-logo logo2" href="/">
                        <Image
                          layout="responsive"
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

                {!session?.userId ? (
                  <div className="col-auto">
                    <div className="d-flex align-items-center">
                      <a
                        href={`/login?redirect=${pathname}`}
                        className="login-info d-flex align-items-center"
                        role="button"
                      >
                        <i className="far fa-user-circle fz16 me-2" />{" "}
                        <span className="d-none d-xl-block">
                          Login / Register
                        </span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="col-6 col-lg-auto">
                    <div className="text-center text-lg-end header_right_widgets">
                      <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                        <li className=" user_setting">
                          <div className="dropdown">
                            <a
                              className="btn"
                              href="#"
                              data-bs-toggle="dropdown"
                            >
                              <Image
                                width={44}
                                height={44}
                                src={`https://ui-avatars.com/api/?name=${
                                  session?.lastName + "+" + session?.firstName
                                }&background=random&rounded=true&size=44`}
                                alt="user"
                              />
                              <i className="far fa-chevron-down ml5" />
                            </a>
                            <div className="dropdown-menu">
                              <div className="user_setting_content">
                                <div>
                                  {menuItems.items.map((item, itemIndex) => (
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
                                <div>
                                  <button
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                  >
                                    <i className="flaticon-exit mr10" />
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
              </div>
            </div>
          </nav>
        </header>
      </>
    );
};

export default Header;
