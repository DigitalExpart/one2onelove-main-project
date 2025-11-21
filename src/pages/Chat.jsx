import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import ChatList from '@/components/chat/ChatList';
import ChatWindow from '@/components/chat/ChatWindow';
import CallWindow from '@/components/chat/CallWindow';
import { useLanguage } from '@/Layout';

// Mock data for development - Replace with real API calls
const mockConversations = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'Hey! How are you doing?',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 2,
    isOnline: true,
    isMuted: false,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    lastMessage: 'Thanks for the help!',
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 0,
    isOnline: false,
    isMuted: false,
  },
];

const mockMessages = {
  '1': [
    {
      id: '1',
      senderId: 'other',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      type: 'text',
      text: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'read',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current',
      type: 'text',
      text: 'I\'m doing great! Thanks for asking. How about you?',
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      status: 'read',
      isRead: true,
    },
    {
      id: '3',
      senderId: 'other',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      type: 'text',
      text: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'delivered',
      isRead: false,
    },
  ],
};

export default function Chat() {
  const { currentLanguage } = useLanguage();
  const queryClient = useQueryClient();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState({});
  const [currentCall, setCurrentCall] = useState(null);
  const [callState, setCallState] = useState({
    isConnected: false,
    isMuted: false,
    isVideoEnabled: true,
    isSpeakerEnabled: false,
    duration: 0,
  });
  const wsRef = useRef(null);
  const currentUserId = 'current'; // Replace with actual user ID from auth

  // Initialize WebSocket connection for real-time messaging
  useEffect(() => {
    // TODO: Replace with actual WebSocket connection
    // const ws = new WebSocket('wss://your-websocket-url');
    // wsRef.current = ws;
    // 
    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   handleIncomingMessage(data);
    // };
    // 
    // return () => {
    //   ws.close();
    // };
  }, []);

  const handleIncomingMessage = (messageData) => {
    setMessages((prev) => {
      const chatId = messageData.chatId;
      return {
        ...prev,
        [chatId]: [...(prev[chatId] || []), messageData.message],
      };
    });

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === messageData.chatId
          ? {
              ...conv,
              lastMessage: messageData.message.text || 'Media',
              lastMessageTime: messageData.message.timestamp,
              unreadCount: conv.id === selectedChatId ? 0 : conv.unreadCount + 1,
            }
          : conv
      )
    );
  };

  const handleSendMessage = async (text) => {
    if (!selectedChatId) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      type: 'text',
      text,
      timestamp: new Date().toISOString(),
      status: 'sending',
      isRead: false,
    };

    // Optimistic update
    setMessages((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage],
    }));

    try {
      // TODO: Replace with actual API call
      // await base44.entities.ChatMessage.create({
      //   chat_id: selectedChatId,
      //   text,
      //   type: 'text',
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update message status
      setMessages((prev) => ({
        ...prev,
        [selectedChatId]: prev[selectedChatId].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        ),
      }));

      // Update conversation
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedChatId
            ? {
                ...conv,
                lastMessage: text,
                lastMessageTime: new Date().toISOString(),
              }
            : conv
        )
      );

      // Send via WebSocket
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'message',
            chatId: selectedChatId,
            message: newMessage,
          })
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      // Revert optimistic update
      setMessages((prev) => ({
        ...prev,
        [selectedChatId]: prev[selectedChatId].filter((msg) => msg.id !== newMessage.id),
      }));
    }
  };

  const handleSendFile = async (file, type, duration) => {
    if (!selectedChatId) return;

    try {
      // Upload file
      let fileUrl = '';
      if (file instanceof Blob) {
        // For voice notes
        // TODO: Upload to S3 or your storage service
        // fileUrl = await uploadFile(file);
        fileUrl = URL.createObjectURL(file); // Temporary for demo
      } else {
        // For images/documents
        // TODO: Upload to S3
        // fileUrl = await uploadFile(file);
        fileUrl = URL.createObjectURL(file); // Temporary for demo
      }

      const messageData = {
        id: Date.now().toString(),
        senderId: currentUserId,
        type,
        timestamp: new Date().toISOString(),
        status: 'sending',
        isRead: false,
      };

      if (type === 'image') {
        messageData.imageUrl = fileUrl;
        messageData.caption = '';
      } else if (type === 'document') {
        messageData.fileUrl = fileUrl;
        messageData.fileName = file.name;
        messageData.fileSize = file.size;
        messageData.fileType = file.type;
      } else if (type === 'voice') {
        messageData.audioUrl = fileUrl;
        messageData.duration = duration || 0;
      }

      // Optimistic update
      setMessages((prev) => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] || []), messageData],
      }));

      // TODO: Save to database
      // await base44.entities.ChatMessage.create({
      //   chat_id: selectedChatId,
      //   ...messageData,
      // });

      // Update conversation
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedChatId
            ? {
                ...conv,
                lastMessage: type === 'voice' ? '🎤 Voice note' : type === 'image' ? '📷 Photo' : '📄 Document',
                lastMessageTime: new Date().toISOString(),
              }
            : conv
        )
      );

      toast.success('Message sent');
    } catch (error) {
      console.error('Error sending file:', error);
      toast.error('Failed to send file');
    }
  };

  const handleSendLocation = async (location) => {
    if (!selectedChatId) return;

    try {
      // Get address from coordinates (using reverse geocoding)
      // TODO: Use a geocoding service
      const address = `${location.latitude}, ${location.longitude}`;

      const messageData = {
        id: Date.now().toString(),
        senderId: currentUserId,
        type: 'location',
        latitude: location.latitude,
        longitude: location.longitude,
        address,
        timestamp: new Date().toISOString(),
        status: 'sent',
        isRead: false,
      };

      setMessages((prev) => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] || []), messageData],
      }));

      // TODO: Save to database
      toast.success('Location shared');
    } catch (error) {
      console.error('Error sharing location:', error);
      toast.error('Failed to share location');
    }
  };

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    // Mark as read
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === chatId ? { ...conv, unreadCount: 0 } : conv
      )
    );
    // Load messages if not loaded
    if (!messages[chatId]) {
      // TODO: Load messages from API
      setMessages((prev) => ({
        ...prev,
        [chatId]: mockMessages[chatId] || [],
      }));
    }
  };

  const handleCall = (chatId) => {
    const chat = conversations.find((c) => c.id === chatId);
    setCurrentCall({
      type: 'voice',
      contact: chat,
      isIncoming: false,
    });
  };

  const handleVideoCall = (chatId) => {
    const chat = conversations.find((c) => c.id === chatId);
    setCurrentCall({
      type: 'video',
      contact: chat,
      isIncoming: false,
    });
  };

  const handleAcceptCall = () => {
    setCallState((prev) => ({ ...prev, isConnected: true }));
    // TODO: Initialize WebRTC connection
  };

  const handleRejectCall = () => {
    setCurrentCall(null);
    setCallState({
      isConnected: false,
      isMuted: false,
      isVideoEnabled: true,
      isSpeakerEnabled: false,
      duration: 0,
    });
  };

  const handleEndCall = () => {
    setCurrentCall(null);
    setCallState({
      isConnected: false,
      isMuted: false,
      isVideoEnabled: true,
      isSpeakerEnabled: false,
      duration: 0,
    });
    // TODO: End WebRTC connection
  };

  const selectedChat = conversations.find((c) => c.id === selectedChatId);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Chat List - Hidden on mobile when chat is selected */}
      <div
        className={`
          ${selectedChatId ? 'hidden lg:flex' : 'flex'}
          w-full lg:w-96 flex-shrink-0
        `}
      >
        <ChatList
          conversations={conversations}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
          onCall={handleCall}
          onVideoCall={handleVideoCall}
          onArchive={(chatId) => {
            toast.info('Archive feature coming soon');
          }}
          onDelete={(chatId) => {
            setConversations((prev) => prev.filter((c) => c.id !== chatId));
            if (selectedChatId === chatId) {
              setSelectedChatId(null);
            }
            toast.success('Chat deleted');
          }}
          onMute={(chatId) => {
            setConversations((prev) =>
              prev.map((c) =>
                c.id === chatId ? { ...c, isMuted: !c.isMuted } : c
              )
            );
          }}
        />
      </div>

      {/* Chat Window */}
      <div
        className={`
          ${selectedChatId ? 'flex' : 'hidden lg:flex'}
          flex-1
        `}
      >
        <ChatWindow
          chat={selectedChat}
          messages={messages[selectedChatId] || []}
          currentUserId={currentUserId}
          onSendMessage={handleSendMessage}
          onSendFile={handleSendFile}
          onSendLocation={handleSendLocation}
          onCall={() => handleCall(selectedChatId)}
          onVideoCall={() => handleVideoCall(selectedChatId)}
          onBack={() => setSelectedChatId(null)}
          onMute={(chatId) => {
            setConversations((prev) =>
              prev.map((c) =>
                c.id === chatId ? { ...c, isMuted: !c.isMuted } : c
              )
            );
          }}
          onClearChat={(chatId) => {
            setMessages((prev) => ({ ...prev, [chatId]: [] }));
            toast.success('Chat cleared');
          }}
          onDeleteChat={(chatId) => {
            setConversations((prev) => prev.filter((c) => c.id !== chatId));
            setSelectedChatId(null);
            toast.success('Chat deleted');
          }}
        />
      </div>

      {/* Call Window */}
      {currentCall && (
        <CallWindow
          callType={currentCall.type}
          contact={currentCall.contact}
          isIncoming={currentCall.isIncoming}
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
          onEnd={handleEndCall}
          onToggleMute={() =>
            setCallState((prev) => ({ ...prev, isMuted: !prev.isMuted }))
          }
          onToggleVideo={() =>
            setCallState((prev) => ({
              ...prev,
              isVideoEnabled: !prev.isVideoEnabled,
            }))
          }
          onToggleSpeaker={() =>
            setCallState((prev) => ({
              ...prev,
              isSpeakerEnabled: !prev.isSpeakerEnabled,
            }))
          }
          isMuted={callState.isMuted}
          isVideoEnabled={callState.isVideoEnabled}
          isSpeakerEnabled={callState.isSpeakerEnabled}
          callDuration={callState.duration}
          isConnected={callState.isConnected}
        />
      )}
    </div>
  );
}

