# Project Structure

This project follows the **Clean Architecture** principles, ensuring modularity, maintainability, and scalability.

## **Directory Structure**
```
src/
├── application/
│   ├── interface/
│   │   ├── dto/
│   │   │   ├── todo/
│   │   │   └── user/
│   │   ├── repository/
│   │   ├── validation/
│   │   └── security/
│   └── usecase/
├── domain/
│   ├── entity/
│   ├── exception/
│   └── security/
├── infra/
│   ├── db/
│   │   ├── memory/
│   │   ├── mongo/
│   │   └── pg/
│   ├── messaging/
│   │   └── rabbitmq/
│   ├── security/
│   └── logging/
├── presentation/
│   ├── controllers/
│   ├── http/
│   ├── middleware/
│   ├── routes/
│   ├── security/
│   └── validation/
├── config/
│   ├── env/
│   ├── security/
│   ├── logging/
│   └── database/
└── README.md
```

## **Features Added**
- **Logging** (`infra/logging/` & `config/logging/`)
- **Authentication & Authorization** (`infra/security/`, `presentation/security/`)
- **Role-based Authorization**
- **Controller Layer** (`presentation/controllers/`) to separate business logic from routes
- **Payload Validation** (`application/interface/validation/`, `presentation/validation/`)

## **Key Design Decisions**
- **Loose Coupling:** Separation of concerns ensures modular development.
- **Multiple Database Support:** Easy switching between `memory`, `MongoDB`, and `PostgreSQL`.
- **Security Focus:** Centralized security handling for authentication and authorization.
- **Scalable Routing:** `routes/` handles grouping of multiple API endpoints.

