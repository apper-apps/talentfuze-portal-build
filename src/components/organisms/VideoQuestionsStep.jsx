import React, { useState } from "react";
import VideoRecorder from "@/components/molecules/VideoRecorder";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const VideoQuestionsStep = ({ role, responses, onChange }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleVideoRecorded = (videoBlob) => {
    const updatedResponses = [...responses];
    const currentQuestion = role.questions[currentQuestionIndex];
    
    const existingResponseIndex = updatedResponses.findIndex(
      r => r.questionId === currentQuestion.Id
    );

    const videoResponse = {
      questionId: currentQuestion.Id,
      videoBlob,
      duration: 0, // This would be calculated from the actual video
      recordedAt: new Date().toISOString()
    };

    if (existingResponseIndex >= 0) {
      updatedResponses[existingResponseIndex] = videoResponse;
    } else {
      updatedResponses.push(videoResponse);
    }

    onChange(updatedResponses);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const goToNext = () => {
    if (currentQuestionIndex < role.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getCurrentResponse = () => {
    const currentQuestion = role.questions[currentQuestionIndex];
    return responses.find(r => r.questionId === currentQuestion.Id);
  };

  const isQuestionAnswered = (questionId) => {
    const response = responses.find(r => r.questionId === questionId);
    return response && response.videoBlob;
  };

  const allQuestionsAnswered = role.questions.every(q => isQuestionAnswered(q.Id));

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
          Video Questions
        </h2>
        <p className="text-gray-600 mb-6">
          Please record video responses to the following questions about the {role.title} position
        </p>
      </div>

      {/* Question Navigation */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Questions Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {role.questions.map((question, index) => (
            <button
              key={question.Id}
              onClick={() => goToQuestion(index)}
              className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                index === currentQuestionIndex
                  ? "border-primary-500 bg-primary-50"
                  : isQuestionAnswered(question.Id)
                  ? "border-accent-300 bg-accent-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium">
                  Question {index + 1}
                </span>
                {isQuestionAnswered(question.Id) && (
                  <ApperIcon name="CheckCircle" className="text-accent-600" size={16} />
                )}
              </div>
              <p className="text-xs text-gray-600 truncate">
                {question.text.length > 50 
                  ? `${question.text.substring(0, 50)}...` 
                  : question.text
                }
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Question {currentQuestionIndex + 1} of {role.questions.length}
            </h3>
            <p className="text-sm text-gray-500">
              {isQuestionAnswered(role.questions[currentQuestionIndex].Id) 
                ? "Video recorded ✓" 
                : "Record your response"
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon="ChevronLeft"
              onClick={goToPrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon="ChevronRight"
              iconPosition="right"
              onClick={goToNext}
              disabled={currentQuestionIndex === role.questions.length - 1}
            >
              Next
            </Button>
          </div>
        </div>

        <VideoRecorder
          question={role.questions[currentQuestionIndex].text}
          onVideoRecorded={handleVideoRecorded}
        />
      </div>

      {/* Progress Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon 
            name={allQuestionsAnswered ? "CheckCircle" : "Clock"} 
            className={allQuestionsAnswered ? "text-accent-600" : "text-blue-600"} 
            size={20} 
          />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              {allQuestionsAnswered ? "All Questions Complete!" : "Progress Update"}
            </h4>
            <p className="text-sm text-blue-700">
              {allQuestionsAnswered 
                ? "You've successfully recorded responses to all questions. You can review and re-record any response before proceeding."
                : `You've completed ${responses.filter(r => r.videoBlob).length} out of ${role.questions.length} questions.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoQuestionsStep;