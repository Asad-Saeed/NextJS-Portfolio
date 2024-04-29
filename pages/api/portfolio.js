const portfolio = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
        tech: "Bootstrap CSS",
      },
    ],
  },
  {
    id: 3,
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
    id: 6,
    projectName: "Company Needs",
    url: "https://company-needs-front-end.vercel.app/",
    image: "projects/companyneeds.png",
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
        tech: "Bootstrap CSS",
      },
    ],
  },
  /*
  {
    id: 7,
    projectName: "Urdu Live News",
    url: "",
    image: "",
    projectDetail: "",
    technologiesUsed: [
      {
        tech: "HTML",
      },
      {
        tech: "CSS",
      },
      {
        tech: "Bootstrap CSS",
      },
    ],
  },
*/
];
export default function handler(req, res) {
  res.status(200).json(portfolio);
}
