import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';

export default function ProfilePhotoUpload({
  photoFile,
  setPhotoFile,
  photoPreview,
  setPhotoPreview,
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  return (
    <div className="space-y-4 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Camera className="mr-2 text-blue-600" size={20} />
        Profile Photo (Optional)
      </h3>
      <p className="text-sm text-gray-600">
        Upload a photo to personalize your profile. This will be visible to other users.
      </p>

      {!photoPreview ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="text-blue-600" size={32} />
            </div>
            <div>
              <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="flex items-center space-x-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">{photoFile?.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {photoFile && (photoFile.size / 1024).toFixed(1)} KB
              </p>
              <button
                type="button"
                onClick={handleRemove}
                className="mt-3 flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <X size={16} />
                <span>Remove Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Your photo helps others recognize you and makes your profile more personal.
      </p>
    </div>
  );
}