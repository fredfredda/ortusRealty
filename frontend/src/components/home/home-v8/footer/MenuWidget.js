import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Popular Search",
      links: [
        { label: "Homes to rent", href: "/explore?propertyType=home&saleType=renting" },
        { label: "Lands for sale", href: "/explore?propertyType=land&saleType=for sale" },
        { label: "Investment opportunities", href: "/explore?propertyType=development project" },
        { label: "Resource center", href: "#" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Terms of Use", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Our Services", href: "#" },
        { label: "Contact Support", href: "/contact" },
        { label: "About", href: "/about" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Discover",
      links: [
        { label: "Bujumbura Mairie", href: "/explore?province=Bujumbura Mairie" },
        { label: "Gitega", href: "/explore?province=Gitega" },
        { label: "Ngozi", href: "/explore?province=Ngozi" },
        { label: "Mwaro", href: "/explore?province=Mwaro" },
        { label: "Muramvya", href: "/explore?province=Muramvya" },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
