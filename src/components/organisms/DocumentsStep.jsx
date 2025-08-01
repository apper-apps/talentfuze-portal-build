import React from "react";
import FileUpload from "@/components/molecules/FileUpload";
import ApperIcon from "@/components/ApperIcon";

const DocumentsStep = ({ data, onChange }) => {
  const handleFileChange = (field, file) => {
    onChange({ [field]: file });
  };

  const documentRequirements = [
    {
      key: "resume",
      title: "Resume/CV",
      description: "Upload your current resume in PDF format",
      accept: ".pdf,.doc,.docx",
      icon: "FileText",
      required: true
    },
    {
      key: "portfolio",
      title: "Portfolio",
      description: "Showcase your work samples and projects",
      accept: ".pdf,.zip,.doc,.docx",
      icon: "Briefcase",
      required: true
    },
    {
      key: "discProfile",
      title: "DISC Profile",
      description: "Upload your DISC assessment results",
      accept: ".pdf,.doc,.docx",
      icon: "BarChart3",
      required: true
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
          Required Documents
        </h2>
        <p className="text-gray-600 mb-6">
          Please upload the following documents to complete your application
        </p>
      </div>

      <div className="space-y-8">
        {documentRequirements.map((doc) => (
          <div key={doc.key} className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                <ApperIcon name={doc.icon} className="text-primary-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {doc.title}
                  {doc.required && <span className="text-red-500 ml-1">*</span>}
                </h3>
                <p className="text-gray-600 text-sm">{doc.description}</p>
              </div>
            </div>
            
            <FileUpload
              accept={doc.accept}
              value={data[doc.key]}
              onChange={(file) => handleFileChange(doc.key, file)}
              required={doc.required}
              maxSize={10 * 1024 * 1024} // 10MB
            />
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Document Guidelines</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Files should be in PDF, DOC, or DOCX format</li>
              <li>• Maximum file size: 10MB per document</li>
              <li>• Ensure all documents are clearly readable</li>
              <li>• Your DISC profile should be from a certified assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsStep;