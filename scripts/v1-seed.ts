// ============================================
// V1 SEED — SEO-optimized portfolio content
// ============================================
// Self-contained seeder. Edits happen here section-by-section.
//
// To revert to pre-v1 snapshot: `npm run seed:legacy` (uses seed-data.ts).
// To apply v1 edits: `npm run seed`.

import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const TARGET_EMAIL = process.env.SEED_EMAIL || "asadsaeed.dev@gmail.com";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// ============================================
// SECTION 1 — PROFILE
// ============================================
const profileData = {
  name: "Asad Saeed",
  designation: "Senior Frontend Engineer | MERN Stack Developer",
  residence: "Lahore, Punjab",
  nationality: "Pakistani",
  city: "Lahore",
  age: "26",
  email: "asadsaeed.dev@gmail.com",
  phone: "+92 3017631644 / +92 478730644",
  github_url: "https://github.com/Asad-Saeed",
  linkedin_url: "https://www.linkedin.com/in/asad-saeed-dev/",
  upwork_url: "https://www.upwork.com/freelancers/~01c9dc528b3e2edcde",
  fiverr_url: "https://www.fiverr.com/asad_saeed_dev",
  profile_image_url:
    "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/profile/1775886906895-5qmrw6jvorb.png",
  resume_url:
    "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/documents/1775244061835-3xykg6hij9h.pdf",
  banner_image_url:
    "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/profile/background.png",
  banner_heading: "Hi, I'm Asad Saeed 👋",
  banner_subheadings: [
    "Senior Frontend Engineer",
    "MERN Stack Developer",
    "React & Next.js Specialist",
    "Full Stack JavaScript Developer",
  ],
  completed_projects_count: "27+",
  freelance_clients_count: "5+",
  honors_count: "4+",
  footer_text: "Made with ❤️ by Asad Saeed",
  copyright_year: "2026",
  slug: "asad-saeed",
  skills_banner_heading: "My Skills & Tech",
  background_banner_heading: "My Background",
  portfolio_banner_heading: "Featured Projects",
  contact_banner_heading: "Let's Connect",
  banner_emoji_url:
    "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/profile/emoji.png",
  explore_button_text: "Explore",
  explore_button_url: "https://www.upwork.com/freelancers/~01c9dc528b3e2edcde",
  show_github_section: true,
  github_section_heading: "GitHub Activity",
  show_expertise_section: true,
  show_recommendations_section: true,
  show_reviews_section: true,
  availability_status: "open_to_work",
  show_certifications_section: true,
  secondary_github_url: "https://github.com/Asad-gsoft-consulting",

  // ===== Hero code card =====
  // Comma-separated stack chips for the developer.ts code window.
  code_card_stack: "TypeScript, React, Next.js",

  // ===== Section meta — Expertise =====
  expertise_eyebrow: "Capabilities",
  expertise_heading: "What I build",
  expertise_description:
    "Areas where I bring senior-level depth across architecture, performance, and developer experience.",

  // ===== Section meta — Certifications =====
  certifications_eyebrow: "Credentials",
  certifications_heading: "Certifications",
  certifications_description:
    "Verified credentials and recognized accomplishments across modern web stacks.",

  // ===== Section meta — Recommendations =====
  recommendations_eyebrow: "Endorsements",
  recommendations_heading: "Recommendations",
  recommendations_description:
    "Words from collaborators and engineers I've shipped production work with.",

  // ===== Section meta — Client Reviews =====
  reviews_eyebrow: "Trust",
  reviews_heading: "Client Reviews",
  reviews_description:
    "Direct feedback from clients across freelance, agency, and full-time engagements.",

  // ===== Section meta — Skills page =====
  skills_eyebrow: "Toolkit",
  skills_heading: "Skills & proficiency",
  skills_description: "Stack-level depth across the technologies I ship with day-to-day.",

  // ===== Section meta — Background (Experience) =====
  experience_eyebrow: "Career",
  experience_heading: "Experience",
  experience_description:
    "Roles and engagements where I shipped production work across product, agency, and freelance contexts.",

  // ===== Section meta — Background (Education) =====
  education_eyebrow: "Studies",
  education_heading: "Education",
  education_description: "Academic foundation in software engineering and computer science.",

  // ===== Section meta — Portfolio page =====
  portfolio_eyebrow: "Selected work",
  portfolio_heading: "Projects",
  portfolio_description:
    "Production case studies across product, agency, and freelance — shipped, scaled, and battle-tested.",

  // ===== Section meta — Contact page =====
  contact_eyebrow: "Reach out",
  contact_heading: "Contact information",
  contact_description:
    "Open to freelance, contracts, and collaboration. Pick whichever channel works for you.",
  contact_form_eyebrow: "Inbox",
  contact_form_heading: "Send a message",
  contact_form_description:
    "I read every message. For freelance, contracts, or collaboration — drop a line.",

  // ===== Section meta — GitHub block =====
  github_eyebrow: "Open Source",
  github_description: "Live activity, contributions, and featured repositories from GitHub.",
  github_stats_eyebrow: "Profile",
  github_stats_heading: "Stats",
  github_languages_eyebrow: "Composition",
  github_languages_heading: "Top Languages",
  github_repos_eyebrow: "Open source",
  github_repos_heading: "Featured Repositories",
  github_achievements_eyebrow: "Milestones",
  github_achievements_heading: "Achievements",
};

// ============================================
// SECTION 5 — EDUCATION
// ============================================
const educationData = [
  {
    title: "Government College University Faisalabad",
    marks: "CGPA: 3.67/4.00",
    degree: "Bachelor of Science in Software Engineering",
    detail:
      "Completed my Bachelor of Science in Software Engineering from Government College University Faisalabad with a CGPA of 3.67/4.00. Core coursework included Programming Fundamentals, Data Structures & Algorithms, Object-Oriented Programming, Web & Mobile Development, Software Engineering, Databases, Cloud Computing, Networking, and Software Requirement Specifications — building a strong foundation for modern full-stack web development.",
    year: "2018-2022",
    sort_order: 0,
  },
  {
    title: "The Educator College",
    marks: "Marks: 87%",
    degree: "Intermediate in Pre-Engineering",
    detail:
      "Completed Intermediate in Pre-Engineering at The Educator College with 87% marks, focusing on mathematics, physics, and computer science fundamentals that laid the groundwork for my engineering career.",
    year: "2016-2018",
    sort_order: 1,
  },
  {
    title: "Govt High School and College",
    marks: "Marks: 82%",
    degree: "Matriculation (Computer Science)",
    detail:
      "Completed my Matriculation with Computer Science from Govt High School and College with 82% marks, where my early interest in programming and software development took root.",
    year: "2014-2016",
    sort_order: 2,
  },
];

