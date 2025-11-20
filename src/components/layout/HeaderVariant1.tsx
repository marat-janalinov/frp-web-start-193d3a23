import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { IDFLogo } from '@/components/layout/IDFLogo';

export const HeaderVariant1 = () => {
  const { currentRole, setCurrentRole, language, setLanguage, theme, toggleTheme } = useApp();

  return (
    <header className="h-28 border-b border-primary/20 bg-primary text-primary-foreground animate-fade-in" style={{ boxShadow: 'var(--shadow-elevated)' }}>
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-3 hover-scale min-w-0">
          <IDFLogo className="h-16 md:h-20" language={language as 'ru' | 'kk' | 'en'} />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as any)}
            className="bg-secondary text-secondary-foreground rounded-md px-4 py-2 font-medium border-0 focus:ring-2 focus:ring-accent transition-all"
          >
            <option value="executive">{t('executive', language)}</option>
            <option value="admin">{t('admin', language)}</option>
            <option value="security">{t('security', language)}</option>
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="text-primary-foreground hover:bg-secondary/80 font-medium"
          >
            {language.toUpperCase()}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-primary-foreground hover:bg-secondary/80"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};
