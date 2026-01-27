import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import Newsletter from "@/components/home/Newsletter";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  FileText, 
  Handshake,
  Calculator,
  Gavel,
  BookOpen,
  GraduationCap
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "file-text": <FileText className="text-[#007AFF] h-8 w-8" />,
  "handshake": <Handshake className="text-[#007AFF] h-8 w-8" />,
  "calculator": <Calculator className="text-[#007AFF] h-8 w-8" />,
  "gavel": <Gavel className="text-[#007AFF] h-8 w-8" />,
  "book-open": <BookOpen className="text-[#007AFF] h-8 w-8" />,
  "graduation-cap": <GraduationCap className="text-[#007AFF] h-8 w-8" />
};

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services']
  });

  return (
    <div>
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] text-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl">
            Comprehensive solutions tailored to your legal costs needs with unmatched expertise and attention to detail.
          </p>
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">How We Can Help</h2>
            <p className="text-lg text-[#1D1D1F]/80">
              At Mackenzie Costs, we offer a range of specialized services designed to maximize your legal costs recovery and minimize your stress.
            </p>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <Card key={index} className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <Skeleton className="h-12 w-12 rounded-full mb-4" />
                    <Skeleton className="h-7 w-48 mb-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : (
              services?.map((service) => (
                <Card key={service.id} className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-6">
                      {iconMap[service.icon] || <FileText className="text-[#007AFF] h-8 w-8" />}
                    </div>
                    <CardTitle className="text-xl text-[#0A0A0A]">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#1D1D1F]/80 text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Our Process</h2>
            <p className="text-lg text-[#1D1D1F]/80">
              We follow a structured approach to ensure optimal results for all our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-[#007AFF] text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-4 text-[#0A0A0A]">Initial Consultation</h3>
              <p className="text-[#1D1D1F]/80">
                We begin with a thorough assessment of your case to understand your specific needs and objectives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-[#007AFF] text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-4 text-[#0A0A0A]">Strategic Planning</h3>
              <p className="text-[#1D1D1F]/80">
                Our team develops a tailored strategy designed to maximize your costs recovery and achieve your goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-[#007AFF] text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-4 text-[#0A0A0A]">Expert Execution</h3>
              <p className="text-[#1D1D1F]/80">
                We implement our strategy with the highest level of expertise, keeping you informed at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">What Our Clients Say</h2>
            <p className="text-lg text-[#1D1D1F]/80">
              Don't just take our word for it. Here's what our clients have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F5F5F7] p-8 rounded-lg">
              <p className="text-[#1D1D1F] mb-6 italic text-lg">
                "Mackenzie Costs provided exceptional service throughout our complex litigation. Their attention to detail and expertise in costs law proved invaluable in maximizing our recovery."
              </p>
              <div className="flex items-center">
                <div className="rounded-full bg-[#0A0A0A] w-12 h-12 flex items-center justify-center text-white font-bold text-xl mr-4">JD</div>
                <div>
                  <p className="font-semibold text-[#0A0A0A]">Jane Doe</p>
                  <p className="text-[#1D1D1F]/70 text-sm">Senior Partner, London Law Firm</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F5F7] p-8 rounded-lg">
              <p className="text-[#1D1D1F] mb-6 italic text-lg">
                "The team at Mackenzie Costs consistently delivers results that exceed expectations. Their negotiation skills and strategic approach to costs budgeting have saved us significant amounts."
              </p>
              <div className="flex items-center">
                <div className="rounded-full bg-[#0A0A0A] w-12 h-12 flex items-center justify-center text-white font-bold text-xl mr-4">JS</div>
                <div>
                  <p className="font-semibold text-[#0A0A0A]">John Smith</p>
                  <p className="text-[#1D1D1F]/70 text-sm">Legal Director, Corporate Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
