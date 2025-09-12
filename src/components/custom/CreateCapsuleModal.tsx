import { useState } from 'react';
import { TimeCapsule, MediaItem, TriggerType } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ImageIcon, MapPinIcon, XIcon } from 'lucide-react';
import { format } from 'date-fns';
import { saveTimeCapsule } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

interface CreateCapsuleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateCapsuleModal({ open, onOpenChange, onSuccess }: CreateCapsuleModalProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [triggerType, setTriggerType] = useState<TriggerType>('date');
  const [unlockDate, setUnlockDate] = useState<Date>();
  const [locationName, setLocationName] = useState('');
  const [theme, setTheme] = useState<TimeCapsule['theme']>('default');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock media items for demonstration
  const availableMedia: MediaItem[] = [
    {
      id: 'demo-1',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop',
      name: 'mountain-sunset.jpg',
      size: 1024000
    },
    {
      id: 'demo-2',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=100&fit=crop',
      name: 'beach-waves.jpg',
      size: 856000
    },
    {
      id: 'demo-3',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=150&h=100&fit=crop',
      name: 'city-night.jpg',
      size: 1200000
    },
    {
      id: 'demo-4',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=150&h=100&fit=crop',
      name: 'forest-trail.jpg',
      size: 945000
    }
  ];

  const handleMediaToggle = (mediaItem: MediaItem) => {
    setMedia(prev => {
      const exists = prev.find(m => m.id === mediaItem.id);
      if (exists) {
        return prev.filter(m => m.id !== mediaItem.id);
      } else {
        return [...prev, mediaItem];
      }
    });
  };

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both a title and message for your time capsule.',
        variant: 'destructive'
      });
      return;
    }

    if (triggerType === 'date' && !unlockDate) {
      toast({
        title: 'Missing Unlock Date',
        description: 'Please select when you want this time capsule to unlock.',
        variant: 'destructive'
      });
      return;
    }

    if (triggerType === 'location' && !locationName.trim()) {
      toast({
        title: 'Missing Location',
        description: 'Please provide a location name for your time capsule.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const newCapsule: TimeCapsule = {
        id: Date.now().toString(),
        title: title.trim(),
        message: message.trim(),
        media,
        createdAt: new Date().toISOString(),
        unlockDate: triggerType === 'date' ? unlockDate?.toISOString() : undefined,
        unlockLocation: triggerType === 'location' ? {
          latitude: 0,
          longitude: 0,
          name: locationName.trim()
        } : undefined,
        isUnlocked: false,
        theme
      };

      const response = saveTimeCapsule(newCapsule);
      
      if (response.success) {
        toast({
          title: 'Time Capsule Created!',
          description: 'Your memory has been safely stored and will unlock at the right time.'
        });
        
        // Reset form
        setTitle('');
        setMessage('');
        setTriggerType('date');
        setUnlockDate(undefined);
        setLocationName('');
        setTheme('default');
        setMedia([]);
        
        onOpenChange(false);
        onSuccess();
      } else {
        throw new Error(response.message || 'Failed to create time capsule');
      }
    } catch (error) {
      toast({
        title: 'Creation Failed',
        description: 'There was an error creating your time capsule. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Create New Time Capsule
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-slate-700">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your time capsule a memorable title"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-slate-700">
              Message to Future Self
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message to your future self about this moment..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Unlock Trigger
              </Label>
              <Select value={triggerType} onValueChange={(value: TriggerType) => setTriggerType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Specific Date</SelectItem>
                  <SelectItem value="location">Location Based</SelectItem>
                  <SelectItem value="manual">Manual Unlock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Theme
              </Label>
              <Select value={theme} onValueChange={(value: TimeCapsule['theme']) => setTheme(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {triggerType === 'date' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Unlock Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {unlockDate ? format(unlockDate, 'PPP') : 'Select unlock date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={unlockDate}
                    onSelect={setUnlockDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {triggerType === 'location' && (
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-slate-700">
                Location Name
              </Label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="location"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Enter location name (e.g., 'Home', 'Paris', 'Coffee Shop')"
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Select Photos ({media.length} selected)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableMedia.map((item) => {
                const isSelected = media.find(m => m.id === item.id);
                return (
                  <div
                    key={item.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleMediaToggle(item)}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-20 object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <XIcon className="h-3 w-3" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Time Capsule'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}