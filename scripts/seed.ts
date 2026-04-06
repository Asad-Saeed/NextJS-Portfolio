import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);
const publicDir = path.join(process.cwd(), "public");

async function uploadFile(bucket: string, filePath: string, storagePath: string) {
  const file = fs.readFileSync(filePath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, {
    upsert: true,
    contentType: filePath.endsWith(".pdf")
      ? "application/pdf"
      : filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")
        ? "image/jpeg"
        : "image/png",
  });
  if (error) console.error(`  Upload error ${storagePath}:`, error.message);
  else console.log(`  Uploaded ${bucket}/${storagePath}`);

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${storagePath}`;
}

async function seed() {
  console.log("🌱 Starting seed...\n");

  // ========== Upload Images ==========
  console.log("📁 Uploading images to Supabase Storage...\n");

  // Profile images
  const profileImageUrl = await uploadFile(
    "profile",
    path.join(publicDir, "images/asadsaeed.jpg"),
    "asadsaeed.jpg"
  );
  const bannerImageUrl = await uploadFile(
    "profile",
    path.join(publicDir, "images/background.png"),
    "background.png"
  );
  const emojiUrl = await uploadFile(
    "profile",
    path.join(publicDir, "images/emoji.png"),
    "emoji.png"
  );
  const resumeUrl = await uploadFile(
    "documents",
    path.join(publicDir, "Asad_Saeed_Resume.pdf"),
    "Asad_Saeed_Resume.pdf"
  );

  // Project images
  const projectImages: Record<string, string> = {};
  const projectFiles = [
    "prism.png",
    "swap.png",
    "safeherit.png",
    "estra.png",
    "nrmobiles.png",
    "pedlar.png",
    "companyneeds.png",
    "fscloud.png",
    "askcyborg.png",
    "gsoft.png",
    "dws.png",
    "obenan.png",
    "coinpack.png",
  ];
  for (const f of projectFiles) {
    const fPath = path.join(publicDir, "projects", f);
    if (fs.existsSync(fPath)) {
      projectImages[f] = await uploadFile("projects", fPath, f);
    }
  }

  // Skill images
  const skillImages: Record<string, string> = {};
  const skillFiles = [
    "react.png",
    "nextjs.png",
    "jsts.png",
    "htmlcss.png",
    "bootstrap-vs-tailwindcss.png",
    "muisass.png",
    "redux.jpg",
    "rest.png",
    "Bitbucket-vs-Github.png",
    "Node_Express.png",
    "mongodb-vs-mysql.png",
    "backend.png",
    "wordpress.jpg",
  ];
  for (const f of skillFiles) {
    const fPath = path.join(publicDir, "skills", f);
    if (fs.existsSync(fPath)) {
      skillImages[f] = await uploadFile("skills", fPath, f);
    }
  }

  // Recommendation images
  const recImages: Record<string, string> = {};
  const recFiles = ["ahtisham.jpeg", "raza.jpeg", "afzaal.jpeg", "moshin.jpeg"];
  for (const f of recFiles) {
    const fPath = path.join(publicDir, "images", f);
    if (fs.existsSync(fPath)) {
      recImages[f] = await uploadFile("recommendations", fPath, f);
    }
  }

  console.log("\n📊 Seeding database tables...\n");

  // ========== Clear existing data ==========
  const tables = [
    "project_technologies",
    "skill_levels",
    "portfolio_projects",
    "skills",
    "education",
    "experience",
    "expertise",
    "recommendations",
    "client_reviews",
    "languages",
    "tech_stack",
    "sidebar_skills",
    "profile",
  ];
  for (const t of tables) {
    await supabase.from(t).delete().neq("id", "00000000-0000-0000-0000-000000000000");
  }
  console.log("  Cleared existing data");

  // ========== Profile ==========
  const { error: profileErr } = await supabase.from("profile").insert({
    name: "Asad Saeed",
    designation: "Front End Engineer | React Js | Next Js | MERN Stack",
    residence: "Lahore, Punjab",
    nationality: "Pakistani",
    city: "Lahore",
    age: "24",
    email: "asadsaeed.dev@gmail.com",
    phone: "+92 3017631644 / +92 478730644",
    github_url: "https://github.com/Asad-Saeed",
    linkedin_url: "https://www.linkedin.com/in/asad-saeed-4685a9202/",
    upwork_url: "https://www.upwork.com/freelancers/~01c9dc528b3e2edcde",
    profile_image_url: profileImageUrl,
    resume_url: resumeUrl,
    banner_image_url: bannerImageUrl,
    banner_heading: "Hello, Check This Out!",
    banner_subheadings: ["React.Js Engineer", "Next.Js Engineer", "MERN Stack Developer"],
    completed_projects_count: "27+",
    freelance_clients_count: "13+",
    honors_count: "4+",
    footer_text: "Made with ❤️ by Asad Saeed",
    copyright_year: "2024",
  });
  console.log(profileErr ? `  Profile ERROR: ${profileErr.message}` : "  Profile seeded");

  // ========== Education ==========
  const eduData = [
    {
      title: "Government College University Faisalabad",
      marks: "CGPA: 3.67/4.00",
      degree: "Bachelor Of Software Engineering",
      detail:
        "I earned my Bachelor of Software Engineering degree from Government College University Faisalabad, equipping myself with the knowledge and skills to thrive in the dynamic world of technology. Grateful for the transformative learning experience that prepared me for the professional realm.",
      year: "2018-2022",
      sort_order: 0,
    },
    {
      title: "The Educator College",
      marks: "Marks: 87%",
      degree: "Intermediate in Pre-Engineering",
      detail:
        "I pursued my Intermediate in Pre-Engineering at The Educator College, honing my skills for future endeavors in the field. Grateful for the academic opportunities that have shaped my educational path.",
      year: "2016-2018",
      sort_order: 1,
    },
    {
      title: "Govt High School and College",
      marks: "Marks: 82%",
      degree: "Matriculation (Computer Science)",
      detail:
        "I completed my matriculation from Govt High School and College, laying a strong foundation for my academic journey ahead. Grateful for the supportive environment that fostered my growth.",
      year: "2014-2016",
      sort_order: 2,
    },
  ];
  const { error: eduErr } = await supabase.from("education").insert(eduData);
  console.log(eduErr ? `  Education ERROR: ${eduErr.message}` : "  Education seeded (3)");

  // ========== Experience ==========
  const expData = [
    {
      title: "Global Software Consulting",
      role: "Senior Frontend Engineer",
      url: "https://www.gsoftconsulting.com/",
      description:
        "As a Senior Frontend Engineer, I specialize in developing high-quality, dynamic, and scalable web applications using React.js and Next.js. My responsibilities include crafting user-centric interfaces, optimizing application performance, and leading frontend development initiatives. Collaborating closely with cross-functional teams, I ensure the delivery of exceptional digital experiences.",
      year: "06/2023 - Present",
      location: "Lahore, Pakistan",
      sort_order: 0,
    },
    {
      title: "Arbitech Solution",
      role: "React Developer",
      url: "http://www.arbitechsolutions.org/",
      description:
        "At Arbitech Solution, I contributed as a React Developer, focusing on building modular, reusable components and ensuring seamless user experiences. My role involved designing and implementing responsive interfaces, troubleshooting performance issues, and collaborating with team members to meet project requirements within tight deadlines.",
      year: "11/2022 - 06/2023",
      location: "Lahore, Pakistan",
      sort_order: 1,
    },
    {
      title: "Game Train",
      role: "MERN Stack Intern",
      url: "https://www.gametrain.org/",
      description:
        "During my MERN stack development internship, I gained hands-on experience in building full-stack web applications. The program included learning advanced JavaScript, React.js, Node.js, and MongoDB concepts. My focus was on developing scalable backend services and interactive frontend interfaces, further solidifying my understanding of modern web development practices.",
      year: "08/2022 - 11/2022",
      location: "Lahore, Pakistan",
      sort_order: 2,
    },
    {
      title: "Convert Generation Information Technology (CGIT)",
      role: "WordPress Developer",
      url: "https://www.cgit.pk/",
      description:
        "As a WordPress Developer at CGIT, I designed and developed visually appealing, responsive websites tailored to client requirements. My responsibilities included customizing themes, enhancing frontend features, and maintaining website performance and security. I consistently delivered quality solutions that met and exceeded client expectations.",
      year: "10/2018 - 09/2020",
      location: "Faisalabad, Pakistan",
      sort_order: 3,
    },
  ];
  const { error: expErr } = await supabase.from("experience").insert(expData);
  console.log(expErr ? `  Experience ERROR: ${expErr.message}` : "  Experience seeded (4)");

  // ========== Expertise ==========
  const expertiseData = [
    {
      title: "Frontend Engineer",
      description:
        "I am a seasoned React and Next.js developer with 3+ years of experience in crafting seamless user interfaces and dynamic web applications. I specialize in building visually appealing, high-performance applications using React's component-based architecture and Next.js's server-side rendering capabilities. With a strong focus on API integration, I ensure efficient communication between frontend and backend systems. My commitment to code quality, performance optimization, and user-centered design drives the success of every project.",
      sort_order: 0,
    },
    {
      title: "Problem-Solving and Logic Building",
      description:
        "I excel at breaking down complex problems into manageable solutions through logical analysis and creative thinking. Whether debugging intricate issues, optimizing performance, or designing scalable systems, I approach challenges methodically to deliver effective and efficient results.",
      sort_order: 1,
    },
    {
      title: "Performance Optimization",
      description:
        "I have a strong focus on improving application performance by optimizing JavaScript, implementing lazy loading, code splitting, and analyzing bottlenecks to enhance user experiences and meet business goals.",
      sort_order: 2,
    },
    {
      title: "Cross-Browser Compatibility",
      description:
        "Ensuring web applications function consistently across various browsers and platforms is a core aspect of my expertise. I leverage techniques like progressive enhancement, feature detection, and thorough testing using tools like BrowserStack to deliver a seamless user experience, regardless of browser or device.",
      sort_order: 3,
    },
    {
      title: "Strong Communication Skills",
      description:
        "Effective communication is at the core of my collaboration with cross-functional teams, ensuring that project requirements are clearly understood, timelines are met, and expectations are managed efficiently.",
      sort_order: 4,
    },
    {
      title: "Leadership and Mentorship",
      description:
        "As a mentor to junior developers, I provide guidance on coding best practices, problem-solving strategies, and project management techniques to help them grow and excel in their careers.",
      sort_order: 5,
    },
    {
      title: "Continuous Learning",
      description:
        "I actively stay updated with the latest technologies and trends in web development, such as advancements in React, Next.js, TypeScript, and other frameworks, ensuring that my skills remain relevant and cutting-edge.",
      sort_order: 6,
    },
    {
      title: "Version Control",
      description:
        "Proficient in using Git, GitHub, and Bitbucket for effective collaboration and efficient code management, enabling smooth workflows in team-based projects.",
      sort_order: 7,
    },
    {
      title: "Scrum and Agile Methodologies",
      description:
        "Experienced in Agile methodologies, especially Scrum, using tools like Jira for task management, sprint planning, and progress tracking. I actively participate in stand-ups and retrospectives to ensure the delivery of high-quality software solutions.",
      sort_order: 8,
    },
    {
      title: "Open Source Contributor",
      description:
        "A passionate open-source contributor, I dedicate time to community-driven projects to learn best practices, share knowledge, and collaborate with like-minded developers. This allows me to stay updated with the latest trends and give back to the developer community.",
      sort_order: 9,
    },
  ];
  const { error: exprtErr } = await supabase.from("expertise").insert(expertiseData);
  console.log(exprtErr ? `  Expertise ERROR: ${exprtErr.message}` : "  Expertise seeded (10)");

  // ========== Portfolio Projects + Technologies ==========
  const portfolioData = [
    {
      project_name: "Prism",
      url: "https://prism.creamyproducts.com/",
      image_url: projectImages["prism.png"] || "",
      project_detail:
        "A comprehensive goal management application that helps users set, track, and achieve their objectives effectively, with Stripe integration for seamless payment handling.",
      sort_order: 0,
      techs: ["React JS", "Next UI", "Tailwind CSS", "Stripe", "Rest API"],
    },
    {
      project_name: "MNFT Swap",
      url: "https://6479defc346047008733d056--chipper-pastelito-5673e8.netlify.app/#/",
      image_url: projectImages["swap.png"] || "",
      project_detail:
        "A decentralized platform for minting and swapping NFTs, providing a seamless user experience for blockchain-based digital asset management.",
      sort_order: 1,
      techs: ["React JS", "SCSS", "Bootstrap", "Ether.js", "Block Chain"],
    },
    {
      project_name: "Safe Herit",
      url: "https://testing-safeherit.web.app/login",
      image_url: projectImages["safeherit.png"] || "",
      project_detail:
        "A platform for safe and secure storage of digital assets and documents, with advanced security features and user-friendly interface.",
      sort_order: 2,
      techs: ["React JS", "Bootstrap", "Stripe", "FireBase", "Rest API"],
    },
    {
      project_name: "ESTRELLA TERA",
      url: "https://646f0f0bad16221200c6b558--silver-cuchufli-1d1850.netlify.app/",
      image_url: projectImages["estra.png"] || "",
      project_detail:
        "A blockchain platform for minting NFTs and managing token swaps with an intuitive interface and Ethereum support.",
      sort_order: 3,
      techs: ["React JS", "SCSS", "Bootstrap", "Etherum", "Block Chain"],
    },
    {
      project_name: "NR Mobiles & Accessories Company",
      url: "https://nrmobiles.com/",
      image_url: projectImages["nrmobiles.png"] || "",
      project_detail:
        "An e-commerce platform for mobile phones and accessories offering a user-friendly interface for product browsing and online shopping.",
      sort_order: 4,
      techs: ["Next JS", "Material UI", "Strapi", "GraphQL", "Bootstrap"],
    },
    {
      project_name: "Pedlar Store",
      url: "https://pedlar.store/",
      image_url: projectImages["pedlar.png"] || "",
      project_detail:
        "A modern e-commerce platform tailored for brands to showcase and sell their products online with a smooth user interface.",
      sort_order: 5,
      techs: ["ReactJS", "REST API's", "Material UI"],
    },
    {
      project_name: "Company Needs",
      url: "https://company-needs-front-end.vercel.app/",
      image_url: projectImages["companyneeds.png"] || "",
      project_detail:
        "An e-commerce solution designed for businesses to manage product listings, inventory, and sales.",
      sort_order: 6,
      techs: ["Next JS", "SCSS", "Strapi", "GraphQL", "Bootstrap"],
    },
    {
      project_name: "FoodSwitch Cloud",
      url: "https://fscloud.foodswitch.com/login",
      image_url: projectImages["fscloud.png"] || "",
      project_detail:
        "A data management system for food research institutions, enabling efficient handling and analysis of research data.",
      sort_order: 7,
      techs: ["Next Js", "Tailwind Css", "Rest Api", "Next Auth"],
    },
    {
      project_name: "Ask Cyborg",
      url: "https://askcyborg.com/",
      image_url: projectImages["askcyborg.png"] || "",
      project_detail:
        "An AI-powered chatbot platform designed to enhance customer support and provide instant query resolutions.",
      sort_order: 8,
      techs: ["Next JS", "PHP", "REST API's", "Material UI"],
    },
    {
      project_name: "Global Software Consulting",
      url: "https://www.gsoftconsulting.com/",
      image_url: projectImages["gsoft.png"] || "",
      project_detail:
        "A portfolio website showcasing Global Software Consulting's expertise and services in software development and IT consulting.",
      sort_order: 9,
      techs: ["React JS", "Material UI", "Strapi", "GraphQL"],
    },
    {
      project_name: "Digital Wave Solutions",
      url: "http://digitalwavesolutions.ca/",
      image_url: projectImages["dws.png"] || "",
      project_detail:
        "The portfolio of a digital marketing agency showcasing their services, expertise, and success stories.",
      sort_order: 10,
      techs: ["Next JS", "Material UI", "Email Js"],
    },
    {
      project_name: "Obenan",
      url: "https://obenan.com/",
      image_url: projectImages["obenan.png"] || "",
      project_detail:
        "A digital marketing agency portfolio highlighting their AI-driven review systems and other marketing solutions.",
      sort_order: 11,
      techs: ["Next JS", "Material UI", "Strapi", "GraphQL"],
    },
    {
      project_name: "COINPICK 365",
      url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
      image_url: projectImages["coinpack.png"] || "",
      project_detail:
        "A crypto trading platform designed for secure and efficient cryptocurrency trading and portfolio management.",
      sort_order: 12,
      techs: ["React JS", "SCSS", "Bootstrap", "Etherum", "Block Chain"],
    },
  ];

  for (const p of portfolioData) {
    const { techs, ...projectRow } = p;
    const { data: inserted, error: pErr } = await supabase
      .from("portfolio_projects")
      .insert(projectRow)
      .select("id")
      .single();
    if (pErr) {
      console.error(`  Project ERROR (${p.project_name}):`, pErr.message);
      continue;
    }

    const techRows = techs.map((t, i) => ({
      project_id: inserted.id,
      tech_name: t,
      sort_order: i,
    }));
    await supabase.from("project_technologies").insert(techRows);
  }
  console.log("  Portfolio seeded (13 projects + technologies)");

  // ========== Skills + Levels ==========
  const skillsData = [
    {
      tech_name: "React Js Engineer",
      url: "https://6479defc346047008733d056--chipper-pastelito-5673e8.netlify.app/#/",
      image_url: skillImages["react.png"] || "",
      description: "Expert in building interactive and dynamic web applications using React.",
      sort_order: 0,
      levels: [{ title: "React Js", level: "95%" }],
    },
    {
      tech_name: "Next JS Engineer",
      url: "https://646f0f0bad16221200c6b558--silver-cuchufli-1d1850.netlify.app/",
      image_url: skillImages["nextjs.png"] || "",
      description: "Skilled in creating server-side rendered and static websites using Next.js.",
      sort_order: 1,
      levels: [{ title: "Next JS", level: "95%" }],
    },
    {
      tech_name: "Javascript / Typescript Developer",
      url: "https://company-needs-front-end.vercel.app/",
      image_url: skillImages["jsts.png"] || "",
      description: "Proficient in developing robust and scalable applications using JS and TS.",
      sort_order: 2,
      levels: [{ title: "Javascript / Typescript", level: "95%" }],
    },
    {
      tech_name: "HTML, CSS Designer",
      url: "https://fscloud.foodswitch.com/login",
      image_url: skillImages["htmlcss.png"] || "",
      description: "Experienced in creating responsive and visually appealing web layouts.",
      sort_order: 3,
      levels: [{ title: "HTML, CSS", level: "95%" }],
    },
    {
      tech_name: "Frontend Framework Specialist",
      url: "https://askcyborg.com/",
      image_url: skillImages["bootstrap-vs-tailwindcss.png"] || "",
      description: "Expertise in modern CSS frameworks for rapid and responsive UI development.",
      sort_order: 4,
      levels: [{ title: "Tailwind, Bootstrap, Module.css", level: "96%" }],
    },
    {
      tech_name: "UI/UX Stylist",
      url: "https://www.gsoftconsulting.com/",
      image_url: skillImages["muisass.png"] || "",
      description: "Experienced in styling React applications with popular design libraries.",
      sort_order: 5,
      levels: [{ title: "Next UI, Material UI, SCSS, Styled Components", level: "80%" }],
    },
    {
      tech_name: "State Management Specialist",
      url: "http://digitalwavesolutions.ca/",
      image_url: skillImages["redux.jpg"] || "",
      description: "Proficient in state management using Context API and Redux Toolkit.",
      sort_order: 6,
      levels: [{ title: "Context, Redux, Redux toolkit, Zustand", level: "90%" }],
    },
    {
      tech_name: "API Integration Specialist",
      url: "https://nrmobiles.com/",
      image_url: skillImages["rest.png"] || "",
      description: "Skilled in integrating RESTful and GraphQL APIs for seamless data flow.",
      sort_order: 7,
      levels: [{ title: "Rest and GraphQL Api's Integration", level: "90%" }],
    },
    {
      tech_name: "Version Control Expert",
      url: "https://obenan.com/",
      image_url: skillImages["Bitbucket-vs-Github.png"] || "",
      description: "Expert in version control for collaboration and efficient project management.",
      sort_order: 8,
      levels: [{ title: "Git, GitHub, Bitbucket", level: "98%" }],
    },
    {
      tech_name: "Node Js, Express JS Developer",
      url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
      image_url: skillImages["Node_Express.png"] || "",
      description: "Capable of building server-side applications using Node.js and Express.",
      sort_order: 9,
      levels: [{ title: "Node Js, Express JS", level: "67%" }],
    },
    {
      tech_name: "Database Specialist",
      url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
      image_url: skillImages["mongodb-vs-mysql.png"] || "",
      description: "Familiar with database management using MongoDB, FireBase and MySQL.",
      sort_order: 10,
      levels: [{ title: "MongoDB, FireBase, MySql", level: "50%" }],
    },
    {
      tech_name: "Backend Developer",
      url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
      image_url: skillImages["backend.png"] || "",
      description:
        "Basic knowledge of backend development and server-side logic with Node Js and Express JS.",
      sort_order: 11,
      levels: [{ title: "Node Js, Express JS", level: "67%" }],
    },
    {
      tech_name: "WordPress Developer",
      url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
      image_url: skillImages["wordpress.jpg"] || "",
      description: "Experienced in creating and customizing WordPress websites.",
      sort_order: 12,
      levels: [{ title: "WordPress Developer", level: "80%" }],
    },
  ];

  for (const s of skillsData) {
    const { levels, ...skillRow } = s;
    const { data: inserted, error: sErr } = await supabase
      .from("skills")
      .insert(skillRow)
      .select("id")
      .single();
    if (sErr) {
      console.error(`  Skill ERROR (${s.tech_name}):`, sErr.message);
      continue;
    }

    const levelRows = levels.map((l, i) => ({
      skill_id: inserted.id,
      title: l.title,
      level: l.level,
      sort_order: i,
    }));
    await supabase.from("skill_levels").insert(levelRows);
  }
  console.log("  Skills seeded (13 skills + levels)");

  // ========== Recommendations ==========
  const recsData = [
    {
      name: "Athasham Shahzad",
      image_url: recImages["ahtisham.jpeg"] || "",
      designation: "React Native | NEXT JS | Node | GraphQL",
      view: "Hello everyone! I'm excited to recommend Asad Saeed for any React.js opportunities. I've had the pleasure of collaborating with him on numerous projects, witnessing his profound grasp of React.js and Next.js concepts, consistently delivering top-notch code. Asad exhibits a strong commitment to learning and development, always eager to take on new challenges. With his reliability and dedication, he's a valuable addition to any React.js team. I highly endorse Asad Saeed! 👍! 🌟",
      linkedin_url: "https://www.linkedin.com/in/ahtishamshahzad/",
      sort_order: 0,
    },
    {
      name: "Raza Sabir",
      image_url: recImages["raza.jpeg"] || "",
      designation: "React JS | NEXT JS | MUI | GraphQL",
      view: "I've had the honor of collaborating with Asad Saeed on several university projects, and I must emphasize his exceptional talent and strong work ethic. During our time together at Global Software Consulting, Asad Saeed's professionalism and meticulous attention to detail were evident, contributing significantly to our team's success. I confidently recommend Asad Saeed for any role that requires a highly skilled and committed individual.",
      linkedin_url: "https://www.linkedin.com/in/raza-mughal-developer/",
      sort_order: 1,
    },
    {
      name: "Muhammad Afzaal",
      image_url: recImages["afzaal.jpeg"] || "",
      designation: "React Native | Javascript | typescript | ReactJs | Nextjs",
      view: "I enthusiastically endorse Asad Saeed as an accomplished React frontend developer with exceptional UI/UX design skills. His expertise in Node.js further amplifies his capacity to develop resilient and scalable applications. Asad Saeed's meticulous attention to detail, adept problem-solving abilities, and unwavering commitment to excellence make him an invaluable asset to any development team.",
      linkedin_url: "https://www.linkedin.com/in/muhammad-afzal-7333321b5/",
      sort_order: 2,
    },
    {
      name: "Mohsin Hussain",
      image_url: recImages["moshin.jpeg"] || "",
      designation: "React JS | Next.JS | Material UI | Graph QL | Cypress",
      view: "I strongly endorse Asad Saeed for web frontend development roles. Their proficiency in ReactJS and Next.js, along with their professionalism and unwavering dedication, render them an indispensable addition to any team.",
      linkedin_url: "https://www.linkedin.com/in/mohsin-hussain-24741916a/",
      sort_order: 3,
    },
  ];
  const { error: recErr } = await supabase.from("recommendations").insert(recsData);
  console.log(
    recErr ? `  Recommendations ERROR: ${recErr.message}` : "  Recommendations seeded (4)"
  );

  // ========== Client Reviews ==========
  const reviewsData = [
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
  const { error: revErr } = await supabase.from("client_reviews").insert(reviewsData);
  console.log(revErr ? `  Reviews ERROR: ${revErr.message}` : "  Reviews seeded (4)");

  // ========== Languages ==========
  const { error: langErr } = await supabase.from("languages").insert([
    { name: "Urdu", proficiency: 98, sort_order: 0 },
    { name: "English", proficiency: 90, sort_order: 1 },
  ]);
  console.log(langErr ? `  Languages ERROR: ${langErr.message}` : "  Languages seeded (2)");

  // ========== Tech Stack ==========
  const techStackItems = [
    "ReactJS",
    "NextJS",
    "JavaScript",
    "TypeScript",
    "CSS",
    "SCSS",
    "TailwindCSS",
    "Bootstrap",
    "Material UI",
    "Module.css",
    "Styled Components",
    "Redux",
    "Redux Toolkit",
    "GraphQL API",
    "Rest API",
    "Stripe Payment Integration",
    "Git",
    "GitHub",
    "Bitbucket",
    "Node Js",
    "Express JS",
    "MongoDB",
    "FireBase",
    "MySql",
    "Jira Software",
    "Postman",
    "Swagger",
    "Apollo Client",
    "Strapi",
    "Sanity",
    "Figma",
    "Adobe XD",
  ];
  const techRows = techStackItems.map((name, i) => ({ name, sort_order: i }));
  const { error: techErr } = await supabase.from("tech_stack").insert(techRows);
  console.log(techErr ? `  Tech Stack ERROR: ${techErr.message}` : "  Tech Stack seeded (32)");

  // ========== Sidebar Skills ==========
  const sidebarSkillsData = [
    { title: "React Js", level: "95%", sort_order: 0 },
    { title: "Next Js", level: "95%", sort_order: 1 },
    { title: "Javascript / Typescript", level: "95%", sort_order: 2 },
    { title: "HTML, CSS", level: "95%", sort_order: 3 },
    { title: "Tailwind, Bootstrap, Module.css", level: "96%", sort_order: 4 },
    { title: "Next UI, Material UI, SCSS, Styled Components", level: "80%", sort_order: 5 },
    { title: "Context, Redux, Redux toolkit", level: "90%", sort_order: 6 },
    { title: "Rest and GraphQL Api's Integration", level: "90%", sort_order: 7 },
    { title: "Git, GitHub, Bitbucket", level: "98%", sort_order: 8 },
    { title: "Node Js, Express JS", level: "67%", sort_order: 9 },
    { title: "MongoDB, FireBase, MySql", level: "50%", sort_order: 10 },
    { title: "Backend Developer", level: "50%", sort_order: 11 },
    { title: "WordPress Developer", level: "80%", sort_order: 12 },
  ];
  const { error: ssErr } = await supabase.from("sidebar_skills").insert(sidebarSkillsData);
  console.log(ssErr ? `  Sidebar Skills ERROR: ${ssErr.message}` : "  Sidebar Skills seeded (13)");

  console.log("\n✅ Seed complete!");
}

seed().catch(console.error);
