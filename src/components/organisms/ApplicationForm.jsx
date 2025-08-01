import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressIndicator from "@/components/molecules/ProgressIndicator";
import PersonalInfoStep from "@/components/organisms/PersonalInfoStep";
import DocumentsStep from "@/components/organisms/DocumentsStep";
import VideoQuestionsStep from "@/components/organisms/VideoQuestionsStep";
import ReviewStep from "@/components/organisms/ReviewStep";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { roleService } from "@/services/api/roleService";
import { applicationService } from "@/services/api/applicationService";

const ApplicationForm = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      availability: "",
      expectedSalary: "",
      workType: ""
    },
    documents: {
      resume: null,
      portfolio: null,
      discProfile: null
    },
    videoResponses: []
  });

  const steps = [
    { id: "personal", title: "Personal Info", subtitle: "Basic details" },
    { id: "documents", title: "Documents", subtitle: "Upload files" },
    { id: "video", title: "Video Questions", subtitle: "Record responses" },
    { id: "review", title: "Review", subtitle: "Submit application" }
  ];

  const loadRole = async () => {
    try {
      setLoading(true);
      setError("");
      const roleData = await roleService.getById(parseInt(roleId));
      setRole(roleData);
    } catch (err) {
      setError("Failed to load role information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRole();
  }, [roleId]);

  const updateFormData = (step, data) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data }
    }));
  };

  const isStepValid = (stepIndex) => {
    switch (stepIndex) {
      case 0: // Personal Info
        const { firstName, lastName, email, phone, expectedSalary, workType } = formData.personalInfo;
        return firstName && lastName && email && phone && expectedSalary && workType;
      
      case 1: // Documents
        const { resume, portfolio, discProfile } = formData.documents;
        return resume && portfolio && discProfile;
      
      case 2: // Video Questions
        return role && formData.videoResponses.length === role.questions.length &&
               formData.videoResponses.every(response => response.videoBlob);
      
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      const applicationData = {
        roleId: parseInt(roleId),
        personalInfo: formData.personalInfo,
        documents: formData.documents,
        videoResponses: formData.videoResponses.map(response => ({
          questionId: response.questionId,
          duration: response.duration || 0,
          recordedAt: new Date().toISOString()
        })),
        status: "submitted",
        createdAt: new Date().toISOString()
      };

      await applicationService.create(applicationData);
      
      toast.success("Application submitted successfully!");
      
      // Redirect to success page or home
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading text="Loading application form..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadRole} />;
  }

  if (!role) {
    return <Error message="Role not found" showRetry={false} />;
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(data) => updateFormData("personalInfo", data)}
          />
        );
      case 1:
        return (
          <DocumentsStep
            data={formData.documents}
            onChange={(data) => updateFormData("documents", data)}
          />
        );
      case 2:
        return (
          <VideoQuestionsStep
            role={role}
            responses={formData.videoResponses}
            onChange={(responses) => updateFormData("videoResponses", responses)}
          />
        );
      case 3:
        return (
          <ReviewStep
            role={role}
            formData={formData}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Apply for {role.title}
          </h1>
          <p className="text-gray-600">
            Complete your application to join the TalentFuze team
          </p>
        </div>
        
        <ProgressIndicator
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          {renderCurrentStep()}
        </div>

        {currentStep < 3 && (
          <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              icon="ArrowLeft"
            >
              Previous
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              icon="ArrowRight"
              iconPosition="right"
            >
              {currentStep === steps.length - 2 ? "Review Application" : "Next Step"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;