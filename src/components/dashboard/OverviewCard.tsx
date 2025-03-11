
import React from 'react';
import { cn } from '@/lib/utils';

interface OverviewCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  className?: string;
  onClick?: () => void;
}

const OverviewCard = ({
  title,
  value,
  icon,
  description,
  className,
  onClick,
}: OverviewCardProps) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-black border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-semibold">{value}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
