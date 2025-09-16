export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  name: string;
  size: number;
}

export interface TimeCapsule {
  id: string;
  title: string;
  message: string;
  media: MediaItem[];
  photos?: string[]; // Keep for backward compatibility
  createdAt: string;
  unlockDate?: string;
  unlockLocation?: {
    latitude: number;
    longitude: number;
    name: string;
  };
  location?: string; // Keep for backward compatibility
  isUnlocked: boolean;
  unlockedAt?: string;
  theme: 'default' | 'birthday' | 'anniversary' | 'graduation' | 'travel';
}

export interface AppSettings {
  notifications: boolean;
  soundEffects: boolean;
  theme: 'light' | 'dark';
  privacy: 'private' | 'shared';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

export type ViewType = 'gallery' | 'create' | 'unlock' | 'viewer' | 'settings';

export type CapsuleStatus = 'locked' | 'ready' | 'unlocked';

export type TriggerType = 'date' | 'location' | 'manual';