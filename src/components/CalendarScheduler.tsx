
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Bell,
  Calendar as CalendarIcon,
  Clock,
  Check,
  Trash2
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ScheduledSession {
  id: string;
  date: Date;
  time: string;
  topic: string;
  reminder: boolean;
}

const CalendarScheduler = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("12:00");
  const [topic, setTopic] = useState<string>("General Interview");
  const [reminder, setReminder] = useState<boolean>(true);
  const [scheduledSessions, setScheduledSessions] = useState<ScheduledSession[]>([]);
  const { toast } = useToast();

  // Load saved sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem("scheduledSessions");
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
          ...session,
          date: new Date(session.date)
        }));
        setScheduledSessions(parsedSessions);
      } catch (error) {
        console.error("Error parsing saved sessions", error);
      }
    }
  }, []);

  // Save sessions to localStorage when they change
  useEffect(() => {
    if (scheduledSessions.length > 0) {
      localStorage.setItem("scheduledSessions", JSON.stringify(scheduledSessions));
    }
  }, [scheduledSessions]);

  // Set reminder notifications
  useEffect(() => {
    // Request notification permission if reminders are enabled
    if (reminder && 'Notification' in window) {
      Notification.requestPermission();
    }

    // Check for upcoming sessions and show notifications
    const checkReminders = setInterval(() => {
      const now = new Date();
      scheduledSessions.forEach(session => {
        if (session.reminder) {
          const sessionDate = new Date(session.date);
          const sessionTime = session.time.split(":");
          sessionDate.setHours(parseInt(sessionTime[0]), parseInt(sessionTime[1]));
          
          // If the session is within 15 minutes
          const timeDiff = sessionDate.getTime() - now.getTime();
          if (timeDiff > 0 && timeDiff <= 15 * 60 * 1000) {
            // Show notification if permission granted
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification("Interview Practice Reminder", {
                body: `Your "${session.topic}" practice session starts in ${Math.ceil(timeDiff / (60 * 1000))} minutes`,
                icon: "/favicon.ico"
              });
            }
          }
        }
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(checkReminders);
  }, [scheduledSessions, reminder]);

  const handleScheduleSession = () => {
    if (!date) return;
    
    const newSession: ScheduledSession = {
      id: Date.now().toString(),
      date,
      time,
      topic,
      reminder
    };
    
    setScheduledSessions([...scheduledSessions, newSession]);
    
    toast({
      title: "Session Scheduled",
      description: `${topic} scheduled for ${date.toLocaleDateString()} at ${time}`,
      duration: 3000,
    });
  };

  const handleDeleteSession = (id: string) => {
    setScheduledSessions(scheduledSessions.filter(session => session.id !== id));
    toast({
      title: "Session Removed",
      description: "The scheduled session has been removed",
      variant: "destructive",
      duration: 3000,
    });
  };

  // Generate available time slots
  const timeSlots = [];
  for (let hour = 8; hour < 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeSlots.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  const topicOptions = [
    "General Interview", 
    "Technical Interview", 
    "Behavioral Questions", 
    "STAR Method Practice", 
    "Salary Negotiation"
  ];

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar and form - wider section */}
        <Card className="shadow-soft hover-lift transition-all duration-300 lg:col-span-7">
          <CardHeader className="bg-gradient-to-r from-interview-primary/10 to-interview-light/30">
            <CardTitle className="text-2xl flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-interview-primary" />
              Schedule Practice Sessions
            </CardTitle>
            <CardDescription>
              Plan your interview preparation and receive reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="date" className="font-medium">Select a Date</Label>
                <div className="w-full border rounded-lg overflow-hidden shadow-sm bg-white p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md w-full mx-auto"
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    styles={{
                      root: { width: "100%" },
                      table: { width: "100%" },
                      cell: { width: "14.28%" }
                    }}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="time" className="font-medium">Select a Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="topic" className="font-medium">Interview Topic</Label>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topicOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={reminder}
                  onChange={(e) => setReminder(e.target.checked)}
                  className="rounded border-gray-300 text-interview-primary focus:ring-interview-primary"
                />
                <Label htmlFor="reminder" className="flex items-center gap-1 cursor-pointer">
                  <Bell className="h-4 w-4" />
                  Set Reminder
                </Label>
              </div>
              
              <Button 
                onClick={handleScheduleSession}
                className="w-full bg-interview-primary hover:bg-interview-secondary transition-colors py-6"
                size="lg"
              >
                Schedule Session
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming sessions */}
        <Card className="shadow-soft hover-lift transition-all duration-300 lg:col-span-5">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>
              Your scheduled practice sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {scheduledSessions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-muted-foreground">No sessions scheduled yet</p>
                <p className="text-sm text-muted-foreground mt-1">Schedule your first practice session</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {scheduledSessions.map((session) => (
                  <div 
                    key={session.id} 
                    className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all animate-scale-in"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-blue-50 text-blue-500">
                        <CalendarIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{session.topic}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3" />
                          {session.date.toLocaleDateString()}
                          <Clock className="h-3 w-3 ml-2" />
                          {session.time}
                        </div>
                        {session.reminder && (
                          <span className="flex items-center gap-1 text-xs text-blue-500 mt-1">
                            <Bell className="h-3 w-3" /> Reminder set
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 border-t">
            <div className="w-full text-center text-sm text-muted-foreground">
              {scheduledSessions.length > 0 ? (
                <p>{scheduledSessions.length} session{scheduledSessions.length > 1 ? 's' : ''} scheduled</p>
              ) : (
                <p>Click the "Schedule Session" button to add your first session</p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CalendarScheduler;
