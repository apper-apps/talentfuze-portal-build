import React from "react";
import RoleGrid from "@/components/organisms/RoleGrid";
import ApperIcon from "@/components/ApperIcon";

const WelcomePage = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Join the <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">TalentFuze</span> Team
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover exciting virtual assistant opportunities and build your career with a leading remote workforce company
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2 text-blue-100">
                <ApperIcon name="Globe" size={20} />
                <span>Work from anywhere</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <ApperIcon name="TrendingUp" size={20} />
                <span>Competitive compensation</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <ApperIcon name="Users" size={20} />
                <span>Amazing team culture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Why Work With TalentFuze?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a company that values your growth, flexibility, and success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "Zap",
                title: "Fast-Paced Growth",
                description: "Work on exciting projects with cutting-edge technology and rapid career advancement opportunities"
              },
              {
                icon: "Heart",
                title: "Work-Life Balance",
                description: "Enjoy flexible schedules, remote work options, and a company culture that prioritizes your well-being"
              },
              {
                icon: "Award",
                title: "Recognition & Rewards",
                description: "Be rewarded for your contributions with competitive pay, bonuses, and professional development opportunities"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roles Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Available Positions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect role that matches your skills and career goals
            </p>
          </div>
          
          <RoleGrid />
        </div>
      </div>

      {/* Application Process */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Simple Application Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started is easy with our streamlined application process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Role",
                description: "Browse available positions and select the one that fits your skills",
                icon: "Search"
              },
              {
                step: "2",
                title: "Complete Application",
                description: "Fill out your personal information and work preferences",
                icon: "FileText"
              },
              {
                step: "3",
                title: "Upload Documents",
                description: "Submit your resume, portfolio, and DISC profile",
                icon: "Upload"
              },
              {
                step: "4",
                title: "Record Video Responses",
                description: "Answer role-specific questions with video responses",
                icon: "Video"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name={step.icon} className="text-secondary-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;