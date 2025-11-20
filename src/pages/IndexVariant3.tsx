import { AppProvider } from '@/contexts/AppContext';
import { ExecutiveChatVariant3 } from '@/components/executive/ExecutiveChatVariant3';
import industrialBg from '@/assets/industrial-bg-3.jpg';

const AppContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 relative overflow-hidden">
      {/* Subtle animated background */}
      <div 
        className="fixed inset-0 opacity-[0.03] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${industrialBg})` }}
      />
      
      {/* Animated gradient orbs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '12s' }} />
      <div className="fixed bottom-20 left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '15s', animationDelay: '3s' }} />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="relative z-10 min-h-screen">
        <ExecutiveChatVariant3 />
      </div>
    </div>
  );
};

const IndexVariant3 = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default IndexVariant3;
