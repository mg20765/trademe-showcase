import styles from "./ListingQuestions.module.css";

export default function Questions({ questions = [] }) {
  return (
    <section className={styles.container}>
      <h2>Questions, Answers and Comments about this listing</h2>

      {questions.length === 0 ? (
        <p className={styles.empty}>No questions yet.</p>
      ) : (
        questions.map((question, index) => (
          <div key={index} className={styles.questionCard}>
            <p className={styles.question}>
              <strong>Q:</strong> {question.question}
            </p>

            <p className={styles.answer}>
              <strong>A:</strong> {question.answer}
            </p>

            <p className={styles.meta}>
              Asked by <strong>{question.askedBy}</strong> • {question.date}
            </p>
          </div>
        ))
      )}

      <div className={styles.askQuestion}>
        <h3>Ask the seller a question</h3>

        <textarea placeholder="Type your question here..." rows={4} />

        <button>Submit Question</button>
      </div>
    </section>
  );
}

// const questions = [
//   {
//     id: 1,
//     question: "Does this bookshelf come assembled?",
//     answer: "No, it requires assembly. Instructions and all hardware are included.",
//     askedBy: "SarahM",
//     date: "2 days ago",
//   },
//   {
//     id: 2,
//     question: "Are the shelves adjustable?",
//     answer: "The middle shelves are fixed, while the top and bottom shelves are adjustable.",
//     askedBy: "TomNZ",
//     date: "5 days ago",
//   },
// ];
