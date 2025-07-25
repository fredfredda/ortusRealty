export const listingItems = [
  {
    title: "Categories",
    submenu: [
      { label: "Lands", href: "/explore?propertyType=land" },
      { label: "Homes", href: "explore?propertyType=home" },
      { label: "Construction Sites", href: "/explore?propertyType=construction site" },
      { label: "Development Projects", href: "/explore?propertyType=development project" },
    ],
  },
  {
    title: "Provinces",
    submenu: [
      { label: "Bujumbura Mairie", href: "/explore?province=Bujumbura Mairie" },
      { label: "Gitega", href: "/explore?province=Gitega" },
      { label: "Ngozi", href: "/explore?province=Ngozi" },
      { label: "Mwaro", href: "/explore?province=Mwaro" },
      { label: "Muramvya", href: "/explore?province=Muramvya" },
    ],
  },
  {
    title: "All",
    submenu: [
      { label: "All Properties", href: "/explore?showFilter=true" },
    ],
  },
];