# Contributing Guide

## Architectural Standards

### 1. Backend Standards
- **Strict Controller Mapping**: Every Prisma model in `schema.prisma` MUST have a corresponding controller file in `backend/src/controllers/`.
  - Naming Convention: `[ModelName].controller.js` (PascalCase).
  - Example: `User` model -> `User.controller.js`.
- **No Ambiguous Controllers**: Do not group unrelated models.
  - Bad: `Emergency.controller.js` handling logs and barcodes.
  - Good: `EmergencyLog.controller.js` and `EmergencyBarcode.controller.js`.
- **CRUD Operations**: All basic CRUD operations (create, list, getById, update, delete) should be implemented where applicable.

### 2. Frontend Standards
- **Centralized API Config**: All API endpoints MUST be defined in `frontend/src/config/api.config.ts`.
  - Do NOT hardcode URL strings in components.
- **Service Layer**: Components should NOT call `api.get/post` directly. Use the Service layer.
  - Location: `frontend/src/services/`.
  - Example: `AuthService.login(credentials)` instead of `api.post('/auth/login', ...)`.
- **Services**: Group services by domain, importing endpoints from `api.config.ts`.

### 3. Workflow for New Features
1.  **Define Model**: Add to `schema.prisma` and migrate.
2.  **Create Controller**: Create `[ModelName].controller.js` with CRUD.
3.  **Define Routes**: Create `[model].routes.js` and register in `index.js`.
4.  **Update Frontend Config**: Add new endpoints to `api.config.ts`.
5.  **Create Service**: Add methods to the relevant Service file.
6.  **Implement Component**: Use the Service in your React component.
