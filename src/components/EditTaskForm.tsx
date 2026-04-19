import React, { useState, FormEvent, useRef, useEffect } from "react";
import { Task } from "../types/Task";
import "./AddTaskForm.css";

interface EditTaskFormProps {
  task: Task;
  onEditTask: (
    id: string,
    title: string,
    description: string,
    status: "In Progress" | "Pending" | "Completed",
  ) => void;
  onClose: () => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  onEditTask,
  onClose,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState<"In Progress" | "Pending" | "Completed">(
    task.completed ? "Completed" : task.status || "In Progress",
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions: Array<"Pending" | "In Progress" | "Completed"> = [
    "Pending",
    "In Progress",
    "Completed",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      onEditTask(task.id, trimmedTitle, description.trim(), status);
      onClose();
    }
  };

  const getStatusClass = (statusValue: string) => {
    return statusValue.toLowerCase().replace(" ", "-");
  };

  const handleStatusSelect = (
    selectedStatus: "Pending" | "In Progress" | "Completed",
  ) => {
    setStatus(selectedStatus);
    setIsDropdownOpen(false);
  };

  return (
    <div className="add-task-page">
      <div className="add-task-header">
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
        <h2 className="add-task-title">Edit Task</h2>
      </div>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="task-input"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            autoFocus
          />
        </div>

        <div className="form-group">
          <textarea
            className="task-textarea"
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
        </div>

        <div className="form-group" ref={dropdownRef}>
          <div
            className={`custom-dropdown ${isDropdownOpen ? "open" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="dropdown-selected">
              <div
                className={`status-indicator ${getStatusClass(status)}`}
              ></div>
              <span className="status-text">{status}</span>
              <span
                className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
              >
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7045 5.5472C11.7981 5.47041 11.8724 5.37906 11.9232 5.2784C11.9739 5.17775 12 5.06979 12 4.96075C12 4.85171 11.9739 4.74374 11.9232 4.64309C11.8724 4.54243 11.7981 4.45108 11.7045 4.37429L6.70931 0.244327C6.61644 0.166908 6.50595 0.105459 6.3842 0.0635246C6.26246 0.02159 6.13188 0 6 0C5.86812 0 5.73754 0.02159 5.61579 0.0635246C5.49405 0.105459 5.38356 0.166908 5.29069 0.244327L0.295513 4.37429C0.201875 4.45108 0.127551 4.54243 0.0768309 4.64309C0.0261116 4.74374 0 4.85171 0 4.96075C0 5.06979 0.0261116 5.17775 0.0768309 5.2784C0.127551 5.37906 0.201875 5.47041 0.295513 5.5472C0.388387 5.62462 0.498879 5.68607 0.620621 5.728C0.742363 5.76994 0.872942 5.79153 1.00483 5.79153C1.13671 5.79153 1.26729 5.76994 1.38903 5.728C1.51077 5.68607 1.62127 5.62462 1.71414 5.5472L4.08575 3.58181C5.19606 2.66167 6.80394 2.66167 7.91425 3.58181L10.2859 5.5472C10.3787 5.62462 10.4892 5.68607 10.611 5.728C10.7327 5.76994 10.8633 5.79153 10.9952 5.79153C11.1271 5.79153 11.2576 5.76994 11.3794 5.728C11.5011 5.68607 11.6116 5.62462 11.7045 5.5472Z"
                    fill="#034EA2"
                  />
                </svg>
              </span>
            </div>

            {isDropdownOpen && (
              <div className="dropdown-options">
                {statusOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-option ${status === option ? "selected" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusSelect(option);
                    }}
                  >
                    <div
                      className={`status-indicator ${getStatusClass(option)}`}
                    ></div>
                    <span className="status-text">{option}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="add-button" disabled={!title.trim()}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
