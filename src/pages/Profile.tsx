import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  EyeIcon, 
  EyeOffIcon, 
  CreditCard, 
  User as UserIcon, 
  Settings, 
  Bell, 
  LogOut, 
  CalendarDays, 
  Shield,
  Trash2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  jobRole: z.string().min(1, { message: "Job role is required" }).optional(),
  yearsExperience: z.string().min(1, { message: "Years of experience is required" }).optional(),
  bio: z.string().max(300, { message: "Bio cannot exceed 300 characters" }).optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const notificationsSchema = z.object({
  email_interviews: z.boolean().default(true),
  email_marketing: z.boolean().default(false),
  email_products: z.boolean().default(false),
  push_interviews: z.boolean().default(true), 
  push_reminders: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsSchema>;

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [activityLogs, setActivityLogs] = useState<any[]>([
    {
      id: "1",
      activity: "Profile updated",
      date: new Date(Date.now() - 3600000 * 24 * 2),
      status: "success"
    },
    {
      id: "2",
      activity: "Password changed",
      date: new Date(Date.now() - 3600000 * 24 * 7),
      status: "success"
    },
    {
      id: "3",
      activity: "Login from new device",
      date: new Date(Date.now() - 3600000 * 24 * 14),
      status: "warning"
    }
  ]);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      jobRole: "",
      yearsExperience: "",
      bio: "",
      location: "",
      linkedin: "",
      twitter: "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      email_interviews: true,
      email_marketing: false,
      email_products: false,
      push_interviews: true,
      push_reminders: true,
    },
  });

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        console.error("Error getting user:", error);
        navigate("/sign-in");
        return;
      }
      
      setUser(data.user);
      
      // Get profile data from metadata
      profileForm.setValue("email", data.user.email || "");
      profileForm.setValue("fullName", (data.user.user_metadata?.full_name as string) || "");
      profileForm.setValue("jobRole", (data.user.user_metadata?.job_role as string) || "");
      profileForm.setValue("yearsExperience", (data.user.user_metadata?.years_experience as string) || "");
      profileForm.setValue("bio", (data.user.user_metadata?.bio as string) || "");
      profileForm.setValue("location", (data.user.user_metadata?.location as string) || "");
      profileForm.setValue("linkedin", (data.user.user_metadata?.linkedin as string) || "");
      profileForm.setValue("twitter", (data.user.user_metadata?.twitter as string) || "");
      
      // Get subscription data from localStorage (would be from database in real app)
      const subscriptionData = localStorage.getItem('userSubscription');
      if (subscriptionData) {
        setUserSubscription(JSON.parse(subscriptionData));
      }
      
      setIsLoading(false);
    }
    
    getUser();
  }, [profileForm, navigate]);

  async function onProfileSubmit(data: ProfileFormValues) {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: data.fullName,
          job_role: data.jobRole,
          years_experience: data.yearsExperience,
          bio: data.bio,
          location: data.location,
          linkedin: data.linkedin,
          twitter: data.twitter
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating profile",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setActivityLogs(prev => [{
        id: Date.now().toString(),
        activity: "Profile updated",
        date: new Date(),
        status: "success"
      }, ...prev]);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function onPasswordSubmit(data: PasswordFormValues) {
    setIsChangingPassword(true);
    try {
      // First verify current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || "",
        password: data.currentPassword,
      });

      if (signInError) {
        toast({
          variant: "destructive",
          title: "Current password is incorrect",
          description: "Please enter your current password correctly",
        });
        setIsChangingPassword(false);
        return;
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating password",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
      
      setActivityLogs(prev => [{
        id: Date.now().toString(),
        activity: "Password changed",
        date: new Date(),
        status: "success"
      }, ...prev]);
      
      // Reset form
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error signing out",
          description: error.message,
        });
        return;
      }
      
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  function handleCancelSubscription() {
    toast({
      title: "Subscription canceled",
      description: "Your subscription has been canceled. You'll retain access until the end of your billing period.",
    });
    
    // Clear subscription data (in real app, would update database)
    localStorage.removeItem('userSubscription');
    setUserSubscription(null);
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  function getPlanDetails(planId: string) {
    switch(planId) {
      case 'pro':
        return {
          name: 'Pro Plan',
          color: 'bg-blue-100 text-blue-800'
        };
      case 'enterprise':
        return {
          name: 'Enterprise Plan',
          color: 'bg-purple-100 text-purple-800'
        };
      default:
        return {
          name: 'Free Plan',
          color: 'bg-gray-100 text-gray-800'
        };
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=JD&background=%23d1d5db" alt={profileForm.getValues("fullName")} />
                  <AvatarFallback>{profileForm.getValues("fullName").charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{profileForm.getValues("fullName")}</h3>
                  <p className="text-sm text-gray-500">{profileForm.getValues("email")}</p>
                </div>
              </div>
              
              <div>
                {userSubscription && (
                  <div className="mb-4">
                    <Badge className={getPlanDetails(userSubscription.plan).color}>
                      {getPlanDetails(userSubscription.plan).name}
                    </Badge>
                  </div>
                )}
              </div>
              
              <nav className="space-y-1">
                <Button 
                  variant={currentTab === "profile" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setCurrentTab("profile")}
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant={currentTab === "password" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setCurrentTab("password")}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button 
                  variant={currentTab === "billing" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setCurrentTab("billing")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscription
                </Button>
                <Button 
                  variant={currentTab === "notifications" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setCurrentTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button 
                  variant={currentTab === "activity" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setCurrentTab("activity")}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Activity
                </Button>
                <Separator className="my-4" />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Your Profile</h1>
                  <p className="text-gray-600 mt-1">
                    Manage your account settings and preferences
                  </p>
                </div>
                
                <div className="lg:hidden">
                  {/* Fix: Wrap TabsList within Tabs component */}
                  <Tabs defaultValue="profile">
                    <TabsList className="inline-flex h-10 bg-muted">
                      <TabsTrigger value="profile" className="data-[state=active]:bg-background" onClick={() => setCurrentTab("profile")}>
                        <UserIcon className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="password" className="data-[state=active]:bg-background" onClick={() => setCurrentTab("password")}>
                        <Shield className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="billing" className="data-[state=active]:bg-background" onClick={() => setCurrentTab("billing")}>
                        <CreditCard className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="notifications" className="data-[state=active]:bg-background" onClick={() => setCurrentTab("notifications")}>
                        <Bell className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="activity" className="data-[state=active]:bg-background" onClick={() => setCurrentTab("activity")}>
                        <CalendarDays className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              {/* Profile Content */}
              {currentTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal information and professional details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={profileForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    disabled
                                    placeholder="Your email" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="A brief description about yourself" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={profileForm.control}
                            name="jobRole"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Role</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your job role" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="software_engineer">Software Engineer</SelectItem>
                                    <SelectItem value="product_manager">Product Manager</SelectItem>
                                    <SelectItem value="data_scientist">Data Scientist</SelectItem>
                                    <SelectItem value="designer">UX/UI Designer</SelectItem>
                                    <SelectItem value="marketing">Marketing Specialist</SelectItem>
                                    <SelectItem value="sales">Sales Representative</SelectItem>
                                    <SelectItem value="finance">Finance Professional</SelectItem>
                                    <SelectItem value="hr">HR Specialist</SelectItem>
                                    <SelectItem value="customer_support">Customer Support</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="yearsExperience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select years of experience" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0-1">0-1 years</SelectItem>
                                    <SelectItem value="1-3">1-3 years</SelectItem>
                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                    <SelectItem value="5-10">5-10 years</SelectItem>
                                    <SelectItem value="10+">10+ years</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={profileForm.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="City, Country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="space-y-6">
                            <FormField
                              control={profileForm.control}
                              name="linkedin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>LinkedIn</FormLabel>
                                  <FormControl>
                                    <Input placeholder="LinkedIn profile URL" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button
                            type="submit"
                            className="bg-interview-primary hover:bg-interview-secondary text-white"
                            disabled={isSaving}
                          >
                            {isSaving ? "Saving..." : "Save changes"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
              
              {/* Security/Password Content */}
              {currentTab === "password" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Update your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                  >
                                    {showCurrentPassword ? (
                                      <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                      <EyeIcon className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                  >
                                    {showNewPassword ? (
                                      <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                      <EyeIcon className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? (
                                      <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                      <EyeIcon className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end pt-4">
                          <Button
                            type="submit"
                            className="bg-interview-primary hover:bg-interview-secondary text-white"
                            disabled={isChangingPassword}
                          >
                            {isChangingPassword ? "Changing password..." : "Change password"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-gray-500">Last active: {formatDate(new Date())}</p>
                            </div>
                          </div>
                          <Badge>Current</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Billing/Subscription Content */}
              {currentTab === "billing" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subscription Details</CardTitle>
                      <CardDescription>
                        Manage your subscription plan and payment details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userSubscription ? (
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <Badge className={getPlanDetails(userSubscription.plan).color}>
                                {getPlanDetails(userSubscription.plan).name}
                              </Badge>
                              <p className="mt-2 text-sm text-gray-500">
                                Billing cycle: {userSubscription.billingCycle === 'annual' ? 'Annual' : 'Monthly'}
                              </p>
                            </div>
                            <Button 
                              variant="outline" 
                              asChild
                            >
                              <Link to="/pricing">
                                Change Plan
                              </Link>
                            </Button>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md mb-6">
                            <h4 className="font-medium mb-2">Subscription Info</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-gray-500">Reference:</div>
                              <div>{userSubscription.reference}</div>
                              <div className="text-gray-500">Start Date:</div>
                              <div>{formatDate(new Date(userSubscription.date))}</div>
                              <div className="text-gray-500">Next Billing:</div>
                              <div>{formatDate(new Date(Date.now() + 3600000 * 24 * 30))}</div>
                            </div>
                          </div>
                          
                          <Button 
                            variant="destructive"
                            onClick={handleCancelSubscription}
                          >
                            Cancel Subscription
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Active Subscription</h3>
                          <p className="text-gray-500 mb-6">You currently don't have an active subscription plan.</p>
                          <Button asChild className="bg-interview-primary hover:bg-interview-secondary text-white">
                            <Link to="/pricing">
                              View Pricing Plans
                            </Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {userSubscription ? (
                        <div className="border rounded-md overflow-hidden">
                          <div className="grid grid-cols-3 p-4 bg-gray-50 font-medium">
                            <div>Date</div>
                            <div>Amount</div>
                            <div>Status</div>
                          </div>
                          <div className="p-4 border-t">
                            <div className="grid grid-cols-3 mb-2">
                              <div>{formatDate(new Date(userSubscription.date))}</div>
                              <div>
                                ${userSubscription.billingCycle === 'annual' 
                                  ? '191.88'
                                  : '19.99'
                                }
                              </div>
                              <div>
                                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
                                  Paid
                                </Badge>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              Reference: {userSubscription.reference}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No payment history available</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Notifications Content */}
              {currentTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationsForm}>
                      <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-8">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                          <div className="space-y-4">
                            <FormField
                              control={notificationsForm.control}
                              name="email_interviews"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Interview Reminders
                                    </FormLabel>
                                    <FormDescription>
                                      Receive email notifications about upcoming scheduled interviews.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={notificationsForm.control}
                              name="email_marketing"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Marketing Communications
                                    </FormLabel>
                                    <FormDescription>
                                      Receive emails about new features, tips, and special offers.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={notificationsForm.control}
                              name="email_products"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Product Updates
                                    </FormLabel>
                                    <FormDescription>
                                      Receive emails about new product features and improvements.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                          <div className="space-y-4">
                            <FormField
                              control={notificationsForm.control}
                              name="push_interviews"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Interview Results
                                    </FormLabel>
                                    <FormDescription>
                                      Receive push notifications when your interview results are ready.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={notificationsForm.control}
                              name="push_reminders"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Practice Reminders
                                    </FormLabel>
                                    <FormDescription>
                                      Receive reminders to practice for your upcoming interviews.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            type="submit" 
                            className="bg-interview-primary hover:bg-interview-secondary"
                          >
                            Save notification preferences
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
              
              {/* Account Activity Content */}
              {currentTab === "activity" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Account Activity</CardTitle>
                    <CardDescription>
                      Review your recent account activities and login history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {activityLogs.map((log) => (
                        <div key={log.id} className="flex items-start p-4 border rounded-md">
                          <div className="mr-4">
                            {log.status === "success" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : log.status === "warning" ? (
                              <AlertCircle className="h-5 w-5 text-amber-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{log.activity}</p>
                            <p className="text-sm text-gray-500">{formatDate(log.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Card className="border-red-100">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500 mb-4">
                            Deleting your account will permanently remove all your data, including interview records and payment history.
                          </p>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Interview Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    View your recent interview practice sessions and feedback
                  </p>
                  <Button 
                    onClick={() => navigate("/results")} 
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    View interview history
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
