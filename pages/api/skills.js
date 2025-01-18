const skills = [
  {
    id: 0,
    techName: "React Js Engineer",
    url: "https://6479defc346047008733d056--chipper-pastelito-5673e8.netlify.app/#/",
    image: "skills/react.png",
    skill: [
      {
        title: "React Js",
        level: "95%",
      },
    ],
    description:
      "Expert in building interactive and dynamic web applications using React.",
  },
  {
    id: 1,
    techName: "Next JS Engineer",
    url: "https://646f0f0bad16221200c6b558--silver-cuchufli-1d1850.netlify.app/",
    image: "skills/nextjs.png",
    skill: [
      {
        title: "Next JS",
        level: "95%",
      },
    ],
    description:
      "Skilled in creating server-side rendered and static websites using Next.js.",
  },
  {
    id: 2,
    techName: "Javascript / Typescript Developer",
    url: "https://company-needs-front-end.vercel.app/",
    image: "skills/jsts.png",
    skill: [
      {
        title: "Javascript / Typescript",
        level: "95%",
      },
    ],
    description:
      "Proficient in developing robust and scalable applications using JS and TS.",
  },
  {
    id: 3,
    techName: "HTML, CSS Designer",
    url: "https://fscloud.foodswitch.com/login",
    image: "skills/htmlcss.png",
    skill: [
      {
        title: "HTML, CSS",
        level: "95%",
      },
    ],
    description:
      "Experienced in creating responsive and visually appealing web layouts.",
  },
  {
    id: 4,
    techName: "Frontend Framework Specialist",
    url: "https://askcyborg.com/",
    image: "skills/bootstrap-vs-tailwindcss.png",
    skill: [
      {
        title: "Tailwind, Bootstrap, Module.css",
        level: "96%",
      },
    ],
    description:
      "Expertise in modern CSS frameworks for rapid and responsive UI development.",
  },
  {
    id: 5,
    techName: "UI/UX Stylist",
    url: "https://www.gsoftconsulting.com/",
    image: "skills/muisass.png",
    skill: [
      {
        title: "Next UI, Material UI, SCSS, Styled Components",
        level: "80%",
      },
    ],
    description:
      "Experienced in styling React applications with popular design libraries.",
  },
  {
    id: 6,
    techName: "State Management Specialist",
    url: "http://digitalwavesolutions.ca/",
    image: "skills/redux.jpg",
    skill: [
      {
        title: "Context, Redux, Redux toolkit, Zustand",
        level: "90%",
      },
    ],
    description:
      "Proficient in state management using Context API and Redux Toolkit.",
  },
  {
    id: 7,
    techName: "API Integration Specialist",
    url: "https://nrmobiles.com/",
    image: "skills/rest.png",
    skill: [
      {
        title: "Rest and GraphQL Api's Integration",
        level: "90%",
      },
    ],
    description:
      "Skilled in integrating RESTful and GraphQL APIs for seamless data flow.",
  },
  {
    id: 8,
    techName: "Version Control Expert",
    url: "https://obenan.com/",
    image: "skills/Bitbucket-vs-Github.png",
    skill: [
      {
        title: "Git, GitHub, Bitbucket",
        level: "98%",
      },
    ],
    description:
      "Expert in version control for collaboration and efficient project management.",
  },
  {
    id: 9,
    techName: "Node Js, Express JS Developer",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image: "skills/Node_Express.png",
    skill: [
      {
        title: "Node Js, Express JS",
        level: "67%",
      },
    ],
    description:
      "Capable of building server-side applications using Node.js and Express.",
  },
  {
    id: 10,
    techName: "Database Specialist",
    url: "https://644a86b90b7aea042688fb66--effulgent-torrone-565a9a.netlify.app/",
    image: "skills/mongodb-vs-mysql.png",
    skill: [
      {
        title: "MongoDB, MySql",
        level: "50%",
      },
    ],
    description: "Familiar with database management using MongoDB and MySQL.",
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
    description:
      "Basic knowledge of backend development and server-side logic.",
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
    description: "Experienced in creating and customizing WordPress websites.",
  },
];

export default function handler(req, res) {
  res.status(200).json(skills);
}
