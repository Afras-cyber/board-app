'use client';
import { Search, Plus, Bell, Share, ChevronDown, Edit2, Users } from 'lucide-react';
import { useTaskStore } from '@/lib/store/taskStore';
import Image from 'next/image';

export default function ProjectHeader() {
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 h-full flex flex-col justify-center space-y-4 ">
      {/* Project Details */}
      <div className="">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">Sport Xi Project</h1>
              <span className="bg-orange-300 text-black px-3 py-1 rounded-lg text-xs font-medium">
                In progress
              </span>
            </div>
            <p className="text-gray-300 mt-1">event production</p>
            
            <div className="flex  items-center space-x-6 mt-3 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className='text-gray-300'>assigned</span>
                <div className="flex relative ">
                {
                  [1, 2, 3].map((user) => (
                    <Image
                      key={user}
                      src={`/icons/user_profile.png`}
                      alt={`User ${user}`}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0"
                    />
                  ))
                }
                  <div className="w-6 h-6 rounded-full border-2 border-white -ml-2 bg-gray-300 text-xs ">
                    <span className="flex items-center justify-center h-full text-black text-[9px]">+3</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 border-1 rounded-full border-gray-200 px-3 py-1 cursor-pointer">
                <span className='text-gray-300 text-xs'>Manage</span>
                <Edit2 className="w-3 h-3 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
            <hr className='my-3'/>
            <p className="text-xs mt-2 text-gray-300">Last updated on 04 April, 2022</p>
      </div>
    </div>
  );
}