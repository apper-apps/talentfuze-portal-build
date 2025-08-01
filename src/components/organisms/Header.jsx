import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isApplicationPage = location.pathname.includes("/apply");

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Zap" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TalentFuze
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Virtual Assistant Portal</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
            >
              Available Positions
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
            >
              About TalentFuze
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {isApplicationPage && (
              <Button
                variant="outline"
                size="sm"
                icon="ArrowLeft"
                onClick={() => navigate("/")}
              >
                Back to Jobs
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              icon="HelpCircle"
            >
              Help
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;