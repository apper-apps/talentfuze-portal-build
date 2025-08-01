import React from "react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ReviewStep = ({ role, formData, onSubmit, submitting }) => {
  const { personalInfo, documents, videoResponses } = formData;

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getWorkTypeLabel = (type) => {
    const types = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Contract'
    };
    return types[type] || type;
  };

  const getAvailabilityLabel = (availability) => {
    const labels = {
      'immediate': 'Immediate',
      '2-weeks': '2 Weeks Notice',
      '1-month': '1 Month Notice',
      '2-months': '2+ Months'
    };
    return labels[availability] || availability;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
          Review Your Application
        </h2>
        <p className="text-gray-600 mb-6">
          Please review all information before submitting your application for the {role.title} position
        </p>
      </div>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="text-primary-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium text-gray-900">{personalInfo.firstName} {personalInfo.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{personalInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-900">{personalInfo.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium text-gray-900">{personalInfo.location || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Expected Salary</p>
            <p className="font-medium text-gray-900">{formatSalary(personalInfo.expectedSalary)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Work Type</p>
            <Badge variant="primary" size="sm">{getWorkTypeLabel(personalInfo.workType)}</Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500">Availability</p>
            <p className="font-medium text-gray-900">{getAvailabilityLabel(personalInfo.availability)}</p>
          </div>
        </div>
      </Card>

      {/* Documents */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center">
            <ApperIcon name="FileText" className="text-secondary-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
        </div>
        
        <div className="space-y-3">
          {[
            { key: 'resume', label: 'Resume/CV', icon: 'FileText' },
            { key: 'portfolio', label: 'Portfolio', icon: 'Briefcase' },
            { key: 'discProfile', label: 'DISC Profile', icon: 'BarChart3' }
          ].map(({ key, label, icon }) => (
            <div key={key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <ApperIcon name={icon} className="text-gray-600" size={16} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{documents[key]?.name}</p>
              </div>
              <ApperIcon name="CheckCircle" className="text-accent-600" size={20} />
            </div>
          ))}
        </div>
      </Card>

      {/* Video Responses */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full flex items-center justify-center">
            <ApperIcon name="Video" className="text-accent-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Video Responses</h3>
        </div>
        
        <div className="space-y-3">
          {role.questions.map((question, index) => {
            const response = videoResponses.find(r => r.questionId === question.Id);
            return (
              <div key={question.Id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">{question.text}</p>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="CheckCircle" className="text-accent-600" size={16} />
                      <span className="text-sm text-accent-600">Response recorded</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Terms and Submit */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3 mb-4">
          <ApperIcon name="Shield" className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Terms and Conditions</h4>
            <p className="text-sm text-blue-700 mb-4">
              By submitting this application, you confirm that all information provided is accurate and complete. 
              You also agree to TalentFuze's privacy policy and terms of service.
            </p>
          </div>
        </div>
        
        <Button
          variant="primary"
          size="lg"
          onClick={onSubmit}
          loading={submitting}
          icon="Send"
          iconPosition="right"
          className="w-full sm:w-auto"
        >
          {submitting ? "Submitting Application..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;