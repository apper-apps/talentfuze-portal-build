import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const RadioCard = ({ 
  name,
  value,
  checked = false,
  onChange,
  title,
  description,
  icon,
  className,
  children
}) => {
  const handleClick = () => {
    onChange(value);
  };

  return (
    <div
      className={cn(
        "radio-card relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200",
        checked ? "selected border-primary-500 bg-gradient-to-r from-primary-50 to-blue-50" : "border-gray-200 hover:border-gray-300 bg-white",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              checked ? "border-primary-500 bg-primary-500" : "border-gray-300"
            )}
          >
            {checked && (
              <div className="w-2 h-2 bg-white rounded-full animate-scale-in"></div>
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            {icon && (
              <ApperIcon name={icon} className="text-gray-600" size={20} />
            )}
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
          {children}
        </div>
      </div>
      
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
    </div>
  );
};

export default RadioCard;