import React from 'react';
import { Users, Link as LinkIcon, FileText, Sparkles } from 'lucide-react';

export default function InfluencerSignupForm({
  platformLinks,
  setPlatformLinks,
  followerCount,
  setFollowerCount,
  contentCategories,
  setContentCategories,
  collaborationTypes,
  setCollaborationTypes,
  mediaKitUrl,
  setMediaKitUrl,
  influencerBio,
  setInfluencerBio,
}) {

  const handleArrayInput = (value, setter) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setter(items);
  };

  const handlePlatformChange = (platform, value) => {
    setPlatformLinks({ ...platformLinks, [platform]: value });
  };

  return (
    <div className="space-y-4 bg-pink-50 p-4 rounded-xl border border-pink-200">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Sparkles className="mr-2 text-pink-600" size={20} />
        Influencer Information
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Users className="inline mr-2" size={16} />
          Total Follower Count *
        </label>
        <input
          type="number"
          min="0"
          value={followerCount}
          onChange={(e) => setFollowerCount(e.target.value)}
          placeholder="e.g., 50000"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Combined followers across all platforms</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <LinkIcon className="inline mr-2" size={16} />
          Social Media Links *
        </label>
        <input
          type="url"
          placeholder="Instagram URL"
          value={platformLinks.instagram || ''}
          onChange={(e) => handlePlatformChange('instagram', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
        />
        <input
          type="url"
          placeholder="TikTok URL"
          value={platformLinks.tiktok || ''}
          onChange={(e) => handlePlatformChange('tiktok', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
        />
        <input
          type="url"
          placeholder="YouTube URL"
          value={platformLinks.youtube || ''}
          onChange={(e) => handlePlatformChange('youtube', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
        />
        <input
          type="url"
          placeholder="Other Platform URL"
          value={platformLinks.other || ''}
          onChange={(e) => handlePlatformChange('other', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
        />
        <p className="text-xs text-gray-500">At least one platform link is required</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content Categories *
        </label>
        <input
          type="text"
          placeholder="e.g., Relationships, Lifestyle, Beauty, Wellness (comma separated)"
          onChange={(e) => handleArrayInput(e.target.value, setContentCategories)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
          required
        />
        {contentCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {contentCategories.map((cat, idx) => (
              <span key={idx} className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Collaboration Types *
        </label>
        <input
          type="text"
          placeholder="e.g., Sponsored Posts, Product Reviews, Brand Ambassadorship (comma separated)"
          onChange={(e) => handleArrayInput(e.target.value, setCollaborationTypes)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
          required
        />
        {collaborationTypes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {collaborationTypes.map((type, idx) => (
              <span key={idx} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">
                {type}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Media Kit URL
        </label>
        <input
          type="url"
          value={mediaKitUrl}
          onChange={(e) => setMediaKitUrl(e.target.value)}
          placeholder="https://your-mediakit-link.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline mr-2" size={16} />
          Bio *
        </label>
        <textarea
          value={influencerBio}
          onChange={(e) => setInfluencerBio(e.target.value)}
          placeholder="Tell us about your content, audience, and what makes you unique as an influencer..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none resize-none"
          required
        />
        <p className="text-xs text-gray-500 mt-1">{influencerBio.length}/500 characters</p>
      </div>
    </div>
  );
}