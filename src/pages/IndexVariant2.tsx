import { AppProvider, useApp } from '@/contexts/AppContext';
import { HeaderVariant2 } from '@/components/layout/HeaderVariant2';
import { ExecutiveChat } from '@/components/executive/ExecutiveChat';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { SecurityPanel } from '@/components/security/SecurityPanel';
import industrialBg from '@/assets/industrial-bg-2.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle, Settings, Shield } from 'lucide-react';
import { t } from '@/lib/translations';

const AppContent = () => {
  const { currentRole, setCurrentRole, language } = useApp();

  const roles = [
    { value: 'executive', icon: UserCircle, label: t('executive', language) },
    { value: 'admin', icon: Settings, label: t('admin', language) },
    { value: 'security', icon: Shield, label: t('security', language) },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center animate-fade-in"
        style={{ 
          backgroundImage: `url(${industrialBg})`,
          filter: 'brightness(0.5) contrast(1.2)',
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 backdrop-blur-sm" />
      
      {/* Floating Animated Shapes */}
      <div className="fixed top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <HeaderVariant2 />
        
        <div className="flex-1 container mx-auto px-6 py-8 animate-fade-in">
          <Tabs 
            value={currentRole} 
            onValueChange={(value) => setCurrentRole(value as any)}
            className="w-full"
          >
            {/* Glassmorphism Tabs */}
            <TabsList className="mb-8 backdrop-blur-xl bg-background/20 border border-primary/30 p-2 h-auto gap-2 shadow-2xl">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <TabsTrigger
                    key={role.value}
                    value={role.value}
                    className="
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      data-[state=active]:shadow-lg data-[state=active]:scale-105
                      transition-all duration-300 px-6 py-3 gap-2
                      hover:bg-primary/10 rounded-xl
                    "
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{role.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Content with smooth transitions */}
            <TabsContent 
              value="executive" 
              className="backdrop-blur-2xl bg-background/30 rounded-3xl border border-primary/20 shadow-2xl p-8 animate-scale-in"
            >
              <ExecutiveChat />
            </TabsContent>
            
            <TabsContent 
              value="admin"
              className="backdrop-blur-2xl bg-background/30 rounded-3xl border border-primary/20 shadow-2xl p-8 animate-scale-in"
            >
              <AdminPanel />
            </TabsContent>
            
            <TabsContent 
              value="security"
              className="backdrop-blur-2xl bg-background/30 rounded-3xl border border-primary/20 shadow-2xl p-8 animate-scale-in"
            >
              <SecurityPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const IndexVariant2 = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default IndexVariant2;
