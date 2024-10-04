import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import { User } from "./User";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

export const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((open) => !open);

  return (
    <nav className="fixed w-full h-[80px] text-[#efbc7e] bg-[#322448] dark:text-[#CA9352] px-4 md:px-0 flex items-center z-50">
      {/* left side */}
      <div className="container mx-auto flex items-center justify-between ">
        <div className="flex space-x-2 items-center">
          {user && (
            <div onClick={handleToggle} className=" cursor-pointer md:hidden">
              {!isOpen ? <BiMenu size={28} /> : <AiOutlineClose size={28} />}
            </div>
          )}
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* right side */}
        <div className="flex items-center space-x-3 md:space-x-7">
          {user && (
            <div className="flex items-center gap-x-3">
              <User />
              <FiLogOut
                size={22}
                onClick={logOut}
                className="text-slate-800 dark:text-gray-200 hover:opacity-75 font-medium cursor-pointer transition-colors"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
