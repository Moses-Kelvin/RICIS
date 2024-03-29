"use client";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { UserSidebarLinks, AdminSidebarLinks } from ".";
import {
  getToken,
  removeToken,
  removeLoginTime,
  getLoginTime,
} from "@/utils/authHelpers";

const activeClass = "bg-blue-700 hover:bg-blue-600";

const Sidebar = ({ display, lg_display, zIndex }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.includes("admin");

  console.log(pathname);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token]);

  const logout = () => {
    router.replace("/");
    removeToken();
  };

  useEffect(() => {
    const loginTime = getLoginTime();
    if (loginTime) {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(loginTime, 10);

      if (elapsedTime >= twentyFourHours) {
        logout();
        removeLoginTime();
      } else {
        const interval = setInterval(() => {
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - parseInt(loginTime, 10);
          if (elapsedTime >= twentyFourHours) {
            logout();
            removeLoginTime();
            clearInterval(interval);
          }
        }, 60000);
      }
    }
  }, []);

  return (
    <aside className={`h-screen bg-[#1A191B] px-2 fixed top-0 w-[12rem]`}>
      <div className="flex flex-col space-y-3 text-white mt-2">
        <ul className="mt-28 space-y-3 text-sm">
          {(isAdmin ? AdminSidebarLinks : UserSidebarLinks).map(
            (link, index) => (
              <>
                <li
                  key={link.id}
                  className={`${pathname === link.href ? activeClass : ""}
                 flex items-center gap-2 p-2 rounded-md mb-3 text-xs`}
                >
                  <span className="">{link.icon}</span>
                  <Link className="" href={link.href}>
                    {link.name}
                  </Link>
                </li>
                {index === 0 ? <hr className="border-gray-600" /> : ""}
              </>
            )
          )}
        </ul>
        <div className="fixed bottom-6 space-y-10">
          <button
            className="text-white bg-blue-900 px-4 py-1 rounded-md"
            onClick={logout}
          >
            Logout
          </button>
          <div className="flex justify-center items-center gap-2">
            <Image
              width={30}
              height={30}
              className=""
              src="/images/avatar.png"
              alt="avatar"
            />
            <div className>
              <p className="text-sm">David Stephen</p>
              <p className="text-xs text-gray-200">Applicant</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
