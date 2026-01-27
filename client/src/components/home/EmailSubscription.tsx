import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { insertSubscriptionSchema, InsertSubscription } from "@shared/schema";
import { z } from "zod";

type SubscriptionFormValues = z.infer<typeof insertSubscriptionSchema>;

const EmailSubscription = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(insertSubscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: (data: InsertSubscription) => {
      return apiRequest({ method: 'POST', path: '/api/subscribe', body: data });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem with your subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: SubscriptionFormValues) {
    subscriptionMutation.mutate(data);
  }

  return (
    <section id="newsletter" className="py-24 bg-gradient-to-br from-[#007AFF] via-[#0066DD] to-[#0052CC] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djItMnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-white/20 border border-white/30 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-white">Stay Updated</span>
          </motion.div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">Keep in the Know</h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">Join our email list and get regular legal updates, case law analysis, and industry news</p>
        </motion.div>
        
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/30">
              <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Thanks for subscribing!</h4>
              <p className="text-blue-100 mb-6">You'll now receive our latest updates directly to your inbox.</p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-white text-[#007AFF] hover:bg-blue-50 font-semibold shadow-lg"
              >
                Subscribe Another Email
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          placeholder="Enter your email address" 
                          type="email" 
                          {...field} 
                          className="flex-1 h-14 px-6 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all" 
                        />
                      </FormControl>
                      <FormMessage className="text-left text-blue-100 font-medium" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="h-14 px-8 bg-white text-[#007AFF] hover:bg-blue-50 rounded-xl font-bold transition-all duration-300 whitespace-nowrap shadow-xl hover:scale-105"
                  disabled={subscriptionMutation.isPending}
                >
                  {subscriptionMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : "Subscribe Now"}
                </Button>
              </form>
            </Form>
          )}
          <p className="text-blue-100 text-sm mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSubscription;
