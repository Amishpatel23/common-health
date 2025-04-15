
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface EmptySessionsCardProps {
  message: string;
  subMessage: string;
}

const EmptySessionsCard: React.FC<EmptySessionsCardProps> = ({ message, subMessage }) => {
  return (
    <Card className="bg-muted/50">
      <CardContent className="flex flex-col items-center justify-center text-center pt-6 pb-6">
        <Calendar className="h-12 w-12 mb-2 text-muted-foreground" />
        <p className="text-lg font-medium mb-1">{message}</p>
        <p className="text-muted-foreground mb-4">{subMessage}</p>
      </CardContent>
    </Card>
  );
};

export default EmptySessionsCard;
