import { useState, useEffect } from 'react';
import { AppSettings } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { getSettings, saveSettings } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import {
  BellIcon,
  VolumeXIcon,
  Volume2Icon,
  ShieldIcon,
  InfoIcon,
  ChevronRightIcon,
  DatabaseIcon
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    soundEffects: true,
    theme: 'light',
    privacy: 'private'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const response = getSettings();
    if (response.success && response.data) {
      setSettings(response.data);
    }
  };

  const handleSettingChange = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    const response = saveSettings(newSettings);
    if (!response.success) {
      toast({
        title: 'Settings Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Settings Updated',
        description: 'Your preferences have been saved'
      });
    }
  };

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white px-4 pt-6 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Settings</h1>
          <p className="text-slate-600 text-base">Customize your Memory Vault experience</p>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="px-4 -mt-4">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Preferences Group */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Preferences</h2>
            </div>
            
            {/* Notifications */}
            <div className="px-4 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BellIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 text-base">Notifications</h3>
                    <p className="text-sm text-slate-600">Get notified when capsules unlock</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>
            </div>

            {/* Sound Effects */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    {settings.soundEffects ? (
                      <Volume2Icon className="h-4 w-4 text-purple-600" />
                    ) : (
                      <VolumeXIcon className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 text-base">Sound Effects</h3>
                    <p className="text-sm text-slate-600">Play sounds during unlock animations</p>
                  </div>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
                />
              </div>
            </div>
          </div>

          {/* Privacy & Security Group */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Privacy & Security</h2>
            </div>
            
            {/* Privacy Mode */}
            <div className="px-4 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <ShieldIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 text-base">Privacy Mode</h3>
                    <p className="text-sm text-slate-600">Keep all capsules private and secure</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                    {settings.privacy === 'private' ? 'Private' : 'Shared'}
                  </Badge>
                  <ChevronRightIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Storage Info */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DatabaseIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 text-base">Local Storage</h3>
                    <p className="text-sm text-slate-600">All data stored securely on your device</p>
                  </div>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* About Group */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">About</h2>
            </div>
            
            {/* App Info */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 text-base">Memory Vault</h3>
                    <p className="text-sm text-slate-600">Version 1.0.0</p>
                  </div>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Preserve Your Memories</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Create time capsules with photos, videos, and messages. Set unlock dates or locations to rediscover your precious moments at the perfect time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;