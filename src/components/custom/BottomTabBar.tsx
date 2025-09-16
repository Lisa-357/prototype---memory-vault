import { useLocation, useNavigate } from 'react-router-dom';
import { ArchiveIcon, SettingsIcon } from 'lucide-react';

const BottomTabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'gallery',
      label: 'Gallery',
      icon: ArchiveIcon,
      path: '/'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingsIcon,
      path: '/settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-bottom">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors ${
                isActive 
                  ? 'text-blue-600' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`} />
              <span className={`text-xs font-medium ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabBar;