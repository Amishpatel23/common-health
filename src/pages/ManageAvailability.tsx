
import React, { useState } from 'react';
import TrainerDashboardSidebar from '@/components/TrainerDashboardSidebar';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addDays, parseISO, isSameDay } from 'date-fns';
import { z } from 'zod';
import { CalendarIcon, Clock, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for availability slots
const INITIAL_AVAILABILITY = [
  { id: 1, date: '2025-04-10', startTime: '09:00', endTime: '12:00', recurring: true, dayOfWeek: 'Thursday' },
  { id: 2, date: '2025-04-10', startTime: '14:00', endTime: '17:00', recurring: true, dayOfWeek: 'Thursday' },
  { id: 3, date: '2025-04-11', startTime: '10:00', endTime: '15:00', recurring: true, dayOfWeek: 'Friday' },
  { id: 4, date: '2025-04-13', startTime: '12:00', endTime: '16:00', recurring: false, dayOfWeek: 'Sunday' },
];

// Form schema for adding/editing availability
const availabilityFormSchema = z.object({
  date: z.date({
    required_error: "A date is required",
  }),
  startTime: z.string({
    required_error: "Start time is required",
  }),
  endTime: z.string({
    required_error: "End time is required",
  }).refine(val => val !== '', {
    message: "End time is required",
  }),
  recurring: z.boolean().default(false),
});

const ManageAvailability = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState(INITIAL_AVAILABILITY);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const { toast } = useToast();

  // Define form
  const form = useForm<z.infer<typeof availabilityFormSchema>>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      date: new Date(),
      startTime: '',
      endTime: '',
      recurring: false,
    },
  });

  // Get all availability slots for the selected date
  const getSlotsForSelectedDate = () => {
    if (!date) return [];
    
    return availability.filter(slot => {
      const slotDate = parseISO(slot.date);
      return isSameDay(slotDate, date);
    });
  };

  // Handle form submission
  const onSubmit = (data: z.infer<typeof availabilityFormSchema>) => {
    const formattedDate = format(data.date, 'yyyy-MM-dd');
    const dayOfWeek = format(data.date, 'EEEE');
    
    if (selectedSlot) {
      // Update existing slot
      setAvailability(prev => 
        prev.map(slot => 
          slot.id === selectedSlot.id 
            ? { 
                ...slot, 
                date: formattedDate, 
                startTime: data.startTime, 
                endTime: data.endTime,
                recurring: data.recurring,
                dayOfWeek
              } 
            : slot
        )
      );
      toast({
        title: "Availability updated",
        description: `Your availability on ${format(data.date, 'EEEE, MMMM d')} has been updated.`,
      });
    } else {
      // Add new slot
      const newSlot = {
        id: Date.now(),
        date: formattedDate,
        startTime: data.startTime,
        endTime: data.endTime,
        recurring: data.recurring,
        dayOfWeek
      };
      
      setAvailability(prev => [...prev, newSlot]);
      toast({
        title: "Availability added",
        description: `You're now available on ${format(data.date, 'EEEE, MMMM d')} from ${data.startTime} to ${data.endTime}.`,
      });
    }
    
    setIsDialogOpen(false);
    form.reset();
    setSelectedSlot(null);
  };

  // Handle slot deletion
  const handleDeleteSlot = (id: number) => {
    setAvailability(prev => prev.filter(slot => slot.id !== id));
    toast({
      title: "Availability removed",
      description: "The selected time slot has been removed from your availability.",
    });
  };

  // Open dialog to edit a slot
  const handleEditSlot = (slot: any) => {
    setSelectedSlot(slot);
    form.setValue("date", parseISO(slot.date));
    form.setValue("startTime", slot.startTime);
    form.setValue("endTime", slot.endTime);
    form.setValue("recurring", slot.recurring);
    setIsDialogOpen(true);
  };

  // Open dialog to add a new slot
  const handleAddSlot = () => {
    setSelectedSlot(null);
    form.reset({ date: date || new Date(), startTime: '', endTime: '', recurring: false });
    setIsDialogOpen(true);
  };

  // Get all recurring slots grouped by day
  const getRecurringSlots = () => {
    const recurring = availability.filter(slot => slot.recurring);
    return recurring.reduce((acc: any, slot) => {
      if (!acc[slot.dayOfWeek]) {
        acc[slot.dayOfWeek] = [];
      }
      acc[slot.dayOfWeek].push(slot);
      return acc;
    }, {});
  };

  const recurringSlots = getRecurringSlots();
  const slotsForSelectedDate = getSlotsForSelectedDate();

  // Helper to format time slots
  const formatTimeRange = (start: string, end: string) => {
    return `${start} - ${end}`;
  };

  // Mark dates with availability
  const isDayWithAvailability = (day: Date) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    return availability.some(slot => slot.date === formattedDate);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 pt-16 lg:pl-64">
        <TrainerDashboardSidebar />
        
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Manage Availability</h1>
            <p className="text-muted-foreground mt-1">
              Set your availability for training sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Choose a date to view or set availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border p-3"
                    modifiers={{
                      hasAvailability: isDayWithAvailability,
                    }}
                    modifiersClassNames={{
                      hasAvailability: "bg-primary/20",
                    }}
                  />
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAddSlot} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Availability
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your recurring weekly availability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(recurringSlots).length > 0 ? (
                    Object.entries(recurringSlots).map(([day, slots]: [string, any]) => (
                      <div key={day} className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">{day}</p>
                          <div className="space-y-1 mt-1">
                            {slots.map((slot: any) => (
                              <p key={slot.id} className="text-sm text-muted-foreground">
                                {formatTimeRange(slot.startTime, slot.endTime)}
                              </p>
                            ))}
                          </div>
                        </div>
                        <Badge variant="outline" className="ml-auto">Recurring</Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">No recurring availability set.</p>
                      <p className="text-sm text-muted-foreground mt-1">Add slots and mark them as recurring.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Time Slots</CardTitle>
                    <CardDescription>
                      {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={handleAddSlot}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Slot
                  </Button>
                </CardHeader>
                <CardContent>
                  {slotsForSelectedDate.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Recurring</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {slotsForSelectedDate.map((slot) => {
                          // Calculate duration
                          const startParts = slot.startTime.split(':');
                          const endParts = slot.endTime.split(':');
                          const startHour = parseInt(startParts[0]);
                          const endHour = parseInt(endParts[0]);
                          const duration = endHour - startHour;
                          
                          return (
                            <TableRow key={slot.id}>
                              <TableCell>
                                <div className="font-medium">{formatTimeRange(slot.startTime, slot.endTime)}</div>
                              </TableCell>
                              <TableCell>{duration} hour{duration !== 1 ? 's' : ''}</TableCell>
                              <TableCell>
                                {slot.recurring ? (
                                  <Badge variant="outline" className="bg-primary/10">Weekly</Badge>
                                ) : (
                                  <span className="text-muted-foreground">One-time</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEditSlot(slot)}
                                  >
                                    Edit
                                  </Button>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will remove your availability for {format(parseISO(slot.date), 'EEEE, MMMM d')} from {slot.startTime} to {slot.endTime}.
                                          {slot.recurring && " This will also remove this recurring slot from your weekly schedule."}
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDeleteSlot(slot.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Remove
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                      <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                      <h3 className="mt-4 text-lg font-medium">No Availability Set</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {date 
                          ? `You have no availability set for ${format(date, 'MMMM d, yyyy')}.` 
                          : 'Select a date and add availability slots.'
                        }
                      </p>
                      <Button 
                        onClick={handleAddSlot}
                        className="mt-4"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Time Slot
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Dialog for adding/editing availability */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {selectedSlot ? 'Edit Availability' : 'Add Availability'}
                </DialogTitle>
                <DialogDescription>
                  Set the date and time when you're available for training sessions.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => i + 6).map((hour) => (
                                <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                  {hour === 12 ? '12:00 PM' : hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
                                <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                  {hour === 12 ? '12:00 PM' : hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="recurring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Recurring weekly</FormLabel>
                          <FormDescription>
                            This slot will repeat weekly on {field.value && form.getValues("date") ? format(form.getValues("date"), 'EEEE') : 'the selected day'}.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default ManageAvailability;
