module.exports = [
  {
    label: "Explore",
    subMenu: [
      {
        label: "Categories",
        subMenu: [
          { label: "Lands", path: "/explore?propertyType=home" },
          { label: "Homes", path: "explore?propertyType=land" },
          { label: "Construction Sites", path: "/explore?propertyType=construction%20site" },
          { label: "Development Projects", path: "/explore?propertyType=development%20project" },
        ],
      },
      {
        label: "Provinces",
        subMenu: [
          { label: "Bujumbura Mairie", path: "/explore?province=Bujumbura%20Mairie" },
          { label: "Gitega", path: "/explore?province=Gitega" },
          { label: "Ngozi", path: "/explore?province=Ngozi" },
          { label: "Mwaro", path: "/explore?province=Mwaro" },
          { label: "Muramvya", path: "/explore?province=Muramvya" },
        ],
      },
      {
        label: "All",
        subMenu: [
          { label: "All Properties", path: "/explore" },
        ],
      },
    ],
  },
];
