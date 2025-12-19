'use client';

import { useState } from 'react';

interface ImageUploadSectionProps {
    formData: {
        images?: File[];
        imageUrls?: string[];
    };
    handleImageChange?: (files: FileList | null) => void;
}

const ImageUploadSection = ({ formData, handleImageChange }: ImageUploadSectionProps) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && handleImageChange) {
            handleImageChange(e.dataTransfer.files);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && handleImageChange) {
            handleImageChange(e.target.files);
        }
    };

    const removeImage = (indexToRemove: number) => {
        if (formData.images && handleImageChange) {
            const dataTransfer = new DataTransfer();
            Array.from(formData.images).forEach((file, index) => {
                if (index !== indexToRemove) {
                    dataTransfer.items.add(file);
                }
            });
            handleImageChange(dataTransfer.files);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Property Images</h3>

            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center">
                    <svg
                        className="w-12 h-12 text-gray-400 mb-4"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="text-gray-600 mb-2 font-medium">Drag and drop images here, or click to select</p>
                    <p className="text-sm text-gray-500 mb-4">PNG, JPG, JPEG up to 5MB each (Max 10 images)</p>

                    <input
                        type="file"
                        multiple
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                        max={10}
                    />
                    <label
                        htmlFor="file-upload"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-200 font-medium"
                    >
                        Choose Files
                    </label>
                </div>
            </div>

            {/* Preview uploaded images */}
            {(formData.images && formData.images.length > 0) && (
                <div className="mt-6">
                    <h4 className="text-md font-medium mb-3 text-gray-700">
                        Selected Images ({formData.images.length}/10)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from(formData.images).map((file, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border shadow-sm"
                                />
                                <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                    {file.name.length > 12 ? `${file.name.substring(0, 12)}...` : file.name}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                    aria-label={`Remove ${file.name}`}
                                >
                                    ×
                                </button>
                                {index === 0 && (
                                    <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        Main
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        The first image will be used as the main property image.
                    </p>
                </div>
            )}

            {/* Display existing image URLs if available */}
            {(formData.imageUrls && formData.imageUrls.length > 0) && (
                <div className="mt-6">
                    <h4 className="text-md font-medium mb-3 text-gray-700">Current Images</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.imageUrls.map((url, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={url}
                                    alt={`Current ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border shadow-sm"
                                />
                                {index === 0 && (
                                    <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        Main
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploadSection;
