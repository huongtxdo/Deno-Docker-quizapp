import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js"
import * as questionController from "./controllers/questionController.js"

const router = new Router();

router.get("/", mainController.showMain)

router.get("/topics", topicController.showTopics)
    .get("/topics/:id", topicController.showTopic)
    .post("/topics", topicController.createTopic)
    .post("/topics/:id/delete", topicController.deleteTopic)

export { router };
