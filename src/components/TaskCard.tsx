import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/lib/store/taskStore";
import {
  MessageCircle,
  Paperclip,
  Calendar,
  Zap,
  Play,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
}

const categoryColors = {
  Research: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  Design: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  Feedback: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  Legal: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  Development: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    dot: "bg-purple-500",
  },
  Interface: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
  Other: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-500" },
};

const priorityConfig = {
  low: { text: "Low", icon: Zap, color: "text-[#AEE753]" },
  medium: { text: "Medium", icon: Zap, color: "text-yellow-500" },
  high: { text: "High", icon: Zap, color: "text-[#F90430]" },
};

export default function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const categoryStyle =
    categoryColors[task.category as keyof typeof categoryColors] ||
    categoryColors["Other"];
  const PriorityIcon = priorityConfig[task.priority].icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg border border-gray-200 p-4  cursor-grab hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded ${categoryStyle.dot}`}></div>
          <span className="text-xs text-gray-500 font-medium">
            {task.category}
          </span>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-900 mb-3 text-base leading-tight">
        {task.title}
      </h3>

      {/* Assignees and Priority */}
      <div className="flex items-center gap-x-2 mb-4">
        <div className="flex -space-x-3">
          {task.assignees.slice(0, 3).map((assignee, index) => (
            <Image
              src="/icons/user_profile.png"
              alt={assignee}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center"
            />
            // <div
            //   key={assignee}
            //   className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center"
            //   style={{
            //     backgroundColor: `hsl(${(index + 1) * 60 + 180}, 50%, 45%)`,
            //   }}
            // >
            //   <span className="text-xs font-medium text-white">
            //     {assignee.charAt(assignee.length - 1).toUpperCase()}
            //   </span>
            // </div>
          ))}
          {task.assignees.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                +{task.assignees.length - 3}
              </span>
            </div>
          )}
        </div>

        <div
          className={`flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded`}
        >
          <PriorityIcon className="w-4 h-5 text-gray-300" />
          <span className="text-xs font-medium text-gray-300">
            {priorityConfig[task.priority].text}
          </span>
        </div>
      </div>

      {/* Task Image Placeholder */}
      {task.hasImage && (
        <div className="w-full h-24 bg-gray-700 rounded-md mb-4 flex items-center justify-center">
          <Image
            src="/icons/bg_image.png"
            alt="Task Image"
            width={400}
            height={96}
            className="w-full h-24 object-cover rounded-md"
          />
        </div>
      )}

      <hr className="pb-2" />

      {/* Bottom Stats */}
      <div className="flex items-center justify-between text-gray-400">
        <div className="flex items-center space-x-4">
          {task.attachments !== undefined && task.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Paperclip className="w-4 h-4" />
              <span className="text-sm">{task.attachments}</span>
            </div>
          )}

          {task.comments !== undefined && task.comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{task.comments}</span>
            </div>
          )}

          {task.reports && (
            <div className="flex items-center space-x-1 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{task.reports} Reports</span>
            </div>
          )}
        </div>

        {task.dueDate && (
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span className="text-xs">Due: {task.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