// ============================================
// SECTION 4 — EXPERIENCE
// ============================================
const experienceData = [
  {
    title: "Global Software Consulting (GSoft)",
    role: "Senior Frontend Engineer (MERN)",
    url: "https://www.gsoftconsulting.com/",
    description:
      "Architecting scalable web and mobile solutions for SaaS, fintech, and enterprise clients. Led micro-frontend architecture reducing deployment time by 50%, managed client communications and technical roadmaps, and mentored junior developers. Boosted application performance and SEO through SSR strategies, caching, and bundle optimization. Established CI/CD practices on AWS Amplify, Vercel, and Netlify that cut release cycles by 30%. Extended product capabilities with Node.js, Express.js, and NestJS for full-stack delivery.",
    year: "06/2023 - Present",
    location: "Lahore, Pakistan",
    sort_order: 0,
  },
  {
    title: "Fuzion Dev",
    role: "Frontend Engineer (MERN)",
    url: "",
    description:
      "Built scalable HRM and CRM systems with role-based access, real-time updates, and complex state-driven interfaces for enterprise workflows. Architected a high-throughput WebSocket system with connection pooling, batching, and resilient reconnection — enabling low-latency communication for 100K+ devices. Refactored state management with Redux Toolkit and React Query for improved scalability. Reduced page load times by up to 40% through lazy loading, caching, and code-splitting.",
    year: "08/2022 - 06/2023",
    location: "Remote",
    sort_order: 1,
  },
  {
    title: "Arbitech Solution",
    role: "Frontend Developer (Web3)",
    url: "http://www.arbitechsolutions.org/",
    description:
      "Developed Web3 platforms using React.js and Next.js, integrating blockchain APIs and smart contracts for decentralized functionality. Built reusable UI components with modern libraries, charts, and animations to ensure consistency across features. Reduced feature development time by 25% through component reusability and frontend optimization practices.",
    year: "01/2022 - 07/2022",
    location: "Lahore, Pakistan",
    sort_order: 2,
  },
  {
    title: "Game Train",
    role: "MERN Stack Intern",
    url: "https://www.gametrain.org/",
    description:
      "Completed an intensive MERN stack internship focused on building production-ready full-stack web applications. Gained hands-on experience with advanced JavaScript, React.js, Node.js, Express.js, and MongoDB — building scalable backend services and interactive frontend interfaces that solidified my foundation in modern full-stack development.",
    year: "09/2021 - 12/2021",
    location: "Lahore, Pakistan",
    sort_order: 3,
  },
  {
    title: "Convert Generation Information Technology (CGIT)",
    role: "WordPress Developer",
    url: "https://www.cgit.pk/",
    description:
      "Early-career role where I designed and developed visually appealing, responsive WordPress websites tailored to client requirements. Customized themes, built custom plugins, enhanced frontend features, and maintained website performance and security — laying the foundation for my journey into modern web development.",
    year: "10/2018 - 09/2020",
    location: "Faisalabad, Pakistan",
    sort_order: 4,
  },
];

// ============================================
// SECTION 2 — EXPERTISE
// ============================================
const expertiseData = [
  {
    title: "Frontend Architecture",
    description:
      "Designing scalable, modular frontend systems with React.js, Next.js, and TypeScript — from component libraries and design systems to micro-frontends and monorepo architectures that support multiple product lines.",
    sort_order: 0,
  },
  {
    title: "MERN Stack Development",
    description:
      "End-to-end web application development using MongoDB, Express.js, React.js, and Node.js. Strong focus on clean architecture, data-flow discipline, and maintainable code across the full stack.",
    sort_order: 1,
  },
  {
    title: "Performance Optimization",
    description:
      'Code splitting, lazy loading, caching strategies, SSR, and bundle optimization to achieve Lighthouse 90+ scores on production applications. Improved Core Web Vitals (LCP, CLS, FID) to Google\'s "Good" thresholds.',
    sort_order: 2,
  },
  {
    title: "SEO & Accessibility",
    description:
      "Server-side rendering, structured data (JSON-LD), semantic HTML, meta-tag optimization, and WCAG-compliant UIs. Building web applications that rank well on Google and serve all users regardless of ability.",
    sort_order: 3,
  },
  {
    title: "API Integration & Design",
    description:
      "Designing and consuming REST and GraphQL APIs with authentication (JWT, OAuth, NextAuth), rate limiting, caching, and secure data flow patterns. Skilled with Apollo Client, Axios, and SWR.",
    sort_order: 4,
  },
  {
    title: "State Management",
    description:
      "Redux Toolkit, React Query, and Zustand for managing complex client and server state across large-scale applications. Optimized patterns for consistency, performance, and maintainability.",
    sort_order: 5,
  },
  {
    title: "Responsive UI/UX",
    description:
      "Mobile-first, pixel-perfect interfaces using Tailwind CSS, Shadcn UI, and Material UI. Expert at translating Figma and Adobe XD designs into production-ready React components with delightful interactions.",
    sort_order: 6,
  },
  {
    title: "Real-Time Systems",
    description:
      "WebSocket and Socket.io systems with connection pooling, batching, and resilient reconnection logic. Architected real-time infrastructure supporting 100K+ devices with low-latency messaging.",
    sort_order: 7,
  },
  {
    title: "Web3 & Blockchain",
    description:
      "Smart contract integration, Web3 wallet connectivity (MetaMask, WalletConnect), and NFT/token platforms on Ethereum-based networks. Experience with Ether.js, token swaps, and decentralized applications.",
    sort_order: 8,
  },
  {
    title: "AI & Automation",
    description:
      "Integrating OpenAI APIs and n8n workflow automation to build AI-powered features, intelligent agents, and automated business processes. Bridging modern web apps with AI-driven insights.",
    sort_order: 9,
  },
];

