import * as topicService from "../../services/topicService.js"
import * as userService from "../../services/userService.js"
import { validasaur } from "../../deps.js"
import { executeQuery } from "../../database/database.js"

// shows a page that lists the topics available in the application
// topics are shown in alphabetic order, with link to specific topic pages
// // clicking on link moves to path "/topics/:id"

// const getTopics = async (request) => {
//     const data = {
//         name: "",
//         topics: []
//     }
//     if (!request) {
//         const topics = await topicService.getTopics()
//         if (topics && topics.rows.length > 0) {
//             data.topics = topics.rows
//         }
//     } else {
//         const body = request.body()
//         const params = await body.value
//         data.name = params.get("name")
//     }
//     return data
// }

const showTopics = async ({render, user}) => {
    render("topics.eta", {
        topics: await topicService.getTopics(),
        users: await userService.getUser(user.id)
    })
}

const showTopic = async ({params}) => {
    render("topic.eta", {
        topic: await topicService.getTopic(params.id)
    })
}

// validation and add new topic
const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)]
}

const getTopicData = async (request) => {
    const body = request.body({type: "form"})
    const params = await body.value
    return {
        name: params.get("name")
    }
}

const addTopic = async ({request, user, response}) => {
    const topicData = await getTopicData(request)
    const [passes, errors] = await validasaur.validate(topicData, topicValidationRules)
    if (!passes) {
        console.log(errors)
        topicData.validationErrors = errors
        render("topics.eta", topicData)
    } else {
        await topicService.newTopic( user.id, params.get("name") )
    }
    response.redirect("/topics")    
}
///////////////////////////////

export { showTopic, showTopics, addTopic } 