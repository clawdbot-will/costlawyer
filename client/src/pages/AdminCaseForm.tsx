import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { Case, insertCaseSchema } from "@shared/schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ArrowLeft, Save, SendIcon, FileJson, Clipboard, Upload } from "lucide-react";

// Create a form schema that extends the insert schema
const formSchema = insertCaseSchema.extend({
  publishToDiscord: z.boolean().default(false),
  tags: z.any(), // We'll handle the transformation in the mutation functions
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminCaseForm() {
  const [location, navigate] = useLocation();
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const isEditMode = !!params.id;
  const [showJsonImport, setShowJsonImport] = useState<boolean>(false);
  const [jsonInput, setJsonInput] = useState<string>("");

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
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Clear any invalid tokens
        localStorage.removeItem('auth_token');
        navigate("/admin/login");
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Get case details if in edit mode
  const { data: caseData, isLoading: isLoadingCase } = useQuery({
    queryKey: ["/api/cases/id", params.id],
    queryFn: () => apiRequest<Case>({ path: `/api/cases/id/${params.id}` }),
    enabled: isEditMode,
  });

  // Prepare form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
      author: currentUser?.name || "",
      tags: [],
      slug: "",
      publishToDiscord: false,
    },
  });

  // Update form when editing case data is loaded
  useEffect(() => {
    if (caseData && isEditMode) {
      form.reset({
        ...caseData,
        tags: caseData.tags || [],
        publishToDiscord: false, // This is only for new publications
      });
    }
  }, [caseData, form, isEditMode]);

  // Mutations for creating and updating cases
  const createMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const requestBody = { 
        ...data,
        // For tag arrays, ensure it's an array
        tags: Array.isArray(data.tags) ? data.tags : 
              typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : [],
        // For slug, generate from title if not provided
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
      
      // Get token from localStorage as backup
      const localToken = localStorage.getItem('auth_token');
      
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (localToken) {
        headers['Authorization'] = `Bearer ${localToken}`;
      }
      
      const response = await fetch("/api/cases", {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        credentials: "include"
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create case");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cases"] });
      toast({
        title: "Case created",
        description: "The case has been successfully created",
      });
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Creation failed",
        description: error.message || "An error occurred while creating the case",
        variant: "destructive",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const requestBody = {
        ...data,
        // For tag arrays, ensure it's an array
        tags: Array.isArray(data.tags) ? data.tags : 
              typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : []
      };
      
      // Get token from localStorage as backup
      const localToken = localStorage.getItem('auth_token');
      
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (localToken) {
        headers['Authorization'] = `Bearer ${localToken}`;
      }
      
      const response = await fetch(`/api/cases/${params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(requestBody),
        credentials: "include"
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update case");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cases"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cases/id", params.id] });
      toast({
        title: "Case updated",
        description: "The case has been successfully updated",
      });
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message || "An error occurred while updating the case",
        variant: "destructive",
      });
    }
  });

  // Handle form submission
  function onSubmit(data: FormValues) {
    if (isEditMode) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  }

  // Helper to generate slug from title
  const generateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      form.setValue("slug", slug);
    }
  };

  // Handle JSON import
  const handleJsonImport = () => {
    try {
      // Parse JSON input
      const jsonData = JSON.parse(jsonInput);
      
      // Handle both array and single object
      const caseData = Array.isArray(jsonData) ? jsonData[0] : jsonData;
      
      // Update form with JSON data
      form.reset({
        title: caseData.title || "",
        summary: caseData.summary || "",
        content: caseData.content || "",
        category: caseData.category || "",
        date: caseData.date || new Date().toISOString().slice(0, 10),
        author: caseData.author || currentUser?.name || "",
        tags: caseData.tags || [],
        slug: caseData.slug || "",
        publishToDiscord: caseData.publishToDiscord || false
      });
      
      // Hide JSON import form after successful import
      setShowJsonImport(false);
      setJsonInput("");
      
      toast({
        title: "JSON imported",
        description: "Case data has been loaded from JSON",
      });
    } catch (error) {
      console.error('JSON parse error:', error);
      toast({
        title: "Invalid JSON",
        description: "Please check the format of your JSON data",
        variant: "destructive",
      });
    }
  };

  if (!currentUser) {
    return <div className="container py-12">Loading...</div>;
  }

  return (
    <motion.div 
      className="container py-8"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin/dashboard")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">
          {isEditMode ? "Edit Case" : "Add New Case"}
        </h1>
      </div>

      {!isEditMode && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Import from JSON
            </CardTitle>
            <CardDescription>
              Paste JSON data to automatically fill the form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                type="button"
                variant={showJsonImport ? "secondary" : "outline"}
                onClick={() => setShowJsonImport(!showJsonImport)}
                className="w-full"
              >
                <Clipboard className="mr-2 h-4 w-4" />
                {showJsonImport ? "Hide JSON Import" : "Paste JSON Data"}
              </Button>
              
              {showJsonImport && (
                <div className="space-y-4">
                  <Textarea
                    placeholder={`Paste a JSON object here, e.g.:
{
  "title": "Smith v Jones [2024] EWHC 123 (Costs)",
  "summary": "This case involves...",
  "content": "# Smith v Jones [2024]\\n\\n## Summary\\n...",
  "category": "Detailed Assessment",
  "date": "2024-02-15",
  "author": "William Mackenzie",
  "tags": ["proportionality", "costs assessment"],
  "slug": "smith-v-jones-2024-ewhc-123-costs",
  "publishToDiscord": false
}`}
                    rows={10}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={handleJsonImport}
                      disabled={!jsonInput.trim()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Import from JSON
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
          <CardDescription>
            Enter the details of the case law to be added to the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter case title" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            // Only auto-generate slug for new cases if slug is empty
                            if (!isEditMode && !form.getValues("slug")) {
                              generateSlug();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="case-slug" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generateSlug}
                        >
                          Generate
                        </Button>
                      </div>
                      <FormDescription>
                        Used in the URL, must be unique
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief summary of the case" 
                        {...field} 
                        rows={3}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description that will appear in listings and Discord notifications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                        placeholder="Write your case analysis with rich formatting..."
                        className="min-h-[300px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Use the toolbar to format text with bold, italics, underline, different font sizes, lists, and more
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Civil Costs, Legal Aid" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter tags separated by commas" 
                          {...field}
                          value={Array.isArray(field.value) ? field.value.join(', ') : field.value} 
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Separate tags with commas (e.g., QOCS, Detailed Assessment, Fixed Costs)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {!isEditMode && (
                <FormField
                  control={form.control}
                  name="publishToDiscord"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Publish to Discord</FormLabel>
                        <FormDescription>
                          Send a notification about this case to the Discord community
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditMode ? "Update Case" : "Save Case"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}