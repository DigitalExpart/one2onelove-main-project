import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VoiceRecorder({ onRecordingComplete, onCancel }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleSend = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob, recordingTime);
      // Cleanup
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    }
  };

  const handleCancel = () => {
    stopRecording();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    onCancel();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (audioBlob && !isRecording) {
    return (
      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Voice Note</span>
            <span className="text-xs text-gray-500">{formatTime(recordingTime)}</span>
          </div>
          {audioUrl && (
            <audio src={audioUrl} controls className="w-full mt-2" />
          )}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            className="flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleSend}
            className="flex-shrink-0 bg-green-500 hover:bg-green-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }
        `}
      >
        {isRecording ? (
          <Square className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {isRecording && (
            <>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">Recording...</span>
            </>
          )}
          {!isRecording && (
            <span className="text-sm text-gray-600">Tap to record voice note</span>
          )}
        </div>
        {isRecording && (
          <div className="mt-1">
            <div className="h-1 bg-red-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 animate-pulse"
                style={{ width: '100%' }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{formatTime(recordingTime)}</p>
          </div>
        )}
      </div>
      {isRecording && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleCancel}
          className="flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

