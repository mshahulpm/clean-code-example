import { TodoUseCase } from "./src/application/usecase/todo.usecase";
import { UserUseCase } from "./src/application/usecase/user.usecase";
import { MemoryTodoRepository } from "./src/infra/db/memory/memory.todo.rep";
import { MemoryUserRepository } from "./src/infra/db/memory/memory.user.rep";
import { ExpressHttpAdapter } from "./src/presentation/http/ExpressHttpAdapter";
import { registerRoutes } from "./src/presentation/routes";

// db 
const todoRepository = new MemoryTodoRepository()
const userRepository = new MemoryUserRepository()

// useCases
const userUseCase = new UserUseCase(userRepository)
const todoUseCase = new TodoUseCase(todoRepository)

// HTTP Adapter
const httpServer = new ExpressHttpAdapter();

// Swagger Docs
httpServer.get('/docs', (req, res) => {
    res.sendFile(__dirname + '/docs/swagger/index.html')
})
httpServer.get('/docs/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/docs/swagger/swagger.json')
})
// Register Routes
registerRoutes(httpServer, userUseCase, todoUseCase);

// Start Server
httpServer.listen(3000);