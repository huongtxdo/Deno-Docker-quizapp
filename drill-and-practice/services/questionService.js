import { executeQuery } from "../../database/database.js"

const addQuestion = async (user_id, topic_id, question_text) => {
    await executeQuery("INSERT INTO questions (user_id, topic_id, question_text) VALUES ($user_id, $topic_id, $question_text",
    {
        user_id: user_id,
        topic_id: topic_id,
        question_text: question_text
    })
}

export { addQuestion }