// ============================================
// SECTION 6 — PORTFOLIO PROJECTS (+ technologies)
// New projects on top (0-5), existing shifted down.
// ============================================
const portfolioProjectsData = [
  // ----- NEW PROJECTS (from 2024 CVs) -----
  {
    project_name: "XConnect — Financial Trading Platform",
    url: "https://xconnectgroup.com/",
    image_url: "",
    project_detail:
      "High-performance financial trading and market access platform serving millions of users. Built a landing page and internal portals for trading operations with role-based access control and scalable frontend architecture.",
    sort_order: 0,
    project_slug: "xconnect",
    challenge:
      "The client needed a fintech platform that could handle millions of concurrent users while maintaining sub-second load times, complex role-based access for trading operations, and strict regulatory compliance for financial market access.",
    solution:
      "Designed a scalable Next.js frontend architecture with server-side rendering, implemented role-based access portals for trading workflows, and optimized bundle sizes with code splitting and edge caching. Built reusable TypeScript component libraries for consistency across the trading ecosystem.",
    impact:
      "Delivered a production-grade trading platform supporting millions of financial market users. Achieved sub-second page loads and improved developer velocity through shared components, while ensuring secure role-based access throughout.",
    role: "Senior Frontend Engineer — owned frontend architecture, built the corporate landing page and internal trading portals, established component library standards, and coordinated with backend and compliance teams.",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "TypeScript", sort_order: 1 },
      { tech_name: "React JS", sort_order: 2 },
      { tech_name: "Tailwind CSS", sort_order: 3 },
      { tech_name: "REST API", sort_order: 4 },
      { tech_name: "RBAC", sort_order: 5 },
    ],
  },
  {
    project_name: "Verki — Home Services SaaS (Customer)",
    url: "https://verki.is/",
    image_url: "",
    project_detail:
      "A customer-facing SaaS platform for browsing, booking, and managing home services in Iceland. Integrated API-driven workflows for service discovery, provider selection, and real-time booking management — built as a complete MERN stack monorepo.",
    sort_order: 1,
    project_slug: "verki",
    challenge:
      "The Icelandic home services market lacked a modern, user-friendly platform where customers could discover, compare, and book trusted service providers with transparent pricing and availability.",
    solution:
      "Built a customer-first home services platform using the MERN stack in a monorepo architecture. Implemented service browsing, provider profiles, real-time booking flows, form validations, and backend synchronization. Designed responsive, accessible interfaces optimized for the local market.",
    impact:
      "Enabled homeowners in Iceland to find and book trusted service providers seamlessly. Streamlined operations for service providers through transparent scheduling and delivered a production-grade platform that scaled with the client's growing user base.",
    role: "Full Stack MERN Developer — built the customer-facing frontend, REST APIs for bookings and services, and backend business logic. Set up the monorepo architecture shared with the admin portal.",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "Node JS", sort_order: 1 },
      { tech_name: "Express JS", sort_order: 2 },
      { tech_name: "MongoDB", sort_order: 3 },
      { tech_name: "REST API", sort_order: 4 },
      { tech_name: "Tailwind CSS", sort_order: 5 },
    ],
  },
  {
    project_name: "Verki Admin Portal — Internal Dashboard",
    url: "https://admin.verki.is/",
    image_url: "",
    project_detail:
      "A role-based admin dashboard for managing users, service providers, bookings, and reviews for the Verki platform. Full MERN stack solution built within a monorepo sharing code with the customer app.",
    sort_order: 2,
    project_slug: "verki-admin",
    challenge:
      "The operations team needed a unified admin system to manage users, service providers, bookings, and reviews efficiently — without context-switching between tools or direct database access.",
    solution:
      "Developed a full-featured MERN stack admin dashboard within a monorepo, sharing TypeScript types and utilities with the customer platform. Built role-based access control for different admin tiers, implemented CRUD for users/bookings/projects/reviews, and delivered backend business logic with secure API endpoints.",
    impact:
      "Empowered the operations team to manage the entire platform from a single interface, reduced time-to-resolve for customer issues through streamlined admin workflows, and enabled data-driven decisions through comprehensive reporting.",
    role: "Full Stack MERN Developer — owned the admin portal frontend, backend APIs, database modeling, and monorepo architecture. Coordinated code sharing between customer and admin apps.",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "Node JS", sort_order: 1 },
      { tech_name: "Express JS", sort_order: 2 },
      { tech_name: "MongoDB", sort_order: 3 },
      { tech_name: "RBAC", sort_order: 4 },
      { tech_name: "Monorepo", sort_order: 5 },
    ],
  },
  {
    project_name: "North Start AI — AI SaaS Admin Panel",
    url: "https://nrthstr.ai/",
    image_url: "",
    project_detail:
      "An AI-powered SaaS admin panel for managing AI agents and workflow automation. Built with n8n integration to orchestrate multi-step AI processes, real-time monitoring, and OpenAI-driven features.",
    sort_order: 3,
    project_slug: "north-start-ai",
    challenge:
      "Businesses needed a unified control center to configure, monitor, and execute AI-driven automation workflows — without requiring deep technical knowledge of underlying APIs or automation pipelines.",
    solution:
      "Developed a role-based admin dashboard with Next.js that integrates n8n automation pipelines and multiple AI APIs including OpenAI. Built configuration interfaces for AI agents, execution flow monitoring, and real-time logs. Implemented secure API integrations and workflow orchestration.",
    impact:
      "Enabled non-technical users to manage complex AI workflows through an intuitive interface, reduced time-to-deploy for new automation flows, and opened the door to AI-driven business process automation across multiple industries.",
    role: "Senior Frontend Engineer — built the admin dashboard, n8n integration layer, and AI workflow interfaces. Implemented monitoring and configuration flows for AI agents.",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "TypeScript", sort_order: 1 },
      { tech_name: "n8n", sort_order: 2 },
      { tech_name: "OpenAI API", sort_order: 3 },
      { tech_name: "REST API", sort_order: 4 },
      { tech_name: "Tailwind CSS", sort_order: 5 },
    ],
  },
  {
    project_name: "IV Wellness — CRM & HRM Platform",
    url: "https://iv-wellness-frontend.vercel.app/",
    image_url: "",
    project_detail:
      "A comprehensive lead management CRM and HRM platform with role-based access control. Streamlined client management, appointment scheduling, HR operations, and internal workflows through intuitive dashboards and API-driven automation.",
    sort_order: 4,
    project_slug: "iv-wellness",
    challenge:
      "The business needed a unified platform to manage leads, appointments, clients, and HR operations — previously scattered across multiple disconnected tools, leading to data inconsistency and operational inefficiency.",
    solution:
      "Built a full-featured CRM/HRM with role-based dashboards tailored to sales, HR, and admin users. Implemented API-driven workflows for client management, appointment scheduling, and internal operations. Ensured responsive, maintainable UI suitable for daily operational use.",
    impact:
      "Consolidated multiple operational tools into a single platform, reduced data inconsistencies, and enhanced team productivity through role-based dashboards and automated workflows. Improved tracking accuracy for leads, appointments, and HR tasks.",
    role: "Frontend Engineer — built the lead management system, HR dashboards, and appointment scheduling interfaces. Handled API integration and state management with Redux Toolkit.",
    technologies: [
      { tech_name: "React JS", sort_order: 0 },
      { tech_name: "Next JS", sort_order: 1 },
      { tech_name: "Redux Toolkit", sort_order: 2 },
      { tech_name: "REST API", sort_order: 3 },
      { tech_name: "Tailwind CSS", sort_order: 4 },
    ],
  },
  {
    project_name: "Finance IQ — Fintech Mobile App & Landing",
    url: "https://finance-iq-website.vercel.app/",
    image_url: "",
    project_detail:
      "A finance-focused mobile application with AI-driven features and a marketing landing page. Delivered secure data handling, financial calculations, and cross-platform consistency for modern personal finance management.",
    sort_order: 5,
    project_slug: "finance-iq",
    challenge:
      "Users needed a personal finance app that combined traditional financial tracking with AI-powered insights — while maintaining security, performance, and cross-platform consistency across iOS and Android.",
    solution:
      "Built a React Native mobile app with secure data handling, financial calculations, and AI-driven features. Delivered a high-performance marketing landing page in Next.js with clear CTAs and conversion optimization. Ensured consistent behavior across both mobile platforms.",
    impact:
      "Delivered a production-ready fintech app with AI-driven insights. Optimized mobile performance and state management for a smooth user experience, and launched a landing page that effectively communicated the product value proposition.",
    role: "Frontend Engineer — contributed to mobile app UI, financial logic, landing page development, and cross-platform state management.",
    technologies: [
      { tech_name: "React Native", sort_order: 0 },
      { tech_name: "Next JS", sort_order: 1 },
      { tech_name: "TypeScript", sort_order: 2 },
      { tech_name: "REST API", sort_order: 3 },
      { tech_name: "Tailwind CSS", sort_order: 4 },
    ],
  },

  // ----- EXISTING PROJECTS (shifted down, kept as before) -----
  {
    project_name: "Obenan — AI-Driven Local SEO SaaS",
    url: "https://www.obenan.ai/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/obenan.png",
    project_detail:
      "An AI-powered local business SEO and digital presence platform. Integrated OpenAI and third-party services to automate listings, reviews, and analytics, with modular AI interfaces delivering actionable insights for businesses.",
    sort_order: 6,
    project_slug: "obenan",
    challenge:
      "Local businesses needed a way to manage their digital presence across dozens of platforms (Google, Facebook, Yelp, etc.) without manual effort, while gaining AI-driven insights into reviews, SEO performance, and customer sentiment.",
    solution:
      "Contributed to a scalable Next.js platform that integrates OpenAI and third-party APIs to automate listing management, review responses, and analytics. Built modular AI interfaces for delivering actionable insights and reusable components for multi-location business management.",
    impact:
      "Enabled businesses to manage their digital presence at scale with AI-driven automation. Delivered a production SaaS platform that empowers local SEO strategies through intelligent automation and centralized analytics.",
    role: "Frontend Engineer — built modular AI-integrated interfaces, contributed to component library, and optimized platform performance.",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "TypeScript", sort_order: 1 },
      { tech_name: "Material UI", sort_order: 2 },
      { tech_name: "Strapi", sort_order: 3 },
      { tech_name: "GraphQL", sort_order: 4 },
      { tech_name: "OpenAI API", sort_order: 5 },
    ],
  },
  {
    project_name: "Pedlar Store — Fashion E-Commerce SaaS",
    url: "https://pedlar.store/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/pedlar.png",
    project_detail:
      "A modern e-commerce platform tailored for creators and brands to showcase and sell fashion products online. Delivered a seamless shopping experience with integrated product, pricing, and checkout flows.",
    sort_order: 7,
    project_slug: "pedlar-store",
    challenge:
      "The client needed a modern, high-performance e-commerce platform that could handle their growing product catalog while delivering a seamless shopping experience. The existing solution suffered from slow page loads, clunky navigation, and a checkout flow that was causing significant cart abandonment.",
    solution:
      "Built a fully optimized e-commerce platform using Next.js with server-side rendering and static generation for product pages, delivering near-instant page loads. Implemented a streamlined product showcase with dynamic filtering, real-time search, and a frictionless multi-step checkout with integrated billing. Leveraged image optimization, code splitting, and edge caching to ensure consistent performance under high traffic.",
    impact:
      'Achieved sub-second page load times through SSR/SSG optimization. Streamlined the billing and checkout flow, reducing cart abandonment. Improved Core Web Vitals scores (LCP, CLS, FID) to Google\'s "Good" threshold across all pages, boosting organic search visibility.',
    role: "Senior Frontend Lead managing a team of 5 engineers. Owned the frontend architecture decisions, established coding standards and review processes, mentored junior developers, and personally built the performance-critical checkout and billing modules. Coordinated with backend and design teams to deliver on tight deadlines.",
    technologies: [
      { tech_name: "ReactJS", sort_order: 0 },
      { tech_name: "REST API's", sort_order: 1 },
      { tech_name: "Material UI", sort_order: 2 },
      { tech_name: "JavaScript", sort_order: 3 },
      { tech_name: "Stripe", sort_order: 4 },
    ],
  },
  {
    project_name: "FoodSwitch Cloud — Food & Nutrition Platform",
    url: "https://fscloud.foodswitch.com/login",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/fscloud.png",
    project_detail:
      "A data management system and public landing platform for food research institutions (product of The George Institute for Global Health). Handles complex frontend logic for data visualization, role-based access, and cross-system synchronization to support healthier food choices based on nutrient calculations. AWS case-study recognized.",
    sort_order: 8,
    project_slug: "foodswitch-cloud",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "Tailwind CSS", sort_order: 1 },
      { tech_name: "REST API", sort_order: 2 },
      { tech_name: "NextAuth", sort_order: 3 },
    ],
  },
  {
    project_name: "ESTRELLA TERA — NFT & Token Swap Platform",
    url: "https://646f0f0bad16221200c6b558--silver-cuchufli-1d1850.netlify.app/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/estra.png",
    project_detail:
      "A blockchain web app for NFT minting and token swaps on Ethereum-based networks. Fully responsive interfaces with Web3 integration for seamless user interactions and secure blockchain transactions.",
    sort_order: 9,
    project_slug: "estrella-tera",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "React JS", sort_order: 0 },
      { tech_name: "SCSS", sort_order: 1 },
      { tech_name: "Bootstrap", sort_order: 2 },
      { tech_name: "Ethereum", sort_order: 3 },
      { tech_name: "Blockchain", sort_order: 4 },
    ],
  },
  {
    project_name: "Prism — Goal Management App",
    url: "https://prism.creamyproducts.com/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/prism.png",
    project_detail:
      "A comprehensive goal management application that helps users set, track, and achieve their objectives effectively, with Stripe integration for seamless payment handling.",
    sort_order: 10,
    project_slug: "prism",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "React JS", sort_order: 0 },
      { tech_name: "Next UI", sort_order: 1 },
      { tech_name: "Tailwind CSS", sort_order: 2 },
      { tech_name: "Stripe", sort_order: 3 },
      { tech_name: "REST API", sort_order: 4 },
    ],
  },
  {
    project_name: "MNFT Swap — NFT Minting & Swap Platform",
    url: "https://6479defc346047008733d056--chipper-pastelito-5673e8.netlify.app/#/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/swap.png",
    project_detail:
      "A decentralized platform for minting and swapping NFTs, providing a seamless user experience for blockchain-based digital asset management.",
    sort_order: 11,
    project_slug: "mnft-swap",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "React JS", sort_order: 0 },
      { tech_name: "SCSS", sort_order: 1 },
      { tech_name: "Bootstrap", sort_order: 2 },
      { tech_name: "Ether.js", sort_order: 3 },
      { tech_name: "Blockchain", sort_order: 4 },
    ],
  },
  {
    project_name: "Safe Herit — Secure Digital Asset Storage",
    url: "https://testing-safeherit.web.app/login",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/safeherit.png",
    project_detail:
      "A platform for safe and secure storage of digital assets and documents, with advanced security features and user-friendly interface.",
    sort_order: 12,
    project_slug: "safe-herit",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "React JS", sort_order: 0 },
      { tech_name: "Bootstrap", sort_order: 1 },
      { tech_name: "Stripe", sort_order: 2 },
      { tech_name: "Firebase", sort_order: 3 },
      { tech_name: "REST API", sort_order: 4 },
    ],
  },
  {
    project_name: "NR Mobiles & Accessories Company",
    url: "https://nrmobiles.com/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/nrmobiles.png",
    project_detail:
      "An e-commerce platform for mobile phones and accessories offering a user-friendly interface for product browsing and online shopping.",
    sort_order: 13,
    project_slug: "nr-mobiles",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "Material UI", sort_order: 1 },
      { tech_name: "Strapi", sort_order: 2 },
      { tech_name: "GraphQL", sort_order: 3 },
      { tech_name: "Bootstrap", sort_order: 4 },
    ],
  },
  {
    project_name: "Company Needs — Business E-Commerce",
    url: "https://company-needs-front-end.vercel.app/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/companyneeds.png",
    project_detail:
      "An e-commerce solution designed for businesses to manage product listings, inventory, and sales.",
    sort_order: 14,
    project_slug: "company-needs",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "SCSS", sort_order: 1 },
      { tech_name: "Strapi", sort_order: 2 },
      { tech_name: "GraphQL", sort_order: 3 },
      { tech_name: "Bootstrap", sort_order: 4 },
    ],
  },
  {
    project_name: "Ask Cyborg — AI Chatbot Platform",
    url: "https://askcyborg.com/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/askcyborg.png",
    project_detail:
      "An AI-powered chatbot platform designed to enhance customer support and provide instant query resolutions.",
    sort_order: 15,
    project_slug: "ask-cyborg",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "PHP", sort_order: 1 },
      { tech_name: "REST API's", sort_order: 2 },
      { tech_name: "Material UI", sort_order: 3 },
    ],
  },
  {
    project_name: "Global Software Consulting — Agency Site",
    url: "https://www.gsoftconsulting.com/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/gsoft.png",
    project_detail:
      "A portfolio website showcasing Global Software Consulting's expertise and services in software development and IT consulting.",
    sort_order: 16,
    project_slug: "gsoft",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "React JS", sort_order: 0 },
      { tech_name: "Material UI", sort_order: 1 },
      { tech_name: "Strapi", sort_order: 2 },
      { tech_name: "GraphQL", sort_order: 3 },
    ],
  },
  {
    project_name: "Digital Wave Solutions — Marketing Agency",
    url: "http://digitalwavesolutions.ca/",
    image_url: "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/dws.png",
    project_detail:
      "The portfolio of a digital marketing agency showcasing their services, expertise, and success stories.",
    sort_order: 17,
    project_slug: "digital-wave-solutions",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "Next JS", sort_order: 0 },
      { tech_name: "Material UI", sort_order: 1 },
      { tech_name: "Email Js", sort_order: 2 },
    ],
  },
  {
    project_name: "COINPICK 365 — Crypto Trading Platform",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/projects/coinpack.png",
    project_detail:
      "A crypto trading platform designed for secure and efficient cryptocurrency trading and portfolio management.",
    sort_order: 18,
    project_slug: "coinpick-365",
    challenge: "",
    solution: "",
    impact: "",
    role: "",
    technologies: [
      { tech_name: "React JS", sort_order: 0 },
      { tech_name: "SCSS", sort_order: 1 },
      { tech_name: "Bootstrap", sort_order: 2 },
      { tech_name: "Ethereum", sort_order: 3 },
      { tech_name: "Blockchain", sort_order: 4 },
    ],
  },
];

