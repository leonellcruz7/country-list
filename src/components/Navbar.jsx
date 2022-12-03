import React from "react";
import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/country";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.country);
  return (
    <div
      className={`flex items-center justify-between p-4 ${
        isDark ? "bg-lightDark" : "bg-grey"
      }`}
    >
      <p
        className={`text-[20px] font-[500] ${
          isDark ? "text-light" : "text-dark"
        }`}
      >
        Where in the world?
      </p>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => dispatch(setTheme(!isDark))}
      >
        <FeatherIcon
          icon="moon"
          className={`${!isDark ? "text-lightDark" : "text-light"}`}
        />
        <p className={`${!isDark ? "text-lightDark" : "text-light"}`}>
          Dark mode
        </p>
      </div>
    </div>
  );
}
