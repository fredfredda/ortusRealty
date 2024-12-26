import { listingItems } from "@/data/navItems";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const searchParams = useSearchParams();
  const queryKeys = searchParams.keys();
  const [queryParameters, setQueryParameters] = useState([]);

  useEffect(() => {
    for (let key of queryKeys) {
      setQueryParameters((prev) => [...prev, key]);
    }
  }, []);

  useEffect(() => {
    console.log(queryParameters);
  }, [queryParameters]);

  useEffect(() => {
    if (pathname.split("/")[1] === "contact") {
      setTopMenu("contact");
    }
    if (pathname.split("/")[1] === "about") {
      setTopMenu("about");
    }
    if (pathname.split("/")[1] === "explore") {
      setTopMenu("explore");
    }
    // listingItems.forEach((item) => {
    //   item.submenu.forEach((elm) => {
    //     if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //   setTopMenu("explore");
    //   setSubmenu(item.title);
    //   }
    //   })
    // });
  }, [pathname]);

  return (
    <ul className="ace-responsive-menu">
      <li className="megamenu_style dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "explore" ? "title menuActive" : "title"}>
            Explore
          </span>
          <span className={`arrow ${topMenu == "explore" ? "menuActive" : ""}`}></span>
        </a>
        <ul className="row dropdown-megamenu sub-menu">
          {listingItems.map((item, index) => (
            <li className="col mega_menu_list" key={index}>
              <h4 className="title">{item.title}</h4>
              <ul className="sub-menu">
                {item.submenu.map((submenuItem, subIndex) => (
                  <li key={subIndex}>
                    <a className={``} href={submenuItem.href}>
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
