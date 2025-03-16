
import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const statCardVariants = cva(
  "bg-white dark:bg-black border border-border rounded-xl p-4 shadow-sm",
  {
    variants: {
      variant: {
        default: "border-blue-100 dark:border-blue-900/20",
        success: "border-green-100 dark:border-green-900/20",
        warning: "border-yellow-100 dark:border-yellow-900/20",
        danger: "border-red-100 dark:border-red-900/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  description?: string;
  className?: string;
  onClick?: () => void;
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  description,
  variant,
  className,
  onClick,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        statCardVariants({ variant }),
        onClick && "cursor-pointer hover:shadow-md transition-shadow duration-300",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={cn(
          "text-primary",
          variant === "success" && "text-green-500",
          variant === "warning" && "text-yellow-500",
          variant === "danger" && "text-red-500",
        )}>
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-semibold">{value}</p>
        {change && (
          <div className="flex items-center">
            <span className={cn(
              "text-xs",
              change.positive ? "text-green-500" : "text-red-500"
            )}>
              {change.positive ? '↑' : '↓'} {change.value}
            </span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
