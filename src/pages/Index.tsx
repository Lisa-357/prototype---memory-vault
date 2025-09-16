import { Outlet } from 'react-router-dom';
import BottomTabBar from '@/components/custom/BottomTabBar';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Apple HIG compliant */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 safe-area-top">
        <div className="max-w-7xl mx-auto flex items-center justify-center relative">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">Memory Vault</h1>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Bottom Tab Bar - Apple HIG compliant */}
      <BottomTabBar />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;