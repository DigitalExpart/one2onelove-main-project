import React from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { Check, CheckCheck, Clock, Play, Pause, Download, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MessageStatus = ({ status, isRead }) => {
  if (status === 'sending') {
    return <Clock className="w-4 h-4 text-gray-400" />;
  }
  if (status === 'sent') {
    return <Check className="w-4 h-4 text-gray-400" />;
  }
  if (status === 'delivered') {
    return <CheckCheck className="w-4 h-4 text-gray-400" />;
  }
  if (status === 'read' && isRead) {
    return <CheckCheck className="w-4 h-4 text-blue-500" />;
  }
  return <CheckCheck className="w-4 h-4 text-gray-400" />;
};

const VoiceNotePlayer = ({ audioUrl, duration }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const audioRef = React.useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 min-w-[200px]">
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white ml-0.5" />
        )}
      </button>
      <div className="flex-1">
        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/80 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};

const ImageMessage = ({ imageUrl, caption }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="rounded-lg overflow-hidden">
      {imageError ? (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={caption || 'Image'}
          className="max-w-full h-auto rounded-lg"
          onError={() => setImageError(true)}
        />
      )}
      {caption && (
        <p className="mt-2 text-sm">{caption}</p>
      )}
    </div>
  );
};

const DocumentMessage = ({ fileUrl, fileName, fileSize, fileType }) => {
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/20">
      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
        <FileText className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{fileName}</p>
        <p className="text-xs text-white/70">{formatFileSize(fileSize)} • {fileType}</p>
      </div>
      <a
        href={fileUrl}
        download
        className="flex-shrink-0 p-2 hover:bg-white/20 rounded-lg transition-colors"
      >
        <Download className="w-5 h-5 text-white" />
      </a>
    </div>
  );
};

const LocationMessage = ({ latitude, longitude, address }) => {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <div className="rounded-lg overflow-hidden border border-white/20">
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative">
          <img
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${longitude},${latitude})/${longitude},${latitude},15,0/400x200?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
            alt="Location"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
            <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
        {address && (
          <div className="p-3 bg-white/10">
            <p className="text-sm text-white">{address}</p>
          </div>
        )}
      </a>
    </div>
  );
};

export default function ChatMessage({ message, isOwn, showAvatar = true, showTime = true }) {
  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    if (isYesterday(date)) {
      return `Yesterday ${format(date, 'HH:mm')}`;
    }
    return format(date, 'MMM d, HH:mm');
  };

  return (
    <div className={cn("flex gap-2 px-4 py-1 group hover:bg-gray-50/50 transition-colors", isOwn && "flex-row-reverse")}>
      {showAvatar && !isOwn && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
          <AvatarFallback>{message.senderName?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("flex flex-col max-w-[70%]", isOwn && "items-end")}>
        {!isOwn && showAvatar && (
          <span className="text-xs text-gray-500 mb-1 px-1">{message.senderName}</span>
        )}
        
        <div
          className={cn(
            "rounded-lg px-3 py-2 shadow-sm",
            isOwn
              ? "bg-[#DCF8C6] text-gray-900"
              : "bg-white text-gray-900 border border-gray-200"
          )}
        >
          {/* Text Message */}
          {message.type === 'text' && message.text && (
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          )}

          {/* Voice Note */}
          {message.type === 'voice' && message.audioUrl && (
            <VoiceNotePlayer
              audioUrl={message.audioUrl}
              duration={message.duration || 0}
            />
          )}

          {/* Image */}
          {message.type === 'image' && message.imageUrl && (
            <ImageMessage
              imageUrl={message.imageUrl}
              caption={message.caption}
            />
          )}

          {/* Document */}
          {message.type === 'document' && message.fileUrl && (
            <DocumentMessage
              fileUrl={message.fileUrl}
              fileName={message.fileName}
              fileSize={message.fileSize}
              fileType={message.fileType}
            />
          )}

          {/* Location */}
          {message.type === 'location' && message.latitude && message.longitude && (
            <LocationMessage
              latitude={message.latitude}
              longitude={message.longitude}
              address={message.address}
            />
          )}
        </div>

        {/* Message Time and Status */}
        <div className={cn("flex items-center gap-1 mt-0.5 px-1", isOwn && "flex-row-reverse")}>
          {showTime && message.timestamp && (
            <span className="text-xs text-gray-500">{formatMessageTime(message.timestamp)}</span>
          )}
          {isOwn && (
            <MessageStatus status={message.status || 'sent'} isRead={message.isRead} />
          )}
        </div>
      </div>
    </div>
  );
}

