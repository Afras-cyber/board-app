"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Header from "@/components/Header";
import ProjectHeader from "@/components/ProjectHeader";
import Sidebar from "@/components/Siderbar"; // Fixed: was "Siderbar"
import Swimlane from "@/components/Swimlane";
import TaskCard from "@/components/TaskCard";
import { useTaskStore, Task, TaskStatus } from "@/lib/store/taskStore";

export default function Dashboard() {
  // Changed from 'page' to 'Dashboard'
  const { tasks, filteredTasks, setTasks, moveTask } = useTaskStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          // Fallback to mock data if API fails
          const mockData: any = await import("@/lib/data/task.json"); // Fixed: was "task.json"
          setTasks(mockData.tasks);
          return;
        }
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        // Load mock data as fallback
        console.error("Failed to load tasks, using mock data:", error);
        const mockData: any = await import("@/lib/data/task.json"); // Fixed: was "task.json"
        setTasks(mockData.tasks);
      }
    };

    if (tasks.length === 0) {
      loadTasks();
    }
  }, [tasks.length, setTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = filteredTasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    moveTask(taskId, newStatus);
    setActiveTask(null);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const statusConfig = {
    todo: { title: "To Do", color: "bg-gray-100 text-gray-700" },
    inprogress: {
      title: "In Progress",
      color: "bg-[#FFA800] text-yellow-700",
    },
    approved: { title: "Approved", color: "bg-[#AEE753] text-green-700" },
    rejected: { title: "Reject", color: "bg-[#F90430] text-white" },
  };

  return (
    <div className="w-full max-w-[1400px] min-h-screen bg-gray-200 mx-auto">
      {/* Header */}
      <div className="w-full h-[80px] bg-white flex items-center px-4">
        <Header />
      </div>

      {/* Main Content */}
      <div className="w-full min-h-[calc(100vh-80px)] bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-[288px] bg-white border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
          {/* Project Header */}
          <div className="h-[174px] w-full bg-white border-b border-gray-200">
            <ProjectHeader />
          </div>

          {/* Swimlanes */}
          <div className="flex-1 overflow-auto">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="">
                <div className="flex  overflow-x-auto ">
                  {(Object.keys(statusConfig) as TaskStatus[]).map((status) => (
                    <Swimlane
                      key={status}
                      id={status}
                      title={statusConfig[status].title}
                      color={statusConfig[status].color}
                      tasks={getTasksByStatus(status)}
                    />
                  ))}
                </div>
              </div>

              <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} /> : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}
