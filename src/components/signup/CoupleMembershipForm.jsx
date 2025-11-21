import React from 'react';
import { User, Mail, Phone, Heart, Check, MapPin, Globe } from 'lucide-react';
import { countries, languages, getStatesForCountry } from '../../data/locationData';
import ScrollableSelect from './ScrollableSelect';

export default function CoupleMembershipForm({
  member1FirstName,
  setMember1FirstName,
  member1LastName,
  setMember1LastName,
  member1Email,
  setMember1Email,
  member1Phone,
  setMember1Phone,
  member1Country,
  setMember1Country,
  member1State,
  setMember1State,
  member1City,
  setMember1City,
  member1Language,
  setMember1Language,
  member2FirstName,
  setMember2FirstName,
  member2LastName,
  setMember2LastName,
  member2Email,
  setMember2Email,
  member2Phone,
  setMember2Phone,
  member2Country,
  setMember2Country,
  member2State,
  setMember2State,
  member2City,
  setMember2City,
  member2Language,
  setMember2Language,
  member1EmailVerified,
  member1PhoneVerified,
  member1EmailVerificationSent,
  member1PhoneVerificationSent,
  member1EmailVerificationCode,
  setMember1EmailVerificationCode,
  member1PhoneVerificationCode,
  setMember1PhoneVerificationCode,
  handleSendMember1EmailVerification,
  handleVerifyMember1Email,
  handleSendMember1PhoneVerification,
  handleVerifyMember1Phone,
  member2EmailVerified,
  member2PhoneVerified,
  member2EmailVerificationSent,
  member2PhoneVerificationSent,
  member2EmailVerificationCode,
  setMember2EmailVerificationCode,
  member2PhoneVerificationCode,
  setMember2PhoneVerificationCode,
  handleSendMember2EmailVerification,
  handleVerifyMember2Email,
  handleSendMember2PhoneVerification,
  handleVerifyMember2Phone,
}) {
  return (
    <div className="space-y-6 bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border-2 border-pink-300">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-3">
          <Heart className="text-pink-600" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Couple Membership Details
        </h3>
        <p className="text-sm text-gray-600">
          Please provide information for both members of the couple
        </p>
      </div>

      {/* Member 1 Section */}
      <div className="bg-white p-4 rounded-lg border border-pink-200">
        <h4 className="text-lg font-semibold text-pink-700 mb-4 flex items-center">
          <User size={18} className="mr-2" />
          Member 1 Information *
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={member1FirstName}
                onChange={(e) => setMember1FirstName(e.target.value)}
                placeholder="First name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={member1LastName}
                onChange={(e) => setMember1LastName(e.target.value)}
                placeholder="Last name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={member1Email}
                  onChange={(e) => setMember1Email(e.target.value)}
                  placeholder="member1@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  required
                  disabled={member1EmailVerified}
                />
              </div>
              {!member1EmailVerified && (
                <button
                  type="button"
                  onClick={handleSendMember1EmailVerification}
                  disabled={!member1Email}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
                >
                  Verify
                </button>
              )}
              {member1EmailVerified && (
                <div className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center text-sm">
                  <Check size={16} className="mr-1" /> Verified
                </div>
              )}
            </div>
            {member1EmailVerificationSent && !member1EmailVerified && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 mb-2">Enter code (use: 123456)</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={member1EmailVerificationCode}
                    onChange={(e) => setMember1EmailVerificationCode(e.target.value)}
                    placeholder="123456"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyMember1Email}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={member1Phone}
                  onChange={(e) => setMember1Phone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  required
                  disabled={member1PhoneVerified}
                />
              </div>
              {!member1PhoneVerified && (
                <button
                  type="button"
                  onClick={handleSendMember1PhoneVerification}
                  disabled={member1Phone.length < 10}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
                >
                  Verify
                </button>
              )}
              {member1PhoneVerified && (
                <div className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center text-sm">
                  <Check size={16} className="mr-1" /> Verified
                </div>
              )}
            </div>
            {member1PhoneVerificationSent && !member1PhoneVerified && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 mb-2">Enter code (use: 123456)</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={member1PhoneVerificationCode}
                    onChange={(e) => setMember1PhoneVerificationCode(e.target.value)}
                    placeholder="123456"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyMember1Phone}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <ScrollableSelect
              value={member1Country}
              onChange={setMember1Country}
              options={countries}
              placeholder="Select country"
              required
              icon={<MapPin size={18} />}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Province *
            </label>
            <ScrollableSelect
              value={member1State}
              onChange={setMember1State}
              options={getStatesForCountry(member1Country)}
              placeholder="Select state/province"
              required
              icon={<MapPin size={18} />}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City/Town *
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={member1City}
                onChange={(e) => setMember1City(e.target.value)}
                placeholder="City/Town"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language Spoken *
            </label>
            <ScrollableSelect
              value={member1Language}
              onChange={setMember1Language}
              options={languages}
              placeholder="Select language"
              required
              icon={<Globe size={18} />}
            />
          </div>
        </div>
      </div>

      {/* Member 2 Section */}
      <div className="bg-white p-4 rounded-lg border border-pink-200">
        <h4 className="text-lg font-semibold text-pink-700 mb-4 flex items-center">
          <User size={18} className="mr-2" />
          Member 2 Information *
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={member2FirstName}
                onChange={(e) => setMember2FirstName(e.target.value)}
                placeholder="First name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={member2LastName}
                onChange={(e) => setMember2LastName(e.target.value)}
                placeholder="Last name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={member2Email}
                  onChange={(e) => setMember2Email(e.target.value)}
                  placeholder="member2@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  required
                  disabled={member2EmailVerified}
                />
              </div>
              {!member2EmailVerified && (
                <button
                  type="button"
                  onClick={handleSendMember2EmailVerification}
                  disabled={!member2Email}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
                >
                  Verify
                </button>
              )}
              {member2EmailVerified && (
                <div className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center text-sm">
                  <Check size={16} className="mr-1" /> Verified
                </div>
              )}
            </div>
            {member2EmailVerificationSent && !member2EmailVerified && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 mb-2">Enter code (use: 123456)</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={member2EmailVerificationCode}
                    onChange={(e) => setMember2EmailVerificationCode(e.target.value)}
                    placeholder="123456"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyMember2Email}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={member2Phone}
                  onChange={(e) => setMember2Phone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  required
                  disabled={member2PhoneVerified}
                />
              </div>
              {!member2PhoneVerified && (
                <button
                  type="button"
                  onClick={handleSendMember2PhoneVerification}
                  disabled={member2Phone.length < 10}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
                >
                  Verify
                </button>
              )}
              {member2PhoneVerified && (
                <div className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center text-sm">
                  <Check size={16} className="mr-1" /> Verified
                </div>
              )}
            </div>
            {member2PhoneVerificationSent && !member2PhoneVerified && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 mb-2">Enter code (use: 123456)</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={member2PhoneVerificationCode}
                    onChange={(e) => setMember2PhoneVerificationCode(e.target.value)}
                    placeholder="123456"
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyMember2Phone}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <ScrollableSelect
              value={member2Country}
              onChange={setMember2Country}
              options={countries}
              placeholder="Select country"
              required
              icon={<MapPin size={18} />}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Province *
            </label>
            <ScrollableSelect
              value={member2State}
              onChange={setMember2State}
              options={getStatesForCountry(member2Country)}
              placeholder="Select state/province"
              required
              icon={<MapPin size={18} />}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City/Town *
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={member2City}
                onChange={(e) => setMember2City(e.target.value)}
                placeholder="City/Town"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language Spoken *
            </label>
            <ScrollableSelect
              value={member2Language}
              onChange={setMember2Language}
              options={languages}
              placeholder="Select language"
              required
              icon={<Globe size={18} />}
            />
          </div>
        </div>
      </div>

      <div className="bg-pink-100 p-3 rounded-lg border border-pink-200">
        <p className="text-sm text-pink-800">
          <strong>Note:</strong> Both members will have access to the account and can log in with their respective credentials after signup is complete.
        </p>
      </div>
    </div>
  );
}