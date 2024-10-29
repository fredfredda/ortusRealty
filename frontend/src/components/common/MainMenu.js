import { listingItems } from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");

  useEffect(() => {
    if (pathname.split("/")[1] === "contact") {
      setTopMenu("contact");
    }
    if (pathname.split("/")[1] === "about") {
      setTopMenu("about");
    }
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("explore");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  return (
    <ul className="ace-responsive-menu">
      <li className="megamenu_style dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "explore" ? "title menuActive" : "title"}>
            Explore
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="row dropdown-megamenu sub-menu">
          {listingItems.map((item, index) => (
            <li className="col mega_menu_list" key={index}>
              <h4 className="title">{item.title}</h4>
              <ul className="sub-menu">
                {item.submenu.map((submenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${handleActive(submenuItem.href)}`}
                      href={submenuItem.href}
                    >
                      {submenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
      {/* End listings */}

      <li className="visible_list dropitem">
        <a className="list-item" href="/about">
          <span className={topMenu == "about" ? "title menuActive" : "title"}>
            About
          </span>
        </a>
      </li>
      {/* End property Items */}

      <li className="visible_list dropitem">
        <a className="list-item" href="/contact">
          <span className={topMenu == "contact" ? "title menuActive" : "title"}>
            Contact
          </span>
        </a>
      </li>
      {/* End contact */}
    </ul>
  );
};

export default MainMenu;
