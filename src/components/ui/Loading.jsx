import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, text = "Loading..." }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-primary-600 animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-r-secondary-500 animate-spin animation-delay-75"></div>
      </div>
      <p className="mt-4 text-gray-600 text-sm font-medium">{text}</p>
    </div>
  );
};

export default Loading;