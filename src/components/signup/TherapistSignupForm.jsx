import React from 'react';
import { Briefcase, Award, DollarSign, FileText } from 'lucide-react';

export default function TherapistSignupForm({
  licensedCountries,
  setLicensedCountries,
  licensedStates,
  setLicensedStates,
  therapyTypes,
  setTherapyTypes,
  yearsExperience,
  setYearsExperience,
  professionalBio,
  setProfessionalBio,
  certifications,
  setCertifications,
  specializations,
  setSpecializations,
  consultationFee,
  setConsultationFee,
}) {

  const handleArrayInput = (value, setter) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setter(items);
  };

  return (
    <div className="space-y-4 bg-blue-50 p-4 rounded-xl border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Briefcase className="mr-2 text-blue-600" size={20} />
        Professional Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Licensed Countries *
          </label>
          <input
            type="text"
            placeholder="e.g., USA, Canada, UK (comma separated)"
            onChange={(e) => handleArrayInput(e.target.value, setLicensedCountries)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Licensed States/Provinces *
          </label>
          <input
            type="text"
            placeholder="e.g., California, Texas, Ontario (comma separated)"
            onChange={(e) => handleArrayInput(e.target.value, setLicensedStates)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Award className="inline mr-2" size={16} />
          Therapy Types *
        </label>
        <input
          type="text"
          placeholder="e.g., Couples Therapy, Family Therapy, CBT (comma separated)"
          onChange={(e) => handleArrayInput(e.target.value, setTherapyTypes)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specializations *
        </label>
        <input
          type="text"
          placeholder="e.g., Anxiety, Depression, Trauma (comma separated)"
          onChange={(e) => handleArrayInput(e.target.value, setSpecializations)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certifications
        </label>
        <input
          type="text"
          placeholder="e.g., LMFT, LCSW, PhD (comma separated)"
          onChange={(e) => handleArrayInput(e.target.value, setCertifications)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience *
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            placeholder="e.g., 5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline mr-2" size={16} />
            Consultation Fee (USD) *
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
            placeholder="e.g., 150.00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline mr-2" size={16} />
          Professional Bio *
        </label>
        <textarea
          value={professionalBio}
          onChange={(e) => setProfessionalBio(e.target.value)}
          placeholder="Tell us about your experience, approach to therapy, and what makes you unique..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none"
          required
        />
      </div>
    </div>
  );
}