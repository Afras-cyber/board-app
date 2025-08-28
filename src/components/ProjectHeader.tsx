'use client';
import { Search, Plus, Bell, Share, ChevronDown, Edit2, Users } from 'lucide-react';
import { useTaskStore } from '@/lib/store/taskStore';

export default function ProjectHeader() {
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Project Details */}
      <div className="mt-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">Sport Xi Project</h1>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                In progress
              </span>
            </div>
            <p className="text-gray-500 mt-1">event production</p>
            
            <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span>assigned</span>
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>
                  <span className="ml-2">+2</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <span>Manage</span>
                <Edit2 className="w-3 h-3" />
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">Last updated on 04 April, 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
}