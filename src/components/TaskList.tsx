import React from "react";
import { Task } from "../types/Task";
import { TaskItem } from "./TaskItem";
import "./TaskList.css";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEditClick: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEditClick,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks in this section</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
};
