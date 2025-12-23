"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { Button } from "./button";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message?: string;
  onViewClick?: React.MouseEventHandler<HTMLButtonElement>;
  onCloseClick?: React.MouseEventHandler<HTMLDivElement>;
}

const typeStyles = {
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

const Alert: React.FC<AlertProps> = ({
  type = "info",
  message = "This is an alert message.",
  onViewClick,
  onCloseClick,
}) => {
  return (
    <motion.div
      className={cn(
        "border px-2 py-3 flex gap-x-2 items-center rounded-2xl text-sm cursor-pointer",
        typeStyles[type]
      )}
      role="alert"
      initial="initial"
      animate="animate"
      onClick={onCloseClick}
    >
      <span className="font-bold capitalize">{type}:</span>
      <span>{message} </span>
      <button
        className={cn("hover:underline px-4", `hover:${typeStyles[type]}`)}
        onClick={onViewClick}
      >
        view
      </button>
    </motion.div>
  );
};

export { Alert };
