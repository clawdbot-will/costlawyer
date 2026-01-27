import { useEffect, useState, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { Case, News, TeamMember, Community } from "@shared/schema";
import { motion } from "framer-motion";
import { fadeInVariants, containerVariants, itemVariants } from "@/lib/animations";
import { Upload, FileUp, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  PlusCircle, Edit, Trash2, Send as SendIcon, 
  AlertTriangle, LayoutDashboard, FileText, 
  Newspaper, LogOut, Tag as TagIcon, Activity as ActivityIcon, 
  Settings, Users
} from "lucide-react";

// Community settings form schema
const communityFormSchema = z.object({
  discordInviteUrl: z.string().url({ message: "Please enter a valid Discord URL" }).nullable(),
  discordServerId: z.string().min(2, { message: "Server ID must be at least 2 characters" }).nullable(),
  eventName: z.string().optional().nullable(),
  eventDescription: z.string().optional().nullable(),
  eventDate: z.string().optional().nullable(),
  discordWebhookUrl: z.string().url({ message: "Please enter a valid webhook URL" }).optional().nullable(),
});

type CommunityFormValues = z.infer<typeof communityFormSchema>;

export default function AdminDashboard() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isUpdatingCommunity, setIsUpdatingCommunity] = useState(false);
  const [importResults, setImportResults] = useState<{
    imported: Case[];
    skipped: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Setup form for community settings
  const form = useForm<CommunityFormValues>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      discordInviteUrl: "",
      discordServerId: "",
      eventName: "",
      eventDescription: "",
      eventDate: "",
      discordWebhookUrl: "",
    },
  });

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get auth token from localStorage
        const localToken = localStorage.getItem('auth_token');
        
        const headers: HeadersInit = {};
        if (localToken) {
          headers['Authorization'] = `Bearer ${localToken}`;
        }
        
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          headers
        });
        
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        
        const user = await response.json();
        
        if (user) {
          setCurrentUser(user);
        } else {
          // Clear any invalid tokens
          localStorage.removeItem('auth_token');
          setLocation("/admin/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Clear any invalid tokens
        localStorage.removeItem('auth_token');
        setLocation("/admin/login");
      }
    };
    
    checkAuth();
  }, [setLocation]);

  // Get cases query
  const { data: cases, isLoading: isLoadingCases } = useQuery({
    queryKey: ["/api/cases"],
    queryFn: () => apiRequest<Case[]>({ path: "/api/cases" }),
  });
  
  // Get news query
  const { data: news, isLoading: isLoadingNews } = useQuery({
    queryKey: ["/api/news"],
    queryFn: () => apiRequest<News[]>({ path: "/api/news" }),
  });
  
  // Get team members query
  const { data: teamMembers, isLoading: isLoadingTeam } = useQuery({
    queryKey: ["/api/team"],
    queryFn: () => apiRequest<TeamMember[]>({ path: "/api/team" }),
  });
  
  // Get community settings query
  const { data: communitySettings, isLoading: isLoadingCommunity } = useQuery({
    queryKey: ["/api/community"],
    queryFn: () => apiRequest<Community>({ path: "/api/community" })
  });
  
  // Update form when community settings are loaded
  useEffect(() => {
    if (communitySettings) {
      form.reset({
        discordInviteUrl: communitySettings.discordInviteUrl || "",
        discordServerId: communitySettings.discordServerId || "",
        eventName: communitySettings.eventName || "",
        eventDescription: communitySettings.eventDescription || "",
        eventDate: communitySettings.eventDate || "",
        discordWebhookUrl: communitySettings.discordWebhookUrl || "",
      });
    }
  }, [communitySettings, form]);
  
  // Community settings update mutation
  const updateCommunityMutation = useMutation({
    mutationFn: async (data: CommunityFormValues) => {
      return apiRequest<Community>({
        method: "PUT",
        path: "/api/community",
        body: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community"] });
      toast({
        title: "Settings updated",
        description: "Community settings have been successfully updated",
      });
      setIsUpdatingCommunity(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "An error occurred while updating community settings",
        variant: "destructive",
      });
      setIsUpdatingCommunity(false);
    }
  });
  
  // Form submission handler for community settings
  const onSubmitCommunitySettings = (data: CommunityFormValues) => {
    setIsUpdatingCommunity(true);
    updateCommunityMutation.mutate(data);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      
      await response.json();
      
      // Clear localStorage token
      localStorage.removeItem('auth_token');
      
      // Clear any user state
      setCurrentUser(null);
      
      // Redirect to login
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  // Delete case function
  const handleDeleteCase = async (id: number) => {
    if (!confirm("Are you sure you want to delete this case?")) return;
    
    try {
      await apiRequest<void>({
        method: "DELETE",
        path: `/api/cases/${id}`
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/cases"] });
      
      toast({
        title: "Case deleted",
        description: "The case has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "An error occurred while deleting the case",
        variant: "destructive",
      });
    }
  };
  
  // Delete news function
  const handleDeleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;
    
    try {
      await apiRequest<void>({
        method: "DELETE",
        path: `/api/news/${id}`
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      
      toast({
        title: "News article deleted",
        description: "The news article has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "An error occurred while deleting the news article",
        variant: "destructive",
      });
    }
  };
  
  // Delete team member function
  const handleDeleteTeamMember = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    
    try {
      await apiRequest<void>({
        method: "DELETE",
        path: `/api/team/${id}`
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      
      toast({
        title: "Team member deleted",
        description: "The team member has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "An error occurred while deleting the team member",
        variant: "destructive",
      });
    }
  };

  // Publish to Discord function
  const handlePublishToDiscord = async (id: number) => {
    try {
      await apiRequest<{ message: string }>({
        method: "POST",
        path: `/api/cases/${id}/publish-to-discord`
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/cases"] });
      
      toast({
        title: "Published to Discord",
        description: "The case has been successfully published to Discord",
      });
    } catch (error) {
      toast({
        title: "Publish failed",
        description: "An error occurred while publishing to Discord",
        variant: "destructive",
      });
    }
  };
  
  // Import cases mutation
  const importCasesMutation = useMutation({
    mutationFn: async (fileData: File) => {
      const formData = new FormData();
      formData.append('casesFile', fileData);
      
      const localToken = localStorage.getItem('auth_token');
      const headers: HeadersInit = {};
      if (localToken) {
        headers['Authorization'] = `Bearer ${localToken}`;
      }
      
      const response = await fetch('/api/cases/import', {
        method: 'POST',
        body: formData,
        headers,
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to import cases');
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      setImportResults(data);
      queryClient.invalidateQueries({ queryKey: ["/api/cases"] });
      toast({
        title: "Import successful",
        description: `Imported ${data.imported.length} cases. ${data.skipped.length > 0 ? `Skipped ${data.skipped.length} duplicates.` : ''}`,
      });
      setIsImporting(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Import failed",
        description: error.message || "An error occurred while importing cases",
        variant: "destructive",
      });
      setIsImporting(false);
    }
  });
  
  // Handle file change for import
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.name.endsWith('.json')) {
      toast({
        title: "Invalid file",
        description: "Please select a valid JSON file",
        variant: "destructive",
      });
      return;
    }
    
    setIsImporting(true);
    importCasesMutation.mutate(file);
  };

  if (!currentUser) {
    return <div className="container py-12">Loading...</div>;
  }

  return (
    <motion.div 
      className="container py-6 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, {currentUser.username}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="cases">
        <TabsList className="mb-6 w-full border-b pb-0">
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="cases">
            <FileText className="mr-2 h-4 w-4" />
            Case Law
          </TabsTrigger>
          <TabsTrigger value="news">
            <Newspaper className="mr-2 h-4 w-4" />
            News
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border border-border/40 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cases?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {cases?.filter(c => c.publishedToDiscord).length || 0} published to Discord
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/40 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <TagIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Array.from(new Set(cases?.map(c => c.category) || [])).length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Unique case categories
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/40 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <ActivityIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-2">
                  {cases?.slice(0, 3).map(c => (
                    <div key={c.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 text-sm">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <FileText className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="truncate">{c.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
            
          <h3 className="font-medium mt-8 mb-4">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Button 
              variant="outline" 
              className="justify-start h-auto py-4 px-4"
              onClick={() => setLocation("/admin/cases/new")}
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4 text-primary" />
                  <span className="font-medium">Add New Case</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Create a new case entry
                </p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-4 px-4"
              onClick={() => {
                const tabsElement = document.querySelector('[role="tablist"]');
                const settingsTab = document.querySelector('[value="settings"]');
                if (settingsTab) {
                  (settingsTab as HTMLElement).click();
                  if (tabsElement) tabsElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" />
                  <span className="font-medium">Site Settings</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Manage website configuration
                </p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-4 px-4"
              onClick={() => {
                const tabsElement = document.querySelector('[role="tablist"]');
                const teamTab = document.querySelector('[value="team"]');
                if (teamTab) {
                  (teamTab as HTMLElement).click();
                  if (tabsElement) tabsElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">Team Management</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Manage team members
                </p>
              </div>
            </Button>
          </div>  
        </TabsContent>
        
        <TabsContent value="cases">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Case Law Management</h2>
            <div className="flex gap-2">
              <Button 
                onClick={() => fileInputRef.current?.click()}
                size="sm"
                variant="outline"
                disabled={isImporting || importCasesMutation.isPending}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isImporting || importCasesMutation.isPending ? 'Importing...' : 'Import Cases'}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".json"
                  disabled={isImporting || importCasesMutation.isPending}
                />
              </Button>
              <Button onClick={() => setLocation("/admin/cases/new")} size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Case
              </Button>
            </div>
          </div>

          {importResults && (
            <Card className="mb-6 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Import Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="mb-2"><strong>Successfully imported {importResults.imported.length} cases</strong></p>
                  {importResults.skipped.length > 0 && (
                    <>
                      <p className="text-amber-600 mb-1"><strong>Skipped {importResults.skipped.length} duplicates:</strong></p>
                      <ul className="list-disc pl-5 text-xs text-muted-foreground">
                        {importResults.skipped.slice(0, 5).map((title, idx) => (
                          <li key={idx}>{title}</li>
                        ))}
                        {importResults.skipped.length > 5 && (
                          <li>...and {importResults.skipped.length - 5} more</li>
                        )}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="border border-border/40 shadow-sm">
            <CardContent className="p-0">
              {isLoadingCases ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-muted-foreground">Loading cases...</p>
                </div>
              ) : !cases || cases.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-64">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No cases found</p>
                  <Button 
                    variant="link" 
                    onClick={() => setLocation("/admin/cases/new")}
                    className="mt-2"
                  >
                    Add your first case
                  </Button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[300px]">Title</TableHead>
                        <TableHead className="w-[120px]">Category</TableHead>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[150px]">Author</TableHead>
                        <TableHead className="w-[130px]">Discord Status</TableHead>
                        <TableHead className="text-right w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cases.map((caseItem) => (
                        <TableRow
                          key={caseItem.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">{caseItem.title}</TableCell>
                          <TableCell>{caseItem.category}</TableCell>
                          <TableCell>{caseItem.date}</TableCell>
                          <TableCell>{caseItem.author}</TableCell>
                          <TableCell>
                            {caseItem.publishedToDiscord ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                Not Published
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setLocation(`/admin/cases/edit/${caseItem.id}`)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {!caseItem.publishedToDiscord && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handlePublishToDiscord(caseItem.id)}
                                  title="Publish to Discord"
                                >
                                  <SendIcon className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteCase(caseItem.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="news">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">News Management</h2>
            <div className="flex gap-2">
              <Button 
                onClick={() => setLocation("/admin/news/new")} 
                size="sm"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add News Article
              </Button>
            </div>
          </div>
          
          {/* News List */}
          <Card className="border border-border/40 shadow-sm">
            <CardContent className="p-0">
              {isLoadingNews ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-muted-foreground">Loading news...</p>
                </div>
              ) : !news || news.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-64">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No news articles found</p>
                  <Button 
                    variant="link" 
                    onClick={() => setLocation("/admin/news/new")}
                    className="mt-2"
                  >
                    Add your first news article
                  </Button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[300px]">Title</TableHead>
                        <TableHead className="w-[120px]">Category</TableHead>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[150px]">Author</TableHead>
                        <TableHead className="text-right w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {news.map((newsItem) => (
                        <TableRow
                          key={newsItem.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">{newsItem.title}</TableCell>
                          <TableCell>{newsItem.category}</TableCell>
                          <TableCell>{newsItem.date}</TableCell>
                          <TableCell>{newsItem.author}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setLocation(`/admin/news/edit/${newsItem.id}`)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteNews(newsItem.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Team Management Tab */}
        <TabsContent value="team">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Team Management</h2>
            <div className="flex gap-2">
              <Button 
                onClick={() => setLocation("/admin/team/new")} 
                size="sm"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </div>
          </div>
          
          {/* Team Members List */}
          <Card className="border border-border/40 shadow-sm">
            <CardContent className="p-0">
              {isLoadingTeam ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-muted-foreground">Loading team members...</p>
                </div>
              ) : !teamMembers || teamMembers.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-64">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No team members found</p>
                  <Button 
                    variant="link" 
                    onClick={() => setLocation("/admin/team/new")}
                    className="mt-2"
                  >
                    Add your first team member
                  </Button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[250px]">Name</TableHead>
                        <TableHead className="w-[200px]">Position</TableHead>
                        <TableHead className="w-[200px]">Email</TableHead>
                        <TableHead className="text-right w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMembers.map((member) => (
                        <TableRow
                          key={member.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.position}</TableCell>
                          <TableCell>{member.email || '-'}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setLocation(`/admin/team/edit/${member.id}`)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteTeamMember(member.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Site Settings</h2>
            <div className="flex gap-2">
              <Button 
                size="sm"
                variant="outline"
              >
                <Settings className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
          
          {/* Settings Form */}
          <Card className="border border-border/40 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-base">Community Settings</CardTitle>
              <CardDescription>Manage your Discord community integration</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingCommunity ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">Loading community settings...</p>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmitCommunitySettings)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="discordInviteUrl" className="text-sm font-medium">
                        Discord Invite URL
                      </label>
                      <Input
                        id="discordInviteUrl"
                        placeholder="https://discord.gg/your-invite"
                        {...form.register("discordInviteUrl")}
                        className={form.formState.errors.discordInviteUrl ? "border-red-500" : ""}
                      />
                      {form.formState.errors.discordInviteUrl && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.discordInviteUrl.message}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        The invite link to your Discord server
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="discordServerId" className="text-sm font-medium">
                        Server ID
                      </label>
                      <Input
                        id="discordServerId"
                        placeholder="Discord Server ID (e.g. 123456789012345678)"
                        {...form.register("discordServerId")}
                        className={form.formState.errors.discordServerId ? "border-red-500" : ""}
                      />
                      {form.formState.errors.discordServerId && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.discordServerId.message}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        The name of your Discord server
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="eventName" className="text-sm font-medium">
                        Event Name
                      </label>
                      <Input
                        id="eventName"
                        placeholder="Monthly Legal Discussion"
                        {...form.register("eventName")}
                        className={form.formState.errors.eventName ? "border-red-500" : ""}
                      />
                      {form.formState.errors.eventName && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.eventName.message}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        The name of your community event (optional)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="eventDescription" className="text-sm font-medium">
                        Event Description
                      </label>
                      <Textarea
                        id="eventDescription"
                        placeholder="A brief description of your community event"
                        className={`min-h-[100px] ${form.formState.errors.eventDescription ? "border-red-500" : ""}`}
                        {...form.register("eventDescription")}
                      />
                      {form.formState.errors.eventDescription && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.eventDescription.message}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Description of your community event (optional)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="eventDate" className="text-sm font-medium">
                        Event Date
                      </label>
                      <Input
                        id="eventDate"
                        placeholder="YYYY-MM-DD"
                        {...form.register("eventDate")}
                        className={form.formState.errors.eventDate ? "border-red-500" : ""}
                      />
                      {form.formState.errors.eventDate && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.eventDate.message}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Date of your community event (optional)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="discordWebhookUrl" className="text-sm font-medium">
                        Webhook URL
                      </label>
                      <Input
                        id="discordWebhookUrl"
                        placeholder="https://discord.com/api/webhooks/..."
                        {...form.register("discordWebhookUrl")}
                        className={form.formState.errors.discordWebhookUrl ? "border-red-500" : ""}
                      />
                      {form.formState.errors.discordWebhookUrl && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.discordWebhookUrl.message}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Discord webhook URL for notifications (optional)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={updateCommunityMutation.isPending}
                      className="w-full sm:w-auto"
                    >
                      {updateCommunityMutation.isPending ? 'Saving...' : 'Save Community Settings'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
          
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Contact & Subscriptions</CardTitle>
              <CardDescription>View and manage contact submissions and newsletter subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center py-8">
                <p className="text-muted-foreground">Contact and subscription management is under development</p>
                {/* We'll implement this in the next step */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}