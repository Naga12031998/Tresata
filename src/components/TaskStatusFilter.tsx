import React from "react";
import { FilterType } from "../types/Task";
import "./TaskStatusFilter.css";

interface TaskStatusFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TaskStatusFilter: React.FC<TaskStatusFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="task-status-filter">
      <button
        className={`filter-btn ${currentFilter === "all" ? "active" : ""}`}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={`filter-btn ${currentFilter === "in-progress" ? "active" : ""}`}
        onClick={() => onFilterChange("in-progress")}
      >
        In Progress
      </button>
      <button
        className={`filter-btn ${currentFilter === "pending" ? "active" : ""}`}
        onClick={() => onFilterChange("pending")}
      >
        Pending
      </button>
      <button
        className={`filter-btn ${currentFilter === "completed" ? "active" : ""}`}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};
