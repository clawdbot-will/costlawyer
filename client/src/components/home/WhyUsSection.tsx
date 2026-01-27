import { motion } from "framer-motion";
import FeatureCard from "@/components/common/FeatureCard";

const features = [
  {
    id: 1,
    icon: "award",
    title: "Legal 500 Ranked",
    description: "William Mackenzie is ranked in the Legal 500, recognizing our expertise and success in costs law."
  },
  {
    id: 2,
    icon: "users",
    title: "Experienced Team",
    description: "Our team of experienced professionals provides practical, effective solutions to clients across various sectors."
  },
  {
    id: 3,
    icon: "lightbulb",
    title: "Tailored Strategies",
    description: "We develop bespoke strategies tailored to each client's specific needs and objectives."
  },
  {
    id: 4,
    icon: "database",
    title: "Extensive Case Database",
    description: "Access our comprehensive searchable case law database for research and reference."
  },
  {
    id: 5,
    icon: "comments",
    title: "Community Support",
    description: "Join our Discord community for lawyer networking, discussions, and expert advice."
  },
  {
    id: 6,
    icon: "file-contract",
    title: "Comprehensive Services",
    description: "From costs budgeting to detailed assessment, we handle all aspects of costs law."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const WhyUsSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDdBRkYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItMnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6bTAtMnYyem0wLTJ2MnptMC0ydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-[#007AFF]">Our Advantages</span>
          </motion.div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Why Choose Mackenzie Costs?</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">We combine legal expertise with advanced technology to provide unmatched costs law services.</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={item}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
