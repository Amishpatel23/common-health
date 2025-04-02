
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Star, MessageSquare, Calendar, Heart } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  bio: string;
  hourlyRate: number;
}

const FavoriteTrainers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteTrainers, setFavoriteTrainers] = useState<Trainer[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call to fetch favorite trainers
    const fetchFavorites = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockFavorites = [
        {
          id: '101',
          name: 'Jessica Williams',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          specialty: 'CrossFit Coach',
          rating: 4.9,
          bio: 'Certified CrossFit coach with 7 years of experience helping clients achieve their fitness goals through high-intensity training.',
          hourlyRate: 65,
        },
        {
          id: '102',
          name: 'Mike Thompson',
          avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
          specialty: 'Nutritionist',
          rating: 4.7,
          bio: 'Nutritionist and personal trainer focused on sustainable eating habits and fitness routines that fit your lifestyle.',
          hourlyRate: 55,
        },
        {
          id: '103',
          name: 'Emma Davis',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
          specialty: 'Pilates Instructor',
          rating: 4.8,
          bio: 'Specialized in rehabilitation Pilates, helping clients recover from injuries and improve core strength with gentle, effective exercises.',
          hourlyRate: 60,
        },
      ];
      
      setFavoriteTrainers(mockFavorites);
      setIsLoading(false);
    };
    
    fetchFavorites();
  }, []);
  
  const handleRemoveFavorite = (trainerId: string) => {
    setFavoriteTrainers(prev => prev.filter(trainer => trainer.id !== trainerId));
    toast({
      description: "Trainer removed from favorites",
    });
  };
  
  const handleViewProfile = (trainerId: string) => {
    navigate(`/trainer-profile/${trainerId}`);
  };
  
  const handleBookSession = (trainerId: string) => {
    navigate(`/book-session/${trainerId}`);
  };
  
  const handleMessage = (trainerId: string) => {
    navigate('/chat');
  };
  
  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 lg:pl-64">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md shimmer mb-2 w-48"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md shimmer w-64"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 lg:pl-64">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Favorite Trainers</h1>
          <p className="text-muted-foreground">Your saved trainers for quick access</p>
        </div>
        
        {favoriteTrainers.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl bg-secondary/20">
            <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-xl font-medium mb-2">No favorite trainers yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              When you find trainers you like, mark them as favorites to easily find them again
            </p>
            <Button onClick={() => navigate('/find-trainers')}>
              Browse Trainers
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteTrainers.map(trainer => (
              <Card key={trainer.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={trainer.avatar} 
                        alt={trainer.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <CardTitle className="text-lg">{trainer.name}</CardTitle>
                        <CardDescription>{trainer.specialty}</CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleRemoveFavorite(trainer.id)}
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{trainer.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">rating</span>
                    <span className="text-muted-foreground mx-2">•</span>
                    <span className="font-medium">${trainer.hourlyRate}</span>
                    <span className="text-muted-foreground text-sm ml-1">per hour</span>
                  </div>
                  <p className="text-sm line-clamp-3">{trainer.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-between gap-2 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewProfile(trainer.id)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleMessage(trainer.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleBookSession(trainer.id)}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Book
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteTrainers;
