import React from "react";

const NavMenu = () => {
  const routes = [
    {
      title: "Overview",
      path: "#overview",
    },
    {
      title: "Appartement Info & Price",
      path: "#overview",
    },
    {
      title: "Facilities",
      path: "#overview",
    },
    {
      title: "House rules",
      path: "#overview",
    },
    {
      title: "Geust reviews(115)",
      path: "#overview",
    },
  ];
  return (
    <div className="space-x-1 hidden sm:hidden  md:flex lg:flex xl:flex 2xl:flex 3xl:flex 4xl:flex 5xl:flex">
      {routes.map((route) => (
        <a
          key={route.path}
          href=""
          className="text-sm group py-3 px-5  justify-start  sm:font-[10px] md:font-[11px] lg:font-[12px] xl:font-[13px] 2xl:font-[14px] 3xl:font-[15px] font-semibold cursor-pointer hover:text-black hover:bg-white/10 rounded-sm transition"
        >
          <div className="flex items-center flex-1 px-1">{route.title}</div>
        </a>
      ))}
    </div>
  );
};

export default NavMenu;
