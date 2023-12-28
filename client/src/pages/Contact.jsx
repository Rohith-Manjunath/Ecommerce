import myImage from "../Assets/Contact/my-image.jpg";
import {
  FaInstagram,
  FaSquare,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="w-screen h-screen mt-24">
      <h2 className="text-3xl text-center text-gray-500 px-10 font-bold mb-10 sm:mb-0">
        Contact Me
      </h2>
      <div className="w-full h-auto sm:flex sm:flex-row items-center justify-center sm:h-1/2">
        <div className="px-10 sm:w-1/2 flex items-center justify-start sm:items-center sm:justify-center">
          <img
            loading="lazy"
            src={myImage}
            alt="myImage"
            className="w-[70%] rounded-full lg:w-1/2 xl:w-1/2"
          />
        </div>
        <div className="flex items-start justify-center flex-col gap-5 px-10 mt-10 sm:mt-0 sm:items-start sm:justify-center sm:w-1/2 sm:h-full">
          <Link
            target="_blank"
            to="https://www.linkedin.com/in/rohith-kira-bab309267/"
            className="flex items-center justify-center gap-2 font-bold text-xl bg-black text-white hover:bg-gray-700 hover:text-white rounded-sm transition-all duration-200 p-2"
          >
            <FaSquare />
            <span>Twitter (X)</span>
          </Link>

          <Link
            target="_blank"
            to="https://twitter.com/rohith_m_kira"
            className="flex items-center justify-center gap-2 font-bold text-xl bg-blue-600 hover:bg-blue-700 hover:text-white rounded-sm transition-all duration-200 p-2"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </Link>

          <Link
            target="_blank"
            to="https://github.com/Rohith-Manjunath"
            className="flex items-center justify-center gap-2 font-bold text-xl bg-black text-white hover:bg-gray-700 hover:text-white rounded-sm transition-all duration-200 p-2"
          >
            <FaGithub />
            <span>Github</span>
          </Link>

          <Link
            target="_blank"
            to="https://www.instagram.com/rohith_codes"
            className="flex items-center justify-center gap-2 font-bold text-xl bg-gradient-to-r from-pink-700 to-yellow-500 hover:from-pink-600 hover:to-yellow-400 hover:text-white rounded-sm transition-all duration-200 p-2"
          >
            <FaInstagram />
            <span>Instagram</span>
          </Link>

          <Link
            to="mailto:rohithmanjunath20@hotmail.com"
            className="flex items-center justify-center gap-2 font-bold text-xl bg-red-600 hover:bg-red-700 hover:text-white rounded-sm transition-all duration-200 p-2"
          >
            <FaEnvelope />
            <span>Email</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
