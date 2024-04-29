const review = [
  {
    id: 0,
    clientName: "Roshan Sajid",
    clientLocation: "Lahore, Pakistan",
    clientSource: "",
    clientReview:
      "Working with him is always a pleasure. He completes tasks swiftly and goes above and beyond expectations. His depth of knowledge in his field is evident, and I eagerly anticipate our next collaboration.",
  },
  {
    id: 2,
    clientName: "Muhammad Junaid",
    clientLocation: "Canada",
    clientSource: "",
    clientReview:
      "He not only demonstrates exceptional communication skills but also showcases a wealth of experience in website development. Collaborating with him is a seamless and enriching journey, where his expertise consistently elevates projects to new heights.",
  },
  {
    id: 3,
    clientName: "Hassan",
    clientLocation: "Lahore, Pakistan",
    clientSource: "",
    clientReview:
      "Raza's expertise and support are invaluable. He possesses a deep understanding of web app development, demonstrating proficiency across various technologies and frameworks in the field. I eagerly anticipate the opportunity to collaborate with him once more.",
  },
];
export default function handler(req, res) {
  res.status(200).json(review);
}
