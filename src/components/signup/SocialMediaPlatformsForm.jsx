import React from 'react';
import { Instagram, Twitter, Youtube, Music, Linkedin, Facebook } from 'lucide-react';

const platforms = [
  { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/yourhandle' },
  { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/yourprofile' },
  { key: 'twitter', label: 'Twitter/X', icon: Twitter, placeholder: 'https://twitter.com/yourhandle' },
  { key: 'tiktok', label: 'TikTok', icon: Music, placeholder: 'https://tiktok.com/@yourhandle' },
  { key: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@yourchannel' },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/yourprofile' },
];

export default function SocialMediaPlatformsForm({
  socialMediaPlatforms,
  setSocialMediaPlatforms,
}) {

  const handlePlatformChange = (platform, value) => {
    if (value.trim() === '') {
      const updated = { ...socialMediaPlatforms };
      delete updated[platform];
      setSocialMediaPlatforms(updated);
    } else {
      setSocialMediaPlatforms({ ...socialMediaPlatforms, [platform]: value });
    }
  };

  return (
    <div className="space-y-4 bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Instagram className="mr-2 text-pink-600" size={20} />
        Social Media Platforms (Optional)
      </h3>
      <p className="text-sm text-gray-600">
        Connect your social media accounts to share with the community. Select all that apply.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.key}>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Icon size={16} className="mr-2 text-gray-600" />
                {platform.label}
              </label>
              <input
                type="url"
                value={socialMediaPlatforms[platform.key] || ''}
                onChange={(e) => handlePlatformChange(platform.key, e.target.value)}
                placeholder={platform.placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
              />
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        These links will be displayed on your profile and help others connect with you.
      </p>
    </div>
  );
}