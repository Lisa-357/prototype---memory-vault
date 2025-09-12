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
  InfoIcon
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
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Settings</h1>
          <p className="text-slate-600">Customize your Memory Vault experience</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-200">
          {/* Notifications */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BellIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">Notifications</h3>
                  <p className="text-sm text-slate-600">Get notified when capsules are ready to unlock</p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>
          </div>

          {/* Sound Effects */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  {settings.soundEffects ? (
                    <Volume2Icon className="h-5 w-5 text-purple-600" />
                  ) : (
                    <VolumeXIcon className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">Sound Effects</h3>
                  <p className="text-sm text-slate-600">Play sounds during unlock animations</p>
                </div>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
              />
            </div>
          </div>

          {/* Privacy */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShieldIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">Privacy Mode</h3>
                  <p className="text-sm text-slate-600">Keep all capsules private and secure</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                {settings.privacy === 'private' ? 'Private' : 'Shared'}
              </Badge>
            </div>
          </div>

          {/* Storage Info */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <InfoIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Storage</h3>
                <p className="text-sm text-slate-600">All data is stored locally on your device</p>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <InfoIcon className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">About Memory Vault</h3>
                <p className="text-sm text-slate-600">Version 1.0.0 - Preserve your precious memories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;