
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video } from 'lucide-react';

interface UpcomingSessionCardProps {
  trainer: {
    name: string;
    avatar: string;
    specialty: string;
  };
  sessionDate: string;
  sessionTime: string;
  isNext?: boolean;
  onJoin?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
}

const UpcomingSessionCard = ({
  trainer,
  sessionDate,
  sessionTime,
  isNext = false,
  onJoin,
  onReschedule,
  onCancel,
}: UpcomingSessionCardProps) => {
  return (
    <div className={cn(
      "border border-border rounded-xl p-4 space-y-4 bg-white dark:bg-black",
      isNext && "ring-2 ring-primary/20"
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <img 
            src={trainer.avatar} 
            alt={trainer.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{trainer.name}</h3>
          <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
        </div>
        {isNext && (
          <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            Next Session
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{sessionDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{sessionTime}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 pt-1">
        {onJoin && (
          <Button 
            onClick={onJoin} 
            className="flex-1" 
            variant={isNext ? "default" : "outline"}
          >
            <Video className="mr-1 h-4 w-4" />
            Join Now
          </Button>
        )}
        {onReschedule && (
          <Button 
            onClick={onReschedule} 
            className="flex-1" 
            variant="ghost" 
            size="sm"
          >
            Reschedule
          </Button>
        )}
        {onCancel && (
          <Button 
            onClick={onCancel} 
            className="flex-1" 
            variant="ghost" 
            size="sm"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default UpcomingSessionCard;
