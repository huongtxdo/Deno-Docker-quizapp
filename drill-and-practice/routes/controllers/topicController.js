import * as topicService from "../../services/topicService.js"
import * as userService from "../../services/userService.js"
import { validasaur } from "../../deps.js"

const showTopics = async ({render, user}) => {
    render("topics.eta", {
        topics: await topicService.getTopics(),
        users: await userService.getUserById(user.id)
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

const createTopic = async ({request, response, user}) => {
    if (user.admin) {
        const topicData = await getTopicData(request)
        const [passes, errors] = await validasaur.validate(topicData, topicValidationRules)
        if (!passes) {
            console.log(errors)
            topicData.validationErrors = errors
            render("topics.eta", topicData)
        } else {
            await topicService.addTopic( user.id, params.get("name") )
        }        
    }
    response.redirect("/topics")    
}
///////////////////////////////

const deleteTopic = async ({request, repsonse, user, params}) => {
    if (user.admin) {
        await topicService.deleteTopic(user.id, params.id)
    }
    response.redirect("/topics")
}

export { showTopic, showTopics, createTopic, deleteTopic } 