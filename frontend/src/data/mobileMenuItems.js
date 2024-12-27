module.exports = [
  {
    label: "explore",
    subMenu: [
      {
        label: "Categories",
        subMenu: [
          { label: "Lands", path: "/explore?propertyType=land" },
          { label: "Homes", path: "explore?propertyType=home" },
          { label: "Construction Sites", path: "/explore?propertyType=construction site" },
          { label: "Development Projects", path: "/explore?propertyType=development project" },
        ],
      },
      {
        label: "Provinces",
        subMenu: [
          { label: "Bujumbura Mairie", path: "/explore?province=Bujumbura Mairie" },
          { label: "Gitega", path: "/explore?province=Gitega" },
          { label: "Ngozi", path: "/explore?province=Ngozi" },
          { label: "Mwaro", path: "/explore?province=Mwaro" },
          { label: "Muramvya", path: "/explore?province=Muramvya" },
        ],
      },
      {
        label: "All Properties", path: "/explore?showFilter=true"
      },
    ],
  },
];
