const skills = [
  {
    id: 0,
    techName: "React Js Developer",
    url: "https://6479defc346047008733d056--chipper-pastelito-5673e8.netlify.app/#/",
    image: "skills/react.png",
    skill: [
      {
        title: "React Js Developer",
        level: "95%",
      },
    ],
  },
  {
    id: 1,
    techName: "Next JS Developer",
    url: "https://646f0f0bad16221200c6b558--silver-cuchufli-1d1850.netlify.app/",
    image: "skills/nextjs.png",
    skill: [
      {
        title: "Next JS Developer",
        level: "95%",
      },
    ],
  },

  {
    id: 2,
    techName: "Javascript / Typescript",
    url: "https://company-needs-front-end.vercel.app/",
    image: "skills/jsts.png",
    skill: [
      {
        title: "Javascript / Typescript",
        level: "95%",
      },
    ],
  },

  {
    id: 3,
    techName: "HTML, CSS",
    url: "https://fscloud.foodswitch.com/login",
    image: "skills/htmlcss.png",
    skill: [
      {
        title: "HTML, CSS",
        level: "95%",
      },
    ],
  },
  {
    id: 4,
    techName: "Tailwind, Bootstrap, Module.css",
    url: "https://askcyborg.com/",
    image: "skills/bootstrap-vs-tailwindcss.png",
    skill: [
      {
        title: "Tailwind, Bootstrap, Module.css",
        level: "96%",
      },
    ],
  },
  {
    id: 5,
    techName: "Material UI, SCSS, Styled Components",
    url: "https://www.gsoftconsulting.com/",
    image: "skills/muisass.png",
    skill: [
      {
        title: "Material UI, SCSS, Styled Components",
        level: "80%",
      },
    ],
  },
  {
    id: 6,
    techName: "Context, Redux, Redux toolkit",
    url: "http://digitalwavesolutions.ca/",
    image: "skills/redux.jpg",
    skill: [
      {
        title: "Context, Redux, Redux toolkit",
        level: "90%",
      },
    ],
  },
  {
    id: 7,
    techName: "Rest and GraphQL Api's Integration",
    url: "https://nrmobiles.com/",
    image: "skills/rest.png",
    skill: [
      {
        title: "Rest and GraphQL Api's Integration",
        level: "90%",
      },
    ],
  },
  {
    id: 8,
    techName: "Git, GitHub, Bitbucket",
    url: "https://obenan.com/",
    image: "skills/Bitbucket-vs-Github.png",
    skill: [
      {
        title: "Git, GitHub, Bitbucket",
        level: "98%",
      },
    ],
  },
  {
    id: 9,
    techName: "Node Js, Express JS",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image: "skills/Node_Express.png",
    skill: [
      {
        title: "Node Js, Express JS",
        level: "67%",
      },
    ],
  },
  {
    id: 10,
    techName: "MongoDB, MySql",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image: "skills/mongodb-vs-mysql.png",
    skill: [
      {
        title: "MongoDB, MySql",
        level: "50%",
      },
    ],
  },
  {
    id: 11,
    techName: "Backend Developer",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image: "skills/backend.png",
    skill: [
      {
        title: "Backend Developer",
        level: "50%",
      },
    ],
  },
  {
    id: 12,
    techName: "WordPress Developer",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image: "skills/wordpress.jpg",
    skill: [
      {
        title: "WordPress Developer",
        level: "80%",
      },
    ],
  },
];
export default function handler(req, res) {
  res.status(200).json(skills);
}
