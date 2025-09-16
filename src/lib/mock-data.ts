import { TimeCapsule } from '@/types';

export const mockTimeCapsules: TimeCapsule[] = [
  {
    id: '1',
    title: 'Summer Vacation 2024',
    message: 'What an amazing trip to the mountains! The sunrise from the peak was absolutely breathtaking. I hope when I read this next year, I remember how peaceful and happy I felt in that moment.',
    media: [
      {
        id: 'm1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        name: 'mountain-sunrise.jpg',
        size: 2048000
      },
      {
        id: 'm2', 
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
        name: 'lake-view.jpg',
        size: 1856000
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400'
    ],
    createdAt: '2024-07-15T10:30:00Z',
    unlockDate: '2025-07-15T10:30:00Z',
    location: 'Rocky Mountain National Park',
    unlockLocation: {
      latitude: 40.3428,
      longitude: -105.6836,
      name: 'Rocky Mountain National Park'
    },
    isUnlocked: false,
    theme: 'travel'
  },
  {
    id: '2',
    title: 'My 25th Birthday',
    message: 'Today I turned 25! Surrounded by friends and family, I feel so grateful for all the love in my life. This year I want to focus on personal growth and new adventures.',
    media: [
      {
        id: 'm3',
        type: 'photo', 
        url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400',
        name: 'birthday-cake.jpg',
        size: 1920000
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400'
    ],
    createdAt: '2024-03-20T18:00:00Z',
    unlockDate: '2025-03-20T18:00:00Z',
    location: 'Home Sweet Home',
    isUnlocked: false,
    theme: 'birthday'
  },
  {
    id: '3',
    title: 'First Day at New Job',
    message: 'Starting my dream job today! I am nervous but excited about this new chapter. I hope future me is proud of taking this leap of faith.',
    media: [
      {
        id: 'm4',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400',
        name: 'office-building.jpg',
        size: 2240000
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400'
    ],
    createdAt: '2024-01-15T09:00:00Z',
    unlockDate: '2024-12-15T09:00:00Z',
    location: 'Downtown Office',
    isUnlocked: true,
    unlockedAt: '2024-12-15T09:00:00Z',
    theme: 'default'
  },
  {
    id: '4',
    title: 'College Graduation',
    message: 'I did it! Four years of hard work finally paid off. Thank you to everyone who supported me along the way. The future feels bright and full of possibilities!',
    media: [
      {
        id: 'm5',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
        name: 'graduation-cap.jpg',
        size: 1680000
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
    ],
    createdAt: '2023-05-20T14:00:00Z',
    unlockDate: '2024-05-20T14:00:00Z',
    location: 'University Campus',
    isUnlocked: true,
    unlockedAt: '2024-05-20T14:00:00Z',
    theme: 'graduation'
  },
  {
    id: '5',
    title: 'Weekend Getaway',
    message: 'Sometimes you need to escape the city and reconnect with nature. This little cabin by the lake is exactly what my soul needed.',
    media: [
      {
        id: 'm6',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
        name: 'forest-path.jpg',
        size: 2100000
      },
      {
        id: 'm7',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        name: 'cabin-lake.jpg',
        size: 1950000
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ],
    createdAt: '2024-09-10T16:30:00Z',
    unlockDate: '2025-01-15T16:30:00Z',
    location: 'Lake Cabin Retreat',
    isUnlocked: false,
    theme: 'travel'
  }
];