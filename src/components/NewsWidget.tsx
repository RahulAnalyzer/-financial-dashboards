
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { newsItems, NewsItem } from '../utils/mockData';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const { title, source, time, summary, impact, relatedSymbols } = news;
  
  const getImpactColor = () => {
    switch (impact) {
      case 'positive':
        return 'text-neon-green';
      case 'negative':
        return 'text-neon-red';
      default:
        return 'text-muted-foreground';
    }
  };
  
  return (
    <div className="news-card mb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <div className="flex items-center mt-1">
            <span className="text-xs font-medium">{source}</span>
            <span className="mx-2 text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{summary}</p>
          
          <div className="flex items-center mt-2 flex-wrap">
            <span className={`text-xs ${getImpactColor()} mr-2`}>
              {impact === 'positive' ? 'Bullish' : impact === 'negative' ? 'Bearish' : 'Neutral'}
            </span>
            
            {relatedSymbols.map(symbol => (
              <span key={symbol} className="pill-tag mr-1 mb-1">
                {symbol}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NewsWidgetProps {
  className?: string;
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ className }) => {
  return (
    <div className={`glassmorphism rounded-xl ${className}`}>
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-medium">Financial News</h3>
      </div>
      
      <div className="px-4 py-2 max-h-[400px] overflow-y-auto">
        {newsItems.map(news => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
      
      <div className="p-2 flex justify-center border-t border-white/10">
        <button className="text-xs text-muted-foreground hover:text-foreground flex items-center transition-colors">
          View all news
          <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default NewsWidget;
