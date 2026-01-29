import HeroSection from "@/components/home/HeroSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import ServicesSection from "@/components/home/ServicesSection";
import CaseLawSection from "@/components/home/CaseLawSection";
import CommunitySection from "@/components/home/CommunitySection";
import NewsSection from "@/components/home/NewsSection";
import ContactSection from "@/components/home/ContactSection";
import EmailSubscription from "@/components/home/EmailSubscription";
import { SEO } from "@/components/seo/SEO";
import { SchemaJSON } from "@/components/seo/SchemaJSON";

const HomePage = () => {
  // Using SEO component to handle metadata instead of manually setting document.title

  return (
    <div>
      <SEO 
        title="Mackenzie Costs | Legal Costs Specialist"
        description="Professional legal costs specialists providing expert advice and services in costs management, detailed assessment, and bill preparation."
        keywords={["legal costs", "costs specialist", "costs management", "bill preparation", "detailed assessment"]}
        type="website"
        canonical="/"
      />
      <SchemaJSON />
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <CaseLawSection />
      <CommunitySection />
      <NewsSection />
      <ContactSection />
      <EmailSubscription />
    </div>
  );
};

export default HomePage;
