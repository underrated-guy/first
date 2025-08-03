import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Documents',
      value: stats?.totalDocuments,
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      label: 'Highlights Created',
      value: stats?.totalHighlights,
      icon: 'Highlighter',
      color: 'text-success'
    },
    {
      label: 'Study Hours',
      value: `${stats?.studyHours}h`,
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      label: 'Documents This Week',
      value: stats?.weeklyDocuments,
      icon: 'TrendingUp',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 text-center"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted mb-3`}>
            <Icon 
              name={item?.icon} 
              size={20} 
              className={item?.color}
            />
          </div>
          <div className="text-2xl font-semibold text-foreground mb-1">
            {item?.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {item?.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;