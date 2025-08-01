import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { toast } from "react-toastify";

const VideoRecorder = ({ 
  question,
  onVideoRecorded,
  className
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState(null);
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const startRecording = () => {
    if (!stream) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordedBlob(blob);
      setHasRecording(true);
      onVideoRecorded(blob);
      
      // Create object URL for playback
      const videoURL = URL.createObjectURL(blob);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = videoURL;
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const resetRecording = async () => {
    setHasRecording(false);
    setRecordedBlob(null);
    setRecordingTime(0);
    onVideoRecorded(null);
    
    // Restart camera
    await startCamera();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize camera on mount
  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <ApperIcon name="MessageSquare" className="text-white" size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Video Question</h3>
            <p className="text-gray-700 leading-relaxed">{question}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
        <div className="video-preview bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
          <video
            ref={videoRef}
            autoPlay
            muted={!hasRecording}
            playsInline
            className="w-full h-64 object-cover"
          />
          
          {isRecording && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>REC {formatTime(recordingTime)}</span>
            </div>
          )}
          
          {!stream && !hasRecording && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center text-gray-300">
                <ApperIcon name="Camera" size={48} className="mx-auto mb-2" />
                <p>Preparing camera...</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center space-x-3">
          {!hasRecording ? (
            <>
              {!isRecording ? (
                <Button
                  variant="primary"
                  size="lg"
                  icon="Video"
                  onClick={startRecording}
                  disabled={!stream}
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  variant="accent"
                  size="lg"
                  icon="Square"
                  onClick={stopRecording}
                >
                  Stop Recording
                </Button>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="lg"
                icon="RotateCcw"
                onClick={resetRecording}
              >
                Record Again
              </Button>
              <div className="flex items-center space-x-2 text-accent-600">
                <ApperIcon name="CheckCircle" size={20} />
                <span className="text-sm font-medium">Recording saved!</span>
              </div>
            </div>
          )}
        </div>

        {hasRecording && recordedBlob && (
          <div className="mt-4 p-3 bg-accent-50 rounded-lg">
            <div className="flex items-center space-x-2 text-accent-700">
              <ApperIcon name="Info" size={16} />
              <span className="text-sm">
                Video recorded: {formatTime(recordingTime)} duration
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;