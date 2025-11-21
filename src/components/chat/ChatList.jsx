import React from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { Search, MoreVertical, Phone, Video, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function ChatList({ 
  conversations, 
  selectedChatId, 
  onSelectChat, 
  onSearch,
  onCall,
  onVideoCall,
  onArchive,
  onDelete,
  onMute
}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    if (isYesterday(date)) {
      return 'Yesterday';
    }
    return format(date, 'MMM d');
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Chats</h2>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 bg-gray-100 border-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CheckCheck className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No conversations yet</p>
            <p className="text-sm text-gray-400 mt-1">Start a new chat to get started</p>
          </div>
        ) : (
          conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100",
                selectedChatId === chat.id && "bg-gray-50"
              )}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  {chat.lastMessageTime && (
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatLastSeen(chat.lastMessageTime)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="flex-shrink-0 ml-2 bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                    </span>
                  )}
                </div>
                {chat.isMuted && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-400">🔇 Muted</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onCall?.(chat.id); }}>
                    <Phone className="w-4 h-4 mr-2" />
                    Voice Call
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onVideoCall?.(chat.id); }}>
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onMute?.(chat.id); }}>
                    {chat.isMuted ? '🔊 Unmute' : '🔇 Mute'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onArchive?.(chat.id); }}>
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => { e.stopPropagation(); onDelete?.(chat.id); }}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

