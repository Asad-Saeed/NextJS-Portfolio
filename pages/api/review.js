const review = [
  {
    id: 0,
    clientName: "Syed Baqir",
    clientLocation: "Islamabad, Pakistan",
    clientSource: "",
    clientReview:
      "Working with Asad Saeed was a privilege; his deep understanding of web development and proficiency across frameworks were invaluable. I eagerly look forward to future collaborations.",
  },
  {
    id: 2,
    clientName: "Muhammad Umar",
    clientLocation: "Astralia",
    clientSource: "",
    clientReview:
      "Collaborating with Asad Saeed was a game-changer; his expertise in web development and broad proficiency across frameworks were instrumental. I'm eager for the opportunity to work together again.",
  },
  {
    id: 3,
    clientName: "Qadar Munir",
    clientLocation: "Lahore, Pakistan",
    clientSource: "",
    clientReview:
      "Asad Saeed's support and expertise in web app development were invaluable to our project success. His comprehensive understanding of various technologies ensured smooth progress throughout.",
  },
  {
    id: 4,
    clientName: "Shahzab Ali",
    clientLocation: "United Kingdom",
    clientSource: "",
    clientReview:
      " I anticipate future collaborations with great enthusiasm.",
  },
];
export default function handler(req, res) {
  res.status(200).json(review);
}
