import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { trackEvent } from "@/lib/analytics";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertContactSchema, InsertContact } from "@shared/schema";
import { z } from "zod";

// Extend the schema with additional validation
const contactSchema = insertContactSchema.extend({
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to the collection and storage of your data.",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      consent: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContact) => {
      return apiRequest({ method: 'POST', path: '/api/contact', body: data });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll be in touch soon.",
        variant: "default",
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    const { consent, ...contactData } = data;
    
    // Track form submission event
    trackEvent('form_submit', 'contact', contactData.service || 'no_service_selected');
    
    contactMutation.mutate(contactData);
  }

  return (
    <section id="contact" className="py-20 bg-[#F5F5F7]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">Looking for expert costs law assistance? We're here to help you navigate the complexities of legal costs.</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center mr-4">
                  <i className="fas fa-envelope text-[#007AFF]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-gray-600">william@costlawyer.co.uk</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center mr-4">
                  <i className="fas fa-phone text-[#007AFF]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-gray-600">+44 20 4576 8203</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 flex items-center justify-center mr-4">
                  <i className="fas fa-map-marker-alt text-[#007AFF]"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                  <p className="text-gray-600">86-90 Paul Street, London EC2A 4NE</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-bold text-lg mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://twitter.com/mackenziecosts" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#007AFF] transition-colors duration-300"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href="https://linkedin.com/company/mackenziecosts" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#007AFF] transition-colors duration-300"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a 
                    href="https://facebook.com/mackenziecosts" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#007AFF] transition-colors duration-300"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="font-display font-bold text-2xl mb-6">Send Us a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-green-600 text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-gray-600 mb-4">Thank you for contacting us. We'll be in touch soon.</p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#007AFF] hover:bg-[#2997FF] text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John" 
                                {...field} 
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none" 
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
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Doe" 
                                {...field} 
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john.doe@example.com" 
                              type="email" 
                              {...field} 
                              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none" 
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+44 20 1234 5678" 
                              type="tel" 
                              {...fieldProps}
                              value={value ?? ''}
                              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field: { value, onChange, ...rest } }) => (
                        <FormItem>
                          <FormLabel>Service Required</FormLabel>
                          <Select onValueChange={onChange} value={value || undefined}>
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none">
                                <SelectValue placeholder="Please select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Drafting & Bills of Costs">Drafting & Bills of Costs</SelectItem>
                              <SelectItem value="Negotiations & Analysis">Negotiations & Analysis</SelectItem>
                              <SelectItem value="Cost Budgeting">Cost Budgeting</SelectItem>
                              <SelectItem value="Detailed Assessment">Detailed Assessment</SelectItem>
                              <SelectItem value="Points of Dispute/Reply">Points of Dispute/Reply</SelectItem>
                              <SelectItem value="Costs Consultation">Costs Consultation</SelectItem>
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
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe how we can help you..." 
                              rows={4} 
                              {...field} 
                              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-600">
                              I consent to Mackenzie Costs collecting and storing my data in accordance with their privacy policy.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full px-6 py-3 bg-[#007AFF] hover:bg-[#2997FF] text-white rounded-md font-medium transition-colors duration-300"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <span className="flex items-center justify-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                        </span>
                      ) : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
