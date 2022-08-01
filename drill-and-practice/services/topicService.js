import { executeQuery } from "../database/database.js"

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
    await executeQuery("INSERT INTO topics (user_id, name) VALUES ($user_id, $name)",
    {
        user_id: user_id,
        name: name
    })
}

const deleteTopic = async (id) => {
    await 
}

export { getTopics, getTopic, addTopic }

// CREATE TABLE topics (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id),
//     name VARCHAR(255) UNIQUE
//   );