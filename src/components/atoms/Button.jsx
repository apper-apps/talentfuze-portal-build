import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-medium hover:shadow-strong focus:ring-primary-500 transform hover:scale-[1.02]",
    secondary: "bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white shadow-medium hover:shadow-strong focus:ring-secondary-500 transform hover:scale-[1.02]",
    outline: "border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:border-gray-400 focus:ring-primary-500 transform hover:scale-[1.02]",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-medium hover:shadow-strong focus:ring-accent-500 transform hover:scale-[1.02]"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
    xl: "px-8 py-4 text-lg gap-3"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" className="animate-spin" size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
      ) : (
        icon && iconPosition === "left" && (
          <ApperIcon name={icon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
        )
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;