
import React, { useState } from 'react';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SessionsList from '@/components/sessions/SessionsList';
import LoadingState from '@/components/sessions/LoadingState';
import ErrorState from '@/components/sessions/ErrorState';
import { useSessionsData } from '@/hooks/useSessionsData';

const MySessions: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const { 
    upcomingSessions, 
    pastSessions, 
    isLoading, 
    error, 
    formatDate 
  } = useSessionsData();

  if (isLoading) {
    return (
      <DashboardLayout title="My Sessions">
        <div className="container mx-auto p-4 max-w-5xl">
          <div className="flex items-center mb-6">
            <BackButton className="mr-4" />
            <h1 className="text-2xl font-bold">My Sessions</h1>
          </div>
          <LoadingState />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="My Sessions">
        <div className="container mx-auto p-4 max-w-5xl">
          <div className="flex items-center mb-6">
            <BackButton className="mr-4" />
            <h1 className="text-2xl font-bold">My Sessions</h1>
          </div>
          <ErrorState errorMessage={error} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Sessions">
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="flex items-center mb-6">
          <BackButton className="mr-4" />
          <h1 className="text-2xl font-bold">My Sessions</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past" className="flex-1">Past Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-0">
            <SessionsList
              sessions={upcomingSessions}
              emptyMessage="No upcoming sessions"
              emptySubMessage="Book a session with a trainer to get started"
              formatDate={formatDate}
            />
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <SessionsList
              sessions={pastSessions}
              emptyMessage="No past sessions"
              emptySubMessage="Your session history will appear here"
              formatDate={formatDate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MySessions;
