import { listingItems } from "@/data/navItems";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname.split("/")[1] === "") {
      setTopMenu("home");
    }
    if (pathname.split("/")[1] === "contact") {
      setTopMenu("contact");
    }
    if (pathname.split("/")[1] === "about") {
      setTopMenu("about");
    }
    if (pathname.split("/")[1] === "explore") {
      setTopMenu("explore");
    }
  }, [pathname]);

  const isMenuActive = (hrefValue) => {
    const params = searchParams.values();
    const pvalues = params.map((value) => value);
    const valuesArray = [];
    pvalues.forEach((item) => valuesArray.push(item));
    if (valuesArray.includes(hrefValue)) return true;
    return false;
  };

  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <Link className="list-item" href="/">
          <span className={topMenu == "home" ? "title menuActive" : "title"}>
            Home
          </span>
        </Link>
      </li>
      {/* End property Items */}

      <li className="megamenu_style dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "explore" ? "title menuActive" : "title"}>
            Explore
          </span>
          <span
            className={`arrow ${topMenu == "explore" ? "menuActive" : ""}`}
          ></span>
        </a>
        <ul className="row dropdown-megamenu sub-menu">
          {listingItems.map((item, index) => (
            <li className="col mega_menu_list" key={index}>
              <h4 className="title">{item.title}</h4>
              <ul className="sub-menu">
                {item.submenu.map((submenuItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      className={
                        isMenuActive(submenuItem.href.split("=")[1])
                          ? "menuActive"
                          : ""
                      }
                      href={submenuItem.href}
                    >
                      {submenuItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
      {/* End listings */}

      <li className="visible_list dropitem">
        <Link className="list-item" href="/about">
          <span className={topMenu == "about" ? "title menuActive" : "title"}>
            About
          </span>
        </Link>
      </li>
      {/* End About */}

      <li className="visible_list dropitem">
        <Link className="list-item" href="/contact">
          <span className={topMenu == "contact" ? "title menuActive" : "title"}>
            Contact
          </span>
        </Link>
      </li>
      {/* End contact */}
    </ul>
  );
};

export default MainMenu;
