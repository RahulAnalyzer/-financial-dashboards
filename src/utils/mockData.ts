
import { type } from "os";

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  holdings?: number;
  shares?: number;
}

export interface PortfolioSummary {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  weeklyChange: number;
  weeklyChangePercent: number;
  totalProfit: number;
  totalProfitPercent: number;
}

export interface AssetAllocation {
  sector: string;
  value: number;
  color: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  summary: string;
  impact: 'positive' | 'negative' | 'neutral';
  relatedSymbols: string[];
}

export interface HistoricalData {
  date: string;
  value: number;
}

// Mock stock data
export const stocks: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.42,
    change: 3.65,
    changePercent: 2.09,
    volume: 68403100,
    marketCap: 2800000000000,
    holdings: 43690.24,
    shares: 245
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 334.58,
    change: 5.23,
    changePercent: 1.59,
    volume: 22611200,
    marketCap: 2490000000000,
    holdings: 36803.80,
    shares: 110
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 139.99,
    change: -2.31,
    changePercent: -1.62,
    volume: 27584300,
    marketCap: 1760000000000,
    holdings: 27998.00,
    shares: 200
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 134.68,
    change: 1.93,
    changePercent: 1.45,
    volume: 39281000,
    marketCap: 1390000000000,
    holdings: 20202.00,
    shares: 150
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 242.71,
    change: -5.62,
    changePercent: -2.26,
    volume: 121628000,
    marketCap: 772000000000,
    holdings: 12135.50,
    shares: 50
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 450.05,
    change: 11.47,
    changePercent: 2.62,
    volume: 36284900,
    marketCap: 1110000000000,
    holdings: 45005.00,
    shares: 100
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 315.22,
    change: 8.73,
    changePercent: 2.85,
    volume: 16923800,
    marketCap: 808000000000,
    holdings: 31522.00,
    shares: 100
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    price: 235.36,
    change: -1.12,
    changePercent: -0.47,
    volume: 7124900,
    marketCap: 481000000000,
    holdings: 23536.00,
    shares: 100
  }
];

// Mock trending stocks
export const trendingStocks: StockData[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 450.05,
    change: 11.47,
    changePercent: 2.62,
    volume: 36284900,
    marketCap: 1110000000000
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 315.22,
    change: 8.73,
    changePercent: 2.85,
    volume: 16923800,
    marketCap: 808000000000
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.42,
    change: 3.65,
    changePercent: 2.09,
    volume: 68403100,
    marketCap: 2800000000000
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    price: 105.39,
    change: 4.98,
    changePercent: 4.96,
    volume: 73941300,
    marketCap: 170000000000
  }
];

// Mock portfolio summary
export const portfolioSummary: PortfolioSummary = {
  totalValue: 240892.54,
  dailyChange: 2187.43,
  dailyChangePercent: 0.92,
  weeklyChange: 5432.12,
  weeklyChangePercent: 2.31,
  totalProfit: 54321.87,
  totalProfitPercent: 29.13
};

// Mock asset allocation
export const assetAllocation: AssetAllocation[] = [
  { sector: 'Technology', value: 45, color: '#8B5CF6' },
  { sector: 'Consumer Cyclical', value: 15, color: '#0EA5E9' },
  { sector: 'Financial Services', value: 12, color: '#10B981' },
  { sector: 'Healthcare', value: 10, color: '#D946EF' },
  { sector: 'Energy', value: 8, color: '#F59E0B' },
  { sector: 'Real Estate', value: 6, color: '#EC4899' },
  { sector: 'Utilities', value: 4, color: '#14B8A6' }
];

// Mock news items
export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Fed signals potential rate cuts as inflation cools',
    source: 'Financial Times',
    time: '2h ago',
    summary: 'Federal Reserve officials indicated they could cut interest rates in the coming months if inflation continues to ease, according to minutes from their latest meeting.',
    impact: 'positive',
    relatedSymbols: ['SPY', 'QQQ', 'DIA']
  },
  {
    id: '2',
    title: 'NVIDIA smashes earnings expectations, stock surges',
    source: 'Wall Street Journal',
    time: '4h ago',
    summary: 'NVIDIA reported quarterly revenue of $22.1 billion, up 122% year-over-year, driven by soaring demand for AI chips. The company raised its guidance for the next quarter.',
    impact: 'positive',
    relatedSymbols: ['NVDA', 'AMD', 'INTC']
  },
  {
    id: '3',
    title: 'Tesla faces production challenges in Berlin factory',
    source: 'Reuters',
    time: '6h ago',
    summary: 'Tesla\'s Berlin Gigafactory is experiencing production delays due to supply chain constraints and local regulatory issues, potentially impacting Q3 delivery targets.',
    impact: 'negative',
    relatedSymbols: ['TSLA']
  },
  {
    id: '4',
    title: 'Apple unveils new AI features for iPhone lineup',
    source: 'Bloomberg',
    time: '12h ago',
    summary: 'Apple announced a suite of AI-powered features for its upcoming iOS update, bringing advanced intelligence capabilities to millions of iPhones worldwide.',
    impact: 'positive',
    relatedSymbols: ['AAPL', 'GOOGL']
  },
  {
    id: '5',
    title: 'Oil prices drop as OPEC+ considers output increase',
    source: 'CNBC',
    time: '1d ago',
    summary: 'Oil prices fell 3% after reports that OPEC+ members are discussing a potential increase in production quotas at their next meeting.',
    impact: 'negative',
    relatedSymbols: ['XLE', 'XOM', 'CVX']
  }
];

// Mock historical data (30 days)
export const generateHistoricalData = (
  baseValue: number,
  volatility: number,
  trend: 'up' | 'down' | 'neutral' = 'neutral'
): HistoricalData[] => {
  const data: HistoricalData[] = [];
  let currentValue = baseValue;
  
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random walk with configurable trend
    let trendFactor = 0;
    if (trend === 'up') trendFactor = 0.1;
    if (trend === 'down') trendFactor = -0.1;
    
    const change = (Math.random() - 0.5 + trendFactor) * volatility * baseValue;
    currentValue += change;
    
    // Ensure value doesn't go negative
    currentValue = Math.max(currentValue, baseValue * 0.7);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(currentValue.toFixed(2))
    });
  }
  
  return data;
};

// Historical data for portfolio
export const portfolioHistory = generateHistoricalData(190000, 0.01, 'up');

// Historical data for different portfolio strategies
export const conservative = generateHistoricalData(150000, 0.005, 'up');
export const balanced = generateHistoricalData(180000, 0.01, 'up');
export const aggressive = generateHistoricalData(220000, 0.02, 'up');
export const tech = generateHistoricalData(250000, 0.025, 'up');

// Historical data for each stock
export const stocksHistory = {
  portfolio: portfolioHistory,
  conservative,
  balanced, 
  aggressive,
  tech,
  AAPL: generateHistoricalData(165, 0.02),
  MSFT: generateHistoricalData(315, 0.015),
  GOOGL: generateHistoricalData(142, 0.025),
  AMZN: generateHistoricalData(129, 0.02),
  TSLA: generateHistoricalData(250, 0.04),
  NVDA: generateHistoricalData(410, 0.03),
  META: generateHistoricalData(290, 0.025),
  V: generateHistoricalData(240, 0.01)
};
