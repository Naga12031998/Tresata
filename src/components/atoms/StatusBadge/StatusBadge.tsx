import React from "react";
import "./StatusBadge.css";

interface StatusBadgeProps {
  status: "In Progress" | "Pending" | "Completed";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = () => {
    return status.toLowerCase().replace(" ", "-");
  };

  return (
    <div className="status-badge">
      <span className={`status-dot ${getStatusClass()}`}></span>
      <span>{status}</span>
    </div>
  );
};
