// Sidebar.tsx (server)
import { User, GraduationCap, FolderCode } from "lucide-react";
import Image from "next/image";
import ActiveLink from "./active-link"; // client-only component
import SideBarMenu from "./side-bar-menu";
import getSessionServer from "@/lib/utils/get-Session";

export default async function Sidebar() {
  const session = await getSessionServer();

  return (
    <div className=" relative ">
      <aside className="fixed  w-sidebar h-full items-center bg-blue-50 flex flex-col justify-between p-6">
        {/* Logo */}
        <div className="">
          <div className="flex flex-col justify-center items-start gap-2 mb-14">
            <Image
              src="/assets/logo/logo.svg"
              alt="ELEVATE"
              width={192}
              height={37}
            />
            <div className="text-blue-600 font-semibold text-xl flex items-center gap-1">
              <div className="relative">
                <FolderCode className="w-8 h-8 absolute fill-blue-600 text-transparent z-10" />
                <FolderCode className="w-8 h-8 text-white relative z-20" />
              </div>
              <span>Exam App</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="mt-6 flex flex-col gap-2 w-72">
            <ActiveLink
              href="/"
              label="Diplomas"
              icon={<GraduationCap size={24} />}
            />
            <ActiveLink
              href="/account"
              label="Account Settings"
              icon={<User size={24} />}
            />
          </nav>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 justify-between">
          <Image
            src={"/assets/images/Avatar.svg"}
            width={54}
            height={54}
            alt="sadsad"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold text-blue-600">
              {session?.user?.firstName}
            </span>
            <span className="text-sm text-gray-500">
              {session?.user?.email}
            </span>
          </div>

          <SideBarMenu />
        </div>
      </aside>
    </div>
  );
}
