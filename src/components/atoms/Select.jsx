import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = React.forwardRef(({ 
  className, 
  label,
  error,
  required = false,
  options = [],
  placeholder = "Select an option",
  ...props 
}, ref) => {
  const baseStyles = "form-field block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 appearance-none pr-10";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            baseStyles,
            error && "border-red-300 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ApperIcon name="ChevronDown" className="text-gray-400" size={20} />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 animate-slide-up">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;