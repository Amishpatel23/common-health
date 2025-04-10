
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Table, 
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Star,
  StarOff,
  MessageSquare,
  Calendar,
  ThumbsDown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// Mock data - in a real app, this would come from API
const mockTrainers = [
  {
    id: '101',
    name: 'Jessica Williams',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    specialty: 'CrossFit Coach',
    rating: 4.9,
    sessionsCompleted: 14,
    nextSession: 'Tomorrow, 10:00 AM',
    favorite: true,
    status: 'online',
  },
  {
    id: '102',
    name: 'Mike Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    specialty: 'Nutritionist',
    rating: 4.7,
    sessionsCompleted: 8,
    nextSession: 'Jun 15, 2:30 PM',
    favorite: true,
    status: 'offline',
  },
  {
    id: '103',
    name: 'Emma Davis',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    specialty: 'Pilates Instructor',
    rating: 4.8,
    sessionsCompleted: 6,
    nextSession: '-',
    favorite: false,
    status: 'online',
  },
  {
    id: '104',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    specialty: 'Marathon Coach',
    rating: 4.6,
    sessionsCompleted: 3,
    nextSession: 'Jun 18, 4:00 PM',
    favorite: false,
    status: 'offline',
  },
];

const mockBlockedTrainers = [
  {
    id: '201',
    name: 'Ryan Black',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    specialty: 'Weightlifting Coach',
    blockedDate: '2023-05-15',
    reason: 'Inappropriate behavior',
  },
];

const MyTrainers = () => {
  const [trainers, setTrainers] = useState(mockTrainers);
  const [blockedTrainers, setBlockedTrainers] = useState(mockBlockedTrainers);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleToggleFavorite = (trainerId: string) => {
    setTrainers(prev => 
      prev.map(trainer => 
        trainer.id === trainerId 
          ? { ...trainer, favorite: !trainer.favorite }
          : trainer
      )
    );
    
    const trainer = trainers.find(t => t.id === trainerId);
    if (trainer) {
      toast({
        description: trainer.favorite 
          ? `${trainer.name} removed from favorites` 
          : `${trainer.name} added to favorites`,
      });
    }
  };
  
  const handleBlockTrainer = (trainerId: string) => {
    const trainerToBlock = trainers.find(t => t.id === trainerId);
    
    if (trainerToBlock) {
      // Remove from trainers list
      setTrainers(prev => prev.filter(t => t.id !== trainerId));
      
      // Add to blocked list
      const blockedTrainer = {
        id: trainerToBlock.id,
        name: trainerToBlock.name,
        avatar: trainerToBlock.avatar,
        specialty: trainerToBlock.specialty,
        blockedDate: new Date().toISOString().split('T')[0],
        reason: 'User blocked',
      };
      
      setBlockedTrainers(prev => [...prev, blockedTrainer]);
      
      toast({
        description: `${trainerToBlock.name} has been blocked`,
      });
    }
  };
  
  const handleUnblockTrainer = (trainerId: string) => {
    const trainerToUnblock = blockedTrainers.find(t => t.id === trainerId);
    
    if (trainerToUnblock) {
      // Remove from blocked list
      setBlockedTrainers(prev => prev.filter(t => t.id !== trainerId));
      
      toast({
        description: `${trainerToUnblock.name} has been unblocked`,
      });
    }
  };
  
  const handleViewProfile = (trainerId: string) => {
    navigate(`/trainer-profile/${trainerId}`);
  };
  
  const handleBookSession = (trainerId: string) => {
    navigate(`/book-session/${trainerId}`);
  };
  
  const handleStartChat = (trainerId: string) => {
    navigate('/chat');
  };
  
  return (
    <DashboardLayout
      title="My Trainers"
      description="Manage your trainers and training sessions"
    >
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Trainers ({trainers.length})</TabsTrigger>
          <TabsTrigger value="blocked">Blocked Trainers ({blockedTrainers.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="bg-white dark:bg-black rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Trainer</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Next Session</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainers.map((trainer) => (
                  <TableRow key={trainer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={trainer.avatar} alt={trainer.name} />
                          <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-1">
                            {trainer.name}
                            {trainer.favorite && (
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <div 
                            className="text-sm text-muted-foreground hover:text-primary cursor-pointer"
                            onClick={() => handleViewProfile(trainer.id)}
                          >
                            View Profile
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{trainer.specialty}</TableCell>
                    <TableCell>{trainer.sessionsCompleted}</TableCell>
                    <TableCell>{trainer.nextSession}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{trainer.rating}</span>
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={trainer.status === 'online' ? 'default' : 'outline'}>
                        {trainer.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewProfile(trainer.id)}>
                            View profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBookSession(trainer.id)}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Book session
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStartChat(trainer.id)}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Start chat
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleFavorite(trainer.id)}>
                            {trainer.favorite ? (
                              <>
                                <StarOff className="h-4 w-4 mr-2" />
                                Remove from favorites
                              </>
                            ) : (
                              <>
                                <Star className="h-4 w-4 mr-2" />
                                Add to favorites
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleBlockTrainer(trainer.id)}
                            className="text-red-600"
                          >
                            <ThumbsDown className="h-4 w-4 mr-2" />
                            Block trainer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {trainers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      You haven't connected with any trainers yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {trainers.length > 0 && (
            <div className="flex justify-end mt-4">
              <Button onClick={() => navigate('/find-trainers')}>Find More Trainers</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="blocked">
          <div className="bg-white dark:bg-black rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Trainer</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Blocked Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blockedTrainers.map((trainer) => (
                  <TableRow key={trainer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={trainer.avatar} alt={trainer.name} />
                          <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{trainer.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{trainer.specialty}</TableCell>
                    <TableCell>{trainer.blockedDate}</TableCell>
                    <TableCell>{trainer.reason}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUnblockTrainer(trainer.id)}
                      >
                        Unblock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {blockedTrainers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      You haven't blocked any trainers.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default MyTrainers;
