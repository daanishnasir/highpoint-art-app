"use client";

import * as React from "react";
import { useState, type CSSProperties, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Switch } from "~/components/ui/switch";
import styles from "./navbar.module.css";
import { useLocalStorage } from "usehooks-ts";
import { match } from "ts-pattern";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

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
            {...(!isDarkMode && {
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

const VisitMenu = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
      <div className="grid grid-cols-3 gap-12">
        <div className={styles.NavColMenu}>
          <h3 className="pb-2 font-semibold text-gray-500">Plan Your Visit</h3>
          <ul className="list-none">
            {["Hours & Admission", "Directions", "Food & Drink"].map((item) => (
              <li
                key={item}
                className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
                {...(!isDarkMode && { style: { color: "white" } })}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <NavColMenu
          title="What's On"
          items={["Exhibitions", "Events", "Tours"]}
          isDarkMode={isDarkMode}
        />
        <NavColMenu
          title="Become a Member"
          items={["Join", "Benefits", "Programs"]}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

const ExhibitionsMenu = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-3 gap-12">
      <div className={styles.NavColMenu}>
        <h3 className="pb-2 font-semibold text-gray-500">
          Current Exhibitions
        </h3>
        <ul className="list-none">
          {["Now On View", "Upcoming", "Past"].map((item) => (
            <li
              key={item}
              className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
              {...(!isDarkMode && { style: { color: "white" } })}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <NavColMenu
        title="Exhibition Types"
        items={["Special Exhibitions", "Traveling Exhibitions"]}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Resources"
        items={["Exhibition History", "Exhibition Catalogues"]}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
);

const ArtMenu = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-4 gap-12">
      <div className={styles.NavColMenu}>
        <h3 className="pb-2 font-semibold text-gray-500">Collection Areas</h3>
        <ul className="list-none">
          {["Ancient Art", "European Art", "Modern Art"].map((item) => (
            <li
              key={item}
              className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
              {...(!isDarkMode && { style: { color: "white" } })}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <NavColMenu
        title="Highlights"
        items={["Must-See", "New Acquisitions"]}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Collection Resources"
        items={["Collection Database", "Conservation"]}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Study Centers"
        items={["Drawing Study Room", "Libraries"]}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
);

const LearnMenu = ({ isDarkMode }: { isDarkMode: boolean }) => (
  // Note: Tailwind learnings:  pb-4 is 1 rem, pb-8 is 2 rem, pb-2 is 0.5 rem, px-4 is padding left and right at 1rem
  <div className="animateFadeIn hidden justify-center p-4 pb-8 md:flex">
    <div className="grid grid-cols-3 gap-16">
      <div className={styles.NavColMenu}>
        <h3 className="pb-2 font-semibold text-gray-500">For All</h3>
        <ul className="list-none">
          {["Adults", "Families", "Teens", "Children"].map((item) => (
            <li
              key={item}
              className={`text-2xl font-bold ${styles.blueHover} relative cursor-pointer pb-4`}
              {...(!isDarkMode && { style: { color: "white" } })}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <NavColMenu
        title="Resources"
        items={["Lesson Plans", "Teaching Resources"]}
        isDarkMode={isDarkMode}
      />
      <NavColMenu
        title="Programs"
        items={["Workshops", "Courses"]}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
);

enum MenuItems {
  VISIT = "Visit",
  EXHIBITIONS = "Exhibitions and Events",
  ART = "Art",
  LEARN = "Learn with Us",
  RESEARCH = "Research",
  SHOP = "Shop",
}

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItems | null>(null);
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "darkMode",
    false,
    { initializeWithValue: false },
  );

  const handleMouseEnter = (menu: MenuItems) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={`flex flex-col ${!isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex h-16 items-center justify-between border-b ${!isDarkMode ? "border-gray-700" : "border-gray-300"} px-4 md:px-8`}
        style={{ backgroundColor: "#e4002b" }}
      >
        <div
          className="cursor-pointer text-xl font-bold text-white md:text-2xl"
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            fontFamily: '"Times New Roman", serif',
            letterSpacing: "1px",
            lineHeight: "0.9",
          }}
        >
          <div>THE</div>
          <div>MET</div>
        </div>
        <div className="hidden gap-8 md:flex">
          {[
            MenuItems.VISIT,
            MenuItems.EXHIBITIONS,
            MenuItems.ART,
            MenuItems.LEARN,
            MenuItems.RESEARCH,
            MenuItems.SHOP,
          ].map((item) => (
            <div
              key={item}
              className="group relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter(item)}
              onClick={() => {
                if (item === MenuItems.VISIT) {
                  window.location.href = "/";
                }
              }}
            >
              <span className="relative pb-2 text-white">
                {item}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full`}
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
            className={`hidden cursor-pointer rounded-md border ${!isDarkMode ? "border-white" : "border-black"} px-4 py-2 transition-colors duration-300 ${!isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} md:block`}
          >
            {/* Log in */}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <MenuOutlined
            className={`cursor-pointer text-xl ${!isDarkMode ? "text-white" : "text-black"}`}
          />
        </div>
      </div>
      {!activeMenu && (
        <div
          className={`p-4 text-center ${!isDarkMode ? "bg-gray-800 text-white" : "bg-blue-100 text-black"}`}
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
        className={`transition-max-height overflow-hidden border-t ${!isDarkMode ? "border-gray-700 bg-black" : "border-gray-300 bg-white"} duration-300 ease-in-out ${
          activeMenu ? "max-h-96" : "max-h-0" // NOTE: on hover nav height expands to 96px to show menu items
        } md:max-h-full`}
        onMouseEnter={() => setActiveMenu(activeMenu)}
      >
        {match(activeMenu)
          .with(MenuItems.VISIT, () => <VisitMenu isDarkMode={isDarkMode} />)
          .with(MenuItems.EXHIBITIONS, () => (
            <ExhibitionsMenu isDarkMode={isDarkMode} />
          ))
          .with(MenuItems.ART, () => <ArtMenu isDarkMode={isDarkMode} />)
          .with(MenuItems.LEARN, () => <LearnMenu isDarkMode={isDarkMode} />)
          .otherwise(() => null)}
      </div>
    </div>
  );
};

export default Navbar;
