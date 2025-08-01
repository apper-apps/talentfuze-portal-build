import React from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import RadioCard from "@/components/molecules/RadioCard";

const PersonalInfoStep = ({ data, onChange }) => {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  const workTypeOptions = [
    { value: "full-time", label: "Full Time", description: "40+ hours per week, long-term commitment" },
    { value: "part-time", label: "Part Time", description: "Less than 30 hours per week, flexible schedule" },
    { value: "contract", label: "Contract", description: "Project-based work with defined timelines" }
  ];

  const availabilityOptions = [
    { value: "immediate", label: "Immediate" },
    { value: "2-weeks", label: "2 Weeks Notice" },
    { value: "1-month", label: "1 Month Notice" },
    { value: "2-months", label: "2+ Months" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600 mb-6">
          Tell us about yourself and your background
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            required
            value={data.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
          />
          
          <Input
            label="Last Name"
            required
            value={data.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
          />
          
          <Input
            label="Email Address"
            type="email"
            required
            value={data.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="your.email@example.com"
          />
          
          <Input
            label="Phone Number"
            type="tel"
            required
            value={data.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
          
          <Input
            label="Location"
            value={data.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="City, State/Country"
          />
          
          <Select
            label="Availability"
            required
            value={data.availability}
            onChange={(e) => handleInputChange("availability", e.target.value)}
            options={availabilityOptions}
            placeholder="When can you start?"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
          Compensation & Work Preferences
        </h3>
        
        <div className="mb-6">
          <Input
            label="Expected Salary (USD per year)"
            type="number"
            required
            value={data.expectedSalary}
            onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
            placeholder="50000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Work Type Preference <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workTypeOptions.map((option) => (
              <RadioCard
                key={option.value}
                name="workType"
                value={option.value}
                checked={data.workType === option.value}
                onChange={(value) => handleInputChange("workType", value)}
                title={option.label}
                description={option.description}
                icon={
                  option.value === "full-time" ? "Clock" :
                  option.value === "part-time" ? "Timer" : "FileText"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;