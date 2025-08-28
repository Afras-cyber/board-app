"use client";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/lib/store/taskStore";
import TaskCard from "./TaskCard";
import { Plus, MoreHorizontal } from "lucide-react";

interface SwimlaneProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
}

export default function Swimlane({ id, title, tasks, color }: SwimlaneProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-white min-h-[600px] w-69 flex-shrink-0 border-r-1">
      <div className="flex items-center justify-between border-b-1 p-3 ">
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}
          >
            {title}
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
      <div className="bg-gray-50  p-4">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
