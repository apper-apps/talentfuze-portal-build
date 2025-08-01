import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ProgressIndicator = ({ 
  steps = [], 
  currentStep = 0,
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-between w-full max-w-4xl mx-auto", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;
        
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "step-indicator w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 relative z-10",
                  isCompleted && "bg-gradient-to-r from-accent-500 to-accent-600 text-white completed",
                  isCurrent && "bg-gradient-to-r from-primary-500 to-primary-600 text-white ring-4 ring-primary-100",
                  isUpcoming && "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? (
                  <ApperIcon name="Check" size={16} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    (isCompleted || isCurrent) && "text-gray-900",
                    isUpcoming && "text-gray-500"
                  )}
                >
                  {step.title}
                </p>
                {step.subtitle && (
                  <p className="text-xs text-gray-400 mt-0.5">{step.subtitle}</p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-all duration-500",
                  isCompleted ? "bg-gradient-to-r from-accent-400 to-accent-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;