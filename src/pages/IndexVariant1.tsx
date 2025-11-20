import { AppProvider, useApp } from '@/contexts/AppContext';
import { HeaderVariant1 } from '@/components/layout/HeaderVariant1';
import { ExecutiveChat } from '@/components/executive/ExecutiveChat';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { SecurityPanel } from '@/components/security/SecurityPanel';
import industrialBg from '@/assets/industrial-bg-1.jpg';

const AppContent = () => {
  const { currentRole } = useApp();

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat animate-fade-in"
        style={{ 
          backgroundImage: `url(${industrialBg})`,
          filter: 'brightness(0.95) contrast(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-fade-in" />
      <div className="relative z-10">
        <HeaderVariant1 />
        <div className="animate-scale-in overflow-hidden">
          {currentRole === 'executive' && <ExecutiveChat />}
          {currentRole === 'admin' && <AdminPanel />}
          {currentRole === 'security' && <SecurityPanel />}
        </div>
      </div>
    </div>
  );
};

const IndexVariant1 = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default IndexVariant1;
