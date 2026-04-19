import React, { useState, FormEvent } from "react";
import { Task } from "../../../types/Task";
import { Input } from "../../atoms/Input/Input";
import { Textarea } from "../../atoms/Textarea/Textarea";
import { Button } from "../../atoms/Button/Button";
import { StatusDropdown } from "../../molecules/StatusDropdown/StatusDropdown";
import "./TaskForm.css";

interface TaskFormProps {
  mode: "add" | "edit";
  task?: Task;
  onSubmit: (
    title: string,
    description: string,
    status?: "In Progress" | "Pending" | "Completed",
  ) => void;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  mode,
  task,
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<"In Progress" | "Pending" | "Completed">(
    task?.completed ? "Completed" : task?.status || "In Progress",
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      if (mode === "edit") {
        onSubmit(trimmedTitle, description.trim(), status);
      } else {
        onSubmit(trimmedTitle, description.trim());
      }
      onClose();
    }
  };

  return (
    <div className="task-form-page">
      <div className="task-form-header">
        <button className="back-button" onClick={onClose} type="button">
          <svg
            width="27"
            height="23"
            viewBox="0 0 27 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.439341 9.9853C-0.146446 10.5711 -0.146446 11.5208 0.439341 12.1066L9.98528 21.6526C10.5711 22.2383 11.5208 22.2383 12.1066 21.6526C12.6924 21.0668 12.6924 20.117 12.1066 19.5312L3.62132 11.046L12.1066 2.56068C12.6924 1.97489 12.6924 1.02514 12.1066 0.439358C11.5208 -0.146429 10.5711 -0.146429 9.98528 0.439358L0.439341 9.9853ZM26.5 9.54596L1.5 9.54596V12.546L26.5 12.546V9.54596Z"
              fill="white"
            />
          </svg>
        </button>
        <h2 className="task-form-title">
          {mode === "add" ? "Add Task" : "Edit Task"}
        </h2>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            autoFocus
          />
        </div>

        <div className="form-group">
          <Textarea
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
        </div>

        {mode === "edit" && (
          <div className="form-group">
            <StatusDropdown value={status} onChange={setStatus} />
          </div>
        )}

        <div className="form-actions">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!title.trim()}>
            {mode === "add" ? "ADD" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};
