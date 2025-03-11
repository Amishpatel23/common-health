
import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrainerRecommendationProps {
  trainer: {
    id: string;
    name: string;
    avatar: string;
    specialty: string;
    rating: number;
  };
  onViewProfile: (id: string) => void;
}

const TrainerRecommendation = ({ trainer, onViewProfile }: TrainerRecommendationProps) => {
  return (
    <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-white dark:bg-black">
      <div className="relative">
        <img 
          src={trainer.avatar} 
          alt={trainer.name}
          className="w-full aspect-square object-cover" 
        />
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center">
            <div className="flex items-center px-2 py-1 bg-white/90 rounded-full text-xs font-medium">
              <Star className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" />
              {trainer.rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <h3 className="font-medium truncate">{trainer.name}</h3>
        <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
        
        <Button 
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={() => onViewProfile(trainer.id)}
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default TrainerRecommendation;
