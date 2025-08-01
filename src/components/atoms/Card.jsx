import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  children, 
  variant = "default",
  hover = false,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl shadow-soft border border-gray-100 transition-all duration-300";
  
  const variants = {
    default: "",
    gradient: "bg-gradient-to-br from-white to-gray-50",
    accent: "border-primary-200 bg-gradient-to-br from-primary-50 to-white"
  };
  
  const hoverStyles = hover ? "hover:shadow-strong hover:scale-[1.02] cursor-pointer" : "";
  
  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;