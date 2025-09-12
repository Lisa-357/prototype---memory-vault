import { Outlet } from 'react-router-dom';
import BottomTabBar from '@/components/custom/BottomTabBar';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Memory Vault</h1>
        </div>
      </div>

      {/* Page Content */}
      <Outlet />
      
      {/* Bottom Tab Bar */}
      <BottomTabBar />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;