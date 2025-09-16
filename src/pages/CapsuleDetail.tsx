import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TimeCapsule } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTimeCapsule, unlockTimeCapsule } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  LockIcon,
  UnlockIcon,
  ImageIcon,
  ShareIcon
} from 'lucide-react';

const CapsuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [capsule, setCapsule] = useState<TimeCapsule | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  useEffect(() => {
    if (id) {
      loadCapsule(id);
    }
  }, [id]);

  const loadCapsule = (capsuleId: string) => {
    const response = getTimeCapsule(capsuleId);
    if (response.success && response.data) {
      setCapsule(response.data);
    } else {
      toast({
        title: 'Capsule Not Found',
        description: 'The requested time capsule could not be found',
        variant: 'destructive'
      });
      navigate('/');
    }
  };

  const handleUnlock = async () => {
    if (!capsule || capsule.isUnlocked) return;

    // Check if capsule is ready to unlock
    if (capsule.unlockDate && new Date(capsule.unlockDate) > new Date()) {
      toast({
        title: 'Not Ready Yet',
        description: 'This capsule is not ready to be unlocked',
        variant: 'destructive'
      });
      return;
    }

    setIsUnlocking(true);
    setShowUnlockAnimation(true);

    // Simulate unlock animation delay
    setTimeout(() => {
      const response = unlockTimeCapsule(capsule.id);
      if (response.success && response.data) {
        setCapsule(response.data);
        setShowUnlockAnimation(false);
        toast({
          title: 'Time Capsule Unlocked!',
          description: 'Your memories are now revealed'
        });
      } else {
        toast({
          title: 'Unlock Failed',
          description: response.message || 'Failed to unlock capsule',
          variant: 'destructive'
        });
      }
      setIsUnlocking(false);
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share && capsule) {
      navigator.share({
        title: capsule.title,
        text: capsule.message,
        url: window.location.href
      });
    } else {
      toast({
        title: 'Shared!',
        description: 'Time capsule has been shared'
      });
    }
  };

  const getStatusInfo = () => {
    if (!capsule) return { status: 'unknown', color: 'slate', canUnlock: false };
    
    if (capsule.isUnlocked) {
      return { status: 'unlocked', color: 'green', canUnlock: false };
    }
    
    if (capsule.unlockDate && new Date(capsule.unlockDate) <= new Date()) {
      return { status: 'ready', color: 'amber', canUnlock: true };
    }
    
    return { status: 'locked', color: 'slate', canUnlock: false };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!capsule) {
    return (
      <div className="pb-20 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-slate-600">Loading capsule...</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo();

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
            Back
          </Button>
          <h1 className="text-lg font-semibold text-slate-900 truncate max-w-48">
            {capsule.title}
          </h1>
          <Button
            onClick={handleShare}
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:bg-blue-50 -mr-2 active:scale-95 transition-transform"
          >
            <ShareIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Unlock Animation Overlay */}
      {showUnlockAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 mx-4 text-center max-w-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <UnlockIcon className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Unlocking...</h3>
            <p className="text-slate-600">Revealing your precious memories</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Status Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  statusInfo.color === 'green' ? 'bg-green-100' :
                  statusInfo.color === 'amber' ? 'bg-amber-100' : 'bg-slate-100'
                }`}>
                  {capsule.isUnlocked ? (
                    <UnlockIcon className={`h-5 w-5 ${
                      statusInfo.color === 'green' ? 'text-green-600' : 'text-slate-600'
                    }`} />
                  ) : (
                    <LockIcon className={`h-5 w-5 ${
                      statusInfo.color === 'amber' ? 'text-amber-600' : 'text-slate-600'
                    }`} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{capsule.title}</h2>
                  <Badge className={`mt-1 ${
                    statusInfo.color === 'green' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                    statusInfo.color === 'amber' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                    'bg-slate-100 text-slate-800 hover:bg-slate-100'
                  }`}>
                    {statusInfo.status === 'unlocked' ? 'Unlocked' :
                     statusInfo.status === 'ready' ? 'Ready to Unlock' : 'Locked'}
                  </Badge>
                </div>
              </div>
              
              {statusInfo.canUnlock && (
                <Button
                  onClick={handleUnlock}
                  disabled={isUnlocking}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold active:scale-95 transition-transform"
                >
                  {isUnlocking ? 'Unlocking...' : 'Unlock Now'}
                </Button>
              )}
            </div>
            
            {/* Metadata */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              {capsule.unlockDate && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {capsule.isUnlocked ? 'Unlocked on' : 'Unlocks on'} {formatDate(capsule.unlockDate)}
                  </span>
                </div>
              )}
              
              {capsule.location && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{capsule.location}</span>
                </div>
              )}
              
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarIcon className="h-4 w-4" />
                <span>Created on {formatDate(capsule.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Message Section */}
          {(capsule.isUnlocked || statusInfo.canUnlock) && capsule.message && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Message</h3>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {capsule.message}
                </p>
              </div>
            </div>
          )}

          {/* Photos Section */}
          {(capsule.isUnlocked || statusInfo.canUnlock) && capsule.photos && capsule.photos.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Photos ({capsule.photos.length})
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {capsule.photos.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={photo}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => {
                        // Could open full-screen view
                        toast({
                          title: 'Photo Viewed',
                          description: `Viewing photo ${index + 1}`
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked State Message */}
          {!capsule.isUnlocked && !statusInfo.canUnlock && (
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 text-center border border-slate-200">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <LockIcon className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Still Locked</h3>
              <p className="text-slate-600 mb-4">
                This time capsule will unlock on {capsule.unlockDate ? formatDate(capsule.unlockDate) : 'the scheduled date'}.
              </p>
              <p className="text-sm text-slate-500">
                Your memories are safely preserved until then.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CapsuleDetail;