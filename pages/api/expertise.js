const expertise = [
  {
    id: 0,
    title: "Front End Developer",
    desc: "I am a skilled React/Next Js developer with extensive experience in building Responsive Front End Websites using React.js, Next.js, Meterial Ui, Tailwind CSS and Node.js Backend with Strapi. I possess a strong understanding of server-side rendering, API integration. With my expertise, I can deliver dynamic and efficient web solutions tailored to meet the unique requirements of clients.",
  },
  {
    id: 1,
    title: "Scrum and Jira",
    desc: "As a developer, I'm proficient in Jira and Scrum methodologies. I use Jira to simplify project management tasks like task assignment, prioritization, and progress tracking. Scrum has improved my teamwork, utilizing daily stand-ups, sprint planning, and retrospectives. My expertise ensures high-quality software products are delivered promptly.",
  },
  {
    id: 2,
    title: "Github",
    desc: "GitHub is essential for version control and collaboration. Its intuitive interface and features like pull requests and issue tracking simplify the process. Continuous integration ensures up-to-date code. GitHub is vital to my success as a developer.",
  },
  {
    id: 3,
    title: "Open Source Contributor",
    desc: "Open Source is the future. I usually take some time on weekend and contribute into opensource project. It gives me opportunity to learn from best developer's practices and also gives me a chance to help others and contribute into the community for the good.",
  },
];

export default function handler(req, res) {
  res.status(200).json(expertise);
}
