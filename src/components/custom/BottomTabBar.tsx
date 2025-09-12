import { Link, useLocation } from 'react-router-dom';
import {
  ArchiveIcon,
  SettingsIcon
} from 'lucide-react';

const BottomTabBar = () => {
  const location = useLocation();

  const tabs = [
    {
      path: '/',
      label: 'Gallery',
      icon: ArchiveIcon
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: SettingsIcon
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-colors min-h-[60px] ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${
                isActive ? 'text-blue-600' : 'text-slate-600'
              }`} />
              <span className={`text-xs font-medium ${
                isActive ? 'text-blue-600' : 'text-slate-600'
              }`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabBar;