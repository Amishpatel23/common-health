
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Image,
  Save
} from 'lucide-react';

const MemberProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    address: '123 Fitness St, Exercise City, 90210',
    emergencyContact: 'Jane Doe - (555) 987-6543',
  });
  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved",
      });
    }, 1000);
  };
  
  const handleChangePassword = () => {
    // Validate passwords
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure your new password and confirmation match",
        variant: "destructive",
      });
      return;
    }
    
    if (securityForm.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Your password should be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pt-16 lg:pl-64">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User card */}
          <div className="bg-white dark:bg-black rounded-xl border border-border p-6 flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-secondary">
                <img 
                  src={user?.avatar || "https://randomuser.me/api/portraits/women/24.jpg"} 
                  alt={user?.name || "User"} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <div className="text-white text-xs font-medium flex flex-col items-center">
                  <Image className="h-5 w-5 mb-1" />
                  Change
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground mb-6">{user?.email}</p>
            
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Membership</span>
                </div>
                <span className="font-semibold text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                  {user?.membershipDetails?.plan || "Basic"}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Status</span>
                </div>
                <span className="font-semibold text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                  {user?.membershipDetails?.status || "Active"}
                </span>
              </div>
            </div>
            
            <div className="mt-6 w-full">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
          
          {/* Settings tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="p-6 bg-white dark:bg-black rounded-xl border border-border">
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <p className="text-muted-foreground mb-6">
                  Update your personal information and how we can contact you
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileForm.address}
                        onChange={handleProfileChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact" className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Emergency Contact
                    </Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={profileForm.emergencyContact}
                      onChange={handleProfileChange}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="min-w-[120px]"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="security" className="p-6 bg-white dark:bg-black rounded-xl border border-border">
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                <p className="text-muted-foreground mb-6">
                  Update your password and secure your account
                </p>
                
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={handleSecurityChange}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={securityForm.newPassword}
                        onChange={handleSecurityChange}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={handleSecurityChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleChangePassword}
                      disabled={isLoading}
                      className="min-w-[160px]"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {isLoading ? 'Updating...' : 'Change Password'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