// ============================================
// SECTION 3 — SKILLS (+ levels)
// 13 existing + 3 new. WordPress kept (replaceable later via admin).
// ============================================
const skillsData = [
  {
    tech_name: "React.js Engineer",
    url: "https://nrthstr.ai/",
    image_url: "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/react.png",
    description:
      "Expert in building interactive, component-driven web applications using React.js with hooks, context, and modern patterns.",
    sort_order: 0,
    levels: [{ title: "React.js, Hooks, Context", level: "95%", sort_order: 0 }],
  },
  {
    tech_name: "Next.js Engineer",
    url: "https://xconnectgroup.com/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/nextjs.png",
    description:
      "Skilled in building server-rendered and statically generated web apps using Next.js — App Router, Server Components, ISR, SEO optimization.",
    sort_order: 1,
    levels: [{ title: "Next.js, SSR, SSG, App Router", level: "95%", sort_order: 0 }],
  },
  {
    tech_name: "JavaScript & TypeScript Developer",
    url: "https://verki.is/",
    image_url: "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/jsts.png",
    description:
      "Proficient in building robust, type-safe, scalable applications with modern JavaScript (ES6+) and TypeScript.",
    sort_order: 2,
    levels: [{ title: "JavaScript (ES6+), TypeScript", level: "95%", sort_order: 0 }],
  },
  {
    tech_name: "HTML & CSS Designer",
    url: "https://fscloud.foodswitch.com/login",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/htmlcss.png",
    description:
      "Experienced in crafting responsive, semantic, and accessible web layouts using modern HTML5 and CSS3.",
    sort_order: 3,
    levels: [{ title: "HTML5, CSS3, Semantic Markup, Accessibility", level: "95%", sort_order: 0 }],
  },
  {
    tech_name: "CSS Framework Specialist",
    url: "https://askcyborg.com/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/bootstrap-vs-tailwindcss.png",
    description:
      "Expertise in modern CSS frameworks and utility-first styling for rapid, consistent, responsive UI development.",
    sort_order: 4,
    levels: [{ title: "Tailwind CSS, Bootstrap, Shadcn UI", level: "95%", sort_order: 0 }],
  },
  {
    tech_name: "UI Component Libraries",
    url: "https://www.gsoftconsulting.com/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/muisass.png",
    description:
      "Experienced in styling React applications with modern component libraries and CSS-in-JS approaches.",
    sort_order: 5,
    levels: [
      { title: "Material UI, Next UI, SCSS, Styled Components", level: "90%", sort_order: 0 },
    ],
  },
  {
    tech_name: "State Management Expert",
    url: "https://iv-wellness-frontend.vercel.app/",
    image_url: "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/redux.jpg",
    description:
      "Proficient with Redux Toolkit, React Query, and Zustand for managing complex client and server state at scale.",
    sort_order: 6,
    levels: [
      { title: "Redux Toolkit, React Query, Zustand, Context API", level: "92%", sort_order: 0 },
    ],
  },
  {
    tech_name: "API Integration Specialist",
    url: "https://nrmobiles.com/",
    image_url: "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/rest.png",
    description:
      "Skilled at designing and consuming REST and GraphQL APIs, with authentication, caching, and secure data flow.",
    sort_order: 7,
    levels: [{ title: "REST APIs, GraphQL, Apollo Client", level: "92%", sort_order: 0 }],
  },
  {
    tech_name: "Version Control & Collaboration",
    url: "https://www.obenan.ai/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/Bitbucket-vs-Github.png",
    description:
      "Expert in Git-based workflows (GitHub, Bitbucket) for team collaboration, code reviews, and CI/CD pipelines.",
    sort_order: 8,
    levels: [{ title: "Git, GitHub, Bitbucket, GitHub Actions", level: "98%", sort_order: 0 }],
  },
  {
    tech_name: "Node.js & Express.js Developer",
    url: "https://admin.verki.is/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/Node_Express.png",
    description:
      "Capable of building production-ready backend services and REST APIs using Node.js and Express.js.",
    sort_order: 9,
    levels: [{ title: "Node.js, Express.js, REST APIs", level: "85%", sort_order: 0 }],
  },
  {
    tech_name: "Database Specialist",
    url: "https://verki.is/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/mongodb-vs-mysql.png",
    description:
      "Proficient in database modeling and queries with MongoDB, PostgreSQL, MySQL, and Prisma ORM.",
    sort_order: 10,
    levels: [
      { title: "MongoDB, PostgreSQL, MySQL, Prisma ORM, Mongoose", level: "80%", sort_order: 0 },
    ],
  },
  {
    tech_name: "Backend & Full Stack Engineer",
    url: "https://admin.verki.is/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/backend.png",
    description:
      "End-to-end backend development — REST/GraphQL APIs, authentication, business logic, and scalable architecture.",
    sort_order: 11,
    levels: [{ title: "Node.js, Express.js, NestJS, REST & GraphQL", level: "80%", sort_order: 0 }],
  },
  {
    tech_name: "WordPress Developer",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/skills/wordpress.jpg",
    description:
      "Experienced in creating and customizing WordPress websites with custom themes and plugins.",
    sort_order: 12,
    levels: [{ title: "WordPress, Custom Themes, Plugins", level: "80%", sort_order: 0 }],
  },
  // ----- NEW SKILL CARDS (upload image_url via admin later) -----
  {
    tech_name: "NestJS & Structured Backend",
    url: "https://admin.verki.is/",
    image_url: "",
    description:
      "Expert in structured backend architecture with NestJS — TypeScript-first framework with modular design, dependency injection, and scalable patterns.",
    sort_order: 13,
    levels: [{ title: "NestJS, Modular Architecture, TypeScript", level: "80%", sort_order: 0 }],
  },
  {
    tech_name: "Real-Time Systems Engineer",
    url: "https://nrthstr.ai/",
    image_url: "",
    description:
      "Building low-latency, high-throughput real-time systems with WebSockets and Socket.io — connection pooling, batching, resilient reconnection.",
    sort_order: 14,
    levels: [{ title: "WebSockets, Socket.io, Real-Time APIs", level: "82%", sort_order: 0 }],
  },
  {
    tech_name: "AI & Automation Specialist",
    url: "https://nrthstr.ai/",
    image_url: "",
    description:
      "Integrating OpenAI APIs and n8n workflow automation to build AI-powered features, intelligent agents, and automated business processes.",
    sort_order: 15,
    levels: [{ title: "OpenAI API, n8n Workflows, AI Agents", level: "78%", sort_order: 0 }],
  },
];

