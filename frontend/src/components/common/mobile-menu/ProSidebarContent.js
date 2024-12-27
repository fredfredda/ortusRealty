import mobileMenuItems from "@/data/mobileMenuItems";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const ProSidebarContent = () => {
  const path = usePathname();
  const searchParams = useSearchParams();

  const isMenuActive = (hrefValue) => {
    const params = searchParams.values();
    const pvalues = params.map((value) => value);
    const valuesArray = [];
    pvalues.forEach((item) => valuesArray.push(item));
    if (valuesArray.includes(hrefValue)) {
      return true;
    }
    return false;
  };

  const isChildActive = (subMenuArray) => {
    let isActive = false;

    const params = searchParams.values();
    const pvalues = params.map((value) => value);
    const valuesArray = [];
    pvalues.forEach((item) => valuesArray.push(item));

    subMenuArray.forEach((subMenu) => {
      if (valuesArray.includes(subMenu.path.split("=")[1])) {
        isActive = true
        return;
      }
    });

    return isActive;
  };

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {mobileMenuItems.map((item, index) => (
          <SubMenu
            key={index}
            className={path.split("/")[1] === item.label ? "active" : ""}
            label={item.label}
            style={{ textTransform: "capitalize" }}
          >
            {item.subMenu.map((subItem, subIndex) =>
              subItem.subMenu ? (
                <SubMenu
                  key={subIndex}
                  label={subItem.label}
                  className={isChildActive(subItem.subMenu) ? "active" : ""}
                >
                  {subItem.subMenu.map((nestedItem, nestedIndex) => (
                    <MenuItem
                      key={nestedIndex}
                      component={
                        <a
                          className={
                            isMenuActive(nestedItem.path.split("=")[1])
                              ? "active"
                              : ""
                          }
                          href={nestedItem.path}
                        />
                      }
                    >
                      {nestedItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  key={subIndex}
                  component={
                    <a
                      className={
                        isMenuActive(subItem.path.split("=")[1]) ? "active" : ""
                      }
                      href={subItem.path}
                    />
                  }
                >
                  {subItem.label}
                </MenuItem>
              )
            )}
          </SubMenu>
        ))}
        <MenuItem
          component={
            <Link className={path === "/about" ? "active" : ""} href="/about" />
          }
        >
          About
        </MenuItem>
        <MenuItem
          component={
            <Link
              className={path === "/contact" ? "active" : ""}
              href="/contact"
            />
          }
        >
          Contact
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
