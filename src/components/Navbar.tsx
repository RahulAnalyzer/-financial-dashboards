
import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, Moon, Search, Settings, Sun, User, BarChart2, Briefcase, Globe, TrendingUp } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glassmorphism shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-bold">
              <span className="gradient-text">Quantum</span>
              <span className="font-light">Finance</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavItem icon={BarChart2} label="Dashboard" isActive />
            <NavItem icon={Briefcase} label="Portfolio" />
            <NavItem icon={TrendingUp} label="Markets" />
            <NavItem icon={Globe} label="News" />
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                More <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-lg glassmorphism shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-white/10 hover:text-primary">
                    Analytics
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-white/10 hover:text-primary">
                    Watchlists
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-white/10 hover:text-primary">
                    Alerts
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="relative">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 hover:bg-primary/30 transition-colors">
                <User className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive }) => {
  return (
    <button 
      className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
        isActive ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <Icon className="mr-1.5 h-4 w-4" />
      {label}
    </button>
  );
};

export default Navbar;
