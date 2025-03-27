
import React, { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { assetAllocation, portfolioHistory, stocksHistory } from '../utils/mockData';
import { ChartContainer, ChartTooltipContent } from './ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface StockChartProps {
  type: 'area' | 'bar' | 'pie';
  symbol?: string;
  title: string;
  className?: string;
}

const StockChart: React.FC<StockChartProps> = ({ type, symbol = 'AAPL', title, className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>(symbol || 'portfolio');
  
  // Determine which data to use based on the chart type and symbol
  const chartData = type === 'pie' 
    ? assetAllocation
    : selectedPortfolio === 'portfolio' 
      ? portfolioHistory 
      : stocksHistory[selectedPortfolio as keyof typeof stocksHistory] || stocksHistory.AAPL;
  
  // Currency formatter
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  // Value formatter for tooltips
  const formatValue = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return formatter.format(value);
  };
  
  // Custom tooltip component for area and bar charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism text-xs p-2 rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-neon-green font-semibold">
            {formatter.format(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Custom tooltip for pie chart
  const PieCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism text-xs p-2 rounded-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-neon-green font-semibold">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Handle pie sector hover
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  // Portfolio selection dropdown for area charts
  const renderPortfolioSelector = () => {
    if (type !== 'area' || title !== 'Portfolio Performance') return null;

    return (
      <div className="mb-4">
        <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue placeholder="Select Portfolio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio">Complete Portfolio</SelectItem>
            <SelectItem value="conservative">Conservative</SelectItem>
            <SelectItem value="balanced">Balanced</SelectItem>
            <SelectItem value="aggressive">Aggressive</SelectItem>
            <SelectItem value="tech">Technology Focus</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };
  
  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'currentColor', fontSize: 10 }}
                tickLine={{ stroke: 'currentColor' }}
                axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis 
                tick={{ fill: 'currentColor', fontSize: 10 }}
                tickLine={{ stroke: 'currentColor' }}
                axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                tickFormatter={(value) => formatValue(value)}
                width={60}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff' }}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'currentColor', fontSize: 10 }}
                tickLine={{ stroke: 'currentColor' }}
                axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis 
                tick={{ fill: 'currentColor', fontSize: 10 }}
                tickLine={{ stroke: 'currentColor' }}
                axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                tickFormatter={(value) => formatValue(value)}
                width={60}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="url(#barColor)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <div className="pie-3d-container relative transform-gpu h-full">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 animate-pulse-glow blur-3xl"></div>
            </div>
            <div className="pie-3d relative z-10 h-full w-full flex items-center justify-center">
              <div className="chart-shadow"></div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="sector"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    animationBegin={200}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="rgba(0,0,0,0.2)"
                        strokeWidth={activeIndex === index ? 3 : 1}
                        style={{
                          filter: activeIndex === index ? 'brightness(1.4) drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'brightness(1)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieCustomTooltip />} />
                  <Legend 
                    iconType="circle" 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className={`glassmorphism rounded-xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-2xl ${className}`}>
      <h3 className="text-lg font-medium mb-4 text-gradient-primary">{title}</h3>
      {renderPortfolioSelector()}
      <div className="h-64">
        {renderChart()}
      </div>
    </div>
  );
};

export default StockChart;
