import { TimeCapsule, CapsuleStatus } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, ImageIcon, LockIcon, UnlockIcon } from 'lucide-react';
import { format, isAfter } from 'date-fns';

interface TimeCapsuleCardProps {
  capsule: TimeCapsule;
  onUnlock: (id: string) => void;
  onView: (id: string) => void;
}

export function TimeCapsuleCard({ capsule, onUnlock, onView }: TimeCapsuleCardProps) {
  const getStatus = (): CapsuleStatus => {
    if (capsule.isUnlocked) return 'unlocked';
    if (capsule.unlockDate && isAfter(new Date(), new Date(capsule.unlockDate))) {
      return 'ready';
    }
    return 'locked';
  };

  const status = getStatus();
  const canUnlock = status === 'ready' && !capsule.isUnlocked;

  const getThemeColors = () => {
    switch (capsule.theme) {
      case 'birthday':
        return 'from-pink-50 to-purple-50 border-pink-200';
      case 'anniversary':
        return 'from-red-50 to-pink-50 border-red-200';
      case 'graduation':
        return 'from-blue-50 to-indigo-50 border-blue-200';
      case 'travel':
        return 'from-green-50 to-teal-50 border-green-200';
      default:
        return 'from-slate-50 to-gray-50 border-slate-200';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'unlocked':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Unlocked</Badge>;
      case 'ready':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Ready to Open</Badge>;
      case 'locked':
        return <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100">Locked</Badge>;
    }
  };

  return (
    <Card className={`bg-gradient-to-br ${getThemeColors()} shadow-sm hover:shadow-md transition-all duration-200 min-h-[200px] flex flex-col`}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight mb-2 text-slate-800 truncate">
              {capsule.title}
            </h3>
            {getStatusBadge()}
          </div>
          <div className="ml-3 flex-shrink-0">
            {capsule.isUnlocked ? (
              <UnlockIcon className="h-5 w-5 text-green-600" />
            ) : (
              <LockIcon className="h-5 w-5 text-slate-400" />
            )}
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {capsule.message}
        </p>

        <div className="space-y-2 mb-4">
          {capsule.unlockDate && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CalendarIcon className="h-3 w-3" />
              <span>Opens {format(new Date(capsule.unlockDate), 'MMM d, yyyy')}</span>
            </div>
          )}
          
          {capsule.unlockLocation && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPinIcon className="h-3 w-3" />
              <span className="truncate">{capsule.unlockLocation.name}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ImageIcon className="h-3 w-3" />
            <span>{capsule.media.length} {capsule.media.length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          {canUnlock && (
            <Button 
              onClick={() => onUnlock(capsule.id)}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium min-h-[40px]"
            >
              Unlock Now
            </Button>
          )}
          
          {capsule.isUnlocked && (
            <Button 
              onClick={() => onView(capsule.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium min-h-[40px]"
            >
              View Contents
            </Button>
          )}
          
          {status === 'locked' && (
            <Button 
              disabled
              className="flex-1 bg-slate-200 text-slate-500 text-sm font-medium min-h-[40px] cursor-not-allowed"
            >
              Locked
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}