import { AppProvider, useApp } from '@/contexts/AppContext';
import { Header } from '@/components/layout/Header';
import { ExecutiveChat } from '@/components/executive/ExecutiveChat';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { SecurityPanel } from '@/components/security/SecurityPanel';

const AppContent = () => {
  const { currentRole } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {currentRole === 'executive' && <ExecutiveChat />}
      {currentRole === 'admin' && <AdminPanel />}
      {currentRole === 'security' && <SecurityPanel />}
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
