import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { LuUserSquare } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const Header = () => {
  const [show, setShow] = useState(false);
  const items = useSelector((state) => state.cart.cart);

  const toggleNavbar = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <header className="px-4 py-4 bg-gray-500 flex items-center justify-between text-white fixed top-0 w-screen z-50">
      <NavLink to={"/"}>
        <h1 className="ecommerce font-bold text-white text-3xl hover:text-green-300 transition-all duration-300 hover:cursor-pointer">
          {" "}
          Ecommerce{" "}
        </h1>
      </NavLink>

      {!show ? (
        <RxHamburgerMenu
          className="text-3xl hover:cursor-pointer active:scale-95 md:hidden hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        />
      ) : (
        <MdClose
          className="text-3xl hover:cursor-pointer active:scale-95 md:hidden hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        />
      )}

      <ul className={`hidden md:flex md:flex-row gap-10`}>
        <li className="font-semibold hover:text-green-300 transition-all duration-300">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="font-semibold hover:text-green-300 transition-all duration-300">
          <NavLink to={"/products"}>Products</NavLink>
        </li>
        <li className="font-semibold hover:text-green-300 transition-all duration-300">
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li className="font-semibold hover:text-green-300 transition-all duration-300">
          <NavLink to={"/contact"}>Contact</NavLink>
        </li>
      </ul>

      <ul className={`hidden md:flex md:flex-row gap-10`}>
        <li className="hover:text-green-300 transition-all duration-300">
          <NavLink to={"/search"}>
            <FaSearch className="text-2xl" />
          </NavLink>
        </li>
        <li className="hover:text-green-300 transition-all duration-300">
          <NavLink to={"/cart"} className="relative">
            <IoBagHandleSharp className="text-2xl" />
            <span
              style={{ backgroundColor: "tomato" }}
              className="absolute px-2 rounded-full -top-[0.5rem] -right-[0.8rem]"
            >
              {items.length}
            </span>
          </NavLink>
        </li>
        <li className="hover:text-green-300 transition-all duration-300">
          <NavLink to={"/login"}>
            <LuUserSquare className="text-2xl" />
          </NavLink>
        </li>
      </ul>

      <ul
        className={`flex flex-col items-center justify-evenly absolute left-0 top-[4.3rem] bg-gray-500 w-screen h-[19rem] z-10 ${
          show ? "translate-x-[0%]" : "-translate-x-[100%]"
        } transition-all duration-300 md:hidden`}
      >
        <li
          className="hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        >
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li
          className="hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        >
          <NavLink to={"/products"}>Products</NavLink>
        </li>
        <li
          className="hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        >
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li
          className="hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        >
          <NavLink to={"/contact"}>Contact</NavLink>
        </li>
      </ul>
      <ul
        className={`font-bold absolute left-0 top-[22.8rem] z-10 w-screen h-[22rem] flex items-center justify-evenly flex-col bg-gray-500 ${
          show ? "translate-x-[0%]" : "-translate-x-[100%]"
        } transition-all duration-300 md:hidden`}
      >
        <li
          className="hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        >
          <NavLink to={"/search"}>
            <FaSearch className="text-xl" />
          </NavLink>
        </li>
        <li
          className="hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        >
          <NavLink to={"/cart"}>
            <IoBagHandleSharp className="text-xl" />
          </NavLink>
        </li>
        <li
          className="hover:text-green-300 transition-all duration-300"
          onClick={toggleNavbar}
        >
          <NavLink to={"/login"}>
            <LuUserSquare className="text-xl" />
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
