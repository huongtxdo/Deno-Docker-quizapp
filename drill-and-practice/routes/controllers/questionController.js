import * as questionService from "../../services/questionService.js"
import { validasaur } from "../../deps.js"

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)]
}

const getQuestionData = async (request) => {
    const body = request.body({type: "form"})
    const params = await body.value
    return {
        question_text: params.get("question_text")
    }
} 

const createQuestion = async ({request, response, user, params}) => {
    if (user.admin) {
        const questionData = await getQuestionData(request)
        const [passes, errors] = await validasaur.validate(questionData, topicValidationRules)
        if (!passes) {
            console.log(errors)
            questionData.validationErrors = errors
            render("topics.eta", questionData)
        } else {
            await questionService.addQuestion(user.id, params.id, questionData.question_text)
        }        
    }
    response.redirect("/topics/")    
}

export {createQuestion}