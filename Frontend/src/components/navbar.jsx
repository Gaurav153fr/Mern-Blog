import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const user = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Sidebar overlay */}
      <nav className="border flex py-2 px-3">
        {" "} <h4 className="m-auto"> <Link to="/" className="link text-blue-400 underline">
            Home
          </Link></h4>
       
        <li className="flex w-full justify-end">
          
          {user.user != null ? (
            <span className=" flex ">
            <Link to="/post/create" >
                + New Post
              </Link>
              <span className=" h-full rounded-md border bg-slate-100 mx-2"></span>
              <Link to={`/user/${user.user.id}/${user.user.name}`} >
                {user.user.name}
                
                
              </Link>
            </span>
          ) : (
            <span className=" flex ">
              <Link to="/register" className="mr-2 underline">
                Sign Up
              </Link>
              <Link to="/login" className="underline">
                Sign In
              </Link>
            </span>
          )}
        </li>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white z-50 overflow-y-auto transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="border-b">
          <div className="flex justify-between items-center p-2 md:p-5">
            <button
              className="block md:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col p-2 md:p-5 ">
            <li className="mb-2 md:mb-0 flex-col"></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