// ============================================
// SECTION 8 — RECOMMENDATIONS (unchanged)
// ============================================
const recommendationsData = [
  {
    name: "Athasham Shahzad",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/recommendations/ahtisham.jpeg",
    designation: "React Native | NEXT JS | Node | GraphQL",
    view: "Hello everyone! I'm excited to recommend Asad Saeed for any React.js opportunities. I've had the pleasure of collaborating with him on numerous projects, witnessing his profound grasp of React.js and Next.js concepts, consistently delivering top-notch code. Asad exhibits a strong commitment to learning and development, always eager to take on new challenges. With his reliability and dedication, he's a valuable addition to any React.js team. I highly endorse Asad Saeed! 👍! 🌟",
    linkedin_url: "https://www.linkedin.com/in/ahtishamshahzad/",
    sort_order: 0,
  },
  {
    name: "Raza Sabir",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/recommendations/raza.jpeg",
    designation: "React JS | NEXT JS | MUI | GraphQL",
    view: "I've had the honor of collaborating with Asad Saeed on several university projects, and I must emphasize his exceptional talent and strong work ethic. During our time together at Global Software Consulting, Asad Saeed's professionalism and meticulous attention to detail were evident, contributing significantly to our team's success. I confidently recommend Asad Saeed for any role that requires a highly skilled and committed individual.",
    linkedin_url: "https://www.linkedin.com/in/raza-mughal-developer/",
    sort_order: 1,
  },
  {
    name: "Muhammad Afzaal",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/recommendations/afzaal.jpeg",
    designation: "React Native | Javascript | typescript | ReactJs | Nextjs",
    view: "I enthusiastically endorse Asad Saeed as an accomplished React frontend developer with exceptional UI/UX design skills. His expertise in Node.js further amplifies his capacity to develop resilient and scalable applications. Asad Saeed's meticulous attention to detail, adept problem-solving abilities, and unwavering commitment to excellence make him an invaluable asset to any development team.",
    linkedin_url: "https://www.linkedin.com/in/muhammad-afzal-7333321b5/",
    sort_order: 2,
  },
  {
    name: "Mohsin Hussain",
    image_url:
      "https://xyufrjjbhqndxfxbxcut.supabase.co/storage/v1/object/public/recommendations/moshin.jpeg",
    designation: "React JS | Next.JS | Material UI | Graph QL | Cypress",
    view: "I strongly endorse Asad Saeed for web frontend development roles. Their proficiency in ReactJS and Next.js, along with their professionalism and unwavering dedication, render them an indispensable addition to any team.",
    linkedin_url: "https://www.linkedin.com/in/mohsin-hussain-24741916a/",
    sort_order: 3,
  },
];

