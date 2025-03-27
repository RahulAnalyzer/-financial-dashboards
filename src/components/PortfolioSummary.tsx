
import React from 'react';
import { ArrowDownRight, ArrowUpRight, Wallet, TrendingUp, Landmark, Clock } from 'lucide-react';
import { portfolioSummary } from '../utils/mockData';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changePercent: number;
  icon: React.ReactNode;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changePercent, 
  icon,
  delay = 0 
}) => {
  const isPositive = changePercent >= 0;
  
  return (
    <div 
      className="glassmorphism rounded-xl p-4 tilt-card animate-slide-up"
      style={{ 
        animationDelay: `${delay}ms`,
        '--glow-color': isPositive ? '#10B981' : '#EF4444'
      } as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          <div className="flex items-center mt-2">
            <span className={`flex items-center text-sm ${
              isPositive ? 'text-neon-green' : 'text-neon-red'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {change} ({Math.abs(changePercent).toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className={`p-2 rounded-lg ${
          isPositive ? 'bg-neon-green/10' : 'bg-neon-red/10'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const PortfolioSummary: React.FC = () => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Portfolio Value"
        value={formatter.format(portfolioSummary.totalValue)}
        change={formatter.format(portfolioSummary.dailyChange)}
        changePercent={portfolioSummary.dailyChangePercent}
        icon={<Wallet className="h-5 w-5 text-neon-purple" />}
        delay={100}
      />
      
      <MetricCard
        title="Daily Change"
        value={formatter.format(portfolioSummary.dailyChange)}
        change={`${portfolioSummary.dailyChangePercent > 0 ? '+' : ''}${portfolioSummary.dailyChangePercent.toFixed(2)}%`}
        changePercent={portfolioSummary.dailyChangePercent}
        icon={<Clock className="h-5 w-5 text-neon-blue" />}
        delay={200}
      />
      
      <MetricCard
        title="Weekly Change"
        value={formatter.format(portfolioSummary.weeklyChange)}
        change={`${portfolioSummary.weeklyChangePercent > 0 ? '+' : ''}${portfolioSummary.weeklyChangePercent.toFixed(2)}%`}
        changePercent={portfolioSummary.weeklyChangePercent}
        icon={<TrendingUp className="h-5 w-5 text-neon-pink" />}
        delay={300}
      />
      
      <MetricCard
        title="Total Profit/Loss"
        value={formatter.format(portfolioSummary.totalProfit)}
        change={`${portfolioSummary.totalProfitPercent > 0 ? '+' : ''}${portfolioSummary.totalProfitPercent.toFixed(2)}%`}
        changePercent={portfolioSummary.totalProfitPercent}
        icon={<Landmark className="h-5 w-5 text-neon-blue" />}
        delay={400}
      />
    </div>
  );
};

export default PortfolioSummary;
