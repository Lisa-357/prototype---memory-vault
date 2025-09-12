import { useState, useEffect } from 'react';
import { TimeCapsule } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TimeCapsuleCard } from '@/components/custom/TimeCapsuleCard';
import { CreateCapsuleModal } from '@/components/custom/CreateCapsuleModal';
import { UnlockAnimation } from '@/components/custom/UnlockAnimation';
import { CapsuleViewer } from '@/components/custom/CapsuleViewer';
import { getAllTimeCapsules, unlockTimeCapsule } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import {
  PlusIcon,
  ArchiveIcon,
  SearchIcon,
  BellIcon
} from 'lucide-react';

const Gallery = () => {
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>([]);
  const [filteredCapsules, setFilteredCapsules] = useState<TimeCapsule[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'locked' | 'ready' | 'unlocked'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [showCapsuleViewer, setShowCapsuleViewer] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<TimeCapsule | null>(null);
  const { toast } = useToast();

  // Load data on mount
  useEffect(() => {
    loadTimeCapsules();
  }, []);

  // Filter capsules based on search and status
  useEffect(() => {
    let filtered = timeCapsules;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(capsule =>
        capsule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        capsule.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(capsule => {
        if (filterStatus === 'unlocked') return capsule.isUnlocked;
        if (filterStatus === 'locked') return !capsule.isUnlocked && (!capsule.unlockDate || new Date(capsule.unlockDate) > new Date());
        if (filterStatus === 'ready') return !capsule.isUnlocked && capsule.unlockDate && new Date(capsule.unlockDate) <= new Date();
        return true;
      });
    }

    setFilteredCapsules(filtered);
  }, [timeCapsules, searchQuery, filterStatus]);

  const loadTimeCapsules = () => {
    const response = getAllTimeCapsules();
    if (response.success && response.data) {
      setTimeCapsules(response.data);
    } else {
      toast({
        title: 'Error Loading Capsules',
        description: response.message || 'Failed to load time capsules',
        variant: 'destructive'
      });
    }
  };

  const handleUnlock = (capsuleId: string) => {
    const capsule = timeCapsules.find(c => c.id === capsuleId);
    if (capsule) {
      setSelectedCapsule(capsule);
      setShowUnlockAnimation(true);
    }
  };

  const handleUnlockComplete = () => {
    if (selectedCapsule) {
      const response = unlockTimeCapsule(selectedCapsule.id);
      if (response.success) {
        loadTimeCapsules();
        setShowUnlockAnimation(false);
        setShowCapsuleViewer(true);
        toast({
          title: 'Time Capsule Unlocked!',
          description: 'Your memories are now available to view.'
        });
      } else {
        toast({
          title: 'Unlock Failed',
          description: response.message || 'Failed to unlock time capsule',
          variant: 'destructive'
        });
      }
    }
  };

  const handleView = (capsuleId: string) => {
    const capsule = timeCapsules.find(c => c.id === capsuleId);
    if (capsule) {
      setSelectedCapsule(capsule);
      setShowCapsuleViewer(true);
    }
  };

  const handleCreateSuccess = () => {
    loadTimeCapsules();
  };

  const getStatusCounts = () => {
    const locked = timeCapsules.filter(c => !c.isUnlocked && (!c.unlockDate || new Date(c.unlockDate) > new Date())).length;
    const ready = timeCapsules.filter(c => !c.isUnlocked && c.unlockDate && new Date(c.unlockDate) <= new Date()).length;
    const unlocked = timeCapsules.filter(c => c.isUnlocked).length;
    return { locked, ready, unlocked };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Your Time Capsules</h1>
              <p className="text-slate-600">Preserve your precious memories for the future</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-800">{statusCounts.locked}</p>
                <p className="text-sm text-slate-600">Locked</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-800">{statusCounts.ready}</p>
                <p className="text-sm text-amber-700">Ready</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-800">{statusCounts.unlocked}</p>
                <p className="text-sm text-green-700">Unlocked</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white border border-slate-200 p-4 rounded-lg mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search your time capsules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {(['all', 'locked', 'ready', 'unlocked'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="capitalize whitespace-nowrap"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Capsules Grid */}
        {filteredCapsules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCapsules.map((capsule) => (
              <TimeCapsuleCard
                key={capsule.id}
                capsule={capsule}
                onUnlock={handleUnlock}
                onView={handleView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ArchiveIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              {searchQuery || filterStatus !== 'all' ? 'No capsules found' : 'No time capsules yet'}
            </h3>
            <p className="text-slate-600 mb-6">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first time capsule to preserve precious memories'}
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Your First Capsule
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateCapsuleModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={handleCreateSuccess}
      />
      
      <UnlockAnimation
        open={showUnlockAnimation}
        capsule={selectedCapsule}
        onComplete={handleUnlockComplete}
      />
      
      <CapsuleViewer
        open={showCapsuleViewer}
        capsule={selectedCapsule}
        onOpenChange={setShowCapsuleViewer}
      />
    </div>
  );
};

export default Gallery;