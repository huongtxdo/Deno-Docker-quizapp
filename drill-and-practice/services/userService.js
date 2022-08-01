import { executeQuery } from "../database/database.js"

const getUser = async (id) => {
    const result = await executeQuery("SELECT * FROM users WHERE id = $id",
    {
        id: id
    })
    if (result && result.rows > 0) {
        return result.rows[0]
    }
}

export { getUser }