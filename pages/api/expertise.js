const expertise = [
  {
    id: 0,
    title: "Front End Engineer",
    desc: "Experienced React and Next.js Frontend Developer Engineer with 2 years of proven work experience, proficient in crafting dynamic user interfaces and seamlessly integrating APIs. Leveraging expertise in React's componentbased architecture and Next.js's server-side rendering, I specialize in creating intuitive frontend experiences that seamlessly communicate with backend systems. With a meticulous approach to code quality and performance optimization, I ensure that applications are both visually stunning and functionally robust. Collaborating closely with backend teams, I adeptly integrate APIs to deliver data-driven solutions that meet client objectives. Passionate about innovation and continuous improvement, I actively seek out opportunities to enhance both my technical and soft skills.",
  }, {
    id: 1,
    title: "Cross-Browser Compatibility",
    desc: "As a developer, I'm proficient Cross-browser compatibility which is essential for ensuring that web applications function consistently across various browsers and platforms. Developers need to consider differences in rendering engines, CSS support, JavaScript interpretation, and HTML5 features across browsers like Chrome, Firefox, Safari, Edge, and others. Techniques such as progressive enhancement, graceful degradation, and feature detection are employed to address disparities and ensure a seamless user experience. Testing on multiple browsers and versions, along with tools like BrowserStack or cross-browser testing frameworks, helps identify and resolve compatibility issues early in the development process.",
  },
  {
    id: 2,
    title: "Version Control",
    desc: "Experience with version control systems like Git, GitHub, Bitbucket for collaboration and code management.",
  },
  {
    id: 3,
    title: "Design Patterns:",
    desc: "Familiar with common design patterns and architectural principles for building scalable and maintainable frontend applications.",
  },
  {
    id: 4,
    title: "Scrum and Jira",
    desc: "As a developer, I'm proficient in Jira and Scrum methodologies. I use Jira to simplify project management tasks like task assignment, prioritization, and progress tracking. Scrum has improved my teamwork, utilizing daily stand-ups, sprint planning, and retrospectives. My expertise ensures high-quality software products are delivered promptly.",
  },
 
  {
    id: 5,
    title: "Open Source Contributor",
    desc: "Open Source is the future. I usually take some time on weekend and contribute into opensource project. It gives me opportunity to learn from best developer's practices and also gives me a chance to help others and contribute into the community for the good.",
  },

];

export default function handler(req, res) {
  res.status(200).json(expertise);
}
