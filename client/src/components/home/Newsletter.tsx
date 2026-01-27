import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { insertNewsletterSubscriberSchema } from '@shared/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = insertNewsletterSubscriberSchema.extend({
  email: z.string().email('Please enter a valid email address')
});

type FormData = z.infer<typeof formSchema>;

export default function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest('POST', '/api/newsletter/subscribe', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed successfully!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message || "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <section className="py-16 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Keep in the Know</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join our email list and get regular legal updates, case law analysis, and exclusive content.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
                          className="px-5 py-3 rounded-md focus:outline-none text-[#1D1D1F] h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="px-8 py-3 bg-[#007AFF] text-white rounded-md hover:bg-[#2997FF] transition-colors duration-200 font-medium h-12"
                  disabled={isPending}
                >
                  {isPending ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
