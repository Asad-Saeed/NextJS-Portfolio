// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const recommendationCard = [
  {
    id: 0,
    name: "Athasham Shahzad",
    image: "images/ahtisham.jpeg",
    designation: "React Native | NEXT JS | Node | GraphQL",
    view: "Hello everyone! I'm excited to recommend Asad Saeed for any React.js opportunities. I've had the pleasure of collaborating with him on numerous projects, witnessing his profound grasp of React.js and Next.js concepts, consistently delivering top-notch code. Asad exhibits a strong commitment to learning and development, always eager to take on new challenges. With his reliability and dedication, he's a valuable addition to any React.js team. I highly endorse Asad Saeed! 👍! 🌟",
    linkednURL: "https://www.linkedin.com/in/ahtishamshahzad/",
  },
  {
    id: 1,
    name: "Raza Sabir",
    image: "images/raza.jpeg",
    designation: "React JS | NEXT JS | MUI | GraphQL",
    view: "I've had the honor of collaborating with Asad Saeed on several university projects, and I must emphasize his exceptional talent and strong work ethic. During our time together at Global Software Consulting, Asad Saeed's professionalism and meticulous attention to detail were evident, contributing significantly to our team's success. I confidently recommend Asad Saeed for any role that requires a highly skilled and committed individual.",
    linkednURL: "https://www.linkedin.com/in/raza-mughal-developer/",
  },
  {
    id: 2,
    name: "Muhammad Afzaal",
    image: "images/afzaal.jpeg",
    designation: "React Native | Javascript | typescript | ReactJs | Nextjs",
    view: "I enthusiastically endorse Asad Saeed as an accomplished React frontend developer with exceptional UI/UX design skills. His expertise in Node.js further amplifies his capacity to develop resilient and scalable applications. Asad Saeed's meticulous attention to detail, adept problem-solving abilities, and unwavering commitment to excellence make him an invaluable asset to any development team.",
    linkednURL: "https://www.linkedin.com/in/muhammad-afzal-7333321b5/",
  },
  {
    id: 3,
    name: "Mohsin Hussain",
    image: "images/moshin.jpeg",
    designation: "React JS | Next.JS | Material UI | Graph QL | Cypress",
    view: "I strongly endorse Asad Saeed for web frontend development roles. Their proficiency in ReactJS and Next.js, along with their professionalism and unwavering dedication, render them an indispensable addition to any team.",
    linkednURL: "https://www.linkedin.com/in/mohsin-hussain-24741916a/",
  },
];
export default function handler(req, res) {
  res.status(200).json(recommendationCard);
}
