const background = [
  {
    eduCards: [
      {
        id: 0,
        title: "University of South Asia",
        degree: "Bachelor Of Computer Science",
        detail: "",
        year: "2017-2021",
      },
      {
        id: 1,
        title: "Punjab Group of Colleges",
        degree: "Intermediate in Computer Science (ICS)",
        detail: "",
        year: "2014-2016",
      },
      {
        id: 2,
        title: "MQ Foundation High School",
        degree: "Matriculation (Computer Science)",
        detail: "",
        year: "2013-2015",
      },
    ],
  },
  {
    expCards: [
      {
        id: 1,
        title: "Global Software Consulting",
        role: "Senior Frontend Developer",
        url: "https://www.gsoftconsulting.com/",
        desc: "As a senior frontend developer, I completed multiple projects with team and use latest framework next js and backend with strapi while using GraphQL Api's.",
        year: "10/2021 - 12/2023",
        location: "Lahore, Pakistan",
      },
      {
        id: 2,
        title: "ArhamSoft",
        role: "Frontend Developer",
        url: "https://www.arhamsoft.com/",
        desc: "As a frontend developer, I use React, Next & JavaScript to build user interfaces for web applications.",
        year: "05/2020 - 09/2021",
        location: "Lahore, Pakistan",
      },
      {
        id: 3,
        title: "TechnoCares",
        role: "Internee",
        url: "https://technocares.com/",
        desc: "As an Internee, I learned how to use React & JavaScript to build interactive websites.",
        year: "08/2019 - 04/2020",
        location: "Lahore, Pakistan",
      },
      {
        id: 3,
        title: "Systems Limited",
        role: "Payoff Processor",
        url: "https://www.systemsltd.com/MEA",
        desc: "",
        year: "01/2019 - 07/2019",
        location: "Lahore, Pakistan",
      },
    ],
  },
];

export default function handler(req, res) {
  res.status(200).json(background);
}
