"use client";

import * as React from "react";
import { useState, type CSSProperties, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Switch } from "~/components/ui/switch";
import styles from "./navbar.module.css";
import { useLocalStorage } from "usehooks-ts";
import { menuItems } from "./menuItems";

interface CustomCSSProperties extends CSSProperties {
  "--underline-color"?: string;
}

const NavColMenu = ({
  title,
  items,
  isDarkMode,
}: {
  title: string;
  items: string[];
  isDarkMode: boolean;
}) => (
  <div className={styles.NavColMenu}>
    <h3 className="pb-2 font-semibold text-gray-500">{title}</h3>
    <ul className="list-none">
      {items.map((item) => (
        <li key={item} className="pb-2 font-bold">
          <span
            className={styles.underlineHover}
            {...(isDarkMode && {
              style: { "--underline-color": "white" } as CustomCSSProperties,
            })}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const MarketplaceMenu = ({ isDarkMode }: { isDarkMode: boolean }) => {
  console.log("isDarkMode:", isDarkMode);

  return (
    <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
      <div className="grid grid-cols-3 gap-12">
        <div className={styles.NavColMenu}>
          <h3 className="pb-2 font-semibold text-gray-500">Explore</h3>
          <ul className="list-none">
            {["Auctions", "Classifieds", "Sell a car"].map((item) => (
              <li
                key={item}
                className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
                {...(isDarkMode && { style: { color: "white" } })}
              >
                {item}
              </li>
            ))}
            <li>
              <a
                href="#"
                className={`pt-4 text-sm font-bold text-blue-500 ${styles.underlineHover}`}
                style={
                  { "--underline-color": "#1e90ff" } as CustomCSSProperties
                }
              >
                Marketplace home
              </a>
            </li>
          </ul>
        </div>
        <NavColMenu
          title="Engage"
          items={menuItems.engage}
          isDarkMode={isDarkMode}
        />
        <NavColMenu
          title="More from Marketplace"
          items={menuItems.moreFromMarketplace}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

const InsuranceMenu = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-5 gap-12">
      <div className={styles.NavColMenu}>
        <h3 className="pb-2 font-semibold text-gray-500">Start here</h3>
        <ul className="list-none">
          <li
            className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
            {...(isDarkMode && { style: { color: "white" } })}
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
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="More from Insurance"
        items={menuItems.moreFromInsurance}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Policyholders"
        items={menuItems.policyholders}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Claims"
        items={menuItems.claims}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
);

const MediaMenu = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-5 gap-12">
      <div className={styles.NavColMenu}>
        <h3 className="pb-2 font-semibold text-gray-500">Explore</h3>
        <ul className="list-none">
          {["Stories", "Videos"].map((item) => (
            <li
              key={item}
              className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
              {...(isDarkMode && { style: { color: "white" } })}
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
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Categories"
        items={menuItems.categories}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Popular vehicles"
        items={menuItems.popularVehicles}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="More from Media"
        items={menuItems.moreFromMedia}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
);

const DriversClubMenu = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-3 gap-16">
      <div className={`${styles.NavColMenu} mr-8`}>
        <h3 className="pb-2 font-semibold text-gray-500">Membership</h3>
        <ul className="list-none">
          {["Explore Club", "Valuation", "Ask Us"].map((item) => (
            <li
              key={item}
              className={`text-2xl font-bold ${styles.blueHover} relative w-[120%] cursor-pointer pb-4`}
              {...(isDarkMode && { style: { color: "white" } })}
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
      <NavColMenu
        title="Explore"
        items={menuItems.explore}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Roadside"
        items={menuItems.roadside}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
);

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "darkMode",
    false,
    { initializeWithValue: false },
  );

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex flex-col ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex h-16 items-center justify-between border-b ${isDarkMode ? "border-gray-700" : "border-gray-300"} px-4 md:px-8`}
      >
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
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-0 ${isDarkMode ? "bg-white" : "bg-black"} transition-all duration-300 group-hover:w-full`}
                ></span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Switch
            checked={isDarkMode}
            onCheckedChange={() => setIsDarkMode(!isDarkMode)}
          />
          <div
            className={`hidden cursor-pointer rounded-md border ${isDarkMode ? "border-white" : "border-black"} px-4 py-2 transition-colors duration-300 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} md:block`}
          >
            Log in
          </div>
          <MenuOutlined
            className={`cursor-pointer text-xl ${isDarkMode ? "text-white" : "text-black"}`}
          />
        </div>
      </div>
      {!activeMenu && (
        <div
          className={`p-4 text-center ${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-100 text-black"}`}
        >
          If you need a Front End Engineer, you can call me at{" "}
          <a
            href="https://allup.world/user:5daf17bd-2da6-4a50-a3b9-bd6c41048445"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            (281) 795-8682
          </a>
          .
        </div>
      )}
      <div
        className={`transition-max-height overflow-hidden border-t ${isDarkMode ? "border-gray-700 bg-black" : "border-gray-300 bg-white"} duration-300 ease-in-out ${
          activeMenu ? "max-h-96" : "max-h-0"
        } md:max-h-full`}
        onMouseEnter={() => setActiveMenu(activeMenu)}
      >
        {activeMenu === "Marketplace" && (
          <MarketplaceMenu isDarkMode={isDarkMode} />
        )}
        {activeMenu === "Insurance" && (
          <InsuranceMenu isDarkMode={isDarkMode} />
        )}
        {activeMenu === "Media" && <MediaMenu isDarkMode={isDarkMode} />}
        {activeMenu === "Drivers Club" && (
          <DriversClubMenu isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
