import { Role, Language } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Moon, Sun, User } from 'lucide-react';

export const Header = () => {
  const { currentRole, setCurrentRole, language, setLanguage, theme, toggleTheme, currentUser } = useApp();

  const roleOptions: { value: Role; label: string }[] = [
    { value: 'executive', label: t('executive', language) },
    { value: 'admin', label: t('admin', language) },
    { value: 'security', label: t('security', language) }
  ];

  const langOptions: { value: Language; label: string }[] = [
    { value: 'ru', label: 'RU' },
    { value: 'kz', label: 'KZ' },
    { value: 'en', label: 'EN' }
  ];

  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--brand-navy))] to-[hsl(var(--brand-teal))] bg-clip-text text-transparent">
          {t('appTitle', language)}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Selector */}
        <Select value={currentRole} onValueChange={(value: Role) => setCurrentRole(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Language Selector */}
        <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {langOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        {/* User Info */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">{currentUser?.email}</span>
        </div>
      </div>
    </header>
  );
};
