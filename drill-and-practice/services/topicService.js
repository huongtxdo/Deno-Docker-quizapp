import { executeQuery } from "../database/database.js"
import { getUserById  } from "./userService.js"

const getTopics = async () => {
    const result = await executeQuery("SELECT * FROM topics ORDER BY name")
    return result.rows
}

const getTopic = async (id) => {
    const result = await executeQuery("SELECT * FROM topics WHERE id = $id",
    {
        id: id
    })
    if (result && result.rows > 0) {
        return result.rows[0]
    }
}

const addTopic = async (user_id, name) => {
    const userById =  await getUserById(user_id)
    if (userById.admin) {
        await executeQuery("INSERT INTO topics (user_id, name) VALUES ($user_id, $name)",
        {
            user_id: user_id,
            name: name
        })
    }
}

const deleteTopic = async (user_id, id) => {
    const userById =  await getUserById(user_id)
    if (userById.admin) {
        const result = await executeQuery("SELECT id FROM questions WHERE topic_id = $id", {id:id})
        if (result && result.rows.length > 0) {
            const questionIds = result.rows
            await questionIds.forEach( (questionId) => {
                 executeQuery("DELETE FROM question_answer_options WHERE question_id = $questionId",
                {
                    questionId: questionId
                })   
                 executeQuery("DELETE FROM question_answers WHERE question_id = $questionId",
                {
                    questionId: questionId
                })            
            });
            await executeQuery("DELETE FROM questions WHERE topic_id = $id",
            {
                id: id
            })           
        }
        await executeQuery("DELETE FROM topics WHERE id = $id",
        {
            id: id
        }) 
    }
}

export { getTopics, getTopic, addTopic, deleteTopic }

// CREATE TABLE topics (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id),
//     name VARCHAR(255) UNIQUE
//   );