import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimeCapsule, MediaItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createTimeCapsule } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ImageIcon,
  MapPinIcon,
  CheckIcon
} from 'lucide-react';

const CreateCapsule = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    unlockDate: '',
    location: '',
    media: [] as MediaItem[],
    theme: 'default' as const
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoAdd = () => {
    // Simulate photo selection
    const mockPhotos = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
    ];
    const randomPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
    
    const newMediaItem: MediaItem = {
      id: Date.now().toString(),
      type: 'photo',
      url: randomPhoto,
      thumbnail: randomPhoto,
      name: `Photo ${formData.media.length + 1}`,
      size: 1024000 // 1MB mock size
    };
    
    setFormData(prev => ({
      ...prev,
      media: [...prev.media, newMediaItem]
    }));
    toast({
      title: 'Photo Added',
      description: 'Photo has been added to your time capsule'
    });
  };

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleCreate = async () => {
    if (!formData.title.trim()) {
      toast({
        title: 'Title Required',
        description: 'Please enter a title for your time capsule',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.unlockDate) {
      toast({
        title: 'Date Required',
        description: 'Please select when to unlock this capsule',
        variant: 'destructive'
      });
      return;
    }

    setIsCreating(true);

    try {
      const newCapsule: Omit<TimeCapsule, 'id'> = {
        title: formData.title,
        message: formData.message,
        media: formData.media,
        unlockDate: formData.unlockDate,
        location: formData.location || undefined,
        createdAt: new Date().toISOString(),
        isUnlocked: false,
        theme: formData.theme
      };

      const response = createTimeCapsule(newCapsule);
      
      if (response.success) {
        toast({
          title: 'Time Capsule Created!',
          description: 'Your memories have been safely stored'
        });
        navigate('/');
      } else {
        throw new Error(response.message || 'Failed to create capsule');
      }
    } catch (error) {
      toast({
        title: 'Creation Failed',
        description: error instanceof Error ? error.message : 'Failed to create time capsule',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      {/* Header - iOS style navigation */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-blue-600 hover:bg-blue-50 -ml-2 active:scale-95 transition-transform"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Cancel
          </Button>
          <h1 className="text-lg font-semibold text-slate-900">New Time Capsule</h1>
          <Button
            onClick={handleCreate}
            disabled={isCreating || !formData.title.trim() || !formData.unlockDate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 active:scale-95 transition-transform"
            size="sm"
          >
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Title Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <Label htmlFor="title" className="text-base font-semibold text-slate-900 mb-3 block">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Give your time capsule a name..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="border-slate-200 rounded-xl text-base p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Message Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <Label htmlFor="message" className="text-base font-semibold text-slate-900 mb-3 block">
              Message to Future Self
            </Label>
            <Textarea
              id="message"
              placeholder="Write a message to your future self..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              className="border-slate-200 rounded-xl text-base p-4 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Photos Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold text-slate-900">
                Photos & Videos
              </Label>
              <Button
                onClick={handlePhotoAdd}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 rounded-lg active:scale-95 transition-transform"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </div>
            
            {formData.media.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {formData.media.map((mediaItem, index) => (
                  <div key={mediaItem.id} className="relative group">
                    <img
                      src={mediaItem.url}
                      alt={mediaItem.name}
                      className="w-full h-24 object-cover rounded-xl border border-slate-200"
                    />
                    <Button
                      onClick={() => handleRemovePhoto(index)}
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                <ImageIcon className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 text-sm">No photos added yet</p>
              </div>
            )}
          </div>

          {/* Unlock Date Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <Label htmlFor="unlockDate" className="text-base font-semibold text-slate-900 mb-3 block">
              <CalendarIcon className="h-4 w-4 inline mr-2" />
              Unlock Date
            </Label>
            <Input
              id="unlockDate"
              type="date"
              value={formData.unlockDate}
              onChange={(e) => handleInputChange('unlockDate', e.target.value)}
              min={getTomorrowDate()}
              className="border-slate-200 rounded-xl text-base p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <Label htmlFor="location" className="text-base font-semibold text-slate-900 mb-3 block">
              <MapPinIcon className="h-4 w-4 inline mr-2" />
              Location (Optional)
            </Label>
            <Input
              id="location"
              placeholder="Where was this memory created?"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="border-slate-200 rounded-xl text-base p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Preview Section */}
          {(formData.title || formData.message || formData.media.length > 0) && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                <CheckIcon className="h-4 w-4 mr-2 text-green-600" />
                Preview
              </h3>
              <div className="space-y-3">
                {formData.title && (
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Title:</span> {formData.title}
                  </p>
                )}
                {formData.message && (
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Message:</span> {formData.message.substring(0, 100)}{formData.message.length > 100 ? '...' : ''}
                  </p>
                )}
                {formData.media.length > 0 && (
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Photos:</span> {formData.media.length} photo{formData.media.length !== 1 ? 's' : ''} added
                  </p>
                )}
                {formData.unlockDate && (
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Unlocks:</span> {new Date(formData.unlockDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCapsule;