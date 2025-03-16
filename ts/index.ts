import { MongoClient } from "mongodb";

// use-case
import { TodoUseCase } from "./src/application/usecase/todo.usecase";
import { UserUseCase } from "./src/application/usecase/user.usecase";

// repository
import { MemoryTodoRepository } from "./src/infra/db/memory/memory.todo.rep";
import { MemoryUserRepository } from "./src/infra/db/memory/memory.user.rep";
import { MongoTodoRepository } from "./src/infra/db/mongo/MongoTodoRepository";

// http
import { ExpressHttpAdapter } from "./src/presentation/http/ExpressHttpAdapter";
import { registerRoutes } from "./src/presentation/routes";
import { MongoUserRepository } from "./src/infra/db/mongo/MongoUserRepository";
import { UserController } from "./src/presentation/controllers/user.controller";
import { TodoController } from "./src/presentation/controllers/todo.controller";

// db 
const mongoClient = new MongoClient('mongodb://localhost:27017/todo_clean')
mongoClient.connect()
    .then(() => console.log("db connected"))
    .catch((e) => console.log(e.message))
// const todoRepository = new MemoryTodoRepository()
// const userRepository = new MemoryUserRepository()
const todoRepository = new MongoTodoRepository(mongoClient, 'todo_clean')
const userRepository = new MongoUserRepository(mongoClient, 'todo_clean')

// useCases
const userUseCase = new UserUseCase(userRepository)
const todoUseCase = new TodoUseCase(todoRepository)

// controllers
const userController = new UserController(userUseCase)
const todoController = new TodoController(todoUseCase)
// HTTP Adapter
const httpServer = new ExpressHttpAdapter();

// Swagger Docs
httpServer.get('/docs', (_, res) => {
    res.sendFile(__dirname + '/docs/swagger/index.html')
})
httpServer.get('/docs/swagger.json', (_, res) => {
    res.sendFile(__dirname + '/docs/swagger/swagger.json')
})
// Register Routes
registerRoutes(httpServer, userController, todoController);

// error handel 
httpServer.registerErrorHandle()

// Start Server
httpServer.listen(3000, `Server is running on port 3000\ndocumentation : http://localhost:3000/docs`);