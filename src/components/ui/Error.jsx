import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  className, 
  title = "Something went wrong",
  message = "We encountered an error while loading this content.",
  onRetry,
  showRetry = true
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" className="text-red-600" size={32} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {showRetry && onRetry && (
        <Button variant="outline" onClick={onRetry} icon="RefreshCw">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;