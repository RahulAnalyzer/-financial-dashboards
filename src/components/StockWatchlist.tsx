
import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ExternalLink, Star } from 'lucide-react';
import { stocks, trendingStocks, StockData } from '../utils/mockData';

interface StockItemProps {
  stock: StockData;
  showHoldings?: boolean;
}

const StockItem: React.FC<StockItemProps> = ({ stock, showHoldings = false }) => {
  const { symbol, name, price, change, changePercent, holdings } = stock;
  const isPositive = changePercent >= 0;
  
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="stock-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--glow-color': isPositive ? '#10B981' : '#EF4444'
      } as React.CSSProperties}
    >
      <div className="flex-1">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium">{symbol}</span>
              <span className="ml-2 text-xs text-muted-foreground">{name}</span>
            </div>
            
            {showHoldings && holdings && (
              <div className="text-xs text-muted-foreground mt-1">
                Holdings: ${holdings.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-medium">${price.toLocaleString()}</div>
        <div className={`flex items-center justify-end text-xs ${
          isPositive ? 'text-neon-green' : 'text-neon-red'
        }`}>
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-1" />
          )}
          {change.toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

interface StockWatchlistProps {
  className?: string;
}

const StockWatchlist: React.FC<StockWatchlistProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'trending'>('portfolio');
  
  return (
    <div className={`glassmorphism rounded-xl ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-lg font-medium">Watchlist</h3>
        
        <div className="flex rounded-lg bg-secondary/40 p-0.5">
          <button
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'portfolio' ? 'bg-background text-foreground' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'trending' ? 'bg-background text-foreground' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('trending')}
          >
            Trending
          </button>
        </div>
      </div>
      
      <div className="px-4 py-2 max-h-[350px] overflow-y-auto">
        {activeTab === 'portfolio' ? (
          stocks.map(stock => (
            <StockItem key={stock.symbol} stock={stock} showHoldings={true} />
          ))
        ) : (
          <>
            <div className="text-xs text-muted-foreground mb-2 flex items-center">
              <Star className="h-3 w-3 mr-1 text-neon-purple animate-pulse-glow" />
              Top movers today
            </div>
            {trendingStocks.map(stock => (
              <StockItem key={stock.symbol} stock={stock} />
            ))}
          </>
        )}
      </div>
      
      <div className="p-2 flex justify-center border-t border-white/10">
        <button className="text-xs text-muted-foreground hover:text-foreground flex items-center transition-colors">
          View all stocks
          <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default StockWatchlist;