// ============================================
// SECTION 9 — CLIENT REVIEWS (unchanged)
// ============================================
const clientReviewsData = [
  {
    client_name: "Oliver Smith",
    client_location: "United Kingdom",
    client_source: "",
    client_review:
      "Working with Asad Saeed was a privilege; his deep understanding of web development and proficiency across frameworks were invaluable. I eagerly look forward to future collaborations.",
    sort_order: 0,
  },
  {
    client_name: "William Johnson",
    client_location: "Paris, France",
    client_source: "",
    client_review:
      "Collaborating with Asad Saeed was a game-changer; his expertise in web development and broad proficiency across frameworks were instrumental. I'm eager for the opportunity to work together again.",
    sort_order: 1,
  },
  {
    client_name: "Koshal",
    client_location: "India",
    client_source: "",
    client_review:
      "Asad Saeed's support and expertise in web app development were invaluable to our project success. His comprehensive understanding of various technologies ensured smooth progress throughout.",
    sort_order: 2,
  },
  {
    client_name: "Harry Wilson",
    client_location: "Amsterdam, Netherlands",
    client_source: "",
    client_review: "I anticipate future collaborations with great enthusiasm.",
    sort_order: 3,
  },
];

// ============================================
// SECTION 7 — CERTIFICATIONS & AWARDS
// Upload badge_image_url via admin panel later.
// ============================================
const certificationsData = [
  {
    title: "Certified MERN Stack Developer",
    issuer: "PASHA, PSEB, TechLift, FragGames, GameTrain",
    issue_date: "2022",
    credential_url: "",
    badge_image_url: "",
    sort_order: 0,
  },
  {
    title: "Frontend Team Lead Award",
    issuer: "Global Software Consulting (GSoft)",
    issue_date: "2024",
    credential_url: "",
    badge_image_url: "",
    sort_order: 1,
  },
  {
    title: "AWS Case Study Recognition",
    issuer: "AWS — FoodSwitch Cloud",
    issue_date: "2024",
    credential_url: "",
    badge_image_url: "",
    sort_order: 2,
  },
];

