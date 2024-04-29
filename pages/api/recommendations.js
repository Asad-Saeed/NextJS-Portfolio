// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const recommendationCard = [
  {
    id: 0,
    name: "Athasham Shahzad",
    image: "images/ahtisham.jpeg",
    designation: "React Native | NEXT JS | Node | GraphQL",
    view: "Hey everyone! I wanted to take a moment to recommend Raza Javaid for any React.js opportunities. I had the pleasure of working with him on multiple projects where he showcased a strong understanding of React.js and Next.js concepts and delivered high-quality code. He consistently demonstrated a willingness to learn and grow, and his enthusiasm for tackling new challenges was contagious. Raza is a reliable and dedicated team member who would be a great asset to any React.js team. Highly recommended! 👍! 🌟",
    linkednURL: "https://www.linkedin.com/in/ahtishamshahzad/",
  },
  {
    id: 1,
    name: "Asad Saeed",
    image: "images/asad.jpeg",
    designation: "React JS | NEXT JS | MUI | GraphQL",
    view: "I had the privilege of working alongside Raza on multiple university projects, and I must say, his talent and work ethic truly stood out. Recently, we were both part of the dynamic team at Global Software Consulting, where Raza's professionalism and attention to detail shone brightly. I wholeheartedly endorse Raza for any opportunity that calls for a highly skilled and dedicated individual.",
    linkednURL: "https://www.linkedin.com/in/asad-saeed-4685a9202/",
  },
  {
    id: 2,
    name: "Muhammad Afzaal",
    image: "images/afzaal.jpeg",
    designation: "React Native | Javascript | typescript | ReactJs | Nextjs",
    view: "I wholeheartedly recommend Raza as a talented React frontend developer with an incredible flair for UI/UX design. His proficiency in Node.js further enhances his capabilities, allowing him to build robust and scalable applications. Raza's attention to detail, problem-solving skills, and dedication to delivering exceptional results make him a valuable addition to any development team.",
    linkednURL: "https://www.linkedin.com/in/muhammad-afzal-7333321b5/",
  },
  {
    id: 3,
    name: "Mohsin Hussain",
    image: "images/moshin.jpeg",
    designation: "React JS | Next.JS | Material UI | Graph QL | Cypress",
    view: "I highly recommend Raza Javed for web frontend development positions. Their expertise in ReactJS and Next.js, combined with their professionalism and dedication, make them an invaluable asset to any team.",
    linkednURL: "https://www.linkedin.com/in/mohsin-hussain-24741916a/",
  },
];
export default function handler(req, res) {
  res.status(200).json(recommendationCard);
}
