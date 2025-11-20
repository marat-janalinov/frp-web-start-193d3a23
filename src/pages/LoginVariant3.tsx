import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IDFLogo } from '@/components/layout/IDFLogo';
import industrialBg from '@/assets/industrial-bg-3.jpg';
import { LogIn, Globe, Moon, Sun } from 'lucide-react';

const LoginVariant3 = () => {
  const [language, setLanguage] = useState<'kk' | 'ru' | 'en'>('ru');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/variant3');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const translations = {
    kk: {
      title: 'Жүйеге кіру',
      subtitle: 'Өнеркәсіпті дамыту қоры',
      description: 'Ақпараттық-аналитикалық жүйе',
      login: 'Логин',
      password: 'Құпия сөз',
      loginButton: 'Кіру'
    },
    ru: {
      title: 'Вход в систему',
      subtitle: 'Фонд развития промышленности',
      description: 'Информационно-аналитическая система',
      login: 'Логин',
      password: 'Пароль',
      loginButton: 'Войти'
    },
    en: {
      title: 'System Login',
      subtitle: 'Industrial Development Fund',
      description: 'Information and Analytical System',
      login: 'Login',
      password: 'Password',
      loginButton: 'Sign In'
    }
  };

  const t = translations[language];

  const languageNames = {
    kk: 'ҚАЗ',
    ru: 'РУС',
    en: 'ENG'
  };

  const cycleLanguage = () => {
    const langs: Array<'kk' | 'ru' | 'en'> = ['ru', 'kk', 'en'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated wave background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${industrialBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/90 to-accent/30" />
      
      {/* Animated shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-accent/40 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Floating controls - top left */}
      <div className="absolute top-6 left-6 z-20 animate-fade-in">
        <Link to="/">
          <Button variant="ghost" className="backdrop-blur-md bg-background/80 hover:bg-background/90 border border-border/50 rounded-xl shadow-lg">
            ← {language === 'ru' ? 'Назад' : language === 'kk' ? 'Артқа' : 'Back'}
          </Button>
        </Link>
      </div>

      {/* Floating controls - top right */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3 animate-fade-in">
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleLanguage}
          className="h-10 w-10 rounded-xl bg-background/80 backdrop-blur-md hover:bg-background border border-border/50 shadow-lg"
        >
          <Globe className="h-5 w-5 text-primary" />
        </Button>
        <div className="px-3 py-2 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 shadow-lg text-sm font-semibold text-foreground">
          {languageNames[language]}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 rounded-xl bg-background/80 backdrop-blur-md hover:bg-background border border-border/50 shadow-lg"
        >
          {theme === 'light' ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
        </Button>
      </div>

      {/* Center login card with wave animation */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-scale-in">
        <div className="backdrop-blur-2xl bg-card/95 rounded-3xl p-8 md:p-10 border border-border/50 shadow-2xl space-y-8">
          {/* Logo and title */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <IDFLogo className="h-20 text-foreground" language={language} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                {t.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t.subtitle}
              </p>
              <div className="flex justify-center">
                <div className="h-1 w-16 bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>

          {/* Login form */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                {t.login}
              </Label>
              <Input 
                id="login" 
                type="text" 
                placeholder={t.login}
                className="h-12 bg-background/60 border-border/50 focus:border-primary rounded-xl transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <div className="w-1 h-4 bg-accent rounded-full" />
                {t.password}
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder={t.password}
                className="h-12 bg-background/60 border-border/50 focus:border-primary rounded-xl transition-all"
              />
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              size="lg"
            >
              <LogIn className="mr-2 h-5 w-5" />
              {t.loginButton}
            </Button>
          </div>

          {/* Description */}
          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              {t.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginVariant3;
