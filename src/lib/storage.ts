import { TimeCapsule, AppSettings, ApiResponse } from '@/types';
import { mockTimeCapsules } from './mock-data';

const STORAGE_KEYS = {
  TIME_CAPSULES: 'memory-vault-capsules',
  SETTINGS: 'memory-vault-settings',
  INITIALIZED: 'memory-vault-initialized'
} as const;

const defaultSettings: AppSettings = {
  notifications: true,
  soundEffects: true,
  theme: 'light',
  privacy: 'private'
};

// Initialize with mock data if first time
function initializeStorage(): void {
  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (!initialized) {
    localStorage.setItem(STORAGE_KEYS.TIME_CAPSULES, JSON.stringify(mockTimeCapsules));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
}

export function getAllTimeCapsules(): ApiResponse<TimeCapsule[]> {
  try {
    initializeStorage();
    const stored = localStorage.getItem(STORAGE_KEYS.TIME_CAPSULES);
    const capsules = stored ? JSON.parse(stored) : [];
    return { success: true, data: capsules };
  } catch (error) {
    console.error('Error loading time capsules:', error);
    return { success: false, data: null, message: 'Failed to load time capsules' };
  }
}

export function getTimeCapsuleById(id: string): ApiResponse<TimeCapsule> {
  try {
    const response = getAllTimeCapsules();
    if (!response.success || !response.data) {
      return { success: false, data: null, message: 'Failed to load time capsules' };
    }
    
    const capsule = response.data.find(c => c.id === id);
    if (!capsule) {
      return { success: false, data: null, message: 'Time capsule not found' };
    }
    
    return { success: true, data: capsule };
  } catch (error) {
    console.error('Error loading time capsule:', error);
    return { success: false, data: null, message: 'Failed to load time capsule' };
  }
}

// Alias for backward compatibility
export const getTimeCapsule = getTimeCapsuleById;

export function saveTimeCapsule(capsule: TimeCapsule): ApiResponse<TimeCapsule> {
  try {
    const response = getAllTimeCapsules();
    if (!response.success || !response.data) {
      return { success: false, data: null, message: 'Failed to load existing capsules' };
    }
    
    const capsules = response.data;
    const existingIndex = capsules.findIndex(c => c.id === capsule.id);
    
    if (existingIndex >= 0) {
      capsules[existingIndex] = capsule;
    } else {
      capsules.push(capsule);
    }
    
    localStorage.setItem(STORAGE_KEYS.TIME_CAPSULES, JSON.stringify(capsules));
    return { success: true, data: capsule };
  } catch (error) {
    console.error('Error saving time capsule:', error);
    return { success: false, data: null, message: 'Failed to save time capsule' };
  }
}

export function createTimeCapsule(capsuleData: Omit<TimeCapsule, 'id'>): ApiResponse<TimeCapsule> {
  try {
    const newCapsule: TimeCapsule = {
      ...capsuleData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    return saveTimeCapsule(newCapsule);
  } catch (error) {
    console.error('Error creating time capsule:', error);
    return { success: false, data: null, message: 'Failed to create time capsule' };
  }
}

export function unlockTimeCapsule(id: string): ApiResponse<TimeCapsule> {
  try {
    const response = getTimeCapsuleById(id);
    if (!response.success || !response.data) {
      return response;
    }
    
    const capsule = response.data;
    const unlockedCapsule = {
      ...capsule,
      isUnlocked: true,
      unlockedAt: new Date().toISOString()
    };
    
    return saveTimeCapsule(unlockedCapsule);
  } catch (error) {
    console.error('Error unlocking time capsule:', error);
    return { success: false, data: null, message: 'Failed to unlock time capsule' };
  }
}

export function deleteTimeCapsule(id: string): ApiResponse<boolean> {
  try {
    const response = getAllTimeCapsules();
    if (!response.success || !response.data) {
      return { success: false, data: null, message: 'Failed to load time capsules' };
    }
    
    const capsules = response.data.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.TIME_CAPSULES, JSON.stringify(capsules));
    return { success: true, data: true };
  } catch (error) {
    console.error('Error deleting time capsule:', error);
    return { success: false, data: null, message: 'Failed to delete time capsule' };
  }
}

export function getSettings(): ApiResponse<AppSettings> {
  try {
    initializeStorage();
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const settings = stored ? JSON.parse(stored) : defaultSettings;
    return { success: true, data: settings };
  } catch (error) {
    console.error('Error loading settings:', error);
    return { success: false, data: null, message: 'Failed to load settings' };
  }
}

export function saveSettings(settings: AppSettings): ApiResponse<AppSettings> {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return { success: true, data: settings };
  } catch (error) {
    console.error('Error saving settings:', error);
    return { success: false, data: null, message: 'Failed to save settings' };
  }
}