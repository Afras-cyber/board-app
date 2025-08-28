import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/lib/store/taskStore';
import { MessageCircle, Paperclip, Calendar, Users, Play, AlertTriangle, Video } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-yellow-100 text-yellow-600',
  high: 'bg-red-100 text-red-600'
};

const categoryColors = {
  'Research': 'bg-green-100 text-green-700',
  'Design': 'bg-red-100 text-red-700',
  'Feedback': 'bg-blue-100 text-blue-700',
  'Legal': 'bg-yellow-100 text-yellow-700',
  'Development': 'bg-purple-100 text-purple-700',
  'Interface': 'bg-gray-100 text-gray-700',
  'Other': 'bg-gray-100 text-gray-600'
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

  const categoryColor = categoryColors[task.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-600';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-grab hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* Category Tag */}
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${categoryColor}`}>
          {task.category}
        </span>
        {task.priority === 'high' && (
          <AlertTriangle className="w-4 h-4 text-red-500" />
        )}
      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-900 mb-1 text-sm">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-gray-500 mb-3">
          {task.description}
        </p>
      )}

      {/* Assignees */}
      <div className="flex items-center mb-3">
        <div className="flex -space-x-1">
          {task.assignees.slice(0, 3).map((assignee, index) => (
            <div
              key={assignee}
              className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center"
              style={{ backgroundColor: `hsl(${index * 120}, 70%, 60%)` }}
            >
              <span className="text-xs font-medium text-white">
                {assignee.charAt(assignee.length - 1)}
              </span>
            </div>
          ))}
          {task.assignees.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
              <span className="text-xs text-gray-600">
                +{task.assignees.length - 3}
              </span>
            </div>
          )}
        </div>
        {task.assignees.length > 1 && (
          <span className="ml-2 text-xs text-gray-400">
            {task.assignees.length} team
          </span>
        )}
      </div>

      {/* Task Image Placeholder */}
      {task.hasImage && (
        <div className="w-full h-20 bg-gray-700 rounded-md mb-3 flex items-center justify-center">
          <Play className="w-6 h-6 text-white" />
        </div>
      )}

      {/* Task Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          {task.attachments !== undefined && task.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Paperclip className="w-3 h-3" />
              <span>{task.attachments}</span>
            </div>
          )}
          
          {task.comments !== undefined && task.comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{task.comments}</span>
            </div>
          )}

          {task.groupCall && (
            <div className="flex items-center space-x-1">
              <Video className="w-3 h-3" />
              <span>Group Call</span>
            </div>
          )}

          {task.stream && (
            <div className="flex items-center space-x-1 text-blue-500">
              <Play className="w-3 h-3" />
              <span>Stream</span>
            </div>
          )}

          {task.reports && (
            <div className="flex items-center space-x-1 text-red-500">
              <AlertTriangle className="w-3 h-3" />
              <span>{task.reports} Reports</span>
            </div>
          )}
        </div>

        {task.dueDate && (
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>Due: {task.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}