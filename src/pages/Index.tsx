
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PortfolioSummary from '../components/PortfolioSummary';
import StockChart from '../components/StockChart';
import StockWatchlist from '../components/StockWatchlist';
import NewsWidget from '../components/NewsWidget';
import ThreeScene from '../components/ThreeScene';
import { Button } from '../components/ui/button';
import { Moon, Sun } from 'lucide-react';

const Index: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Set initial theme based on user preference or system setting
    const isDarkMode = localStorage.getItem('darkMode') === 'false' ? false : true;
    setDarkMode(isDarkMode);
    updateTheme(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    updateTheme(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden gradient-bg">
      {/* Three.js background */}
      <ThreeScene />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <main className="container pt-24 pb-16">
          <header className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold mb-2 gradient-text">
                Financial Dashboard
              </h1>
              <p className="text-muted-foreground">
                Track your investments, monitor market trends, and stay updated with the latest financial news.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm border-border/50"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-indigo-400" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </header>
          
          {/* Portfolio Summary */}
          <section className="mb-8 transition-all duration-500 hover:translate-y-[-5px]">
            <PortfolioSummary />
          </section>
          
          {/* Charts and Watchlist */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="transition-all duration-500 hover:translate-y-[-5px]">
                <StockChart type="area" symbol="portfolio" title="Portfolio Performance" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="transition-all duration-500 hover:translate-y-[-5px]">
                  <StockChart type="bar" symbol="AAPL" title="Apple Inc. (AAPL)" />
                </div>
                <div className="transition-all duration-500 hover:translate-y-[-5px]">
                  <StockChart type="pie" title="Asset Allocation" />
                </div>
              </div>
            </div>
            
            <div className="transition-all duration-500 hover:translate-y-[-5px]">
              <StockWatchlist className="h-[700px]" />
            </div>
          </section>
          
          {/* News */}
          <section className="transition-all duration-500 hover:translate-y-[-5px]">
            <NewsWidget />
          </section>
        </main>
        
        <footer className="glassmorphism border-t border-white/10 py-6">
          <div className="container text-center text-sm text-muted-foreground">
            <p>
              © 2023 QuantumFinance. All data is simulated and for demonstration purposes only.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
