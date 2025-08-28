import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskStatus = 'todo' | 'inprogress' | 'approved' | 'rejected';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  category: string;
  assignees: string[];
  attachments?: number;
  comments?: number;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  reports?: number;
  stream?: boolean;
  hasImage?: boolean;
  groupCall?: boolean;
}

interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  filteredTasks: Task[];
  setTasks: (tasks: Task[]) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  setSearchQuery: (query: string) => void;
  updateFilteredTasks: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      searchQuery: '',
      filteredTasks: [],
      
      setTasks: (tasks) => {
        set({ tasks, filteredTasks: tasks });
      },
      
      moveTask: (taskId, newStatus) => {
        set((state) => {
          console.log('Moving task:', taskId, 'to status:', newStatus);
          const updatedTasks = state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          );
          console.log('Updated tasks:', updatedTasks);
          return {
            tasks: updatedTasks,
            filteredTasks: updatedTasks.filter(task => 
              task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
              task.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
              task.category.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
          };
        });
      },
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().updateFilteredTasks();
      },
      
      updateFilteredTasks: () => {
        set((state) => ({
          filteredTasks: state.searchQuery
            ? state.tasks.filter(task => 
                task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                task.category.toLowerCase().includes(state.searchQuery.toLowerCase())
              )
            : state.tasks
        }));
      }
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({ tasks: state.tasks })
    }
  )
);