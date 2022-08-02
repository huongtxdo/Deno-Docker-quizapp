import * as questionService from "../../services/questionService.js"
import { validasaur } from "../../deps.js"

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)]
}

const getQuestionData = async (request) => {
    const body = request.body({type: "form"})
    const params = await body.value
    return {
        name: params.get("question_text")
    }
} 

const createQuestion = async ({request, response, user}) => {
    if (user.admin) {
        const topicData = await getQuestionData(request)
        const [passes, errors] = await validasaur.validate(topicData, topicValidationRules)
        if (!passes) {
            console.log(errors)
            topicData.validationErrors = errors
            render("topics.eta", topicData)
        } else {
            await topicService.addTopic( user.id, params.get("name") )
        }        
    }
    response.redirect("/topics/")    
}

export {createQuestion}