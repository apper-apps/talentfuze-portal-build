import React, { useState, useRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const FileUpload = ({ 
  label,
  accept = "*/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  required = false,
  value,
  onChange,
  error,
  className
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }

    onChange(file);
    toast.success("File uploaded successfully!");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleRemoveFile = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {!value ? (
        <div
          className={cn(
            "upload-area relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-300",
            isDragOver && "dragover border-primary-500 bg-primary-50 scale-[1.02]",
            error && "border-red-300"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
              <ApperIcon name="Upload" className="text-primary-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Max file size: {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4 animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full flex items-center justify-center">
                <ApperIcon name="FileText" className="text-accent-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                  {value.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(value.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors duration-200"
            >
              <ApperIcon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600 animate-slide-up">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;