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
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('unknown'); // 'unknown', 'granted', 'denied', 'prompt'
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
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Camera access is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.");
        return;
      }

      // Check current permission status if available
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'camera' });
          setPermissionStatus(permission.state);
          
          if (permission.state === 'denied') {
            setPermissionDenied(true);
            toast.error("Camera access is blocked. Please enable camera permissions in your browser settings and refresh the page.");
            return;
          }
        } catch (permError) {
          // Permission API not fully supported, continue with getUserMedia
          console.log("Permission API not supported, proceeding with getUserMedia");
        }
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true
      });
      
      setStream(mediaStream);
      setPermissionDenied(false);
      setPermissionStatus('granted');
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      toast.success("Camera access granted successfully!");
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      
      // Handle different types of errors
      if (error.name === 'NotAllowedError') {
        setPermissionDenied(true);
        setPermissionStatus('denied');
        toast.error("Camera access denied. Please click 'Allow' when prompted or enable camera permissions in your browser settings.", {
          autoClose: 8000
        });
      } else if (error.name === 'NotFoundError') {
        toast.error("No camera found. Please connect a camera device and try again.");
      } else if (error.name === 'NotReadableError') {
        toast.error("Camera is already in use by another application. Please close other apps using the camera and try again.");
      } else if (error.name === 'OverconstrainedError') {
        toast.error("Camera does not support the required settings. Trying with default settings...");
        // Retry with less strict constraints
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          setStream(fallbackStream);
          setPermissionDenied(false);
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
          }
          toast.success("Camera connected with default settings.");
        } catch (fallbackError) {
          toast.error("Unable to access camera with any settings. Please check your camera device.");
        }
      } else if (error.name === 'AbortError') {
        toast.error("Camera access was interrupted. Please try again.");
      } else {
        toast.error(`Camera error: ${error.message || 'Unknown error occurred'}. Please try refreshing the page.`);
      }
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
              <div className="text-center text-gray-300 max-w-md px-4">
                {permissionDenied ? (
                  <>
                    <ApperIcon name="AlertTriangle" size={48} className="mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">Camera Access Required</h3>
                    <p className="text-sm mb-4">
                      This application needs camera access to record your video responses. 
                      Please follow these steps:
                    </p>
                    <div className="text-left space-y-2 mb-6 text-xs">
                      <div className="flex items-start space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs mt-0.5">1</span>
                        <span>Click the camera icon in your browser's address bar</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs mt-0.5">2</span>
                        <span>Select "Allow" for camera and microphone access</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs mt-0.5">3</span>
                        <span>Click "Try Again" below</span>
                      </div>
                    </div>
                    <Button 
                      onClick={startCamera}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                      Try Again
                    </Button>
                  </>
                ) : (
                  <>
                    <ApperIcon name="Camera" size={48} className="mx-auto mb-2" />
                    <p>Requesting camera access...</p>
                    <p className="text-xs mt-2 opacity-75">
                      Please allow camera permissions when prompted
                    </p>
                  </>
                )}
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