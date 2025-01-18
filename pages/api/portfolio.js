const portfolio = [
  {
    id: 0,
    projectName: "Prism",
    url: "https://prism.creamyproducts.com/",
    image: "projects/prism.png",
    projectDetail:
      "A comprehensive goal management application that helps users set, track, and achieve their objectives effectively, with Stripe integration for seamless payment handling.",
    technologiesUsed: [
      { tech: "React JS" },
      { tech: "Next UI" },
      { tech: "Tailwind CSS" },
      { tech: "Stripe" },
      { tech: "Rest API" },
    ],
  },
  {
    id: 1,
    projectName: "MNFT Swap",
    url: "https://6479defc346047008733d056--chipper-pastelito-5673e8.netlify.app/#/",
    image: "projects/swap.png",
    projectDetail:
      "A decentralized platform for minting and swapping NFTs, providing a seamless user experience for blockchain-based digital asset management.",
    technologiesUsed: [
      { tech: "React JS" },
      { tech: "SCSS" },
      { tech: "Bootstrap" },
      { tech: "Ether.js" },
      { tech: "Block Chain" },
    ],
  },
  {
    id: 2,
    projectName: "Safe Herit",
    url: "https://testing-safeherit.web.app/login",
    image: "projects/estra.png",
    projectDetail:
      "A platform for safe and secure storage of digital assets and documents, with advanced security features and user-friendly interface.",
    technologiesUsed: [
      { tech: "React JS" },
      { tech: "Bootstrap" },
      { tech: "Stripe" },
      { tech: "FireBase" },
    ],
  },
  {
    id: 3,
    projectName: "ESTRELLA TERA",
    url: "https://646f0f0bad16221200c6b558--silver-cuchufli-1d1850.netlify.app/",
    image: "projects/estra.png",
    projectDetail:
      "A blockchain platform for minting NFTs and managing token swaps with an intuitive interface and Ethereum support.",
    technologiesUsed: [
      { tech: "React JS" },
      { tech: "SCSS" },
      { tech: "Bootstrap" },
      { tech: "Etherum" },
      { tech: "Block Chain" },
    ],
  },
  {
    id: 3,
    projectName: "NR Mobiles & Accessories Company",
    url: "https://nrmobiles.com/",
    image: "projects/nrmobiles.png",
    projectDetail:
      "An e-commerce platform for mobile phones and accessories offering a user-friendly interface for product browsing and online shopping.",
    technologiesUsed: [
      { tech: "Next JS" },
      { tech: "Material UI" },
      { tech: "Strapi" },
      { tech: "GraphQL" },
      { tech: "Bootstrap" },
    ],
  },
  {
    id: 4,
    projectName: "Pedlar Store",
    url: "https://pedlar.store/",
    image: "projects/pedlar.png",
    projectDetail:
      "A modern e-commerce platform tailored for brands to showcase and sell their products online with a smooth user interface.",
    technologiesUsed: [
      { tech: "ReactJS" },
      { tech: "REST API's" },
      { tech: "Material UI" },
    ],
  },
  {
    id: 5,
    projectName: "Company Needs",
    url: "https://company-needs-front-end.vercel.app/",
    image: "projects/companyneeds.png",
    projectDetail:
      "An e-commerce solution designed for businesses to manage product listings, inventory, and sales.",
    technologiesUsed: [
      { tech: "Next JS" },
      { tech: "SCSS" },
      { tech: "Strapi" },
      { tech: "GraphQL" },
      { tech: "Bootstrap" },
    ],
  },
  {
    id: 6,
    projectName: "FoodSwitch Cloud",
    url: "https://fscloud.foodswitch.com/login",
    image: "projects/fscloud.png",
    projectDetail:
      "A data management system for food research institutions, enabling efficient handling and analysis of research data.",
    technologiesUsed: [
      { tech: "Next Js" },
      { tech: "Tailwind Css" },
      { tech: "Rest Api" },
      { tech: "Next Auth" },
    ],
  },
  {
    id: 7,
    projectName: "Ask Cyborg",
    url: "https://askcyborg.com/",
    image: "projects/askcyborg.png",
    projectDetail:
      "An AI-powered chatbot platform designed to enhance customer support and provide instant query resolutions.",
    technologiesUsed: [
      { tech: "Next JS" },
      { tech: "PHP" },
      { tech: "REST API's" },
      { tech: "Material UI" },
    ],
  },
  {
    id: 8,
    projectName: "Global Software Consulting",
    url: "https://www.gsoftconsulting.com/",
    image: "projects/gsoft.png",
    projectDetail:
      "A portfolio website showcasing Global Software Consulting's expertise and services in software development and IT consulting.",
    technologiesUsed: [
      { tech: "React JS" },
      { tech: "Material UI" },
      { tech: "Strapi" },
      { tech: "GraphQL" },
    ],
  },
  {
    id: 9,
    projectName: "Digital Wave Solutions",
    url: "http://digitalwavesolutions.ca/",
    image: "projects/dws.png",
    projectDetail:
      "The portfolio of a digital marketing agency showcasing their services, expertise, and success stories.",
    technologiesUsed: [
      { tech: "Next JS" },
      { tech: "Material UI" },
      { tech: "Email Js" },
    ],
  },
  {
    id: 10,
    projectName: "Obenan",
    url: "https://obenan.com/",
    image: "projects/obenan.png",
    projectDetail:
      "A digital marketing agency portfolio highlighting their AI-driven review systems and other marketing solutions.",
    technologiesUsed: [
      { tech: "Next JS" },
      { tech: "Material UI" },
      { tech: "Strapi" },
      { tech: "GraphQL" },
    ],
  },
  {
    id: 11,
    projectName: "COINPICK 365",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image: "projects/coinpack.png",
    projectDetail:
      "A crypto trading platform designed for secure and efficient cryptocurrency trading and portfolio management.",
    technologiesUsed: [
      { tech: "React JS" },
      { tech: "SCSS" },
      { tech: "Bootstrap" },
      { tech: "Etherum" },
      { tech: "Block Chain" },
    ],
  },
];

export default function handler(req, res) {
  res.status(200).json(portfolio);
}
