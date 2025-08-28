"use client";
import {
  LayoutDashboard,
  Folder,
  MessageCircle,
  Calendar,
  Users,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { CiGrid41 } from "react-icons/ci";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";

export default function Sidebar() {
  const [isBoardsOpen, setBoardsOpen] = useState(true);

  return (
    <div className="h-[97%] bg-white   flex flex-col">
      <nav className="flex-1 px-4">
        <div className="space-y-1 mt-4">

          <div className="w-[240px] h-[64px] flex items-center border-gray-200 rounded-lg border-[2px] ">
            <div className="flex items-center justify-between w-full px-3">
              <div className="flex items-center space-x-3">
                <Image
                  src="/icons/user_profile.png"
                  alt="User Avatar"
                  width={44}
                  height={44}
                />
                <div className="flex items-start flex-col ">
                  <span className="text-xs semi-bold text-gray-400">
                    workspace
                  </span>
                  <span className="text-sm text-gray-600">Root folder</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer mt-5">
            <CiGrid41 className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </div>

          <div className="space-y-2 mt-2">
            <div
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer border-gray-200 rounded-lg border-[2px] w-[240px] h-[46px]"
              onClick={() => setBoardsOpen(!isBoardsOpen)}
            >
              <Folder className="w-5 h-5 mr-3" />
              <span className={`flex-1 ${isBoardsOpen && 'text-blue-500'}`}>Boards</span>
              
              {isBoardsOpen ? (
                <ChevronDown className={`w-4 h-4 ${isBoardsOpen && 'text-blue-500'}`} />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>

            {isBoardsOpen && (
              <div className="flex flex-col items-start  py-2 text-gray-700  rounded-lg  border-gray-200  border-[2px] w-[240px] ">
                <ul className="w-full">
                  {[
                    {
                      id: 1,
                      name: "Create routes",
                      active: false,
                    },
                    {
                      id: 2,
                      name: "Datepicker React App",
                      active: false,
                    },
                    { id: 3, name: "Sport Xi Project", active: true },
                    { id: 4, name: "Wordpress theme", active: false },
                  ]?.map((board) => (
                    <li key={board.id} className="flex items-center hover:bg-gray-100 cursor-pointer px-3">
                      <ChevronRight
                        className={`${
                          board.active && "text-blue-600"
                        } w-4 h-4 inline mr-1 font-semibold`}
                      />
                      <div
                        className={
                          "px-3 py-2 text-sm cursor-pointer" +
                          (board.active ? " text-blue-600" : "")
                        }
                      >
                        {board.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            <MessageCircle className="w-5 h-5 mr-3" />
            <span>Messages</span>
            <span className="ml-auto bg-orange-500 text-white text-xs rounded-full px-2 py-1">
              3
            </span>
          </div>
          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Calendar className="w-5 h-5 mr-3" />
            <span>Calendar</span>
          </div>

          <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Users className="w-5 h-5 mr-3" />
            <span>Team members</span>
          </div>
        </div>
      </nav>

      <div className="p-4  border-gray-200">
        <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
          <IoMdInformationCircleOutline className="w-5 h-5 mr-3" />
          <span>Support</span>
        </div>

        <div className="flex items-center px-3 rounded-lg cursor-pointer mt-1  bg-black text-white w-[240px] h-[46px] mt-5">
          <TbLogout2 className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
