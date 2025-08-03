import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Highlights',
      value: stats?.totalHighlights,
      icon: 'Highlighter',
      color: 'text-primary'
    },
    {
      label: 'Documents',
      value: stats?.documentsWithHighlights,
      icon: 'FileText',
      color: 'text-secondary'
    },
    {
      label: 'This Week',
      value: stats?.highlightsThisWeek,
      icon: 'Calendar',
      color: 'text-success'
    },
    {
      label: 'Most Active',
      value: stats?.mostHighlightedDocument,
      icon: 'TrendingUp',
      color: 'text-warning',
      isText: true
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-muted ${item?.color}`}>
              <Icon name={item?.icon} size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {item?.label}
              </p>
              <p className={`text-lg font-semibold text-foreground mt-1 ${item?.isText ? 'text-sm truncate' : ''}`}>
                {item?.isText ? item?.value : item?.value?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;