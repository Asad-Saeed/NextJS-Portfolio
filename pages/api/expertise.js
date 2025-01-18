const expertise = [
  {
    id: 0,
    title: "Frontend Engineer",
    desc: "I am a seasoned React and Next.js developer with 3+ years of experience in crafting seamless user interfaces and dynamic web applications. I specialize in building visually appealing, high-performance applications using React's component-based architecture and Next.js's server-side rendering capabilities. With a strong focus on API integration, I ensure efficient communication between frontend and backend systems. My commitment to code quality, performance optimization, and user-centered design drives the success of every project.",
  },
  {
    id: 1,
    title: "Problem-Solving and Logic Building",
    desc: "I excel at breaking down complex problems into manageable solutions through logical analysis and creative thinking. Whether debugging intricate issues, optimizing performance, or designing scalable systems, I approach challenges methodically to deliver effective and efficient results.",
  },
  {
    id: 2,
    title: "Performance Optimization",
    desc: "I have a strong focus on improving application performance by optimizing JavaScript, implementing lazy loading, code splitting, and analyzing bottlenecks to enhance user experiences and meet business goals.",
  },
  {
    id: 3,
    title: "Cross-Browser Compatibility",
    desc: "Ensuring web applications function consistently across various browsers and platforms is a core aspect of my expertise. I leverage techniques like progressive enhancement, feature detection, and thorough testing using tools like BrowserStack to deliver a seamless user experience, regardless of browser or device.",
  },
  {
    id: 4,
    title: "Strong Communication Skills",
    desc: "Effective communication is at the core of my collaboration with cross-functional teams, ensuring that project requirements are clearly understood, timelines are met, and expectations are managed efficiently.",
  },
  {
    id: 5,
    title: "Leadership and Mentorship",
    desc: "As a mentor to junior developers, I provide guidance on coding best practices, problem-solving strategies, and project management techniques to help them grow and excel in their careers.",
  },
  {
    id: 6,
    title: "Continuous Learning",
    desc: "I actively stay updated with the latest technologies and trends in web development, such as advancements in React, Next.js, TypeScript, and other frameworks, ensuring that my skills remain relevant and cutting-edge.",
  },
  {
    id: 7,
    title: "Version Control",
    desc: "Proficient in using Git, GitHub, and Bitbucket for effective collaboration and efficient code management, enabling smooth workflows in team-based projects.",
  },
  {
    id: 8,
    title: "Scrum and Agile Methodologies",
    desc: "Experienced in Agile methodologies, especially Scrum, using tools like Jira for task management, sprint planning, and progress tracking. I actively participate in stand-ups and retrospectives to ensure the delivery of high-quality software solutions.",
  },
  {
    id: 9,
    title: "Open Source Contributor",
    desc: "A passionate open-source contributor, I dedicate time to community-driven projects to learn best practices, share knowledge, and collaborate with like-minded developers. This allows me to stay updated with the latest trends and give back to the developer community.",
  },
];

export default function handler(req, res) {
  res.status(200).json(expertise);
}
