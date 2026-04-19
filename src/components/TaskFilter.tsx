import React, { useState } from "react";
import { FilterType, Task } from "../types/Task";
import "./TaskFilter.css";

interface TaskFilterProps {
  tasks: Task[];
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ tasks }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["in-progress"]),
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const inProgressTasks = tasks.filter(
    (t) => !t.completed && t.status === "In Progress",
  );
  const pendingTasks = tasks.filter(
    (t) => !t.completed && (!t.status || t.status === "Pending"),
  );
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="task-filter">
      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => toggleSection("in-progress")}
        >
          <div className="filter-label">
            In Progress
            <span className="filter-count">{inProgressTasks.length}</span>
          </div>
          <span
            className={`filter-toggle ${expandedSections.has("in-progress") ? "expanded" : ""}`}
          >
            ▼
          </span>
        </div>
        <div
          className={`filter-content ${expandedSections.has("in-progress") ? "expanded" : ""}`}
        >
          {/* Tasks will be rendered here by parent */}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("pending")}>
          <div className="filter-label">
            Pending
            <span className="filter-count">{pendingTasks.length}</span>
          </div>
          <span
            className={`filter-toggle ${expandedSections.has("pending") ? "expanded" : ""}`}
          >
            ▼
          </span>
        </div>
        <div
          className={`filter-content ${expandedSections.has("pending") ? "expanded" : ""}`}
        >
          {/* Tasks will be rendered here by parent */}
        </div>
      </div>

      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => toggleSection("completed")}
        >
          <div className="filter-label">
            Completed
            <span className="filter-count">{completedTasks.length}</span>
          </div>
          <span
            className={`filter-toggle ${expandedSections.has("completed") ? "expanded" : ""}`}
          >
            ▼
          </span>
        </div>
        <div
          className={`filter-content ${expandedSections.has("completed") ? "expanded" : ""}`}
        >
          {/* Tasks will be rendered here by parent */}
        </div>
      </div>
    </div>
  );
};
