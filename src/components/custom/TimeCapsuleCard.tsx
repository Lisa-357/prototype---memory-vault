import { TimeCapsule } from '@/types';
import { Badge } from '@/components/ui/badge';
import {
  CalendarIcon,
  MapPinIcon,
  LockIcon,
  UnlockIcon,
  ImageIcon
} from 'lucide-react';

interface TimeCapsuleCardProps {
  capsule: TimeCapsule;
  onTap: () => void;
}

export const TimeCapsuleCard = ({ capsule, onTap }: TimeCapsuleCardProps) => {
  const getStatusInfo = () => {
    if (capsule.isUnlocked) {
      return { status: 'unlocked', color: 'green', icon: UnlockIcon };
    }
    
    if (capsule.unlockDate && new Date(capsule.unlockDate) <= new Date()) {
      return { status: 'ready', color: 'amber', icon: LockIcon };
    }
    
    return { status: 'locked', color: 'slate', icon: LockIcon };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div
      onClick={onTap}
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md active:scale-95 transition-all cursor-pointer min-h-[160px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-base leading-tight mb-1 truncate">
            {capsule.title}
          </h3>
          <Badge className={`text-xs font-medium ${
            statusInfo.color === 'green' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
            statusInfo.color === 'amber' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
            'bg-slate-100 text-slate-800 hover:bg-slate-100'
          }`}>
            {statusInfo.status === 'unlocked' ? 'Unlocked' :
             statusInfo.status === 'ready' ? 'Ready' : 'Locked'}
          </Badge>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-3 ${
          statusInfo.color === 'green' ? 'bg-green-100' :
          statusInfo.color === 'amber' ? 'bg-amber-100' : 'bg-slate-100'
        }`}>
          <StatusIcon className={`h-4 w-4 ${
            statusInfo.color === 'green' ? 'text-green-600' :
            statusInfo.color === 'amber' ? 'text-amber-600' : 'text-slate-600'
          }`} />
        </div>
      </div>

      {/* Message Preview */}
      {capsule.message && (
        <p className="text-sm text-slate-600 leading-relaxed mb-3 flex-1 line-clamp-2">
          {capsule.message.length > 80 
            ? `${capsule.message.substring(0, 80)}...` 
            : capsule.message}
        </p>
      )}

      {/* Media Indicator */}
      {capsule.photos && capsule.photos.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-1">
            {capsule.photos.slice(0, 3).map((photo, index) => (
              <div key={index} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                <img
                  src={photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <ImageIcon className="h-3 w-3" />
            <span>{capsule.photos.length}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        {capsule.unlockDate && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CalendarIcon className="h-3 w-3" />
            <span>
              {capsule.isUnlocked ? 'Unlocked' : 'Unlocks'} {formatDate(capsule.unlockDate)}
            </span>
          </div>
        )}
        
        {capsule.location && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPinIcon className="h-3 w-3" />
            <span className="truncate">{capsule.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};