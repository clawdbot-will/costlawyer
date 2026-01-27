import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { insertContactSchema, InsertContact } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Extend schema to add client-side validation for the contact form
const formSchema = insertContactSchema.extend({
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

// Define the form data type based on the schema
type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      privacyPolicy: false,
    },
  });

  // Set up the mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: InsertContact) => {
      return apiRequest({ 
        method: 'POST', 
        path: '/api/contact', 
        body: data 
      });
    },
    onSuccess: () => {
      toast({
        title: 'Message sent!',
        description: 'Thank you for your message. We will get back to you shortly.',
      });
      form.reset();
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: 'Error sending message',
        description: error.message || 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    // Remove the privacyPolicy field as it's not part of the API schema
    const { privacyPolicy, ...contactData } = data;
    mutation.mutate(contactData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-semibold mb-6 text-[#0A0A0A]">Send Us a Message</h3>
      
      {submitted ? (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h4 className="text-xl font-semibold mb-2 text-[#0A0A0A]">Thank You!</h4>
          <p className="text-[#1D1D1F]/80 mb-6">Your message has been sent successfully. We'll get back to you shortly.</p>
          <Button 
            onClick={() => setSubmitted(false)}
            className="bg-[#007AFF] hover:bg-[#2997FF]"
          >
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#007AFF]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Doe" 
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#007AFF]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="name@example.com" 
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#007AFF]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field: { value, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+44 123 456 7890" 
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#007AFF]" 
                        {...fieldProps}
                        value={value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="service"
              render={({ field: { value, onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Service Required</FormLabel>
                  <Select 
                    onValueChange={onChange}
                    value={value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#007AFF]">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Drafting & Bills of Costs">Drafting & Bills of Costs</SelectItem>
                      <SelectItem value="Costs Budgeting">Costs Budgeting</SelectItem>
                      <SelectItem value="Detailed Assessment">Detailed Assessment</SelectItem>
                      <SelectItem value="Legal Costs Consultancy">Legal Costs Consultancy</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={5} 
                      placeholder="Please provide details about your enquiry..." 
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#007AFF]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                      id="privacyPolicy"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-600" htmlFor="privacyPolicy">
                      I agree to the <a href="#" className="text-[#007AFF] hover:text-[#2997FF]">privacy policy</a> and consent to being contacted about my enquiry.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={mutation.isPending}
              className="w-full px-6 py-3 bg-[#007AFF] text-white rounded-md hover:bg-[#2997FF] transition-colors duration-200 font-medium h-12"
            >
              {mutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
