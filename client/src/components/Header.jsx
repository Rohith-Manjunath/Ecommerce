import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { LuUserSquare } from "react-icons/lu";

const Header = () => {
  return (
    <header className="flex items-center justify-center p-2 bg-slate-500 fixed top-0 left-0 w-full z-20">
      <div className="w-1/3">
        <Link to={"/"}>
          <h1 className="ecommerce text-4xl text-white font-semibold hover:cursor-pointer hover:text-green-400 transition-all duration-300">
            Ecommerce
          </h1>
        </Link>
      </div>
      <div className="w-1/3 flex items-center justify-center">
        <ul className="flex items-center justify-center gap-10 font-semibold text-white">
          <li className="relative hover:text-green-400">
            <NavLink
              to={"/"}
              className="after:block after:w-full after:h-[2px] after:bg-white after:scale-0 hover:after:scale-100 after:transition-all hover:origin-center duration-500 ease-in-out hover:scale-110 hover:after:bg-green-400"
            >
              Home
            </NavLink>
          </li>
          <li className="relative hover:text-green-400">
            <NavLink
              to={"/products"}
              className="after:block after:w-full after:h-[2px] after:bg-white after:scale-0 hover:after:scale-100 after:transition-all hover:origin-center duration-500 ease-in-out hover:scale-110 hover:after:bg-green-400"
            >
              Products
            </NavLink>
          </li>
          <li className="relative hover:text-green-400">
            <NavLink
              to={"/contact"}
              className="after:block after:w-full after:h-[2px] after:bg-white after:scale-0 hover:after:scale-100 after:transition-all hover:origin-center duration-500 ease-in-out hover:scale-110 hover:after:bg-green-400"
            >
              Contact
            </NavLink>
          </li>
          <li className="relative hover:text-green-400">
            <NavLink
              to={"/about"}
              className="after:block after:w-full after:h-[2px] after:bg-white after:scale-0 hover:after:scale-100 after:transition-all hover:origin-center duration-500 ease-in-out hover:scale-110 hover:after:bg-green-400"
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-1/3 text-white flex items-center justify-center gap-5 text-xl hover:cursor-pointer">
        <Link
          to="/search"
          className="hover:text-green-400 transition-all duration-300 hover:scale-110"
        >
          <FaSearch />
        </Link>
        <Link
          to="/cart"
          className="hover:text-green-400 transition-all duration-300 hover:scale-110"
        >
          <IoBagHandleSharp />
        </Link>
        <Link
          to="/profile"
          className="hover:text-green-400 transition-all duration-300 hover:scale-110"
        >
          <LuUserSquare />
        </Link>
      </div>
    </header>
  );
};

export default Header;
