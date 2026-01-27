import { Case, Service, News, Community } from "@shared/schema";

// Mock Services Data
export const servicesMockData: Service[] = [
  {
    id: 1,
    title: "Drafting & Bills of Costs",
    description: "Your bill of costs will be prepared by a Costs Lawyer with attention to detail in order to maximise your legal costs recovery. We draft all types of bills and/or schedules.",
    icon: "file-invoice-dollar",
    slug: "drafting-bills-of-costs"
  },
  {
    id: 2,
    title: "Negotiations & Analysis",
    description: "Over many years, our team has gained the experience and expertise necessary to advise and achieve successful outcomes. Should it be necessary we can attend any hearings or detailed assessment.",
    icon: "handshake",
    slug: "negotiations-analysis"
  },
  {
    id: 3,
    title: "Cost Budgeting",
    description: "From the drafting of the Precedent H to the budget discussion report. We can assist with all aspects of costs budgeting along with advising as to when revisions may need to take place.",
    icon: "calculator",
    slug: "cost-budgeting"
  },
  {
    id: 4,
    title: "Detailed Assessment",
    description: "Our team has extensive experience in detailed assessment proceedings, both in preparation and attendance, ensuring maximum recovery for our clients.",
    icon: "search-dollar",
    slug: "detailed-assessment"
  },
  {
    id: 5,
    title: "Points of Dispute/Reply",
    description: "We draft comprehensive Points of Dispute and Points of Reply, focusing on the key issues to maximize recovery or minimize liability.",
    icon: "gavel",
    slug: "points-of-dispute-reply"
  },
  {
    id: 6,
    title: "Costs Consultation",
    description: "We provide expert advice on all aspects of costs law, helping clients navigate complex legal costs issues with confidence.",
    icon: "comments-dollar",
    slug: "costs-consultation"
  }
];

// Mock Cases Data
export const casesMockData: Case[] = [
  {
    id: 1,
    title: "QOCS applies to detailed assessment proceedings",
    summary: "The Court of Appeal has ruled that Qualified One-way Costs Shifting protection extends to detailed assessment proceedings, significantly impacting costs recovery strategies.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    category: "QOCS",
    date: "May 19, 2024",
    author: "William Mackenzie",
    tags: ["QOCS", "Detailed Assessment", "Court of Appeal"],
    slug: "qocs-applies-to-detailed-assessment-proceedings"
  },
  {
    id: 2,
    title: "Solicitor's Act preliminary issues hearing in relation to interim payments",
    summary: "A recent High Court decision has clarified the treatment of interim payments under the Solicitors Act, providing guidance on assessing final bills.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    category: "Solicitor's Act",
    date: "May 15, 2024",
    author: "William Mackenzie",
    tags: ["Solicitor's Act", "Interim Payments", "High Court"],
    slug: "solicitors-act-preliminary-issues-interim-payments"
  },
  {
    id: 3,
    title: "Revised budget application successful despite significant increase",
    summary: "Case study of a successful application for a revised budget with substantial increases in projected costs.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    category: "Cost Budgeting",
    date: "May 8, 2024",
    author: "William Mackenzie",
    tags: ["Cost Budgeting", "Budget Revision", "Costs Management"],
    slug: "revised-budget-application-successful"
  }
];

// Mock News Data
export const newsMockData: News[] = [
  {
    id: 1,
    title: "QOCS applies to detailed assessment proceedings",
    summary: "The Court of Appeal has ruled that Qualified One-way Costs Shifting protection extends to detailed assessment proceedings, significantly impacting costs recovery strategies.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    category: "News",
    date: "May 19, 2024",
    author: "William Mackenzie",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "qocs-applies-to-detailed-assessment-proceedings"
  },
  {
    id: 2,
    title: "Solicitor's Act preliminary issues hearing in relation to interim payments",
    summary: "A recent High Court decision has clarified the treatment of interim payments under the Solicitors Act, providing guidance on assessing final bills.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    category: "Case Study",
    date: "May 15, 2024",
    author: "William Mackenzie",
    imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "solicitors-act-preliminary-issues-interim-payments"
  },
  {
    id: 3,
    title: "Upcoming Webinar: Navigating Cost Budgeting in 2024",
    summary: "Join William Mackenzie for an in-depth discussion on cost budgeting strategies, recent case law, and best practices for maximizing recovery.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    category: "Event",
    date: "May 8, 2024",
    author: "William Mackenzie",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "webinar-cost-budgeting-2024"
  }
];

// Mock Community Data
export const communityMockData: Community = {
  id: 1,
  discordInviteUrl: "https://discord.gg/mackenziecosts",
  discordServerId: "1234567890",
  eventName: "May Discussion on QOCS Applications",
  eventDescription: "Join us for our monthly discussion on QOCS applications and recent Court of Appeal decisions.",
  eventDate: "May 25, 2024",
  settings: {
    showDiscordWidget: true,
    enableNotifications: true
  }
};

// Features for Why Us section
export const featuresMockData = [
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
