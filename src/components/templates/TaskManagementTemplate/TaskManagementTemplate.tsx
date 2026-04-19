import React, { useState, useMemo } from "react";
import { Task, FilterType } from "../../../types/Task";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";
import { FilterButtons } from "../../molecules/FilterButtons/FilterButtons";
import { TaskSection } from "../../organisms/TaskSection/TaskSection";
import { TaskForm } from "../../organisms/TaskForm/TaskForm";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import "./TaskManagementTemplate.css";

export const TaskManagementTemplate: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterType>("all");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["in-progress", "pending", "completed"]),
  );

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      status: "In Progress",
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const editTask = (
    id: string,
    title: string,
    description: string,
    status: "In Progress" | "Pending" | "Completed",
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
              status,
              completed: status === "Completed",
            }
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (statusFilter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (statusFilter === "in-progress") {
      filtered = filtered.filter(
        (task) => !task.completed && task.status === "In Progress",
      );
    } else if (statusFilter === "pending") {
      filtered = filtered.filter(
        (task) =>
          !task.completed && (!task.status || task.status === "Pending"),
      );
    }

    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    return filtered;
  }, [tasks, searchQuery, statusFilter]);

  const inProgressTasks = filteredTasks.filter(
    (t) => !t.completed && t.status === "In Progress",
  );
  const pendingTasks = filteredTasks.filter(
    (t) => !t.completed && (!t.status || t.status === "Pending"),
  );
  const completedTasks = filteredTasks.filter((t) => t.completed);

  if (showAddForm) {
    return (
      <TaskForm
        mode="add"
        onSubmit={addTask}
        onClose={() => setShowAddForm(false)}
      />
    );
  }

  if (editingTask) {
    return (
      <TaskForm
        mode="edit"
        task={editingTask}
        onSubmit={(title, description, status) =>
          editTask(editingTask.id, title, description, status!)
        }
        onClose={() => setEditingTask(null)}
      />
    );
  }

  return (
    <div className="task-management">
      <div className="task-container">
        <header className="task-header">
          <h1>TODO APP</h1>
        </header>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <FilterButtons
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />

        <div className="task-content">
          {(statusFilter === "all" || statusFilter === "in-progress") && (
            <TaskSection
              title="In Progress"
              tasks={inProgressTasks}
              isExpanded={expandedSections.has("in-progress")}
              onToggle={() => toggleSection("in-progress")}
              onEditTask={setEditingTask}
              onDeleteTask={deleteTask}
            />
          )}

          {(statusFilter === "all" || statusFilter === "pending") && (
            <TaskSection
              title="Pending"
              tasks={pendingTasks}
              isExpanded={expandedSections.has("pending")}
              onToggle={() => toggleSection("pending")}
              onEditTask={setEditingTask}
              onDeleteTask={deleteTask}
            />
          )}

          {(statusFilter === "all" || statusFilter === "completed") && (
            <TaskSection
              title="Completed"
              tasks={completedTasks}
              isExpanded={expandedSections.has("completed")}
              onToggle={() => toggleSection("completed")}
              onEditTask={setEditingTask}
              onDeleteTask={deleteTask}
            />
          )}
        </div>

        <button className="fab" onClick={() => setShowAddForm(true)}>
          +
        </button>
      </div>
    </div>
  );
};
