import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
}

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => void;
  moveTask: (taskId: string, newStatus: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      fetchTasks: () => {
        const mockTasks = [
          { id: '1', title: 'User Interview', status: 'To Do', priority: 'Low' },
          { id: '2', title: 'UI Design', status: 'In Progress', priority: 'High' },
          { id: '3', title: 'Prototype', status: 'Approved', priority: 'Low' },
        ];
        set({ tasks: mockTasks });
      },
      moveTask: (taskId: string, newStatus: string) =>
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);