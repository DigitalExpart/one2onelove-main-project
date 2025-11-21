import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, ArrowLeft, Users, MapPin, Heart, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/Layout';

const translations = {
  en: {
    title: 'Find Friends',
    subtitle: 'Search for friends and send friend requests',
    searchPlaceholder: 'Search by name, email, or location...',
    noResults: 'No users found',
    sendRequest: 'Send Request',
    requestSent: 'Request Sent',
    cancelRequest: 'Cancel Request',
    requestSentSuccess: 'Friend request sent successfully!',
    requestCancelled: 'Friend request cancelled',
    location: 'Location',
    relationshipStatus: 'Relationship Status',
    sharedInterests: 'Shared Interests',
    viewProfile: 'View Profile',
    back: 'Back',
  },
};

// Mock data - Replace with actual API calls
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    location: 'New York, USA',
    relationshipStatus: 'Dating',
    about: 'Love traveling, photography, and spending time with friends.',
    sharedInterests: ['Photography', 'Travel', 'Cooking'],
    isOnline: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    location: 'San Francisco, USA',
    relationshipStatus: 'Single',
    about: 'Software developer, coffee enthusiast, and weekend hiker.',
    sharedInterests: ['Technology', 'Hiking', 'Coffee'],
    isOnline: false,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    location: 'London, UK',
    relationshipStatus: 'Married',
    about: 'Yoga instructor and wellness coach. Always learning and growing.',
    sharedInterests: ['Yoga', 'Wellness', 'Meditation'],
    isOnline: true,
  },
  {
    id: '4',
    name: 'David Martinez',
    email: 'david.martinez@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    location: 'Los Angeles, USA',
    relationshipStatus: 'Engaged',
    about: 'Musician and music producer. Love creating and sharing music.',
    sharedInterests: ['Music', 'Art', 'Concerts'],
    isOnline: false,
  },
];

export default function FindFriends() {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [sentRequests, setSentRequests] = useState(new Set());
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(mockUsers);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.location.toLowerCase().includes(lowerQuery) ||
        user.sharedInterests.some((interest) =>
          interest.toLowerCase().includes(lowerQuery)
        )
    );
    setFilteredUsers(filtered);
  };

  const handleSendRequest = (userId) => {
    setSentRequests((prev) => new Set([...prev, userId]));
    toast.success(t.requestSentSuccess);
    // TODO: Send friend request to backend
    // await base44.entities.FriendRequest.create({ to_user_id: userId });
  };

  const handleCancelRequest = (userId) => {
    setSentRequests((prev) => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
    toast.success(t.requestCancelled);
    // TODO: Cancel friend request in backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('Community'))}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{t.title}</h1>
          </div>
          <p className="text-gray-600 mt-2">{t.subtitle}</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Results */}
        {filteredUsers.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{t.noResults}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => {
              const hasSentRequest = sentRequests.has(user.id);

              return (
                <Card key={user.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {user.isOnline && (
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{user.name}</CardTitle>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {user.about && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {user.about}
                      </p>
                    )}

                    <div className="space-y-2 mb-4">
                      {user.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{user.location}</span>
                        </div>
                      )}
                      {user.relationshipStatus && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Heart className="w-4 h-4" />
                          <span>{user.relationshipStatus}</span>
                        </div>
                      )}
                    </div>

                    {user.sharedInterests && user.sharedInterests.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">{t.sharedInterests}</p>
                        <div className="flex flex-wrap gap-1">
                          {user.sharedInterests.slice(0, 3).map((interest, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-purple-100 text-purple-700"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {hasSentRequest ? (
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleCancelRequest(user.id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          {t.cancelRequest}
                        </Button>
                      ) : (
                        <Button
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          onClick={() => handleSendRequest(user.id)}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          {t.sendRequest}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => {
                          // TODO: Navigate to user profile
                          toast.info('Profile view coming soon');
                        }}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

