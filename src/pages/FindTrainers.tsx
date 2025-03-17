
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  ChevronDown,
  ChevronUp 
} from 'lucide-react';

// Mock trainer data
const mockTrainers = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    specialties: ['HIIT Training', 'Weight Loss'],
    location: 'New York, NY',
    rating: 4.9,
    hourlyRate: 45,
    availability: 'Available today',
    bio: 'Certified personal trainer with 5+ years of experience in high-intensity workouts and nutrition planning.',
  },
  {
    id: '2',
    name: 'Sarah Miller',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    specialties: ['Yoga', 'Meditation', 'Flexibility'],
    location: 'Los Angeles, CA',
    rating: 4.8,
    hourlyRate: 50,
    availability: 'Available tomorrow',
    bio: 'Yoga instructor and wellness coach helping clients achieve balance in body and mind through personalized programs.',
  },
  {
    id: '3',
    name: 'Mike Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    specialties: ['Strength Training', 'Bodybuilding', 'Nutrition'],
    location: 'Chicago, IL',
    rating: 4.7,
    hourlyRate: 55,
    availability: 'Available today',
    bio: 'Competitive bodybuilder and nutrition expert specializing in strength training and muscle development.',
  },
  {
    id: '4',
    name: 'Jessica Williams',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    specialties: ['CrossFit', 'Functional Training'],
    location: 'Miami, FL',
    rating: 4.9,
    hourlyRate: 60,
    availability: 'Available in 2 days',
    bio: 'CrossFit coach passionate about helping clients reach their fitness goals through challenging yet enjoyable workouts.',
  },
  {
    id: '5',
    name: 'Daniel Lee',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    specialties: ['Cardio', 'Endurance', 'Marathon Training'],
    location: 'Boston, MA',
    rating: 4.6,
    hourlyRate: 40,
    availability: 'Available today',
    bio: 'Marathon runner and endurance specialist with proven methods to build stamina and improve running performance.',
  },
  {
    id: '6',
    name: 'Emma Davis',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    specialties: ['Pilates', 'Core Training', 'Posture'],
    location: 'Seattle, WA',
    rating: 4.8,
    hourlyRate: 55,
    availability: 'Available tomorrow',
    bio: 'Pilates instructor focused on core strength, improved posture, and rehabilitation from injuries.',
  },
];

const FindTrainers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('rating');
  
  // Extract all unique specialties from trainer data
  const allSpecialties = Array.from(
    new Set(
      mockTrainers.flatMap(trainer => trainer.specialties)
    )
  ).sort();
  
  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };
  
  const filteredTrainers = mockTrainers
    .filter(trainer => {
      // Apply search filter
      const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Apply price filter
      const matchesPrice = trainer.hourlyRate >= priceRange[0] && trainer.hourlyRate <= priceRange[1];
      
      // Apply specialty filter
      const matchesSpecialty = selectedSpecialties.length === 0 || 
        trainer.specialties.some(s => selectedSpecialties.includes(s));
      
      return matchesSearch && matchesPrice && matchesSpecialty;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortOption === 'rating') {
        return b.rating - a.rating;
      } else if (sortOption === 'price_low') {
        return a.hourlyRate - b.hourlyRate;
      } else if (sortOption === 'price_high') {
        return b.hourlyRate - a.hourlyRate;
      }
      return 0;
    });
  
  const handleViewProfile = (trainerId: string) => {
    toast({
      description: "Navigating to trainer profile...",
    });
    navigate(`/trainer-profile/${trainerId}`);
  };
  
  const handleBookSession = (trainerId: string) => {
    toast({
      description: "Opening booking interface...",
    });
    navigate(`/book-session/${trainerId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 pt-16 lg:pl-64">
        <DashboardSidebar />
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Find a Trainer</h1>
            <p className="text-muted-foreground">
              Search for personal trainers that match your fitness goals and schedule
            </p>
          </div>
          
          {/* Search and filter section */}
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, specialty, or keyword..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <Button
                variant="outline"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="justify-between"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </div>
                {isFiltersOpen ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  className="border rounded-md px-3 py-1 text-sm bg-background"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="rating">Top Rated</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Filters panel */}
            {isFiltersOpen && (
              <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Price Range ($ per hour)</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      min={0}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-5"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSpecialties.map((specialty) => (
                      <Button
                        key={specialty}
                        variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSpecialtyToggle(specialty)}
                        className="text-xs"
                      >
                        {specialty}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              Showing {filteredTrainers.length} trainers
            </div>
          </div>
          
          {/* Trainer list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} className="overflow-hidden">
                <div className="aspect-[3/2] relative">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-background/90 rounded-full text-xs font-medium flex items-center">
                    <Star className="mr-1 h-3 w-3 text-yellow-500 fill-yellow-500" />
                    {trainer.rating}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg">{trainer.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {trainer.location}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {trainer.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm">
                      <span className="font-medium text-base">${trainer.hourlyRate}</span> / hour
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <Clock className="mr-1 h-3 w-3" />
                      {trainer.availability}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {trainer.bio}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewProfile(trainer.id)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleBookSession(trainer.id)}
                    >
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FindTrainers;
