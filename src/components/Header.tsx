"use client";
import {
  Search,
  Plus,
  Bell,
  Share,
  ChevronDown,
  Edit2,
  Users,
} from "lucide-react";
import { VscSettings } from "react-icons/vsc";
import { PiBellSimpleThin } from "react-icons/pi";
import { useTaskStore } from "@/lib/store/taskStore";
import Image from "next/image";

export default function Header() {
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Dashboard</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create new board</span>
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

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
  );
}
