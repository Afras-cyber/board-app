"use client";
import { Search, Plus, Menu } from "lucide-react";
import { VscSettings } from "react-icons/vsc";
import { PiBellSimpleThin } from "react-icons/pi";
import { useTaskStore } from "@/lib/store/taskStore";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const { searchQuery, setSearchQuery } = useTaskStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-6">
          <Image
            src="/icons/board_app_icon.png"
            alt="App Logo"
            width={110}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop & Tablet Navigation */}
        <div className={`
          fixed md:relative top-[72px] md:top-0 left-0 md:left-auto
          w-full md:w-auto bg-white md:bg-transparent
          p-4 md:p-0 border-b md:border-b-0 border-gray-200
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex
          flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-2
          bg-white z-10
        `}>
          <button className="w-full md:w-[170px] h-[48px] flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            <span className="text-[12px]">Create new board</span>
            <Plus className="w-4 h-4" />
          </button>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto justify-start">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <VscSettings className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <PiBellSimpleThin className="w-5 h-5 text-gray-500" />
            </button>
            <Image
              src="/icons/user_profile.png"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}