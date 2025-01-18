const background = [
  {
    eduCards: [
      {
        id: 0,
        title: "Government College University Faisalabad",
        marks: "CGPA: 3.67/4.00",
        degree: "Bachelor Of Software Engineering",
        detail:
          "I earned my Bachelor of Software Engineering degree from Government College University Faisalabad, equipping myself with the knowledge and skills to thrive in the dynamic world of technology. Grateful for the transformative learning experience that prepared me for the professional realm.",
        year: "2018-2022",
      },
      {
        id: 1,
        title: "The Educator College",
        marks: "Marks: 87%",
        degree: "Intermediate in Pre-Engineering",
        detail:
          "I pursued my Intermediate in Pre-Engineering at The Educator College, honing my skills for future endeavors in the field. Grateful for the academic opportunities that have shaped my educational path.",
        year: "2016-2018",
      },
      {
        id: 2,
        title: "Govt High School and College",
        marks: "Marks: 82%",
        degree: "Matriculation (Computer Science)",
        detail:
          "I completed my matriculation from Govt High School and College, laying a strong foundation for my academic journey ahead. Grateful for the supportive environment that fostered my growth.",
        year: "2014-2016",
      },
    ],
  },
  {
    expCards: [
      {
        id: 1,
        title: "Global Software Consulting",
        role: "Senior Frontend Engineer",
        url: "https://www.gsoftconsulting.com/",
        desc: "As a Senior Frontend Engineer, I specialize in developing high-quality, dynamic, and scalable web applications using React.js and Next.js. My responsibilities include crafting user-centric interfaces, optimizing application performance, and leading frontend development initiatives. Collaborating closely with cross-functional teams, I ensure the delivery of exceptional digital experiences.",
        year: "06/2023 - Present",
        location: "Lahore, Pakistan",
      },
      {
        id: 2,
        title: "Arbitech Solution",
        role: "React Developer",
        url: "http://www.arbitechsolutions.org/",
        desc: "At Arbitech Solution, I contributed as a React Developer, focusing on building modular, reusable components and ensuring seamless user experiences. My role involved designing and implementing responsive interfaces, troubleshooting performance issues, and collaborating with team members to meet project requirements within tight deadlines.",
        year: "11/2022 - 06/2023",
        location: "Lahore, Pakistan",
      },
      {
        id: 3,
        title: "Game Train",
        role: "MERN Stack Intern",
        url: "https://www.gametrain.org/",
        desc: "During my MERN stack development internship, I gained hands-on experience in building full-stack web applications. The program included learning advanced JavaScript, React.js, Node.js, and MongoDB concepts. My focus was on developing scalable backend services and interactive frontend interfaces, further solidifying my understanding of modern web development practices.",
        year: "08/2022 - 11/2022",
        location: "Lahore, Pakistan",
      },
      {
        id: 4,
        title: "Convert Generation Information Technology (CGIT)",
        role: "WordPress Developer",
        url: "https://www.cgit.pk/",
        desc: "As a WordPress Developer at CGIT, I designed and developed visually appealing, responsive websites tailored to client requirements. My responsibilities included customizing themes, enhancing frontend features, and maintaining website performance and security. I consistently delivered quality solutions that met and exceeded client expectations.",
        year: "10/2018 - 09/2020",
        location: "Faisalabad, Pakistan",
      },
    ],
  },
];

export default function handler(req, res) {
  res.status(200).json(background);
}