// ============================================
// SECTION 10 — LANGUAGES
// ============================================
const languagesData = [
  { name: "English", proficiency: 96, sort_order: 0 },
  { name: "Urdu", proficiency: 100, sort_order: 1 },
];

// ============================================
// SECTION 11 — TECH STACK (sidebar chips)
// 32 existing + 12 new = 44 chips
// ============================================
const techStackData = [
  { name: "ReactJS", sort_order: 0 },
  { name: "NextJS", sort_order: 1 },
  { name: "JavaScript", sort_order: 2 },
  { name: "TypeScript", sort_order: 3 },
  { name: "React Native", sort_order: 4 },
  { name: "NestJS", sort_order: 5 },
  { name: "Node.js", sort_order: 6 },
  { name: "Express.js", sort_order: 7 },
  { name: "MongoDB", sort_order: 8 },
  { name: "PostgreSQL", sort_order: 9 },
  { name: "MySQL", sort_order: 10 },
  { name: "Prisma ORM", sort_order: 11 },
  { name: "Firebase", sort_order: 12 },
  { name: "REST API", sort_order: 13 },
  { name: "GraphQL API", sort_order: 14 },
  { name: "Apollo Client", sort_order: 15 },
  { name: "WebSockets / Socket.io", sort_order: 16 },
  { name: "Redux", sort_order: 17 },
  { name: "Redux Toolkit", sort_order: 18 },
  { name: "React Query", sort_order: 19 },
  { name: "Zustand", sort_order: 20 },
  { name: "Tailwind CSS", sort_order: 21 },
  { name: "Shadcn UI", sort_order: 22 },
  { name: "Material UI", sort_order: 23 },
  { name: "Bootstrap", sort_order: 24 },
  { name: "SCSS", sort_order: 25 },
  { name: "CSS", sort_order: 26 },
  { name: "Module.css", sort_order: 27 },
  { name: "Styled Components", sort_order: 28 },
  { name: "Framer Motion", sort_order: 29 },
  { name: "Stripe Payment Integration", sort_order: 30 },
  { name: "n8n", sort_order: 31 },
  { name: "OpenAI API", sort_order: 32 },
  { name: "AWS Lambda", sort_order: 33 },
  { name: "Docker", sort_order: 34 },
  { name: "Vercel", sort_order: 35 },
  { name: "Netlify", sort_order: 36 },
  { name: "GitHub Actions (CI/CD)", sort_order: 37 },
  { name: "Jest", sort_order: 38 },
  { name: "Git", sort_order: 39 },
  { name: "GitHub", sort_order: 40 },
  { name: "Bitbucket", sort_order: 41 },
  { name: "Postman", sort_order: 42 },
  { name: "Swagger", sort_order: 43 },
  { name: "Jira Software", sort_order: 44 },
  { name: "Strapi", sort_order: 45 },
  { name: "Sanity", sort_order: 46 },
  { name: "Figma", sort_order: 47 },
  { name: "Adobe XD", sort_order: 48 },
];

