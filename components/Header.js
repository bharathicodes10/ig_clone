import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";
import { signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  //console.log(session);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setSignInOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-6xl mt-5 lg:mx-auto px-4 h-14">
        {/*Left */}
        {/* desktop */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid  w-28 h-9 cursor-pointer"
        >
          <Image src="/Instagram_logo.svg" layout="fill" objectFit="contain" />
        </div>
        {/* responsive */}
        <div
          onClick={() => router.push("/")}
          className="relative w-10 h-10 lg:hidden flex items-center cursor-pointer"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/*middle search input*/}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="search"
            />
          </div>
        </div>
        {/*Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navbtn" />
          <MenuIcon
            className="h-6 md:hidden cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          />
          {mobileOpen && (
            <div className="absolute top-14 right-4 bg-white shadow-lg rounded-lg md:hidden w-40">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(true)}
              >
                Upload Post
              </button>

              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Messages
              </button>

              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Profile
              </button>
            </div>
          )}
          <div className="relative navbtn">
            <PaperAirplaneIcon className="navbtn rotate-45" />
            <div
              className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse
    text-white"
            >
              3
            </div>
          </div>
          <PlusCircleIcon onClick={() => setOpen(true)} className="navbtn" />
          <UserGroupIcon className="navbtn" />
          <HeartIcon className="navbtn" />
          {session ? (
            <div ref={menuRef} className="relative group">
              <img
                onClick={() => setMenuOpen(!menuOpen)}
                src={
                  session?.user?.image ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                className="h-10 w-10 rounded-full cursor-pointer"
                referrerPolicy="no-referrer"
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md">
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div ref={menuRef} className="relative group">
              <img
                onClick={() => setSignInOpen(!signInOpen)}
                src={
                  session?.user?.image ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                className="h-10 w-10 rounded-full cursor-pointer"
              />
              {signInOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md">
                  <button
                    onClick={() => signIn()}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
