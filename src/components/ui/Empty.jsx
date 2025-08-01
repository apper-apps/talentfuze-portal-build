import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  className, 
  icon = "Inbox",
  title = "No data found",
  message = "There's nothing here yet. Check back later or try a different action.",
  actionLabel,
  onAction
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="text-gray-500" size={32} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;