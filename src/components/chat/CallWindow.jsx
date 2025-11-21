import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2, VolumeX, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CallWindow({
  callType = 'voice', // 'voice' or 'video'
  contact,
  isIncoming = false,
  onAccept,
  onReject,
  onEnd,
  onToggleMute,
  onToggleVideo,
  onToggleSpeaker,
  isMuted = false,
  isVideoEnabled = true,
  isSpeakerEnabled = false,
  callDuration = 0,
  isConnected = false
}) {
  const [time, setTime] = useState(callDuration);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  useEffect(() => {
    // Initialize video stream when call is accepted
    if (isConnected && callType === 'video' && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }

    return () => {
      // Cleanup stream
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isConnected, callType]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
      {/* Remote Video/User View */}
      <div className="flex-1 relative flex items-center justify-center">
        {callType === 'video' && isConnected ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={contact?.avatar} alt={contact?.name} />
              <AvatarFallback className="text-4xl">
                {contact?.name?.charAt(0) || <User className="w-16 h-16" />}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-2xl font-semibold text-white mb-2">{contact?.name || 'Unknown'}</h3>
            {isIncoming && !isConnected ? (
              <p className="text-gray-300">Incoming {callType} call...</p>
            ) : isConnected ? (
              <p className="text-gray-300">{formatTime(time)}</p>
            ) : (
              <p className="text-gray-300">Connecting...</p>
            )}
          </div>
        )}

        {/* Local Video (Picture-in-Picture) */}
        {callType === 'video' && isConnected && isVideoEnabled && (
          <div className="absolute bottom-24 right-4 w-32 h-48 rounded-lg overflow-hidden border-2 border-white shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="bg-gray-800/90 backdrop-blur-sm p-6">
        <div className="flex items-center justify-center gap-4">
          {/* Mute Toggle */}
          {isConnected && (
            <Button
              size="lg"
              variant={isMuted ? "destructive" : "secondary"}
              className="w-14 h-14 rounded-full"
              onClick={onToggleMute}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>
          )}

          {/* Video Toggle (for video calls) */}
          {callType === 'video' && isConnected && (
            <Button
              size="lg"
              variant={!isVideoEnabled ? "destructive" : "secondary"}
              className="w-14 h-14 rounded-full"
              onClick={onToggleVideo}
            >
              {isVideoEnabled ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6" />
              )}
            </Button>
          )}

          {/* Speaker Toggle */}
          {isConnected && (
            <Button
              size="lg"
              variant={isSpeakerEnabled ? "default" : "secondary"}
              className="w-14 h-14 rounded-full"
              onClick={onToggleSpeaker}
            >
              {isSpeakerEnabled ? (
                <Volume2 className="w-6 h-6" />
              ) : (
                <VolumeX className="w-6 h-6" />
              )}
            </Button>
          )}

          {/* Accept/Reject/End Call */}
          {isIncoming && !isConnected ? (
            <>
              <Button
                size="lg"
                variant="destructive"
                className="w-14 h-14 rounded-full"
                onClick={onReject}
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
              <Button
                size="lg"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600"
                onClick={onAccept}
              >
                <Phone className="w-6 h-6" />
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              variant="destructive"
              className="w-14 h-14 rounded-full"
              onClick={onEnd}
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

