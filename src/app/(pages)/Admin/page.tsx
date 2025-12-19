'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createPropertyWithImages } from '@/lib/propertyService';
import { PropertyFormData } from '@/types/property';
import Sidebar from '@/component/Admin/Sidebar';
import Dashboard from '@/component/Admin/Dashboard';
import PropertyList from '@/component/Admin/PropertyList';
import PropertyModal from '@/component/Admin/PropertyModal';

const PropertyDashboard = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    city: '',
    district: '',
    neighborhood: '',
    fullAddress: '',
    googleMapsAddress: '',
    price: '',
    deposit: '',
    rooms: '',
    university: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',

    propertyType: '',
    grossArea: 0,
    netArea: 0,
    buildingAge: 0,
    floor: 0,
    totalFloors: 0,
    heating: '',
    bathrooms: 0,
    kitchen: '',
    parking: '',

    inComplex: false,
    elevator: false,
    balcony: false,
    garden: false,
    furnished: false,
    smokingAllowed: false,

    gym: false,
    swimmingPool: false,
    greenArea: false,
    tv: false,
    wifi: false,
    airConditioning: false,
    microwave: false,
    dishwasher: false,
    coffeeMachine: false,
    washingMachine: false,

    images: [],
    imageUrls: []
  });


  // Mock user properties with status - You can replace this with actual data from Supabase
  const [userProperties, setUserProperties] = useState([
    {
      id: 1,
      image: '/Hero.png',
      location: 'Beşiktaş',
      price: '₺8,500/mo',
      rooms: '2+1',
      university: 'Boğaziçi University',
      area: 'Beşiktaş',
      status: 'approved' as const,
      uploadDate: '2024-01-15',
      views: 45,
      inquiries: 8
    },
    {
      id: 2,
      image: '/Hero.png',
      location: 'Kadıköy',
      price: '₺7,200/mo',
      rooms: '1+1',
      university: 'Marmara University',
      area: 'Kadıköy',
      status: 'pending' as const,
      uploadDate: '2024-01-20',
      views: 12,
      inquiries: 3
    },
    {
      id: 3,
      image: '/Hero.png',
      location: 'Şişli',
      price: '₺9,500/mo',
      rooms: '1+1',
      university: 'Istanbul University',
      area: 'Şişli',
      status: 'rejected' as const,
      uploadDate: '2024-01-18',
      rejectionReason: t('admin.dashboard.rejectionReason'),
      views: 0,
      inquiries: 0
    }
  ]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/Auth');
    }
  }, [user, loading, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#588157] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">{t('admin.loading')}</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return null;
  }





  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'amenities' || name === 'interiorFeatures') {
      const checked = (e.target as HTMLInputElement).checked;
      if (checked) {
        setFormData(prev => ({
          ...prev,
          [name]: [...(prev[name as keyof typeof prev] as string[]), value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter(a => a !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      // Limit to 10 images total
      const currentImages = formData.images || [];
      const totalImages = currentImages.length + newFiles.length;

      if (totalImages > 10) {
        alert('Maximum 10 images allowed');
        return;
      }

      // Validate file size (5MB max per file)
      const validFiles = newFiles.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is 5MB.`);
          return false;
        }
        return true;
      });

      setFormData(prev => ({
        ...prev,
        images: [...currentImages, ...validFiles]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.city || !formData.district || !formData.neighborhood ||
        !formData.fullAddress || !formData.price || !formData.deposit || !formData.rooms ||
        !formData.university || !formData.contactName || !formData.contactEmail ||
        !formData.contactPhone || !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      // Validate price and deposit are numbers
      if (isNaN(parseFloat(formData.price)) || isNaN(parseFloat(formData.deposit))) {
        throw new Error('Price and deposit must be valid numbers');
      }

      // Create property with images
      const result = await createPropertyWithImages(formData);

      console.log('Property created successfully:', result);

      // Update local state to show the new property
      const newProperty = {
        id: result.property.id!,
        image: result.images.length > 0 ? result.images[0].image_url : '/Hero.png',
        location: `${formData.neighborhood}, ${formData.district}`,
        price: `₺${formData.price}/mo`,
        rooms: formData.rooms,
        university: formData.university,
        area: formData.district,
        status: 'pending' as const,
        uploadDate: new Date().toISOString().split('T')[0],
        views: 0,
        inquiries: 0
      };

      setUserProperties(prev => [newProperty, ...prev]);

      // Show success message
      setSubmitMessage({
        type: 'success',
        text: `Property "${formData.title}" has been successfully created with ${result.images.length} images uploaded!`
      });

      // Reset form
      setFormData({
        title: '',
        city: '',
        district: '',
        neighborhood: '',
        fullAddress: '',
        googleMapsAddress: '',
        price: '',
        deposit: '',
        rooms: '',
        university: '',
        description: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',

        propertyType: '',
        grossArea: 0,
        netArea: 0,
        buildingAge: 0,
        floor: 0,
        totalFloors: 0,
        heating: '',
        bathrooms: 0,
        kitchen: '',
        parking: '',

        inComplex: false,
        elevator: false,
        balcony: false,
        garden: false,
        furnished: false,
        smokingAllowed: false,

        gym: false,
        swimmingPool: false,
        greenArea: false,
        tv: false,
        wifi: false,
        airConditioning: false,
        microwave: false,
        dishwasher: false,
        coffeeMachine: false,
        washingMachine: false,

        images: [],
        imageUrls: []
      });

      // Close modal after a short delay
      setTimeout(() => {
        setShowAddModal(false);
        setSubmitMessage(null);
      }, 2000);

    } catch (error) {
      console.error('Error submitting property:', error);

      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setSubmitMessage({
        type: 'error',
        text: `Failed to create property: ${errorMessage}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <Dashboard userProperties={userProperties} />
              {/* Temporary Debug Button */}
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Debug Tools</h3>
                <div className="space-x-2">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Debug Database Schema
                  </button>
                </div>
                <p className="text-xs text-yellow-700 mt-1">Check browser console for results</p>
              </div>
            </div>
          )}

          {/* Properties */}
          {activeTab === 'properties' && <PropertyList userProperties={userProperties} onAddProperty={() => setShowAddModal(true)} />}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">📈 {t('admin.analytics.title')}</h2>
              <p className="text-gray-600">{t('admin.analytics.comingSoon')}</p>
            </div>
          )}

          {/* Messages */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">📧 {t('admin.messages.title')}</h2>
              <p className="text-gray-600">{t('admin.messages.comingSoon')}</p>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">⚙️ {t('admin.settings.title')}</h2>
              <p className="text-gray-600">{t('admin.settings.comingSoon')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Property Modal */}
      <PropertyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        formData={formData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
      />
    </div>
  );
};

export default PropertyDashboard;
