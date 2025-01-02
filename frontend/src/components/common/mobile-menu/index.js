"use client";
import Link from "next/link";
import Image from "next/image";
import ContactInfo from "./ContactInfo";
import Social from "./Social";
import ProSidebarContent from "./ProSidebarContent";
import { usePathname } from "next/navigation";
import { sessionStore } from "@/store/session";
import { isLoadingStore } from "@/store/isLoading";

const MobileMenu = () => {
  const isLoading = isLoadingStore((state) => state.isLoading);
  const session = sessionStore((state) => state.session);
  const deleteSession = sessionStore((state) => state.deleteSession);

  const pathname = usePathname();
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

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        toast.error(typeof data.error === "string" ? data.error : "An error occured");
      } else {
        localStorage.removeItem("session");
        deleteSession();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading === false)
    return (
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header innerpage-style">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                <a
                  className="menubar"
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#mobileMenu"
                  aria-controls="mobileMenu"
                >
                  <Image
                    width={25}
                    height={9}
                    src="/images/mobile-dark-nav-icon.svg"
                    alt="mobile icon"
                  />
                </a>
                <Link className="mobile_logo" href="/">
                  <Image
                    width={138}
                    height={44}
                    src="/images/ortus_realty_logo.png"
                    alt="logo"
                  />
                </Link>
                {session?.userId ? (
                  <div className=" user_setting">
                    <div className="dropdown">
                      <a className="btn" href="#" data-bs-toggle="dropdown">
                        <Image
                          width={44}
                          height={44}
                          src={`https://ui-avatars.com/api/?name=${
                            session?.lastName + "+" + session?.firstName
                          }&background=random&rounded=true&size=44`}
                          alt="user"
                        />
                        <i className="far fa-chevron-down ml5"/>
                      </a>
                      <div className="dropdown-menu">
                        <div className="user_setting_content">
                          <div>
                            {menuItems.items.map((item, itemIndex) => (
                              <Link
                                key={itemIndex}
                                className={`dropdown-item ${
                                  pathname == item.href ? "-is-active" : ""
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
                              <i className={`"flaticon-exit mr10`} />
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={`/login?redirect=${pathname}`}>
                    <span className="icon fz18 far fa-user-circle" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* /.mobile-menu meta */}

        <div
          className="offcanvas offcanvas-start mobile_menu-canvas"
          tabIndex="-1"
          id="mobileMenu"
          aria-labelledby="mobileMenuLabel"
          data-bs-scroll="true"
        >
          <div className="rightside-hidden-bar">
            <div className="hsidebar-header">
              <div
                className="sidebar-close-icon"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <span className="far fa-times"></span>
              </div>
              <h4 className="title">Ortus Realty</h4>
            </div>
            {/* End header */}

            <div className="hsidebar-content ">
              <div className="hiddenbar_navbar_content">
                <ProSidebarContent />
                {/* End .hiddenbar_navbar_menu */}

                <div className="hiddenbar_footer position-relative bdrt1">
                  <div className="row pt45 pb30 pl30">
                    <ContactInfo />
                  </div>
                  {/* End .row */}

                  <div className="row pt30 pb30 bdrt1">
                    <div className="col-auto">
                      <div className="social-style-sidebar d-flex align-items-center pl30">
                        <h6 className="me-4 mb-0">Follow us</h6>
                        <Social />
                      </div>
                    </div>
                  </div>
                </div>
                {/* hiddenbar_footer */}
              </div>
            </div>
            {/* End hsidebar-content */}
          </div>
        </div>
      </div>
    );
};

export default MobileMenu;
