import React from 'react';
import { Building, Briefcase, FileText, Globe, ChevronDown } from 'lucide-react';

export default function OtherUserSignupForm({
  organizationName,
  setOrganizationName,
  organizationType,
  setOrganizationType,
  serviceDescription,
  setServiceDescription,
  websiteUrl,
  setWebsiteUrl,
  otherUserBio,
  setOtherUserBio,
}) {

  return (
    <div className="space-y-4 bg-blue-50 p-4 rounded-xl border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Building className="mr-2 text-blue-600" size={20} />
        Professional Information
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Building className="inline mr-2" size={16} />
          Practice/Organization Name *
        </label>
        <input
          type="text"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          placeholder="e.g., Wellness Coaching Services, Smith Therapy Practice"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="inline mr-2" size={16} />
          Practice Type *
        </label>
        <div className="relative">
          <select
            value={organizationType}
            onChange={(e) => setOrganizationType(e.target.value)}
            className="w-full px-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none appearance-none bg-white"
            required
          >
            <option value="">Select type...</option>
            <option value="private_practice">Private Practice</option>
            <option value="group_practice">Group Practice</option>
            <option value="clinic">Clinic/Center</option>
            <option value="coaching_business">Coaching Business</option>
            <option value="consulting">Consulting</option>
            <option value="nonprofit">Non-Profit</option>
            <option value="media">Media/Publishing</option>
            <option value="independent">Independent Professional</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Globe className="inline mr-2" size={16} />
          Website URL
        </label>
        <input
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://www.yourwebsite.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Services You Offer *
        </label>
        <textarea
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
          placeholder="Describe the services you provide (e.g., therapy sessions, coaching programs, financial planning, articles, podcasts)..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none"
          required
        />
        <p className="text-xs text-gray-500 mt-1">{serviceDescription.length}/500 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline mr-2" size={16} />
          Professional Bio *
        </label>
        <textarea
          value={otherUserBio}
          onChange={(e) => setOtherUserBio(e.target.value)}
          placeholder="Tell us about your background, credentials, experience, and approach to helping people..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none"
          required
        />
        <p className="text-xs text-gray-500 mt-1">{otherUserBio.length}/1000 characters</p>
      </div>

      <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Your profile will be reviewed by our team before being approved to ensure quality and alignment with our community values.
        </p>
      </div>
    </div>
  );
}