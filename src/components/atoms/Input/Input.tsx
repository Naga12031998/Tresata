import React from "react";
import "./Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search";
}

export const Input: React.FC<InputProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  return <input className={`input input-${variant} ${className}`} {...props} />;
};
