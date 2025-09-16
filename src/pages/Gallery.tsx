import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimeCapsule } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TimeCapsuleCard } from '@/components/custom/TimeCapsuleCard';
import { getAllTimeCapsules } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import {
  PlusIcon,
  ArchiveIcon,
  SearchIcon
} from 'lucide-react';

const Gallery = () => {
  const navigate = useNavigate();
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>([]);
  const [filteredCapsules, setFilteredCapsules] = useState<TimeCapsule[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'locked' | 'ready' | 'unlocked'>('all');
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

  const handleCapsuleTap = (capsuleId: string) => {
    navigate(`/capsule/${capsuleId}`);
  };

  const getStatusCounts = () => {
    const locked = timeCapsules.filter(c => !c.isUnlocked && (!c.unlockDate || new Date(c.unlockDate) > new Date())).length;
    const ready = timeCapsules.filter(c => !c.isUnlocked && c.unlockDate && new Date(c.unlockDate) <= new Date()).length;
    const unlocked = timeCapsules.filter(c => c.isUnlocked).length;
    return { locked, ready, unlocked };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      {/* Hero Section - iOS style */}
      <div className="bg-gradient-to-b from-blue-50 to-white px-4 pt-6 pb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Your Memories</h1>
          <p className="text-slate-600 text-base mb-6">Preserve precious moments for the future</p>
          
          {/* Create Button - iOS style prominent CTA */}
          <Button
            onClick={() => navigate('/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            size="lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Time Capsule
          </Button>
        </div>
      </div>

      {/* Stats Cards - iOS Card style */}
      <div className="px-4 -mt-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 active:bg-slate-50 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{statusCounts.locked}</p>
                <p className="text-xs text-slate-600 font-medium">Locked</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 active:bg-amber-50 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-2xl font-bold text-amber-700 mb-1">{statusCounts.ready}</p>
                <p className="text-xs text-amber-600 font-medium">Ready</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 active:bg-green-50 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-2xl font-bold text-green-700 mb-1">{statusCounts.unlocked}</p>
                <p className="text-xs text-green-600 font-medium">Unlocked</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters - iOS style */}
      <div className="px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search your memories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200 rounded-xl bg-slate-50 focus:bg-white transition-colors"
                />
              </div>
              
              {/* Filter Pills - iOS style segmented control */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(['all', 'locked', 'ready', 'unlocked'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className={`capitalize whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                      filterStatus === status 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 active:bg-slate-100'
                    }`}
                  >
                    {status === 'all' ? 'All' : status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capsules Grid - iOS style cards */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          {filteredCapsules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCapsules.map((capsule) => (
                <TimeCapsuleCard
                  key={capsule.id}
                  capsule={capsule}
                  onTap={() => handleCapsuleTap(capsule.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArchiveIcon className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {searchQuery || filterStatus !== 'all' ? 'No capsules found' : 'No memories yet'}
              </h3>
              <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters to find what you\'re looking for'
                  : 'Start preserving your precious moments by creating your first time capsule'}
              </p>
              {!searchQuery && filterStatus === 'all' && (
                <Button
                  onClick={() => navigate('/create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold active:scale-95 transition-transform"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Your First Capsule
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;