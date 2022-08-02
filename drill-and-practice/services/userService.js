import { executeQuery } from "../database/database.js"

const getUserByEmail = async (email) => {
    const result = await executeQuery("SELECT * FROM users WHERE email = $email",
    {
        email: email
    })
    if (result && result.rows > 0) {
        return result.rows[0]
    }
}

const getUserById = async (id) => {
    const result = await executeQuery("SELECT * FROM users WHERE id = $id",
    {
        id: id
    })
    if (result && result.rows > 0) {
        return result.rows[0]
    }
}

export { getUserByEmail, getUserById }