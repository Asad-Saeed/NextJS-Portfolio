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
        role: "Senior Frontend Developer",
        url: "https://www.gsoftconsulting.com/",
        desc: "As a senior frontend developer at a global software consulting company, I am actively engaged in working with React.js & Next.js. With a passion for crafting exceptional user experiences, I specialize in building dynamic and interactive web applications using React.js and Next.js.",
        year: "06/2023 - Continued",
        location: "Lahore, Pakistan",
      },
      {
        id: 2,
        title: "Arbitech Solution",
        role: "React Developer",
        url: "http://www.arbitechsolutions.org/",
        desc: "As a React developer, I am excited to take on the responsibility of crafting beautiful and functional user interfaces that enhance the overall user experience. From designing and developing reusable components to optimizing performance and troubleshooting issues.",
        year: "11/2022 - 06/2023",
        location: "Lahore, Pakistan",
      },
      {
        id: 3,
        title: "Game Train",
        role: "MERN Stack Internship Trainee",
        url: "https://www.gametrain.org/",
        desc: "As an Internee, Overall, I am very pleased with the MERN stack web development internship offered by this organization. The curriculum is well-structured and covers a wide range of topics, from the basics of JavaScript and React to more advanced concepts like MongoDB and Node.js.",
        year: "08/2022 - 11/2022",
        location: "Lahore, Pakistan",
      },
      {
        id: 4,
        title: "Convert Generation Information Technology",
        role: "WordPress Developer",
        url: "https://www.cgit.pk/",
        desc: "I have joined CGIT Software Company as a Frontend WordPress CMS developer. My responsibilities here to design and develop websites in WordPress and some frontend customization.",
        year: "10/2018 - 09/2020",
        location: "Faisalabad, Pakistan",
      },
    ],
  },
];

export default function handler(req, res) {
  res.status(200).json(background);
}
