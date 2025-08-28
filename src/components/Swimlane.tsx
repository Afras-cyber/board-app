'use client'
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/lib/store/taskStore';
import TaskCard from './TaskCard';
import { Plus, MoreHorizontal } from 'lucide-react';

interface SwimlaneProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
}

const statusConfig = {
  todo: { title: 'To Do', color: 'bg-gray-100 text-gray-700' },
  inprogress: { title: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
  approved: { title: 'Approved', color: 'bg-green-100 text-green-700' },
  rejected: { title: 'Reject', color: 'bg-red-100 text-red-700' }
};

export default function Swimlane({ id, title, tasks, color }: SwimlaneProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-gray-50 rounded-lg p-4 min-h-[600px] w-80 flex-shrink-0">
      {/* Swimlane Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
            {title}
          </span>
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">
            {tasks.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Task List */}
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}