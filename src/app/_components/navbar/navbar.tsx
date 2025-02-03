"use client";

import * as React from "react";
import { useState, type CSSProperties } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Switch } from "~/components/ui/switch";
import styles from "./navbar.module.css";
import { menuItems } from "./menuItems";

interface CustomCSSProperties extends CSSProperties {
  "--underline-color"?: string;
}

const NavColMenu = ({ title, items }: { title: string; items: string[] }) => (
  <div className={styles.NavColMenu}>
    <h3 className="pb-2 font-semibold text-gray-500">{title}</h3>
    <ul className="list-none">
      {items.map((item) => (
        <li key={item} className="pb-2 font-bold">
          <span className={styles.underlineHover}>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const MarketplaceMenu = () => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-3 gap-12">
      <div className={styles.NavColMenu}>
        <h3 className="pb-2 font-semibold text-gray-500">Explore</h3>
        <ul className="list-none">
          {["Auctions", "Classifieds", "Sell a car"].map((item) => (
            <li
              key={item}
              className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
            >
              {item}
            </li>
          ))}
          <li>
            <a
              href="#"
              className={`pt-4 text-sm font-bold text-blue-500 ${styles.underlineHover}`}
              style={{ "--underline-color": "#1e90ff" } as CustomCSSProperties}
            >
              Marketplace home
            </a>
          </li>
        </ul>
      </div>
      <NavColMenu title="Engage" items={menuItems.engage} />
      <NavColMenu
        title="More from Marketplace"
        items={menuItems.moreFromMarketplace}
      />
    </div>
  </div>
);

const InsuranceMenu = () => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-5 gap-12">
      <div className={styles.NavColMenu}>
        <h3 className="pb-2 font-semibold text-gray-500">Start here</h3>
        <ul className="list-none">
          <li
            className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
          >
            Get a quote
          </li>
          <li>
            <a
              href="#"
              className={`pt-4 text-sm font-bold text-blue-500 ${styles.underlineHover}`}
              style={{ "--underline-color": "#1e90ff" } as CustomCSSProperties}
            >
              Insurance home
            </a>
          </li>
        </ul>
      </div>
      <NavColMenu
        title="Insurance products"
        items={menuItems.insuranceProducts}
      />
      <NavColMenu
        title="More from Insurance"
        items={menuItems.moreFromInsurance}
      />
      <NavColMenu title="Policyholders" items={menuItems.policyholders} />
      <NavColMenu title="Claims" items={menuItems.claims} />
    </div>
  </div>
);

const MediaMenu = () => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-5 gap-12">
      <div className={styles.NavColMenu}>
        <h3 className="pb-2 font-semibold text-gray-500">Explore</h3>
        <ul className="list-none">
          {["Stories", "Videos"].map((item) => (
            <li
              key={item}
              className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
            >
              {item}
            </li>
          ))}
          <li>
            <a
              href="#"
              className={`pt-4 text-sm font-bold text-blue-500 ${styles.underlineHover}`}
              style={{ "--underline-color": "#1e90ff" } as CustomCSSProperties}
            >
              Media home
            </a>
          </li>
        </ul>
      </div>
      <NavColMenu
        title="Hagerty Originals"
        items={menuItems.hagertyOriginals}
      />
      <NavColMenu title="Categories" items={menuItems.categories} />
      <NavColMenu title="Popular vehicles" items={menuItems.popularVehicles} />
      <NavColMenu title="More from Media" items={menuItems.moreFromMedia} />
    </div>
  </div>
);

const DriversClubMenu = () => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-3 gap-16">
      <div className={`${styles.NavColMenu} mr-8`}>
        <h3 className="pb-2 font-semibold text-gray-500">Membership</h3>
        <ul className="list-none">
          {["Explore Club", "Valuation", "Ask Us"].map((item) => (
            <li
              key={item}
              className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
            >
              {item}
            </li>
          ))}
          <li>
            <a
              href="#"
              className={`pt-4 text-sm font-bold text-blue-500 ${styles.underlineHover}`}
              style={{ "--underline-color": "#1e90ff" } as CustomCSSProperties}
            >
              Drivers Club home
            </a>
          </li>
        </ul>
      </div>
      <NavColMenu title="Explore" items={menuItems.explore} />
      <NavColMenu title="Roadside" items={menuItems.roadside} />
    </div>
  </div>
);

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <div className="flex flex-col" onMouseLeave={handleMouseLeave}>
      <div className="flex h-16 items-center justify-between border-b border-gray-300 bg-white px-4 md:px-8">
        <div
          className="cursor-pointer text-xl font-bold md:text-2xl"
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            fontFamily: 'HelveticaNeue, system-ui, -apple-system, "Segoe UI"',
          }}
        >
          HAGERTY
        </div>
        <div className="hidden gap-8 md:flex">
          {["Insurance", "Marketplace", "Media", "Drivers Club"].map((item) => (
            <div
              key={item}
              className="group relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter(item)}
            >
              <span className="relative pb-2">
                {item}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Switch className="hidden md:flex" />
          <div className="hidden cursor-pointer rounded-md border border-black px-4 py-2 transition-colors duration-300 hover:bg-gray-200 md:block">
            Log in
          </div>
          <MenuOutlined className="cursor-pointer text-xl" />
        </div>
      </div>
      {!activeMenu && (
        <div className="bg-blue-100 p-4 text-center">
          If you need a Front End Engineer, you can call me at{" "}
          <a
            href="https://allup.world/user:5daf17bd-2da6-4a50-a3b9-bd6c41048445"
            className="text-blue-500"
          >
            (281) 795-8682
          </a>
          .
        </div>
      )}
      <div
        className={`transition-max-height overflow-hidden border-t border-gray-300 bg-white duration-300 ease-in-out ${
          activeMenu ? "max-h-96" : "max-h-0"
        } md:max-h-full`}
        onMouseEnter={() => setActiveMenu(activeMenu)}
      >
        {activeMenu === "Marketplace" && <MarketplaceMenu />}
        {activeMenu === "Insurance" && <InsuranceMenu />}
        {activeMenu === "Media" && <MediaMenu />}
        {activeMenu === "Drivers Club" && <DriversClubMenu />}
      </div>
    </div>
  );
};

export default Navbar;
