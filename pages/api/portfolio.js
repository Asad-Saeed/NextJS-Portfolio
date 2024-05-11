const portfolio = [
  {
    id: 0,
    projectName: "MNFT Swap",
    url: "https://6479defc346047008733d056--chipper-pastelito-5673e8.netlify.app/#/",
    image: "projects/swap.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "React JS",
      },
      {
        tech: "SCSS",
      },
      {
        tech: "Bootstrap",
      },
      {
        tech: "Ether.js",
      },
      {
        tech: "Block Chain",
      },
    ],
  },
  {
    id: 1,
    projectName: "ESTRELLA TERA",
    url: "https://646f0f0bad16221200c6b558--silver-cuchufli-1d1850.netlify.app/",
    image: "projects/estra.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "React JS",
      },
      {
        tech: "SCSS",
      },
      {
        tech: "Bootstrap",
      },
      {
        tech: "Etherum",
      },
      {
        tech: "Block Chain",
      },
    ],
  },

  {
    id: 2,
    projectName: "Company Needs",
    url: "https://company-needs-front-end.vercel.app/",
    image: "projects/companyneeds.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "Next JS",
      },
      {
        tech: "SCSS",
      },
      {
        tech: "Strapi",
      },
      {
        tech: "GraphQL",
      },
      {
        tech: "Bootstrap",
      },
    ],
  },

  {
    id: 3,
    projectName: "FoodSwitch Cloud",
    url: "https://fscloud.foodswitch.com/login",
    image: "projects/fscloud.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "Next Js",
      },
      {
        tech: "Tailwind Css",
      },
      {
        tech: "Rest Api",
      },
      {
        tech: "Next Auth",
      },
    ],
  },
  {
    id: 4,
    projectName: "Ask Cyborg",
    url: "https://askcyborg.com/",
    image: "projects/askcyborg.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "Next JS",
      },
      {
        tech: "PHP",
      },
      {
        tech: "REST API's",
      },
      {
        tech: "Material UI",
      },
    ],
  },
  {
    id: 5,
    projectName: "Global Software Consulting",
    url: "https://www.gsoftconsulting.com/",
    image: "projects/gsoft.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "React JS",
      },
      {
        tech: "Material UI",
      },
      {
        tech: "Strapi",
      },
      {
        tech: "GraphQL",
      },
    ],
  },
  {
    id: 6,
    projectName: "Digital Wave Solutions",
    url: "http://digitalwavesolutions.ca/",
    image: "projects/dws.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "Next JS",
      },
      {
        tech: "Material UI",
      },
      {
        tech: "Email Js",
      },
    ],
  },
  {
    id: 7,
    projectName: "NR Mobiles & Accessories Company",
    url: "https://nrmobiles.com/",
    image: "projects/nrmobiles.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "Next JS",
      },
      {
        tech: "Material UI",
      },
      {
        tech: "Strapi",
      },
      {
        tech: "GraphQL",
      },
      {
        tech: "Bootstrap",
      },
    ],
  },
  {
    id: 8,
    projectName: "Pedlar Store",
    url: "https://pedlar.store/",
    image: "projects/pedlar.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "ReactJS",
      },
      {
        tech: "REST API's",
      },
      {
        tech: "Material UI",
      },
    ],
  },

  {
    id: 9,
    projectName: "Obenan",
    url: "https://obenan.com/",
    image: "projects/obenan.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "Next JS",
      },
      {
        tech: "Material UI",
      },
      {
        tech: "Strapi",
      },
      {
        tech: "GraphQL",
      },
    ],
  },
  {
    id: 10,
    projectName: "COINPICK 365",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image: "projects/coinpack.png",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "React JS",
      },
      {
        tech: "SCSS",
      },
      {
        tech: "Bootstrap",
      },
      {
        tech: "Etherum",
      },
      {
        tech: "Block Chain",
      },
    ],
  },
];
export default function handler(req, res) {
  res.status(200).json(portfolio);
}
