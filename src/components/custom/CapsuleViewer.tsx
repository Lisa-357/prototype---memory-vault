import { TimeCapsule } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon, ImageIcon, ClockIcon } from 'lucide-react';
import { format } from 'date-fns';

interface CapsuleViewerProps {
  open: boolean;
  capsule: TimeCapsule | null;
  onOpenChange: (open: boolean) => void;
}

export function CapsuleViewer({ open, capsule, onOpenChange }: CapsuleViewerProps) {
  if (!capsule) return null;

  const getThemeColors = () => {
    switch (capsule.theme) {
      case 'birthday':
        return {
          gradient: 'from-pink-50 to-purple-50',
          border: 'border-pink-200',
          badge: 'bg-pink-100 text-pink-800'
        };
      case 'anniversary':
        return {
          gradient: 'from-red-50 to-pink-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-800'
        };
      case 'graduation':
        return {
          gradient: 'from-blue-50 to-indigo-50',
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'travel':
        return {
          gradient: 'from-green-50 to-teal-50',
          border: 'border-green-200',
          badge: 'bg-green-100 text-green-800'
        };
      default:
        return {
          gradient: 'from-slate-50 to-gray-50',
          border: 'border-slate-200',
          badge: 'bg-slate-100 text-slate-800'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-slate-800 leading-tight">
                {capsule.title}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <Badge className={`${themeColors.badge} hover:${themeColors.badge}`}>
                  {capsule.theme.charAt(0).toUpperCase() + capsule.theme.slice(1)}
                </Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Unlocked
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Message Section */}
          <div className={`bg-gradient-to-br ${themeColors.gradient} ${themeColors.border} border p-6 rounded-lg`}>
            <h3 className="font-semibold text-lg mb-3 text-slate-800">
              Message from the Past
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {capsule.message}
            </p>
          </div>

          {/* Metadata Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Created</span>
              </div>
              <p className="text-slate-600 text-sm">
                {format(new Date(capsule.createdAt), 'PPP')}
              </p>
            </div>

            {capsule.unlockedAt && (
              <div className="bg-white border border-slate-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClockIcon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Unlocked</span>
                </div>
                <p className="text-slate-600 text-sm">
                  {format(new Date(capsule.unlockedAt), 'PPP')}
                </p>
              </div>
            )}

            {capsule.unlockDate && (
              <div className="bg-white border border-slate-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Scheduled For</span>
                </div>
                <p className="text-slate-600 text-sm">
                  {format(new Date(capsule.unlockDate), 'PPP')}
                </p>
              </div>
            )}

            {capsule.unlockLocation && (
              <div className="bg-white border border-slate-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Location</span>
                </div>
                <p className="text-slate-600 text-sm">
                  {capsule.unlockLocation.name}
                </p>
              </div>
            )}
          </div>

          {/* Media Section */}
          {capsule.media.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-slate-600" />
                <h3 className="font-semibold text-lg text-slate-800">
                  Memories ({capsule.media.length})
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {capsule.media.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-slate-100 flex items-center justify-center">
                      {item.type === 'photo' ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                          <ImageIcon className="h-8 w-8" />
                          <span className="text-sm">Video</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(item.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}