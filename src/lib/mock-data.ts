import { TimeCapsule, MediaItem } from '@/types';

const mockMedia: MediaItem[] = [
  {
    id: '1',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=150&fit=crop',
    name: 'sunset-beach.jpg',
    size: 2048576
  },
  {
    id: '2',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop',
    name: 'mountain-view.jpg',
    size: 1843200
  },
  {
    id: '3',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=200&h=150&fit=crop',
    name: 'city-lights.jpg',
    size: 2359296
  },
  {
    id: '4',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=150&fit=crop',
    name: 'forest-path.jpg',
    size: 1920000
  }
];

export const mockTimeCapsules: TimeCapsule[] = [
  {
    id: '1',
    title: 'Summer Vacation 2024',
    message: 'What an amazing trip to the coast! The sunsets were incredible and we made so many memories. I hope future me remembers how peaceful this felt.',
    media: [mockMedia[0], mockMedia[1]],
    createdAt: '2024-07-15T10:30:00Z',
    unlockDate: '2025-07-15T10:30:00Z',
    isUnlocked: false,
    theme: 'travel'
  },
  {
    id: '2',
    title: 'Graduation Day',
    message: 'Finally graduated! All those late nights studying paid off. Feeling proud and excited for what comes next.',
    media: [mockMedia[2]],
    createdAt: '2024-05-20T14:00:00Z',
    unlockDate: '2025-05-20T14:00:00Z',
    isUnlocked: true,
    unlockedAt: '2024-12-01T09:15:00Z',
    theme: 'graduation'
  },
  {
    id: '3',
    title: 'First Day at New Job',
    message: 'Starting my dream job today! Nervous but excited. This feels like the beginning of something amazing.',
    media: [mockMedia[3]],
    createdAt: '2024-09-01T08:00:00Z',
    unlockDate: '2025-09-01T08:00:00Z',
    isUnlocked: false,
    theme: 'default'
  },
  {
    id: '4',
    title: 'Anniversary Surprise',
    message: 'Two years together and still going strong! Planning something special for our future selves to remember this moment.',
    media: [mockMedia[0], mockMedia[2]],
    createdAt: '2024-03-14T19:30:00Z',
    unlockDate: '2025-03-14T19:30:00Z',
    isUnlocked: false,
    theme: 'anniversary'
  },
  {
    id: '5',
    title: 'Birthday Wishes',
    message: 'Another year older, another year wiser! Grateful for all the experiences and looking forward to what this new year brings.',
    media: [mockMedia[1], mockMedia[3]],
    createdAt: '2024-11-08T12:00:00Z',
    unlockDate: '2024-12-15T12:00:00Z',
    isUnlocked: false,
    theme: 'birthday'
  }
];