// ============================================
// SECTION 12 — SIDEBAR SKILLS (quick progress bars)
// ============================================
const sidebarSkillsData = [
  { title: "React.js", level: "95%", sort_order: 0 },
  { title: "Next.js", level: "95%", sort_order: 1 },
  { title: "JavaScript / TypeScript", level: "95%", sort_order: 2 },
  { title: "HTML5, CSS3", level: "95%", sort_order: 3 },
  { title: "Tailwind, Bootstrap, Shadcn UI", level: "95%", sort_order: 4 },
  { title: "Material UI, SCSS, Styled Components", level: "90%", sort_order: 5 },
  { title: "Redux Toolkit, React Query, Zustand", level: "92%", sort_order: 6 },
  { title: "REST & GraphQL APIs", level: "92%", sort_order: 7 },
  { title: "Git, GitHub, Bitbucket", level: "98%", sort_order: 8 },
  { title: "Node.js, Express.js, NestJS", level: "85%", sort_order: 9 },
  { title: "MongoDB, PostgreSQL, Prisma", level: "80%", sort_order: 10 },
  { title: "WebSockets, Real-Time Systems", level: "82%", sort_order: 11 },
  { title: "AI & Automation (n8n, OpenAI)", level: "78%", sort_order: 12 },
];

// ============================================
// SEED LOGIC (shared — don't edit for content changes)
// ============================================

async function resolveUserId(): Promise<string> {
  const { data, error } = await supabase
    .from("profile")
    .select("user_id")
    .eq("email", TARGET_EMAIL);
  if (error) throw new Error(`profile lookup failed: ${error.message}`);
  if (!data || data.length === 0) {
    const { data: authList, error: authErr } = await supabase.auth.admin.listUsers();
    if (authErr) throw new Error(`auth.admin.listUsers failed: ${authErr.message}`);
    const u = authList.users.find((x) => x.email === TARGET_EMAIL);
    if (!u) throw new Error(`No auth user for ${TARGET_EMAIL}`);
    return u.id;
  }
  return data[0].user_id as string;
}

async function clearUserData(userId: string) {
  console.log("🗑  Clearing existing data for user...");
  await supabase.from("portfolio_projects").delete().eq("user_id", userId);
  await supabase.from("skills").delete().eq("user_id", userId);
  await supabase.from("education").delete().eq("user_id", userId);
  await supabase.from("experience").delete().eq("user_id", userId);
  await supabase.from("expertise").delete().eq("user_id", userId);
  await supabase.from("recommendations").delete().eq("user_id", userId);
  await supabase.from("client_reviews").delete().eq("user_id", userId);
  await supabase.from("certifications").delete().eq("user_id", userId);
  await supabase.from("languages").delete().eq("user_id", userId);
  await supabase.from("tech_stack").delete().eq("user_id", userId);
  await supabase.from("sidebar_skills").delete().eq("user_id", userId);
  await supabase.from("profile").delete().eq("user_id", userId);
  console.log("  Cleared\n");
}

async function seed() {
  console.log(`🌱 Seeding V1 portfolio for ${TARGET_EMAIL}...\n`);

  const userId = await resolveUserId();
  console.log(`  user_id: ${userId}\n`);

  await clearUserData(userId);

  console.log("📊 Inserting data...\n");

  const { error: profileErr } = await supabase
    .from("profile")
    .insert({ ...profileData, user_id: userId });
  console.log(profileErr ? `  profile ERROR: ${profileErr.message}` : "  profile seeded");

  const simpleTables: Array<[string, ReadonlyArray<Record<string, unknown>>]> = [
    ["education", educationData],
    ["experience", experienceData],
    ["expertise", expertiseData],
    ["recommendations", recommendationsData],
    ["client_reviews", clientReviewsData],
    ["certifications", certificationsData],
    ["languages", languagesData],
    ["tech_stack", techStackData],
    ["sidebar_skills", sidebarSkillsData],
  ];
  for (const [table, data] of simpleTables) {
    if (data.length === 0) {
      console.log(`  ${table}: (empty, skipped)`);
      continue;
    }
    const rows = data.map((r) => ({ ...r, user_id: userId }));
    const { error } = await supabase.from(table).insert(rows);
    console.log(
      error ? `  ${table} ERROR: ${error.message}` : `  ${table} seeded (${rows.length})`
    );
  }

  let projCount = 0;
  for (const p of portfolioProjectsData) {
    const { technologies, ...projectRow } = p;
    const { data: inserted, error: perr } = await supabase
      .from("portfolio_projects")
      .insert({ ...projectRow, user_id: userId })
      .select("id")
      .single();
    if (perr) {
      console.error(`  project ERROR (${projectRow.project_name}): ${perr.message}`);
      continue;
    }
    if (technologies && technologies.length > 0) {
      const techRows = technologies.map((t, i) => ({
        project_id: inserted.id,
        tech_name: t.tech_name,
        sort_order: t.sort_order ?? i,
      }));
      const { error: terr } = await supabase.from("project_technologies").insert(techRows);
      if (terr) console.error(`  techs ERROR (${projectRow.project_name}): ${terr.message}`);
    }
    projCount++;
  }
  console.log(`  portfolio_projects seeded (${projCount} projects + technologies)`);

  let skillCount = 0;
  for (const s of skillsData) {
    const { levels, ...skillRow } = s;
    const { data: inserted, error: serr } = await supabase
      .from("skills")
      .insert({ ...skillRow, user_id: userId })
      .select("id")
      .single();
    if (serr) {
      console.error(`  skill ERROR (${skillRow.tech_name}): ${serr.message}`);
      continue;
    }
    if (levels && levels.length > 0) {
      const levelRows = levels.map((l, i) => ({
        skill_id: inserted.id,
        title: l.title,
        level: l.level,
        sort_order: l.sort_order ?? i,
      }));
      const { error: lerr } = await supabase.from("skill_levels").insert(levelRows);
      if (lerr) console.error(`  levels ERROR (${skillRow.tech_name}): ${lerr.message}`);
    }
    skillCount++;
  }
  console.log(`  skills seeded (${skillCount} skills + levels)`);

  console.log("\n✅ V1 seed complete.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
